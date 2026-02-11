# Server Card & Review System — Engineering Plan

Full implementation plan for the server card, review system, discovery, tags, and media pipeline per `docs/server-card-design.md`, using **Supabase MCP** for all DB work and following project skills: `supabase-postgres-best-practices`, `vercel-react-best-practices`, `vercel-composition-patterns`, `next-best-practices`, `next-intl-translations`.

---

## Current State

**Supabase project:** `adkjqnhytspczubeqvnc` (vercel-hytale-gg, us-east-1, ACTIVE_HEALTHY)
**Existing migrations:** 15 (profiles → RBAC), **existing tables:** profiles, user_stats, achievements, user_achievements, user_activity, avatar_uploads, user_preferences, surveys, survey_responses, survey_answers, user_roles
**No server/review tables exist yet.**

**App:** Next.js 16 + React 19 + TailwindCSS 4 + motion + shadcn/ui (@hytale registry) + next-intl (en/es)
**Routes:** `(main)` public, `(admin)` admin. Placeholder `/servers` page with hardcoded mock data.

---

## PRD → Design Doc Reconciliation

The design doc supersedes PRDs on these points:

| Topic | PRD | Design Doc (wins) |
|-------|-----|-------------------|
| Review dimensions | 4 (Community/Performance/Content/Fairness) | 3 (Fun/Community/Stability) + user-created |
| Review paths | Single form | Dual: Quick Rate + Detailed |
| Review interactions | Helpful/Not Helpful | Helpful/Funny + reactions + comments + save |
| Server data | Basic fields | Extended (icon, cover, media, vibe_tags, badges, recommend_pct) |
| Entity model | `server_id` FK | Polymorphic `entity_type` + `entity_id` |

---

## Skill Rules Applied Throughout

### `supabase-postgres-best-practices`
- **`schema-partial-indexes`** — partial indexes on `WHERE status = 'published'`, `WHERE verification_status = 'verified'`
- **`schema-composite-indexes`** — composite indexes for common query patterns (server+created, review+helpful)
- **`query-missing-indexes`** — every WHERE/JOIN/ORDER BY column indexed
- **`security-rls`** — RLS on every new table, policies scoped to auth.uid()
- All migrations run via **Supabase MCP `apply_migration`** tool (project `adkjqnhytspczubeqvnc`)

### `vercel-react-best-practices`
- **`async-parallel`** — `Promise.all()` for independent data fetches on server detail page
- **`async-suspense-boundaries`** — Suspense wrapping each discovery section for streaming
- **`server-parallel-fetching`** — each homepage section is its own Server Component fetching in parallel
- **`server-auth-actions`** — all server actions authenticate via `supabase.auth.getUser()`
- **`server-serialization`** — minimize data passed to client; extract only needed fields
- **`bundle-dynamic-imports`** — `next/dynamic` for review modal, media gallery, video player
- **`rerender-use-transition-loading`** — `useTransition` for review submission loading states
- **`server-cache-react`** — `React.cache()` for per-request dedup of server/review data
- **`server-after-nonblocking`** — `after()` in cron routes for non-blocking metric inserts

### `vercel-composition-patterns`
- **`architecture-avoid-boolean-props`** — ServerCard uses explicit variant components (`CompactCard`, `ExpandedCard`, `DetailHeader`), NOT `<ServerCard isExpanded isDetail />`
- **`architecture-compound-components`** — Review card uses compound pattern: `<ReviewCard><ReviewCard.Header /><ReviewCard.Body /><ReviewCard.Actions /></ReviewCard>`
- **`patterns-explicit-variants`** — separate files per card variant, no mode booleans
- **`react19-no-forwardref`** — use `ref` prop directly, `use()` instead of `useContext()`

### `next-best-practices`
- **Async params** — all pages use `params: Promise<{ locale: string }>` pattern
- **`setRequestLocale(locale)`** — called in every page/layout under `[locale]`
- **Route handlers** — GET for public reads, Server Actions for mutations
- **`generateMetadata`** — dynamic metadata with translations on server/review pages
- **Error boundaries** — `error.tsx` + `not-found.tsx` for server detail pages

### Forms, Validation & State Management

**Installed:** `zod` (via `pnpm add zod`, already in project)
**Skip:** `react-hook-form` — React 19 `useActionState` + native `<form action={}>` handles pending, errors, optimistic UI
**Skip:** `zustand` — React Context covers card/review providers; no cross-route global state
**Skip:** `conform.js` — `useActionState` + Zod `safeParse` achieves the same with zero deps

### `zod` (skill rules applied)
- **`schema-coercion-for-form-data`** — all form schemas use `z.coerce.number()` for port, player counts; `z.coerce.boolean()` for toggles. Never raw `z.number()` on FormData.
- **`parse-use-safeparse`** — every Server Action uses `safeParse()`, never `parse()`. Returns `{ errors }` on failure.
- **`error-use-flatten`** — `result.error.flatten().fieldErrors` for form error display, maps directly to field names.
- **`error-i18n`** — Zod error map integrated with next-intl. `createZodErrorMap(locale)` reads from `messages/{locale}/validation.json`.
- **`type-use-z-infer`** — all types derived via `z.infer<typeof schema>`, never manual interfaces.
- **`type-export-schemas-and-types`** — export both schema and inferred type from each validation file.
- **`object-partial-for-updates`** — `updateServerSchema = createServerSchema.partial()` for edit forms.
- **`schema-use-enums`** — `z.enum(['pvp','survival',...])` for categories, regions, review types.
- **`compose-shared-schemas`** — shared primitives in `lib/validations/shared.ts` (slug, uuid, rating 1-5).
- **`perf-cache-schemas`** — schemas defined at module level, not inside functions.

**Pattern for every Server Action:**
```ts
// lib/validations/server.ts
import { z } from 'zod'

export const createServerSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(50).max(500),
  ip_address: z.string().ip(),
  port: z.coerce.number().int().min(1).max(65535).default(24454),
  category: z.enum(['pvp','survival','creative','roleplay','minigames','modded']),
  region: z.enum(['na','eu','asia','latam','oce']),
})

export type CreateServerInput = z.infer<typeof createServerSchema>
export const updateServerSchema = createServerSchema.partial()
export type UpdateServerInput = z.infer<typeof updateServerSchema>

// app/actions/server-actions.ts
'use server'
export async function createServer(prevState: any, formData: FormData) {
  const parsed = createServerSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { errors: parsed.error.flatten().fieldErrors }
  // insert...
}

// Client form component
'use client'
import { useActionState } from 'react'
export function CreateServerForm() {
  const [state, formAction, pending] = useActionState(createServer, null)
  return <form action={formAction}>...</form>
}
```

**Validation file structure:**
```
lib/validations/
  shared.ts        -- slug, uuid, rating (1-5), pagination schemas
  server.ts        -- createServer, updateServer, claimServer, verifyServer
  review.ts        -- submitQuickRate, submitDetailedReview, reviewRatings
  tag.ts           -- suggestTag, applyTag
  error-map.ts     -- createZodErrorMap(locale) for next-intl integration
```

**i18n error map (next-intl integration):**
```ts
// lib/validations/error-map.ts
import { z } from 'zod'

export function createZodErrorMap(
  t: (key: string, values?: Record<string, unknown>) => string
): z.ZodErrorMap {
  return (issue, ctx) => {
    switch (issue.code) {
      case z.ZodIssueCode.too_small:
        if (issue.type === 'string')
          return { message: t('validation.tooShort', { min: issue.minimum }) }
        break
      case z.ZodIssueCode.invalid_string:
        if (issue.validation === 'email')
          return { message: t('validation.invalidEmail') }
        break
    }
    return { message: ctx.defaultError }
  }
}

// Usage in Server Action:
const t = await getTranslations('validation')
const parsed = schema.safeParse(data, { errorMap: createZodErrorMap(t) })
```

**New i18n file:** `messages/{en,es}/validation.json` — Zod error messages.

### `next-intl-translations`
- **New message files:** `messages/{en,es}/reviews.json` for review UI strings
- **Extend existing:** `messages/{en,es}/servers.json` for new server card/detail keys
- **Server Components preferred** — card components use `useTranslations` server-side
- **Donut pattern** — interactive parts (review modal, vote buttons) get pre-translated string props
- **Scoped providers** — review submission page gets `NextIntlClientProvider` with `pick(messages, ['reviews'])`
- **Update `i18n/request.ts`** to import and spread new `reviews.json`
- Run `npx @lingual/i18n-check@latest --source en --locales messages` after each i18n change

---

## Phase 1: Database Foundation (via Supabase MCP)

All migrations applied with `apply_migration` tool against project `adkjqnhytspczubeqvnc`.

### Migration 1: `create_servers_table`

```sql
CREATE TABLE servers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,
  slug VARCHAR(60) NOT NULL UNIQUE,
  description TEXT NOT NULL CHECK (char_length(description) BETWEEN 50 AND 500),
  ip_address VARCHAR(45) NOT NULL,
  port INTEGER DEFAULT 24454,
  icon_url TEXT,
  cover_url TEXT,
  video_url TEXT,
  category VARCHAR(20) NOT NULL,
  region VARCHAR(20) NOT NULL,
  language VARCHAR(20) DEFAULT 'English',
  discord_url VARCHAR(255),
  website_url VARCHAR(255),
  hosting_provider VARCHAR(50),
  owner_id UUID REFERENCES auth.users(id),
  listed_by UUID REFERENCES auth.users(id) NOT NULL,
  verification_status VARCHAR(20) DEFAULT 'unclaimed'
    CHECK (verification_status IN ('unclaimed','pending','verified')),
  verification_code VARCHAR(32),
  verification_expires_at TIMESTAMPTZ,
  quality_score DECIMAL(5,2) DEFAULT 0,
  last_featured_at TIMESTAMPTZ,
  current_status VARCHAR(10) DEFAULT 'offline',
  rating_avg DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  recommend_pct DECIMAL(4,1) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Composite indexes (supabase-postgres: schema-composite-indexes)
CREATE INDEX idx_servers_category_region ON servers(category, region)
  WHERE verification_status = 'verified';
CREATE INDEX idx_servers_quality ON servers(quality_score DESC, last_featured_at NULLS FIRST)
  WHERE verification_status = 'verified';
CREATE INDEX idx_servers_new ON servers(created_at DESC, quality_score DESC)
  WHERE verification_status = 'verified';

-- Partial indexes (supabase-postgres: schema-partial-indexes)
CREATE INDEX idx_servers_unclaimed ON servers(created_at DESC)
  WHERE verification_status = 'unclaimed';
CREATE INDEX idx_servers_owner ON servers(owner_id)
  WHERE owner_id IS NOT NULL;

-- GIN full-text search
CREATE INDEX idx_servers_search ON servers
  USING GIN (to_tsvector('english', name || ' ' || coalesce(description, '')));

-- RLS
ALTER TABLE servers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "servers_select" ON servers FOR SELECT USING (true);
CREATE POLICY "servers_insert" ON servers FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = listed_by);
CREATE POLICY "servers_update" ON servers FOR UPDATE TO authenticated
  USING (auth.uid() = owner_id AND verification_status = 'verified')
  WITH CHECK (auth.uid() = owner_id);

-- updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER servers_updated_at BEFORE UPDATE ON servers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

### Migration 2: `create_server_media_table`

```sql
CREATE TABLE server_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  server_id UUID NOT NULL REFERENCES servers(id) ON DELETE CASCADE,
  type VARCHAR(10) NOT NULL CHECK (type IN ('screenshot','video')),
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  aspect_ratio VARCHAR(5) DEFAULT '16:9' CHECK (aspect_ratio IN ('16:9','9:16')),
  source VARCHAR(10) DEFAULT 'owner' CHECK (source IN ('owner','player','scraped')),
  uploaded_by UUID REFERENCES auth.users(id),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_server_media_server ON server_media(server_id, sort_order);

ALTER TABLE server_media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "server_media_select" ON server_media FOR SELECT USING (true);
CREATE POLICY "server_media_insert" ON server_media FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = uploaded_by);
```

### Migration 3: `create_server_metrics_table`

```sql
CREATE TABLE server_metrics (
  id UUID DEFAULT gen_random_uuid(),
  server_id UUID NOT NULL REFERENCES servers(id) ON DELETE CASCADE,
  status VARCHAR(10) NOT NULL CHECK (status IN ('online','offline')),
  latency_ms INTEGER,
  player_count INTEGER,
  checked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id, checked_at)
) PARTITION BY RANGE (checked_at);

-- Current + next month partitions
CREATE TABLE server_metrics_2026_02 PARTITION OF server_metrics
  FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');
CREATE TABLE server_metrics_2026_03 PARTITION OF server_metrics
  FOR VALUES FROM ('2026-03-01') TO ('2026-04-01');

CREATE INDEX idx_metrics_server_time ON server_metrics(server_id, checked_at DESC);

ALTER TABLE server_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "metrics_select" ON server_metrics FOR SELECT USING (true);
CREATE POLICY "metrics_service" ON server_metrics FOR ALL TO service_role USING (true);
```

### Migration 4: `create_tags_tables`

```sql
-- Tag type enum
CREATE TYPE tag_type AS ENUM ('category', 'vibe', 'dimension');
CREATE TYPE tag_status AS ENUM ('predefined', 'experimental', 'established', 'archived');

CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(30) NOT NULL,
  slug VARCHAR(30) NOT NULL UNIQUE,
  type tag_type NOT NULL,
  description TEXT,
  status tag_status DEFAULT 'predefined',
  created_by UUID REFERENCES auth.users(id),
  approved_by UUID REFERENCES auth.users(id),
  use_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE server_tags (
  server_id UUID NOT NULL REFERENCES servers(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (server_id, tag_id, user_id)
);

CREATE TABLE tag_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  suggested_by UUID NOT NULL REFERENCES auth.users(id),
  name VARCHAR(30) NOT NULL,
  description TEXT,
  type tag_type NOT NULL,
  status VARCHAR(20) DEFAULT 'pending'
    CHECK (status IN ('pending','approved','rejected','merged')),
  merged_into_tag_id UUID REFERENCES tags(id),
  reviewed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tags_type_status ON tags(type, status);
CREATE INDEX idx_server_tags_server ON server_tags(server_id);
CREATE INDEX idx_server_tags_tag ON server_tags(tag_id);

ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE server_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE tag_suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tags_select" ON tags FOR SELECT USING (true);
CREATE POLICY "server_tags_select" ON server_tags FOR SELECT USING (true);
CREATE POLICY "server_tags_insert" ON server_tags FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "tag_suggestions_insert" ON tag_suggestions FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = suggested_by);
CREATE POLICY "tag_suggestions_select_own" ON tag_suggestions FOR SELECT TO authenticated
  USING (auth.uid() = suggested_by);
```

### Migration 5: `create_reviews_tables`

```sql
-- Polymorphic reviews (supabase-postgres: future-proof for hosting reviews)
CREATE TYPE review_type AS ENUM ('quick', 'detailed');
CREATE TYPE review_status AS ENUM ('published', 'flagged', 'removed');

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type VARCHAR(10) NOT NULL DEFAULT 'server'
    CHECK (entity_type IN ('server','host','mod')),
  entity_id UUID NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  review_type review_type NOT NULL DEFAULT 'quick',
  rating_overall DECIMAL(2,1) NOT NULL, -- denormalized avg from review_ratings
  review_text TEXT CHECK (review_text IS NULL OR char_length(review_text) >= 50),
  video_url VARCHAR(255),
  video_platform VARCHAR(20),
  is_creator_review BOOLEAN DEFAULT FALSE,
  is_recommended BOOLEAN,
  play_duration_text VARCHAR(50),
  status review_status DEFAULT 'published',
  helpful_count INTEGER DEFAULT 0,
  funny_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(entity_type, entity_id, user_id)
);

CREATE TABLE review_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vote_type VARCHAR(15) NOT NULL CHECK (vote_type IN ('helpful','not_helpful','funny')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(review_id, user_id)
);

CREATE TABLE review_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reaction VARCHAR(15) NOT NULL CHECK (reaction IN ('helpful','funny','based','insightful')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(review_id, user_id, reaction)
);

CREATE TABLE review_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  parent_comment_id UUID REFERENCES review_comments(id) ON DELETE CASCADE,
  comment_text TEXT NOT NULL CHECK (char_length(comment_text) BETWEEN 1 AND 1000),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE review_saves (
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (review_id, user_id)
);

CREATE TABLE review_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  type VARCHAR(10) NOT NULL CHECK (type IN ('screenshot','video')),
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Flexible dimension ratings (junction table → no schema change to add dimensions)
CREATE TABLE review_ratings (
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  dimension_id UUID NOT NULL REFERENCES tags(id),
  score INTEGER NOT NULL CHECK (score BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (review_id, dimension_id)
);

CREATE INDEX idx_review_ratings_dimension ON review_ratings(dimension_id);
CREATE INDEX idx_review_ratings_review ON review_ratings(review_id);

CREATE TABLE owner_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE UNIQUE,
  owner_id UUID NOT NULL REFERENCES auth.users(id),
  response_text VARCHAR(500) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes (supabase-postgres: schema-composite-indexes + schema-partial-indexes)
CREATE INDEX idx_reviews_entity ON reviews(entity_type, entity_id, created_at DESC)
  WHERE status = 'published';
CREATE INDEX idx_reviews_helpful ON reviews(entity_type, entity_id, helpful_count DESC)
  WHERE status = 'published';
CREATE INDEX idx_reviews_creator ON reviews(entity_type, entity_id, created_at DESC)
  WHERE is_creator_review = true AND status = 'published';
CREATE INDEX idx_reviews_user ON reviews(user_id, created_at DESC);
CREATE INDEX idx_reviews_flagged ON reviews(created_at DESC)
  WHERE status = 'flagged';
CREATE INDEX idx_review_comments_review ON review_comments(review_id, created_at);

-- RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_saves ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE owner_responses ENABLE ROW LEVEL SECURITY;

-- Reviews: public read published, auth insert (1 per entity), auth update own within 24h
CREATE POLICY "reviews_select" ON reviews FOR SELECT USING (status = 'published');
CREATE POLICY "reviews_insert" ON reviews FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "reviews_update" ON reviews FOR UPDATE TO authenticated
  USING (auth.uid() = user_id AND created_at > NOW() - INTERVAL '24 hours')
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "reviews_delete" ON reviews FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Votes/reactions/comments/saves: public read, auth insert own
CREATE POLICY "votes_select" ON review_votes FOR SELECT USING (true);
CREATE POLICY "votes_insert" ON review_votes FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "reactions_select" ON review_reactions FOR SELECT USING (true);
CREATE POLICY "reactions_insert" ON review_reactions FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "comments_select" ON review_comments FOR SELECT USING (true);
CREATE POLICY "comments_insert" ON review_comments FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "saves_select" ON review_saves FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "saves_insert" ON review_saves FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "saves_delete" ON review_saves FOR DELETE TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "review_media_select" ON review_media FOR SELECT USING (true);
CREATE POLICY "review_media_insert" ON review_media FOR INSERT TO authenticated
  WITH CHECK (true);
CREATE POLICY "review_ratings_select" ON review_ratings FOR SELECT USING (true);
CREATE POLICY "review_ratings_insert" ON review_ratings FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM reviews WHERE id = review_id AND user_id = auth.uid())
  );

-- Owner responses: verified owner insert, public read
CREATE POLICY "owner_responses_select" ON owner_responses FOR SELECT USING (true);
CREATE POLICY "owner_responses_insert" ON owner_responses FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM servers s
      JOIN reviews r ON r.entity_id = s.id AND r.entity_type = 'server'
      WHERE r.id = review_id
        AND s.owner_id = auth.uid()
        AND s.verification_status = 'verified'
    )
  );

CREATE TRIGGER reviews_updated_at BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER owner_responses_updated_at BEFORE UPDATE ON owner_responses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER review_comments_updated_at BEFORE UPDATE ON review_comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

### Migration 6: `create_featured_servers_table`

```sql
CREATE TABLE featured_servers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  server_id UUID NOT NULL REFERENCES servers(id) ON DELETE CASCADE,
  featured_date DATE NOT NULL,
  position INTEGER NOT NULL CHECK (position BETWEEN 1 AND 6),
  section VARCHAR(15) NOT NULL CHECK (section IN ('featured','hidden_gem')),
  quality_score_at_feature DECIMAL(5,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(featured_date, position, section)
);

CREATE INDEX idx_featured_date ON featured_servers(featured_date DESC);
CREATE INDEX idx_featured_server ON featured_servers(server_id);

ALTER TABLE featured_servers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "featured_select" ON featured_servers FOR SELECT USING (true);
CREATE POLICY "featured_service" ON featured_servers FOR ALL TO service_role USING (true);
```

### Migration 7: `seed_tags`

```sql
INSERT INTO tags (name, slug, type, status) VALUES
  -- Categories
  ('PvP', 'pvp', 'category', 'predefined'),
  ('Survival', 'survival', 'category', 'predefined'),
  ('Creative', 'creative', 'category', 'predefined'),
  ('Roleplay', 'roleplay', 'category', 'predefined'),
  ('Minigames', 'minigames', 'category', 'predefined'),
  ('Modded', 'modded', 'category', 'predefined'),
  -- Vibes
  ('Chill', 'chill', 'vibe', 'predefined'),
  ('Competitive', 'competitive', 'vibe', 'predefined'),
  ('Noob-Friendly', 'noob-friendly', 'vibe', 'predefined'),
  ('Hardcore', 'hardcore', 'vibe', 'predefined'),
  ('Roleplay-Heavy', 'roleplay-heavy', 'vibe', 'predefined'),
  ('Builder-Focused', 'builder-focused', 'vibe', 'predefined'),
  ('Event-Driven', 'event-driven', 'vibe', 'predefined'),
  ('Toxic-Free', 'toxic-free', 'vibe', 'predefined'),
  ('18+', '18-plus', 'vibe', 'predefined'),
  ('Family-Friendly', 'family-friendly', 'vibe', 'predefined'),
  -- Core review dimensions
  ('Fun', 'fun', 'dimension', 'predefined'),
  ('Community', 'community', 'dimension', 'predefined'),
  ('Stability', 'stability', 'dimension', 'predefined');
```

### Post-migrations
- **Regenerate types:** `supabase gen types typescript --project-id adkjqnhytspczubeqvnc > lib/types/database.types.ts`
- **Create Storage buckets** via Supabase dashboard or MCP: `server-icons`, `server-covers`, `server-screenshots`, `review-media`

---

## Phase 2: Server Listing CRUD + Server Card

### Server Actions (`app/actions/server-actions.ts`)
- `createServer(formData)` — validate, insert, redirect (`server-auth-actions`)
- `claimServer(serverId)` — generate verification code
- `verifyServer(serverId, method)` — console file or DNS TXT
- `updateServer(serverId, formData)` — owner-only

### Pages
| Page | File | Rendering |
|------|------|-----------|
| Server list | `app/[locale]/(main)/servers/page.tsx` | SSR with filters in searchParams |
| Server detail | `app/[locale]/(main)/servers/[slug]/page.tsx` | SSR + Suspense streaming |
| Add server | `app/[locale]/(main)/servers/submit/page.tsx` | Client form |

### Server Card — Composition Pattern (`architecture-avoid-boolean-props`)

**NOT** `<ServerCard variant="compact" />` with boolean modes.
**Instead:** explicit variant components sharing a context provider.

```
components/servers/
  server-card/
    server-card-provider.tsx  -- Context with ServerCardData
    compact-card.tsx          -- <CompactCard /> (grid/search)
    expanded-card.tsx         -- <ExpandedCard /> (featured/gems)
    detail-header.tsx         -- <DetailHeader /> (detail page top)
    card-badge.tsx            -- Shared: Featured/Gem/New badge
    card-rating.tsx           -- Shared: ★4.2 (47)
    card-players.tsx          -- Shared: player count bar
    card-ping.tsx             -- Shared: ping bars (from hero.tsx pattern)
    card-vibe-tags.tsx        -- Shared: vibe tag badges
    card-status.tsx           -- Shared: online/offline dot
```

All card sub-components are **Server Components** using `useTranslations('servers')` directly. Only interactive bits (copy IP button) use donut pattern.

### Other Components
- `components/servers/server-list.tsx` — grid with filters
- `components/servers/server-filters.tsx` — category, region, status, search (client, scoped provider)
- `components/servers/claim-server-modal.tsx` — verification flow (`bundle-dynamic-imports`)
- `components/servers/edit-server-form.tsx` — owner edit

### API Routes
- `app/api/servers/route.ts` — GET list (public, cached 5min)
- `app/api/servers/[slug]/route.ts` — GET detail (public)

### i18n (`next-intl-translations` skill)
- Extend `messages/{en,es}/servers.json` with card, detail, submit, claim keys
- Server card components = Server Components → `useTranslations` directly
- Interactive filters = Client → donut pattern (pass label props)

---

## Phase 3: Review System

### Review Submission — Compound Component (`architecture-compound-components`)
```
components/reviews/
  review-modal.tsx              -- Dynamic import wrapper (bundle-dynamic-imports)
  review-modal-content.tsx      -- Path selector: Quick | Detailed
  quick-rate-form.tsx           -- Core dimension stars + optional vibe tag (~10s)
  detailed-review-form.tsx      -- Core + optional dimensions + text + media + recommend
  dimension-rating.tsx          -- Reusable star input (dynamic from tags WHERE type='dimension')
```

### Review Display — Compound Pattern
```
components/reviews/
  review-card/
    review-card-provider.tsx    -- Context with ReviewData
    review-header.tsx           -- Avatar, username, credibility, date
    review-dimensions.tsx       -- Dynamic from review_ratings join (not hardcoded)
    review-body.tsx             -- Text + media gallery
    review-actions.tsx          -- Vote, react, comment, save (client, donut)
    review-owner-response.tsx   -- Indented owner reply
  review-list.tsx               -- Paginated, sortable (Suspense boundary)
  review-summary.tsx            -- Aggregate rating + recommend %
  review-comments.tsx           -- Threaded comments
```

### Server Actions (`app/actions/review-actions.ts`)
- `submitQuickRate` — auth + Zod validate + insert review + insert review_ratings (core 3) + revalidateTag
- `submitDetailedReview` — auth + Zod validate + insert review + insert review_ratings (core + optional) + revalidateTag
- `voteOnReview`, `reactToReview`, `commentOnReview`, `saveReview` — auth + upsert
- `respondToReview` — owner auth check + insert

### i18n
- New `messages/{en,es}/reviews.json` — all review UI strings
- Update `i18n/request.ts` to import reviews.json
- Review modal page: scoped `NextIntlClientProvider` with `pick(messages, ['reviews'])`

---

## Phase 4: Discovery System

### Cron Routes (`server-after-nonblocking`, `async-parallel`)
| Route | Schedule | Purpose |
|-------|----------|---------|
| `app/api/cron/check-servers/route.ts` | */5 * * * * | TCP status check, insert metrics |
| `app/api/cron/daily-discovery/route.ts` | 0 0 * * * | Quality score calc, featured/gems selection |
| `app/api/cron/partition-metrics/route.ts` | 0 0 1 * * | Create next month's partition |

### Homepage Sections (`server-parallel-fetching`, `async-suspense-boundaries`)
Each section = independent Server Component + Suspense boundary.

```
components/discovery/
  featured-servers.tsx    -- 3 ExpandedCards (React.cache fetch)
  hidden-gems.tsx         -- 4 ExpandedCards
  new-servers.tsx         -- 6 CompactCards
  category-tabs.tsx       -- Client component (scoped provider)
  server-search.tsx       -- Client: debounced 300ms, client-swr-dedup
```

### Quality Score (DB function via migration)
```sql
CREATE OR REPLACE FUNCTION calculate_quality_score(p_server_id UUID) RETURNS DECIMAL AS $$
  -- (Avg Rating × 0.35) + (Review Recency × 0.25) + (Low Feature Count × 0.25) + (Random × 0.15)
$$ LANGUAGE plpgsql;
```

---

## Phase 5: Tags & Moderation

### Components
- `components/tags/vibe-tag-badge.tsx` — visual tag + count
- `components/tags/tag-selector.tsx` — used in review forms (client)
- `components/tags/suggest-tag-form.tsx` — user tag suggestion

### Admin Pages
- `app/[locale]/(admin)/admin/tags/page.tsx` — tag queue (approve/reject/merge)
- `app/[locale]/(admin)/admin/reviews/page.tsx` — review moderation queue
- Update admin sidebar with new nav items

### Rules (enforced in server actions)
- Tag displays on card after **3+ unique users** apply it
- Max 3 vibe tags per card (highest vote count)
- Tag creation requires: account age ≥14d, ≥5 reviews, clean standing

---

## Phase 6: Media System

### Supabase Storage (images — all servers)
- Buckets: `server-icons` (500KB), `server-covers` (2MB), `server-screenshots` (5MB), `review-media` (10MB)
- Created via Supabase dashboard or SQL migration with storage policies

### Storj (video — DEFERRED to later sprint)
- Requires: Storj account setup, encoding pipeline review, CDN integration
- Will be its own sprint with encoding/transcoding decisions

### Components
- `components/media/image-upload.tsx`
- `components/media/media-gallery.tsx` — carousel + lightbox
- `components/media/hover-video.tsx` — Steam-style hover-to-play (deferred with Storj)

---

## Implementation Order

```
Phase 1: Database (Supabase MCP) ──── start here, no deps
  │
  ├─→ Phase 2: Server CRUD + Card ─── needs Phase 1
  │     │
  │     └─→ Phase 6: Media uploads ─── needs Phase 2
  │
  ├─→ Phase 3: Review System ───────── needs Phase 1+2
  │     │
  │     └─→ Phase 5: Tags + Admin ──── needs Phase 3
  │
  └─→ Phase 4: Discovery + Crons ──── needs Phase 1+2+3
```

**Sprint plan:**
1. **Phase 1** — run all 7 migrations via Supabase MCP, regenerate types (zod already installed via pnpm)
2. **Phase 2** — server pages + card components (get cards visible)
3. **Phase 3** — review submission + display (get reviews working)
4. **Phase 4** — discovery sections + cron jobs
5. **Phase 5** — tags + admin moderation
6. **Phase 6** — media uploads (Storj deferred)

---

## Resolved Questions

1. **Sprint order** — Phase 1→2→3→4→5→6 ✅
2. **Review dimensions** — Update `prd-review-system.md` to match design doc's 3 core dimensions (Fun/Community/Stability) + flexible junction table. Old PRD superseded. ✅
3. **Storj** — Deferred to later sprint. Needs encoding pipeline review. Phase 6 covers image uploads only. ✅
4. **Hosting reviews** — Update `prd-hosting-reviews.md` — polymorphic `reviews` table handles this. Old PRD superseded. ✅

### PRD Cleanup (during Phase 1)
- Update `tasks/prd-review-system.md` — mark as superseded by `docs/server-card-design.md`
- Update `tasks/prd-hosting-reviews.md` — mark as superseded, polymorphic `reviews` table replaces `hosting_reviews`

---

## Changelog

- **v2**: Replaced hardcoded `rating_fun/community/stability` columns with `review_ratings` junction table (dimensions are tags, adding new ones = INSERT, no migration). Removed `private_feedback` tables (Migration 6 deleted, 8→7 migrations). Added Zod for schema validation. Documented why react-hook-form, zustand, and conform.js are NOT needed (React 19 `useActionState` covers forms natively).
- **v3**: Integrated Zod skill rules (10 rules: coercion, safeParse, flatten, i18n error map, z.infer, partial for updates, enums, shared schemas, cache schemas). Resolved all 4 open questions. Deferred Storj + video encoding to later sprint. PRDs `prd-review-system.md` and `prd-hosting-reviews.md` marked as superseded. Added `lib/validations/` file structure and `messages/{en,es}/validation.json` for Zod i18n. Package manager: pnpm.
