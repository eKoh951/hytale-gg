-- Fix security advisor warnings:
-- 1. Mutable search_path on 4 functions
-- 2. Overly permissive INSERT RLS on survey tables
-- 3. RLS enabled but no policies on metric partition tables

----------------------------------------------------------------------
-- 1. Fix mutable search_path on functions
----------------------------------------------------------------------

-- generate_username: pure string manipulation, no table access
CREATE OR REPLACE FUNCTION public.generate_username(display_name text)
 RETURNS text
 LANGUAGE plpgsql
 IMMUTABLE
 SET search_path = ''
AS $function$
BEGIN
  RETURN LOWER(REPLACE(REPLACE(display_name, ' ', '_'), '-', '_'));
END;
$function$;

-- handle_new_user: trigger on auth.users, inserts into profiles + user_stats
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
DECLARE
  base_username TEXT;
  final_username TEXT;
  counter INTEGER := 0;
BEGIN
  base_username := LOWER(
    REGEXP_REPLACE(
      COALESCE(
        new.raw_user_meta_data->>'full_name',
        SPLIT_PART(new.email, '@', 1)
      ),
      '[^a-z0-9_]',
      '_',
      'g'
    )
  );

  IF LENGTH(base_username) < 3 THEN
    base_username := base_username || '_user';
  END IF;

  IF LENGTH(base_username) > 20 THEN
    base_username := SUBSTRING(base_username, 1, 20);
  END IF;

  final_username := base_username;

  WHILE EXISTS (SELECT 1 FROM public.profiles WHERE username = final_username) LOOP
    counter := counter + 1;
    final_username := SUBSTRING(base_username, 1, 20 - LENGTH(counter::TEXT) - 1) || '_' || counter::TEXT;
  END LOOP;

  INSERT INTO public.profiles (id, display_name, avatar_url, username)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    new.raw_user_meta_data->>'avatar_url',
    final_username
  );

  INSERT INTO public.user_stats (user_id)
  VALUES (new.id);

  RETURN new;
END;
$function$;

-- custom_access_token_hook: reads user_roles to inject role into JWT claims
CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE
 SET search_path = ''
AS $function$
DECLARE
  claims jsonb;
  user_role public.app_role;
BEGIN
  SELECT role INTO user_role
  FROM public.user_roles
  WHERE user_id = (event ->> 'user_id')::uuid;

  claims := event -> 'claims';

  IF user_role IS NOT NULL THEN
    claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
  ELSE
    claims := jsonb_set(claims, '{user_role}', 'null');
  END IF;

  event := jsonb_set(event, '{claims}', claims);

  RETURN event;
END;
$function$;

-- set_current_timestamp_updated_at: generic updated_at trigger
CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = ''
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$;

----------------------------------------------------------------------
-- 2. Tighten overly permissive INSERT RLS on survey tables
----------------------------------------------------------------------

-- survey_responses: require a non-empty session_token
DROP POLICY "Insert response" ON public.survey_responses;
CREATE POLICY "Insert response" ON public.survey_responses
  FOR INSERT TO public
  WITH CHECK (session_token IS NOT NULL AND LENGTH(session_token) > 0);

-- survey_answers: require the response to exist
DROP POLICY "Insert answers" ON public.survey_answers;
CREATE POLICY "Insert answers" ON public.survey_answers
  FOR INSERT TO public
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.survey_responses sr
      WHERE sr.id = response_id
    )
  );

----------------------------------------------------------------------
-- 3. Add explicit RLS policies on metric partition tables
--    (Partitions inherit parent policies at query time, but the
--     linter checks each table individually.)
----------------------------------------------------------------------

-- server_metrics_2026_02
CREATE POLICY "Public read metrics 2026_02"
  ON public.server_metrics_2026_02
  FOR SELECT TO public USING (true);

CREATE POLICY "Service insert metrics 2026_02"
  ON public.server_metrics_2026_02
  FOR INSERT TO service_role WITH CHECK (true);

-- server_metrics_2026_03
CREATE POLICY "Public read metrics 2026_03"
  ON public.server_metrics_2026_03
  FOR SELECT TO public USING (true);

CREATE POLICY "Service insert metrics 2026_03"
  ON public.server_metrics_2026_03
  FOR INSERT TO service_role WITH CHECK (true);
