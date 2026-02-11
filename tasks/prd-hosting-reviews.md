# PRD: Hytale Server Hosting Reviews

> **⛔ SUPERSEDED** — This PRD is superseded by the polymorphic `reviews` table in `docs/server-card-design.md` and `docs/plans/server-card-engineering-plan.md`. The `reviews.entity_type` column supports `'host'` entities natively — no separate `hosting_reviews` table needed. Do not implement from this PRD.

## Introduction

The Hosting Reviews System helps players compare and evaluate Hytale server hosting providers. This addresses a validated pain point: a 48-comment Reddit thread "Best hytale server host?" showed players are confused about hosting options and actively seeking guidance.

**Problem:** Players don't know which hosting provider to choose. Reddit comments mention Oracle Free Tier, GPORTAL, Ghostcap, Game Host Bros, DatHost, Pine Hosting, and Wasabi Hosting - but there's no centralized comparison with real user reviews.

**Solution:** A dedicated hosting provider directory with user reviews, pricing info, feature comparison, and aggregated ratings from servers using each host.

---

## Goals

- Create a centralized hosting provider comparison page
- Enable users to review hosting providers they've used
- Display aggregated server performance data per host
- Show pricing tiers and feature matrices
- Help players make informed hosting decisions
- Achieve 50+ hosting reviews within Month 2

---

## User Stories

### US-001: Hosting Provider Directory
**Description:** As a player looking to host a server, I want to browse hosting providers so I can compare options.

**Acceptance Criteria:**
- [ ] `/hosting` page lists all hosting providers
- [ ] Each provider card shows: name, logo, avg rating, review count, price range
- [ ] Sort options: Rating, Price (low-high), Most Reviewed, Alphabetical
- [ ] Filter by: Region (NA, EU, Asia), Price tier (Free, Budget, Premium)
- [ ] "Add Provider" button for suggesting new hosts
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

---

### US-002: Hosting Provider Detail Page
**Description:** As a player, I want to view detailed info about a hosting provider so I can evaluate if it fits my needs.

**Acceptance Criteria:**
- [ ] Page shows: name, logo, description, website link, pricing tiers
- [ ] Feature matrix: RAM options, CPU, storage, DDoS protection, mod support, control panel
- [ ] Regions available (NA, EU, Asia, etc.)
- [ ] Aggregated stats from hytale.gg servers using this host
- [ ] User reviews section with ratings
- [ ] "Servers using this host" section (links to server listings)
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

---

### US-003: Submit Hosting Review
**Description:** As a server owner, I want to review a hosting provider I've used so I can help others decide.

**Acceptance Criteria:**
- [ ] "Write Review" button on provider detail page
- [ ] User must be authenticated
- [ ] Form requires: overall rating (1-5), review text (50-1000 chars)
- [ ] Form requires 4 dimension ratings: Performance, Support, Value, Ease of Use
- [ ] Optional: price paid, plan name, duration of use
- [ ] User can only review each provider once
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

---

### US-004: Hosting Rating Dimensions
**Description:** As a platform, I want structured hosting ratings so comparisons are meaningful.

**Acceptance Criteria:**
- [ ] 4 rating dimensions with tooltips:
  - **Performance (30%):** Server stability, uptime, lag, RAM allocation
  - **Support (25%):** Response time, helpfulness, availability
  - **Value (25%):** Price vs features, hidden fees, refund policy
  - **Ease of Use (20%):** Control panel, setup process, documentation
- [ ] Overall rating = weighted average
- [ ] Dimension breakdown shown on provider page
- [ ] Typecheck/lint passes

---

### US-005: Hosting Comparison Table
**Description:** As a player, I want to compare multiple hosts side-by-side so I can make a decision.

**Acceptance Criteria:**
- [ ] "Compare" checkbox on provider cards (max 4)
- [ ] "Compare Selected" button opens comparison modal/page
- [ ] Comparison table shows: price, RAM, features, ratings per dimension
- [ ] Highlight best value in each row (green)
- [ ] "Clear comparison" button
- [ ] Shareable URL for comparison
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

---

### US-006: Aggregate Server Data per Host
**Description:** As a platform, I want to show real performance data from servers using each host.

**Acceptance Criteria:**
- [ ] Query servers by `hosting_provider` field
- [ ] Calculate: avg uptime %, avg latency, server count
- [ ] Display on provider page: "X servers on hytale.gg use this host"
- [ ] Show: "Average uptime: 99.2%" based on server_metrics
- [ ] Data updates daily via cron
- [ ] Typecheck/lint passes

---

### US-007: Suggest New Hosting Provider
**Description:** As a user, I want to suggest a hosting provider that isn't listed yet.

**Acceptance Criteria:**
- [ ] "Suggest Provider" button on hosting directory
- [ ] Form: provider name, website URL, description, your experience
- [ ] Submission goes to admin review queue
- [ ] Admin can approve/reject with notes
- [ ] Approved providers added to directory
- [ ] Suggester notified of decision
- [ ] Typecheck/lint passes

---

### US-008: Hosting Guide Content
**Description:** As a new player, I want educational content about hosting so I understand my options.

**Acceptance Criteria:**
- [ ] "Hosting Guide" section/page linked from directory
- [ ] Content covers: Self-hosted vs managed, RAM requirements, regions, mod support
- [ ] FAQ section with common questions
- [ ] "Getting Started" checklist for first-time hosts
- [ ] Links to provider pages where relevant
- [ ] Mobile-readable formatting
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

---

## Functional Requirements

- **FR-1:** Hosting providers stored in `hosting_providers` table
- **FR-2:** Provider logos stored in Supabase Storage bucket
- **FR-3:** Users can submit 1 review per hosting provider
- **FR-4:** Review text must be 50-1000 characters
- **FR-5:** All 4 dimension ratings required (1-5 stars)
- **FR-6:** Overall rating = (Performance × 0.30) + (Support × 0.25) + (Value × 0.25) + (Ease × 0.20)
- **FR-7:** Comparison limited to 4 providers maximum
- **FR-8:** Aggregate stats calculated from servers with matching `hosting_provider`
- **FR-9:** New provider suggestions require admin approval
- **FR-10:** Provider directory sorted by rating by default

---

## Non-Goals (Out of Scope)

- **Affiliate links/revenue** - Phase 2 consideration
- **Price scraping automation** - Manual entry only
- **Direct booking/signup** - Link to provider sites only
- **Server migration assistance** - Content only, no tooling
- **Hosting provider partnerships** - Phase 2

---

## Technical Considerations

### Database Schema

```sql
-- hosting_providers table
CREATE TABLE hosting_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  website_url VARCHAR(255),
  logo_url VARCHAR(255),
  regions TEXT[],  -- ['NA', 'EU', 'Asia']
  price_range VARCHAR(50),  -- 'Free', '$5-15/mo', '$20-50/mo'
  features JSONB,  -- {ddos_protection: true, mod_support: true, ...}
  pricing_tiers JSONB,  -- [{name: 'Basic', ram: '4GB', price: '$10/mo'}, ...]
  status VARCHAR(20) DEFAULT 'active',  -- active, pending, inactive
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- hosting_reviews table
CREATE TABLE hosting_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES hosting_providers(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  overall_rating DECIMAL(2,1) NOT NULL,
  performance_rating INTEGER NOT NULL CHECK (performance_rating BETWEEN 1 AND 5),
  support_rating INTEGER NOT NULL CHECK (support_rating BETWEEN 1 AND 5),
  value_rating INTEGER NOT NULL CHECK (value_rating BETWEEN 1 AND 5),
  ease_rating INTEGER NOT NULL CHECK (ease_rating BETWEEN 1 AND 5),
  review_text TEXT NOT NULL CHECK (char_length(review_text) BETWEEN 50 AND 1000),
  plan_name VARCHAR(100),
  price_paid VARCHAR(50),
  duration_months INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(provider_id, user_id)
);

-- hosting_suggestions table (admin queue)
CREATE TABLE hosting_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  suggested_by UUID REFERENCES auth.users(id),
  provider_name VARCHAR(100) NOT NULL,
  website_url VARCHAR(255),
  description TEXT,
  experience TEXT,
  status VARCHAR(20) DEFAULT 'pending',  -- pending, approved, rejected
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes (Supabase best practices)
-- Composite index for provider reviews page
CREATE INDEX idx_hosting_reviews_provider_created ON hosting_reviews(provider_id, created_at DESC);

-- Composite index for "Top Rated" sort
CREATE INDEX idx_hosting_reviews_provider_rating ON hosting_reviews(provider_id, overall_rating DESC);

-- Partial index for active providers
CREATE INDEX idx_hosting_providers_active ON hosting_providers(name, slug) WHERE status = 'active';

-- Index for provider search
CREATE INDEX idx_hosting_providers_search ON hosting_providers USING GIN (to_tsvector('english', name || ' ' || description));
```

### Row-Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE hosting_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE hosting_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE hosting_suggestions ENABLE ROW LEVEL SECURITY;

-- Public read for active providers
CREATE POLICY "Active providers are viewable"
  ON hosting_providers FOR SELECT
  USING (status = 'active');

-- Public read for published reviews
CREATE POLICY "Reviews are viewable by everyone"
  ON hosting_reviews FOR SELECT
  USING (true);

-- Users can create reviews (1 per provider)
CREATE POLICY "Authenticated users can review providers"
  ON hosting_reviews FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
    NOT EXISTS (
      SELECT 1 FROM hosting_reviews 
      WHERE provider_id = NEW.provider_id AND user_id = auth.uid()
    )
  );

-- Users can edit their own reviews
CREATE POLICY "Users can update own reviews"
  ON hosting_reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Suggestions policies
CREATE POLICY "Users can suggest providers"
  ON hosting_suggestions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = suggested_by);

CREATE POLICY "Users can view their suggestions"
  ON hosting_suggestions FOR SELECT
  TO authenticated
  USING (auth.uid() = suggested_by);

-- Admins manage providers (service_role)
CREATE POLICY "Admins can manage providers"
  ON hosting_providers FOR ALL
  TO service_role
  USING (true);
```

### Seed Data (from Apify Research)

```sql
INSERT INTO hosting_providers (name, slug, regions, price_range) VALUES
  ('Oracle Free Tier', 'oracle-free-tier', ARRAY['NA', 'EU', 'Asia'], 'Free'),
  ('GPORTAL', 'gportal', ARRAY['NA', 'EU'], '$10-30/mo'),
  ('Ghostcap', 'ghostcap', ARRAY['NA', 'EU'], '$5-20/mo'),
  ('Game Host Bros', 'game-host-bros', ARRAY['NA', 'EU', 'OCE'], '$5-15/mo'),
  ('DatHost', 'dathost', ARRAY['NA', 'EU'], '$10-25/mo'),
  ('Pine Hosting', 'pine-hosting', ARRAY['NA', 'EU'], '$5-20/mo'),
  ('Wasabi Hosting', 'wasabi-hosting', ARRAY['EU'], '$5-15/mo'),
  ('Self-Hosted', 'self-hosted', ARRAY['Any'], 'Varies');
```

### React Components (Vercel Best Practices)

```typescript
// app/hosting/page.tsx - Server Component with filters
import { Suspense } from 'react';
import { ProviderGrid } from '@/components/hosting/provider-grid';
import { createClient } from '@/lib/supabase/server';
import { cache } from 'react';

// Vercel best practice: server-cache-react
const getHostingProviders = cache(async (filters: Filters) => {
  const supabase = createClient();
  
  let query = supabase
    .from('hosting_providers')
    .select('id, name, slug, logo_url, price_range, regions')
    .eq('status', 'active')
    .order('name');
  
  // Apply filters using composite indexes
  if (filters.region) {
    query = query.contains('regions', [filters.region]);
  }
  
  const { data } = await query;
  return data ?? [];
});

export default async function HostingPage({ searchParams }: Props) {
  const filters = { region: searchParams.region };
  
  return (
    <main>
      <h1>Hytale Server Hosting</h1>
      <Suspense fallback={<GridSkeleton />}>
        <ProviderGrid filters={filters} />
      </Suspense>
    </main>
  );
}

// components/hosting/provider-grid.tsx
export async function ProviderGrid({ filters }: { filters: Filters }) {
  const providers = await getHostingProviders(filters);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {providers.map(provider => (
        <ProviderCard key={provider.id} provider={provider} />
      ))}
    </div>
  );
}

// components/hosting/review-form.tsx
'use client';
import { useTransition } from 'react';
import { submitHostingReview } from '@/app/actions/hosting-actions';

// Vercel best practice: rerender-use-transition-loading
export function HostingReviewForm({ providerId }: Props) {
  const [isPending, startTransition] = useTransition();
  
  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await submitHostingReview(formData);
    });
  }
  
  return (
    <form action={handleSubmit}>
      {/* 4-dimension ratings */}
      <button disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
```

### API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/hosting` | List providers with filters | Public |
| GET | `/api/hosting/:slug` | Provider details | Public |
| GET | `/api/hosting/:slug/reviews` | Provider reviews | Public |
| POST | `/api/hosting/:slug/reviews` | Submit review | Required |
| GET | `/api/hosting/:slug/stats` | Aggregated server stats | Public |
| POST | `/api/hosting/suggest` | Suggest new provider | Required |
| GET | `/api/hosting/compare?ids=` | Comparison data | Public |

---

## Success Metrics

| Metric | Target | Timeframe |
|--------|--------|-----------|
| Hosting providers listed | 10+ | Launch |
| Hosting reviews | 50+ | Month 2 |
| Hosting page visits | 500+ | Month 1 |
| Comparison tool usage | 20% of visitors | Month 2 |
| Guide page reads | 200+ | Month 1 |

---

## Content: Hosting Guide Outline

### 1. Introduction
- Why hosting matters for Hytale
- Self-hosted vs managed comparison

### 2. What to Consider
- **RAM:** 4GB minimum, 8GB+ for mods, scales with players
- **CPU:** Single-thread performance matters
- **Location:** Choose region closest to players
- **DDoS Protection:** Essential for public servers
- **Mod Support:** FTP access, custom JAR support

### 3. Hosting Tiers
- **Free:** Oracle Free Tier (complex setup)
- **Budget ($5-15/mo):** Ghostcap, Pine, Game Host Bros
- **Premium ($20+/mo):** GPORTAL, dedicated options

### 4. FAQ
- "How much RAM do I need?"
- "Can I switch hosts later?"
- "What about DDoS attacks?"

---

## Open Questions

1. Should we allow hosting providers to claim/verify their listing?
2. Do we want affiliate partnerships (revenue opportunity)?
3. Should reviews require proof of purchase?
4. How do we handle outdated pricing information?
