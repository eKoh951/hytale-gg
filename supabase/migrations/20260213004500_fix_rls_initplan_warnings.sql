-- Fix auth_rls_initplan warnings: wrap auth.uid() / auth.jwt() in (SELECT ...)
-- to prevent per-row re-evaluation. See:
-- https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select

----------------------------------------------------------------------
-- avatar_uploads
----------------------------------------------------------------------
DROP POLICY "Users can delete own avatar metadata" ON public.avatar_uploads;
CREATE POLICY "Users can delete own avatar metadata" ON public.avatar_uploads
  FOR DELETE TO public USING ((SELECT auth.uid()) = user_id);

DROP POLICY "Users can insert own avatar metadata" ON public.avatar_uploads;
CREATE POLICY "Users can insert own avatar metadata" ON public.avatar_uploads
  FOR INSERT TO public WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY "Users can update own avatar metadata" ON public.avatar_uploads;
CREATE POLICY "Users can update own avatar metadata" ON public.avatar_uploads
  FOR UPDATE TO public USING ((SELECT auth.uid()) = user_id);

----------------------------------------------------------------------
-- owner_responses
----------------------------------------------------------------------
DROP POLICY "owner_responses_insert" ON public.owner_responses;
CREATE POLICY "owner_responses_insert" ON public.owner_responses
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.servers s
      JOIN public.reviews r ON r.entity_id = s.id AND r.entity_type = 'server'
      WHERE r.id = owner_responses.review_id
        AND s.owner_id = (SELECT auth.uid())
        AND s.verification_status = 'verified'
    )
  );

----------------------------------------------------------------------
-- profiles
----------------------------------------------------------------------
DROP POLICY "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT TO public WITH CHECK ((SELECT auth.uid()) = id);

DROP POLICY "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO public USING ((SELECT auth.uid()) = id);

----------------------------------------------------------------------
-- review_comments
----------------------------------------------------------------------
DROP POLICY "comments_insert" ON public.review_comments;
CREATE POLICY "comments_insert" ON public.review_comments
  FOR INSERT TO authenticated WITH CHECK ((SELECT auth.uid()) = user_id);

----------------------------------------------------------------------
-- review_media
----------------------------------------------------------------------
DROP POLICY "review_media_insert" ON public.review_media;
CREATE POLICY "review_media_insert" ON public.review_media
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.reviews
      WHERE reviews.id = review_media.review_id
        AND reviews.user_id = (SELECT auth.uid())
    )
  );

----------------------------------------------------------------------
-- review_ratings
----------------------------------------------------------------------
DROP POLICY "review_ratings_insert" ON public.review_ratings;
CREATE POLICY "review_ratings_insert" ON public.review_ratings
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.reviews
      WHERE reviews.id = review_ratings.review_id
        AND reviews.user_id = (SELECT auth.uid())
    )
  );

----------------------------------------------------------------------
-- review_reactions
----------------------------------------------------------------------
DROP POLICY "reactions_insert" ON public.review_reactions;
CREATE POLICY "reactions_insert" ON public.review_reactions
  FOR INSERT TO authenticated WITH CHECK ((SELECT auth.uid()) = user_id);

----------------------------------------------------------------------
-- review_saves
----------------------------------------------------------------------
DROP POLICY "saves_delete" ON public.review_saves;
CREATE POLICY "saves_delete" ON public.review_saves
  FOR DELETE TO authenticated USING ((SELECT auth.uid()) = user_id);

DROP POLICY "saves_insert" ON public.review_saves;
CREATE POLICY "saves_insert" ON public.review_saves
  FOR INSERT TO authenticated WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY "saves_select" ON public.review_saves;
CREATE POLICY "saves_select" ON public.review_saves
  FOR SELECT TO authenticated USING ((SELECT auth.uid()) = user_id);

----------------------------------------------------------------------
-- review_votes
----------------------------------------------------------------------
DROP POLICY "votes_insert" ON public.review_votes;
CREATE POLICY "votes_insert" ON public.review_votes
  FOR INSERT TO authenticated WITH CHECK ((SELECT auth.uid()) = user_id);

----------------------------------------------------------------------
-- reviews
----------------------------------------------------------------------
DROP POLICY "reviews_delete" ON public.reviews;
CREATE POLICY "reviews_delete" ON public.reviews
  FOR DELETE TO authenticated USING ((SELECT auth.uid()) = user_id);

DROP POLICY "reviews_insert" ON public.reviews;
CREATE POLICY "reviews_insert" ON public.reviews
  FOR INSERT TO authenticated WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY "reviews_update" ON public.reviews;
CREATE POLICY "reviews_update" ON public.reviews
  FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) = user_id AND created_at > (now() - interval '24 hours'))
  WITH CHECK ((SELECT auth.uid()) = user_id);

----------------------------------------------------------------------
-- server_media
----------------------------------------------------------------------
DROP POLICY "server_media_insert" ON public.server_media;
CREATE POLICY "server_media_insert" ON public.server_media
  FOR INSERT TO authenticated WITH CHECK ((SELECT auth.uid()) = uploaded_by);

----------------------------------------------------------------------
-- server_tags
----------------------------------------------------------------------
DROP POLICY "server_tags_insert" ON public.server_tags;
CREATE POLICY "server_tags_insert" ON public.server_tags
  FOR INSERT TO authenticated WITH CHECK ((SELECT auth.uid()) = user_id);

----------------------------------------------------------------------
-- servers
----------------------------------------------------------------------
DROP POLICY "servers_insert" ON public.servers;
CREATE POLICY "servers_insert" ON public.servers
  FOR INSERT TO authenticated WITH CHECK ((SELECT auth.uid()) = listed_by);

DROP POLICY "servers_update" ON public.servers;
CREATE POLICY "servers_update" ON public.servers
  FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) = owner_id AND verification_status = 'verified')
  WITH CHECK ((SELECT auth.uid()) = owner_id);

----------------------------------------------------------------------
-- tag_suggestions
----------------------------------------------------------------------
DROP POLICY "tag_suggestions_insert" ON public.tag_suggestions;
CREATE POLICY "tag_suggestions_insert" ON public.tag_suggestions
  FOR INSERT TO authenticated WITH CHECK ((SELECT auth.uid()) = suggested_by);

DROP POLICY "tag_suggestions_select_own" ON public.tag_suggestions;
CREATE POLICY "tag_suggestions_select_own" ON public.tag_suggestions
  FOR SELECT TO authenticated USING ((SELECT auth.uid()) = suggested_by);

----------------------------------------------------------------------
-- user_preferences
----------------------------------------------------------------------
DROP POLICY "Users can insert own preferences" ON public.user_preferences;
CREATE POLICY "Users can insert own preferences" ON public.user_preferences
  FOR INSERT TO public WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY "Users can update own preferences" ON public.user_preferences;
CREATE POLICY "Users can update own preferences" ON public.user_preferences
  FOR UPDATE TO public USING ((SELECT auth.uid()) = user_id);

DROP POLICY "Users can view own preferences" ON public.user_preferences;
CREATE POLICY "Users can view own preferences" ON public.user_preferences
  FOR SELECT TO public USING ((SELECT auth.uid()) = user_id);

----------------------------------------------------------------------
-- user_roles (fix remaining bare auth.jwt() calls)
----------------------------------------------------------------------
DROP POLICY "Admin delete user roles" ON public.user_roles;
CREATE POLICY "Admin delete user roles" ON public.user_roles
  FOR DELETE TO public USING ((SELECT auth.jwt()) ->> 'role' = 'supabase_auth_admin');

DROP POLICY "Admin insert user roles" ON public.user_roles;
CREATE POLICY "Admin insert user roles" ON public.user_roles
  FOR INSERT TO public WITH CHECK ((SELECT auth.jwt()) ->> 'role' = 'supabase_auth_admin');

DROP POLICY "Admin update user roles" ON public.user_roles;
CREATE POLICY "Admin update user roles" ON public.user_roles
  FOR UPDATE TO public
  USING ((SELECT auth.jwt()) ->> 'role' = 'supabase_auth_admin')
  WITH CHECK ((SELECT auth.jwt()) ->> 'role' = 'supabase_auth_admin');

DROP POLICY "View user roles" ON public.user_roles;
CREATE POLICY "View user roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (
    (SELECT auth.uid()) = user_id
    OR (SELECT auth.jwt()) ->> 'role' = 'supabase_auth_admin'
  );

----------------------------------------------------------------------
-- user_stats
----------------------------------------------------------------------
DROP POLICY "Users can update own stats" ON public.user_stats;
CREATE POLICY "Users can update own stats" ON public.user_stats
  FOR UPDATE TO public USING ((SELECT auth.uid()) = user_id);

----------------------------------------------------------------------
-- Remaining unindexed FK columns (INFO level)
----------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_survey_responses_respondent
  ON public.survey_responses (respondent_id);

CREATE INDEX IF NOT EXISTS idx_tag_suggestions_merged_into
  ON public.tag_suggestions (merged_into_tag_id);

CREATE INDEX IF NOT EXISTS idx_tag_suggestions_reviewed_by
  ON public.tag_suggestions (reviewed_by);

CREATE INDEX IF NOT EXISTS idx_tag_suggestions_suggested_by
  ON public.tag_suggestions (suggested_by);

CREATE INDEX IF NOT EXISTS idx_tags_approved_by
  ON public.tags (approved_by);

CREATE INDEX IF NOT EXISTS idx_tags_created_by
  ON public.tags (created_by);
