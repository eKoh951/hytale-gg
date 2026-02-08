# PRD: Discovery System

## Introduction

The Discovery System enables players to find servers that match their preferences through rotating featured sections, category browsing, and search. Unlike traditional "Top 100" voting systems that create winner-takes-all dynamics, this system uses quality-based scoring and time-based rotation to ensure variety and fair exposure for all servers.

**Problem:** Players complain "Same servers always on top" and "Directories lied about player counts half the time." Traditional vote-based rankings favor established servers and can be gamed.

**Solution:** Rotating discovery sections ("Featured Today", "Best This Week", "Hidden Gems") powered by a quality score algorithm that rewards reviews, freshness, and engagement over raw vote counts.

---

## Goals

- Surface quality servers through rotation, not permanent rankings
- Enable category-based browsing (PvP, Survival, Creative, etc.)
- Provide fast, relevant search with filters
- Automate "Featured Today" selection without manual curation
- Prevent gaming through anti-manipulation measures
- Show personalized "Similar Servers" on detail pages

---

## User Stories

### US-001: Homepage Discovery Sections
**Description:** As a player, I want to see curated server sections so I can discover servers without endless browsing.

**Acceptance Criteria:**
- [ ] Homepage displays 4 sections: Featured Today (3), New Servers (6), By Category (tabs), Quick Search
- [ ] Featured Today shows 3 servers with cards (image, name, category, rating, status)
- [ ] New Servers shows servers added in last 7 days, sorted by rating
- [ ] Each section has "See All" link
- [ ] Sections load within 500ms
- [ ] Responsive grid layout on mobile (1 column) and desktop (3 columns)
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

---

### US-002: Category Browsing
**Description:** As a player, I want to browse servers by category so I can find my preferred game mode.

**Acceptance Criteria:**
- [ ] Category tabs: All, PvP, Survival, Creative, Roleplay, Minigames, Modded
- [ ] Clicking tab filters server list instantly (client-side if <100 servers)
- [ ] URL updates with category param (e.g., `/servers?category=pvp`)
- [ ] Category persists on page reload
- [ ] Server count shown per category in tab
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

---

### US-003: Server Search
**Description:** As a player, I want to search for servers by name or keywords so I can find specific servers.

**Acceptance Criteria:**
- [ ] Search input in header and on server list page
- [ ] Search queries name, description, and tags fields
- [ ] Results appear as user types (debounced 300ms)
- [ ] Minimum 2 characters to trigger search
- [ ] "No results" message with suggestions if empty
- [ ] Search term highlighted in results
- [ ] URL updates with search param (e.g., `/servers?q=survival`)
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

---

### US-004: Advanced Filters
**Description:** As a player, I want to filter servers by region and status so I can find servers with good connection.

**Acceptance Criteria:**
- [ ] Filter panel with: Region (multi-select), Status (Online only toggle), Category (multi-select)
- [ ] Filters combine with AND logic
- [ ] Filter state persists in URL params
- [ ] "Clear filters" button resets all
- [ ] Filter count badge shows active filter count
- [ ] Mobile: filters in collapsible drawer
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

---

### US-005: Featured Today (Automated)
**Description:** As a platform, I want to automatically select featured servers daily so discovery stays fresh without manual work.

**Acceptance Criteria:**
- [ ] Cron job runs daily at 00:00 UTC
- [ ] Selects top 3 servers by Quality Score (see formula below)
- [ ] Eligible servers: 1+ review, online in last 24h, not featured in last 7 days, rating >= 3.5
- [ ] Stores selection in `featured_servers` table with date
- [ ] Homepage reads from `featured_servers` for current day
- [ ] Fallback to previous day if no eligible servers
- [ ] Typecheck/lint passes

---

### US-006: Quality Score Algorithm
**Description:** As a platform, I need a fair ranking algorithm so servers are sorted by quality, not manipulation.

**Acceptance Criteria:**
- [ ] Quality Score = (Avg Rating × 0.35) + (Review Recency × 0.25) + (Low Feature Count × 0.25) + (Random × 0.15)
- [ ] Avg Rating: normalized 0-100 from 1-5 stars
- [ ] Review Recency: newer reviews score higher, decays over 30 days
- [ ] Low Feature Count: servers featured less often get boost
- [ ] Random Factor: 0-15 points to prevent predictability
- [ ] Score recalculated nightly
- [ ] Score stored in `servers.quality_score` column
- [ ] Typecheck/lint passes

---

### US-007: Similar Servers
**Description:** As a player, I want to see similar servers on a server detail page so I can find alternatives.

**Acceptance Criteria:**
- [ ] "Similar Servers" section shows 4 servers on detail page
- [ ] Matching logic: same category, same region, rating within ±1 star
- [ ] Excludes current server from results
- [ ] If <4 matches, relax region constraint
- [ ] Cards show: name, category, rating, status badge
- [ ] Clicking card navigates to that server's detail page
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

---

### US-008: Hidden Gems
**Description:** As a player, I want to discover underrated servers so I can find great communities that aren't on every top list.

**Acceptance Criteria:**
- [ ] "Hidden Gems" section on homepage shows 4 servers
- [ ] Eligible servers: rating >= 3.5, fewer than 20 reviews, never been in Featured Today, online in last 24h
- [ ] Sorted by Quality Score (same algorithm as Featured, but inverted feature-count weight — less exposure = higher boost)
- [ ] Refreshes daily alongside Featured Today cron
- [ ] "Hidden Gem" badge displayed on qualifying server cards
- [ ] Section title: "Hidden Gems — Great servers you haven't heard of"
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

> **Rationale**: Competitive analysis shows NO competitor has a Hidden Gems section. This is a stated differentiator in `server-directory-competitive-analysis-feb-2026.md`. Directly addresses the "same servers always at the top" frustration (survey Q6). Gives new/small servers a path to visibility without gaming votes.

---

### US-009: Best This Week (Phase 2)
**Description:** As a player, I want to see the best servers from the past week so I can find trending quality servers.

**Acceptance Criteria:**
- [ ] Section shows top 10 servers by Quality Score in last 7 days
- [ ] Minimum 3 reviews in the week to qualify
- [ ] Resets every Monday at 00:00 UTC
- [ ] Server can't win two weeks in a row (anti-repeat rule)
- [ ] Badge "Best This Week" shown on winning servers
- [ ] Archive previous weeks for history page
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

---

## Functional Requirements

- **FR-1:** Homepage must load discovery sections within 500ms on 4G
- **FR-2:** Category filter must be instant (client-side) for <100 servers
- **FR-3:** Search must debounce with 300ms delay
- **FR-4:** Search minimum query length is 2 characters
- **FR-5:** All filter state must persist in URL query params
- **FR-6:** Featured Today selection runs daily at 00:00 UTC via cron
- **FR-7:** Featured servers must have been online in last 24 hours
- **FR-8:** Featured servers cannot repeat within 7 days
- **FR-9:** Quality Score includes 15% random factor to prevent gaming
- **FR-10:** Similar Servers matches by category first, then region, then rating
- **FR-11:** Search results highlight matching terms in name/description

---

## Non-Goals (Out of Scope)

- **AI/ML Recommendations** - Phase 3, requires user data
- **Collaborative Filtering** - Phase 3, requires 1000+ users
- **"Trending" based on player count** - Requires Hytale server API
- **Personalized "For You" section** - Phase 3
- **Real-time player count in listings** - Protocol limitations

---

## Technical Considerations

### Database Additions

```sql
-- Add to servers table
ALTER TABLE servers ADD COLUMN quality_score DECIMAL(5,2) DEFAULT 0;
ALTER TABLE servers ADD COLUMN last_featured_at TIMESTAMPTZ;

-- Composite index for discovery queries (Supabase best practice: schema-composite-indexes)
CREATE INDEX idx_servers_quality_featured ON servers(quality_score DESC, last_featured_at NULLS FIRST) 
  WHERE verification_status = 'verified';

-- Partial index for "New Servers" section
CREATE INDEX idx_servers_new ON servers(created_at DESC, quality_score DESC) 
  WHERE created_at > NOW() - INTERVAL '7 days' AND verification_status = 'verified';

-- Featured servers history
CREATE TABLE featured_servers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  server_id UUID REFERENCES servers(id) ON DELETE CASCADE,
  featured_date DATE NOT NULL,
  position INTEGER NOT NULL CHECK (position BETWEEN 1 AND 3),
  quality_score_at_feature DECIMAL(5,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(featured_date, position)
);

CREATE INDEX idx_featured_date ON featured_servers(featured_date DESC);
CREATE INDEX idx_featured_server_id ON featured_servers(server_id);
```

### API Endpoints (Next.js Route Handlers)

```typescript
// app/api/servers/route.ts
import { createClient } from '@/lib/supabase/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const searchParams = request.nextUrl.searchParams;
  
  // Parse filters
  const category = searchParams.get('category');
  const region = searchParams.get('region');
  const query = searchParams.get('q');
  const status = searchParams.get('status');
  
  // Build query (Supabase best practice: query-missing-indexes)
  let dbQuery = supabase
    .from('servers')
    .select('id, name, description, category, region, discord_url, quality_score, created_at')
    .eq('verification_status', 'verified')
    .order('quality_score', { ascending: false })
    .limit(50);
  
  // Apply filters (uses composite index)
  if (category) dbQuery = dbQuery.eq('category', category);
  if (region) dbQuery = dbQuery.eq('region', region);
  if (status === 'online') {
    // Join with latest metrics for online status
    dbQuery = dbQuery.eq('current_status', 'online');
  }
  
  // Full-text search (uses GIN index)
  if (query && query.length >= 2) {
    dbQuery = dbQuery.textSearch('name', query, { type: 'websearch' });
  }
  
  const { data, error } = await dbQuery;
  
  return Response.json({ servers: data ?? [], error });
}
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/servers?category=&region=&q=&status=` | Filtered server list |
| GET | `/api/discovery/featured` | Today's featured servers |
| GET | `/api/discovery/new` | Servers from last 7 days |
| GET | `/api/servers/:id/similar` | Similar servers |

### React Components (Vercel Best Practices)

```typescript
// app/page.tsx - Server Component with parallel data fetching
import { Suspense } from 'react';
import { FeaturedServers } from '@/components/discovery/featured-servers';
import { NewServers } from '@/components/discovery/new-servers';
import { CategoryTabs } from '@/components/discovery/category-tabs';

// Vercel best practice: server-parallel-fetching
// Each component fetches its own data in parallel
export default function HomePage() {
  return (
    <main>
      <Suspense fallback={<FeaturedSkeleton />}>
        <FeaturedServers />
      </Suspense>
      
      <Suspense fallback={<NewServersSkeleton />}>
        <NewServers />
      </Suspense>
      
      <CategoryTabs />
    </main>
  );
}

// components/discovery/featured-servers.tsx
import { createClient } from '@/lib/supabase/server';
import { cache } from 'react';

// Vercel best practice: server-cache-react (dedupe per-request)
const getFeaturedServers = cache(async () => {
  const supabase = createClient();
  const today = new Date().toISOString().split('T')[0];
  
  const { data } = await supabase
    .from('featured_servers')
    .select('server_id, servers(name, category, quality_score)')
    .eq('featured_date', today)
    .order('position');
  
  return data ?? [];
});

export async function FeaturedServers() {
  const servers = await getFeaturedServers();
  
  return (
    <section>
      <h2>Featured Today</h2>
      {servers.map(({ server_id, servers: server }) => (
        <ServerCard key={server_id} server={server} />
      ))}
    </section>
  );
}
```

### Caching Strategy (Next.js 15+ unstable_cache)

| Data | Cache TTL | Revalidation Strategy |
|------|-----------|----------------------|
| Server list | 5 min | `revalidate: 300` (ISR) |
| Featured Today | 24 hours | `revalidate: 86400`, tag: 'featured' |
| Search results | On-demand | Client-side SWR with `revalidate: 600` |
| Similar servers | 1 hour | `revalidate: 3600`, tag: `server:${id}` |

```typescript
// Vercel best practice: server-cache-lru for cross-request caching
import { unstable_cache } from 'next/cache';

export const getCachedFeaturedServers = unstable_cache(
  async () => getFeaturedServers(),
  ['featured-servers'],
  { revalidate: 86400, tags: ['featured'] }
);
```

---

## Success Metrics

| Metric | Target | Timeframe |
|--------|--------|-----------|
| Homepage load time | <500ms | Ongoing |
| Search usage rate | 30%+ of sessions | Month 1 |
| Category filter usage | 50%+ of sessions | Month 1 |
| Featured click-through | 10%+ | Month 1 |
| Unique servers in Featured | 20+ | Month 1 |

---

## Open Questions

1. Should we show "Rising Stars" (biggest rating improvement) in MVP or Phase 2?
2. How do we handle servers with no reviews in discovery?
3. Should search include server owner name?
4. Do we need saved searches for users?
