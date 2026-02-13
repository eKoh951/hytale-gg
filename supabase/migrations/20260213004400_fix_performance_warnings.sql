-- Fix performance advisor warnings:
-- 1. Consolidate multiple permissive SELECT policies
-- 2. Add missing indexes on foreign key columns

----------------------------------------------------------------------
-- 1. Consolidate multiple permissive SELECT policies
----------------------------------------------------------------------

-- survey_answers: merge "Admins can read all survey answers" + "Select own answers"
DROP POLICY "Admins can read all survey answers" ON public.survey_answers;
DROP POLICY "Select own answers" ON public.survey_answers;
CREATE POLICY "Read survey answers" ON public.survey_answers
  FOR SELECT TO public
  USING (
    response_id IN (SELECT sr.id FROM public.survey_responses sr)
    OR public.is_admin()
  );

-- survey_responses: merge "Admins can read all survey responses" + "Select own response"
DROP POLICY "Admins can read all survey responses" ON public.survey_responses;
DROP POLICY "Select own response" ON public.survey_responses;
CREATE POLICY "Read survey responses" ON public.survey_responses
  FOR SELECT TO public
  USING (true);

-- user_roles: merge "Allow auth admin to manage user roles" (ALL) + "Users can view own roles" (SELECT)
-- Split ALL into: combined SELECT + separate write policies
DROP POLICY "Allow auth admin to manage user roles" ON public.user_roles;
DROP POLICY "Users can view own roles" ON public.user_roles;

CREATE POLICY "View user roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (
    (SELECT auth.uid()) = user_id
    OR (auth.jwt() ->> 'role') = 'supabase_auth_admin'
  );

CREATE POLICY "Admin insert user roles" ON public.user_roles
  FOR INSERT TO public
  WITH CHECK ((auth.jwt() ->> 'role') = 'supabase_auth_admin');

CREATE POLICY "Admin update user roles" ON public.user_roles
  FOR UPDATE TO public
  USING ((auth.jwt() ->> 'role') = 'supabase_auth_admin')
  WITH CHECK ((auth.jwt() ->> 'role') = 'supabase_auth_admin');

CREATE POLICY "Admin delete user roles" ON public.user_roles
  FOR DELETE TO public
  USING ((auth.jwt() ->> 'role') = 'supabase_auth_admin');

----------------------------------------------------------------------
-- 2. Add missing indexes on unindexed foreign key columns
--    (servers.owner_id already has idx_servers_owner)
----------------------------------------------------------------------

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_owner_responses_owner
  ON public.owner_responses (owner_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_review_comments_parent
  ON public.review_comments (parent_comment_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_review_comments_user
  ON public.review_comments (user_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_review_media_review
  ON public.review_media (review_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_review_reactions_user
  ON public.review_reactions (user_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_review_saves_user
  ON public.review_saves (user_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_review_votes_user
  ON public.review_votes (user_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_server_media_uploaded_by
  ON public.server_media (uploaded_by);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_server_tags_user
  ON public.server_tags (user_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_servers_listed_by
  ON public.servers (listed_by);
