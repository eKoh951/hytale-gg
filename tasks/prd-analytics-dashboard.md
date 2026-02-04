# PRD: Analytics Dashboard

## Introduction

The Analytics Dashboard provides server owners with insights into their listing performance, player engagement, and review sentiment. A free tier offers basic metrics to all verified owners, while a premium SaaS tier (Phase 2) adds advanced features like competitor comparison, sentiment analysis, and retention curves.

**Problem:** Server owners have no visibility into how players find and evaluate their servers. They can't measure the impact of their improvements or compare against competitors.

**Solution:** A tiered analytics dashboard starting with free basics (views, clicks, rating trends) and expanding to premium features (sentiment analysis, competitor benchmarks, keyword tracking).

---

## Goals

- Provide verified owners with basic performance metrics (free)
- Show traffic sources and engagement patterns
- Display review analytics (count, rating trends, dimension breakdown)
- Enable data export for owner's own analysis
- Prepare foundation for premium SaaS tier (Phase 2)

---

## User Stories

### US-001: Access Analytics Dashboard
**Description:** As a verified server owner, I want to access an analytics dashboard so I can understand my server's performance.

**Acceptance Criteria:**
- [ ] "Analytics" tab visible on server detail page (owner only)
- [ ] Dashboard requires verified owner status
- [ ] Unverified owners see prompt to verify
- [ ] Dashboard loads within 1 second
- [ ] Mobile-responsive layout
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

---

### US-002: View Page Analytics
**Description:** As a server owner, I want to see how many people view my listing so I can gauge visibility.

**Acceptance Criteria:**
- [ ] Card shows: Total Views (all time), Views (last 7 days), Views (last 30 days)
- [ ] Line chart: daily views over last 30 days
- [ ] Unique visitors vs total views breakdown
- [ ] Data updates every hour
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

---

### US-003: View Click-Through Metrics
**Description:** As a server owner, I want to see how many people click my links so I can measure engagement.

**Acceptance Criteria:**
- [ ] Card shows: Discord clicks, Website clicks, Copy IP clicks
- [ ] Click-through rate (CTR) = clicks / views × 100
- [ ] Trend indicator: ↑ or ↓ compared to previous period
- [ ] Bar chart: clicks by type over last 30 days
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

---

### US-004: View Review Analytics
**Description:** As a server owner, I want to see review statistics so I can understand player sentiment.

**Acceptance Criteria:**
- [ ] Card shows: Total reviews, Average rating, Rating this month
- [ ] Dimension breakdown: avg rating per dimension (Community, Performance, Content, Fairness)
- [ ] Rating distribution histogram (1-5 stars)
- [ ] Recent reviews list (last 5) with quick links
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

---

### US-005: View Uptime History
**Description:** As a server owner, I want to see my server's uptime history so I can identify stability issues.

**Acceptance Criteria:**
- [ ] Uptime percentage: last 24h, 7d, 30d
- [ ] Calendar heatmap: green (online) / red (offline) by hour for last 30 days
- [ ] Downtime events list: timestamp, duration
- [ ] Current status indicator with last check time
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

---

### US-006: View Traffic Sources
**Description:** As a server owner, I want to see where my visitors come from so I can optimize marketing.

**Acceptance Criteria:**
- [ ] Pie chart: Direct, Search, Category Browse, Featured, Similar Servers, External
- [ ] Table: source, visits, percentage, trend
- [ ] "External" expands to show referrer domains
- [ ] Data from last 30 days
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

---

### US-007: Export Data
**Description:** As a server owner, I want to export my analytics so I can do my own analysis.

**Acceptance Criteria:**
- [ ] "Export" button in dashboard header
- [ ] Export formats: CSV, JSON
- [ ] Includes: daily views, clicks, reviews, uptime
- [ ] Date range selector (last 7d, 30d, 90d, all time)
- [ ] Download triggers immediately
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

---

### US-008: Premium Tier Upsell (Phase 2 Prep)
**Description:** As a platform, I want to show premium features to free users so they consider upgrading.

**Acceptance Criteria:**
- [ ] "Premium" badge on locked features
- [ ] Locked features show blurred preview
- [ ] Hover shows "Upgrade to unlock"
- [ ] Premium features: Sentiment Analysis, Competitor Comparison, Keyword Tracking
- [ ] "Upgrade" button links to pricing page (placeholder for Phase 2)
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

---

## Functional Requirements

- **FR-1:** Analytics dashboard accessible only to verified server owners
- **FR-2:** Page view tracking via server-side logging (not client analytics)
- **FR-3:** Click tracking for: Discord, Website, Copy IP buttons
- **FR-4:** Views data aggregated hourly, stored for 90 days
- **FR-5:** Click data aggregated daily, stored for 90 days
- **FR-6:** Uptime data derived from existing server_metrics table
- **FR-7:** Traffic source tracked via `source` query param and referrer
- **FR-8:** Export limited to last 90 days of data
- **FR-9:** Dashboard data cached for 1 hour to reduce DB load

---

## Non-Goals (Out of Scope - Phase 2 Premium)

- **Sentiment Analysis** - Analyze review text for themes
- **Competitor Comparison** - "Better than 80% of survival servers"
- **Keyword Tracking** - What searches lead to your server
- **Retention Curves** - D1, D7, D30 player retention
- **Peak Time Predictions** - When your server is busiest
- **Discord Analytics** - Members, activity integration
- **Custom Alerts** - "Rating dropped below 4.0"

---

## Technical Considerations

### Database Schema

```sql
-- page_views table (partitioned by month for efficient time-series)
CREATE TABLE page_views (
  id UUID DEFAULT gen_random_uuid(),
  server_id UUID NOT NULL REFERENCES servers(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  hour INTEGER NOT NULL CHECK (hour BETWEEN 0 AND 23),
  view_count INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  source VARCHAR(50),  -- direct, search, category, featured, similar, external
  referrer_domain VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id, date),
  UNIQUE(server_id, date, hour, source, created_at)
) PARTITION BY RANGE (date);

-- Create partitions (managed by cron)
CREATE TABLE page_views_2026_02 PARTITION OF page_views
  FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');

-- click_events table (aggregated daily)
CREATE TABLE click_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  server_id UUID REFERENCES servers(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  click_type VARCHAR(20) NOT NULL,  -- discord, website, copy_ip
  click_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(server_id, date, click_type)
);

-- Indexes (Supabase best practices: composite indexes for analytics queries)
CREATE INDEX idx_page_views_server_date ON page_views(server_id, date DESC);
CREATE INDEX idx_page_views_source ON page_views(server_id, source, date DESC);
CREATE INDEX idx_click_events_server_date ON click_events(server_id, date DESC);
CREATE INDEX idx_click_events_type ON click_events(server_id, click_type, date DESC);

-- Materialized view for daily aggregates (Supabase best practice: data-materialized-views)
CREATE MATERIALIZED VIEW daily_analytics AS
SELECT 
  server_id,
  date,
  SUM(view_count) as total_views,
  SUM(unique_visitors) as total_visitors,
  COUNT(DISTINCT source) as source_count
FROM page_views
GROUP BY server_id, date;

CREATE UNIQUE INDEX idx_daily_analytics_server_date ON daily_analytics(server_id, date DESC);

-- Refresh materialized view daily
-- Cron job: REFRESH MATERIALIZED VIEW CONCURRENTLY daily_analytics;

-- Data retention: drop old partitions
-- Cron job: DROP TABLE IF EXISTS page_views_2025_11 CASCADE;
```

### Row-Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;

-- Only verified owners can view their analytics
CREATE POLICY "Owners can view their analytics"
  ON page_views FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM servers
      WHERE servers.id = page_views.server_id
        AND servers.owner_id = auth.uid()
        AND servers.verification_status = 'verified'
    )
  );

CREATE POLICY "Owners can view their clicks"
  ON click_events FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM servers
      WHERE servers.id = click_events.server_id
        AND servers.owner_id = auth.uid()
        AND servers.verification_status = 'verified'
    )
  );

-- System can insert tracking data
CREATE POLICY "System can insert tracking"
  ON page_views FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "System can insert clicks"
  ON click_events FOR INSERT
  TO service_role
  WITH CHECK (true);
```

### Tracking Implementation

```typescript
// app/servers/[id]/page.tsx - Track page view on server component
import { createClient } from '@/lib/supabase/server';
import { after } from 'next/server';

export default async function ServerPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  
  // Fetch server data
  const { data: server } = await supabase
    .from('servers')
    .select('*')
    .eq('id', params.id)
    .single();
  
  // Track page view non-blocking (Vercel best practice: server-after-nonblocking)
  after(async () => {
    const adminClient = createClient({ admin: true });
    const hour = new Date().getUTCHours();
    const date = new Date().toISOString().split('T')[0];
    
    await adminClient.rpc('increment_page_view', {
      p_server_id: params.id,
      p_date: date,
      p_hour: hour,
      p_source: 'direct' // Or derive from headers
    });
  });
  
  return <ServerDetailPage server={server} />;
}

// Database function for atomic increment
// CREATE OR REPLACE FUNCTION increment_page_view(
//   p_server_id UUID,
//   p_date DATE,
//   p_hour INTEGER,
//   p_source VARCHAR
// ) RETURNS VOID AS $$
// BEGIN
//   INSERT INTO page_views (server_id, date, hour, source, view_count)
//   VALUES (p_server_id, p_date, p_hour, p_source, 1)
//   ON CONFLICT (server_id, date, hour, source)
//   DO UPDATE SET view_count = page_views.view_count + 1;
// END;
// $$ LANGUAGE plpgsql SECURITY DEFINER;

// Track click (client component with analytics action)
// components/server-links.tsx
'use client';
import { trackClick } from '@/app/actions/analytics-actions';

export function DiscordButton({ serverId, url }: Props) {
  return (
    <a 
      href={url}
      onClick={() => trackClick(serverId, 'discord')}
      target="_blank"
    >
      Join Discord
    </a>
  );
}
```

### API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/servers/:id/analytics/overview` | Summary metrics | Owner |
| GET | `/api/servers/:id/analytics/views` | Page view data | Owner |
| GET | `/api/servers/:id/analytics/clicks` | Click data | Owner |
| GET | `/api/servers/:id/analytics/reviews` | Review analytics | Owner |
| GET | `/api/servers/:id/analytics/uptime` | Uptime history | Owner |
| GET | `/api/servers/:id/analytics/sources` | Traffic sources | Owner |
| GET | `/api/servers/:id/analytics/export` | Export data | Owner |
| POST | `/api/servers/:id/track-click` | Track click event | Public |

### React Components with Streaming (Vercel Best Practices)

```typescript
// app/servers/[id]/analytics/page.tsx
import { Suspense } from 'react';
import { ViewsChart } from '@/components/analytics/views-chart';
import { ClicksCard } from '@/components/analytics/clicks-card';
import { UptimeCard } from '@/components/analytics/uptime-card';

// Vercel best practice: server-parallel-fetching
// Each component fetches its own data in parallel
export default function AnalyticsPage({ params }: { params: { id: string } }) {
  return (
    <div className="grid gap-4">
      <Suspense fallback={<CardSkeleton />}>
        <ViewsChart serverId={params.id} />
      </Suspense>
      
      <Suspense fallback={<CardSkeleton />}>
        <ClicksCard serverId={params.id} />
      </Suspense>
      
      <Suspense fallback={<CardSkeleton />}>
        <UptimeCard serverId={params.id} />
      </Suspense>
    </div>
  );
}

// components/analytics/views-chart.tsx
import { createClient } from '@/lib/supabase/server';
import { cache } from 'react';

const getViewsData = cache(async (serverId: string) => {
  const supabase = createClient();
  
  // Use materialized view for performance
  const { data } = await supabase
    .from('daily_analytics')
    .select('date, total_views, total_visitors')
    .eq('server_id', serverId)
    .gte('date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
    .order('date', { ascending: false })
    .limit(30);
  
  return data ?? [];
});

export async function ViewsChart({ serverId }: { serverId: string }) {
  const data = await getViewsData(serverId);
  
  return <ChartComponent data={data} />;
}
```

### Caching Strategy

| Data | Cache TTL | Strategy |
|------|-----------|----------|
| Daily aggregates | 1 hour | Materialized view, refreshed hourly |
| Charts data | 1 hour | React.cache() per-request |
| Real-time status | 5 min | Direct query, no cache |

---

## Success Metrics

| Metric | Target | Timeframe |
|--------|--------|-----------|
| Dashboard adoption | 50% of verified owners | Month 2 |
| Avg session duration | 2+ minutes | Ongoing |
| Export usage | 10% of owners | Month 2 |
| Premium interest clicks | Track for Phase 2 | Month 2+ |

---

## Phase 2 Premium Features (Future)

| Feature | Price Point | Description |
|---------|-------------|-------------|
| **Sentiment Analysis** | $10/mo | AI analysis of review text |
| **Competitor Comparison** | $10/mo | Percentile rankings vs category |
| **Keyword Tracking** | $10/mo | Search terms leading to server |
| **Retention Curves** | $20/mo | D1/D7/D30 player retention |
| **Custom Alerts** | $10/mo | Email/Discord notifications |
| **API Access** | $30/mo | Programmatic data access |

---

## Open Questions

1. Should we track individual user sessions or just aggregate counts?
2. How long should we retain analytics data? (90 days proposed)
3. Should free tier have any rate limits on data access?
4. Do we need GDPR consent for analytics tracking?
