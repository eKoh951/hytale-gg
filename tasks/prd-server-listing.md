# PRD: Server Listing System

## Introduction

The Server Listing System is the core functionality of hytale.gg that allows players to discover and share Hytale servers. It implements a two-step ownership model: any registered user can add a server listing, and server owners can later claim and verify their listings to unlock additional features.

**Problem:** Players are posting raw server IPs on Reddit because existing directories (hytale-servers.com, hytalehub.com) don't solve discovery well enough. The 48-comment Reddit thread "Best hytale server host?" shows players need help finding and evaluating servers.

**Solution:** A low-friction listing system with prominent Discord links, hosting provider info, and real-time status monitoring.

---

## Goals

- Allow any user to add a server in under 2 minutes
- Enable server owners to claim and verify ownership
- Display real-time server status (online/offline)
- Show Discord links prominently (validated player need)
- Track hosting provider for comparison (new from Apify research)
- Achieve 100+ server listings within launch week

---

## User Stories

### US-001: Add Server (Any User)
**Description:** As a player, I want to add a server I enjoy so that others can discover it.

**Acceptance Criteria:**
- [ ] "Add Server" button visible on homepage and server list
- [ ] Form requires: name (3-50 chars), IP address, description (50-500 chars), category, region
- [ ] Form accepts optional: Discord URL, website URL, port (default 24454)
- [ ] IP address validates as IPv4 or IPv6 format
- [ ] Discord URL validates as discord.gg/* format
- [ ] Server created with status "unclaimed"
- [ ] User redirected to server detail page after submission
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

---

### US-002: Server Detail Page
**Description:** As a player, I want to view server details so I can decide if I want to join.

**Acceptance Criteria:**
- [ ] Page displays: name, description, IP:port (copyable), category, region
- [ ] Discord link shown prominently with "Join Discord" button
- [ ] Website link shown if provided
- [ ] Status badge shows "Online" (green) or "Offline" (red)
- [ ] "Unclaimed" badge shown if no owner verified
- [ ] "Copy IP" button copies IP:port to clipboard with toast confirmation
- [ ] Responsive layout works on mobile
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

---

### US-003: Claim Server (Owner)
**Description:** As a server owner, I want to claim my server listing so I can manage it.

**Acceptance Criteria:**
- [ ] "Claim This Server" button visible on unclaimed server pages
- [ ] Clicking opens modal explaining verification process
- [ ] Two verification options presented: Console File or DNS TXT
- [ ] User selects method and sees specific instructions
- [ ] Unique verification code generated per claim attempt
- [ ] Code expires after 24 hours
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

---

### US-004: Verify Ownership (Console File)
**Description:** As a server owner, I want to verify ownership via console file so I can prove I control the server.

**Acceptance Criteria:**
- [ ] Instructions show: "Create file `hytalegg-verify.txt` in server root with code: [CODE]"
- [ ] "Verify Now" button triggers backend check
- [ ] Backend attempts HTTP GET to `http://[server-ip]/hytalegg-verify.txt`
- [ ] If file contains correct code, server marked as "verified"
- [ ] Owner gains edit permissions and "Verified" badge
- [ ] If verification fails, show clear error message
- [ ] Typecheck/lint passes

---

### US-005: Verify Ownership (DNS TXT)
**Description:** As a server owner, I want to verify ownership via DNS so I can prove I control the domain.

**Acceptance Criteria:**
- [ ] Instructions show: "Add TXT record `hytalegg-verify=[CODE]` to your domain"
- [ ] "Verify Now" button triggers DNS lookup
- [ ] Backend queries TXT records for server domain
- [ ] If TXT record contains correct code, server marked as "verified"
- [ ] Owner gains edit permissions and "Verified" badge
- [ ] If verification fails, show clear error message with troubleshooting tips
- [ ] Typecheck/lint passes

---

### US-006: Edit Server (Owner)
**Description:** As a verified server owner, I want to edit my server details so I can keep information current.

**Acceptance Criteria:**
- [ ] "Edit Server" button visible only to verified owner
- [ ] Edit form pre-populated with current values
- [ ] Owner can edit all fields: name, description, IP, port, Discord, website, category, region
- [ ] Owner can add/edit hosting provider field
- [ ] Changes save immediately with success toast
- [ ] "Last Updated" timestamp updates
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

---

### US-007: Server Status Monitoring
**Description:** As a player, I want to see if a server is online so I don't waste time trying to connect to dead servers.

**Acceptance Criteria:**
- [ ] Cron job runs every 5 minutes
- [ ] For each server, attempt TCP connection to IP:port with 10s timeout
- [ ] Record status (online/offline) and latency_ms in server_metrics table
- [ ] Server detail page shows current status badge
- [ ] Server list shows status indicator (green dot / red dot)
- [ ] "Last checked" timestamp displayed
- [ ] Typecheck/lint passes

---

### US-008: Hosting Provider Field
**Description:** As a player, I want to see what hosting provider a server uses so I can compare performance expectations.

**Acceptance Criteria:**
- [ ] Optional "Hosting Provider" dropdown on add/edit forms
- [ ] Options include: Self-hosted, Oracle, GPORTAL, Ghostcap, Game Host Bros, DatHost, Pine Hosting, Wasabi Hosting, Other
- [ ] Hosting provider displayed on server detail page
- [ ] Filter by hosting provider available on server list (Phase 2)
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

---

## Functional Requirements

- **FR-1:** System must allow any authenticated user to create a server listing
- **FR-2:** Server name must be unique and 3-50 characters
- **FR-3:** Server IP must be valid IPv4 or IPv6 format
- **FR-4:** Server port defaults to 24454 if not specified
- **FR-5:** Discord URL must match pattern `discord.gg/*` or `discord.com/invite/*`
- **FR-6:** Server listing created with `verification_status = 'unclaimed'`
- **FR-7:** Verification code must be cryptographically random, 32 characters
- **FR-8:** Verification code expires after 24 hours
- **FR-9:** Console file verification checks `http://[ip]:[port]/hytalegg-verify.txt`
- **FR-10:** DNS verification checks TXT records for `hytalegg-verify=[code]`
- **FR-11:** Verified owner can edit all server fields
- **FR-12:** Status check cron runs every 5 minutes for all active servers
- **FR-13:** Status check timeout is 10 seconds
- **FR-14:** Server marked offline after 3 consecutive failed checks
- **FR-15:** Hosting provider is optional enum field with predefined options

---

## Non-Goals (Out of Scope for This PRD)

- **Reviews/Ratings** - Covered in prd-review-system.md
- **Discovery/Search** - Covered in prd-discovery-system.md
- **Analytics Dashboard** - Covered in prd-analytics-dashboard.md
- **Multi-region ping testing** - Phase 2 feature
- **Player count tracking** - Requires Hytale server cooperation
- **Mod list detection** - Requires server API

---

## Technical Considerations

### Database Schema

```sql
-- servers table
CREATE TABLE servers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT NOT NULL CHECK (char_length(description) BETWEEN 50 AND 500),
  ip_address VARCHAR(45) NOT NULL,  -- IPv6 max length
  port INTEGER DEFAULT 24454,
  discord_url VARCHAR(255),
  website_url VARCHAR(255),
  category VARCHAR(20) NOT NULL,  -- PvP, Survival, Creative, Roleplay, Minigames, Modded
  region VARCHAR(20) NOT NULL,    -- US-East, US-West, EU, Asia, LATAM, OCE
  hosting_provider VARCHAR(50),   -- NEW: from Apify research
  owner_id UUID REFERENCES auth.users(id),
  verification_status VARCHAR(20) DEFAULT 'unclaimed',  -- unclaimed, pending, verified
  verification_code VARCHAR(32),
  verification_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  listed_by UUID REFERENCES auth.users(id) NOT NULL
);

-- server_metrics table (status history)
-- Partitioned by date for efficient time-series queries
CREATE TABLE server_metrics (
  id UUID DEFAULT gen_random_uuid(),
  server_id UUID NOT NULL REFERENCES servers(id) ON DELETE CASCADE,
  status VARCHAR(10) NOT NULL,  -- online, offline
  latency_ms INTEGER,
  checked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id, checked_at)
) PARTITION BY RANGE (checked_at);

-- Create partitions for current and next month (managed by cron)
CREATE TABLE server_metrics_2026_02 PARTITION OF server_metrics
  FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');

-- Indexes (Supabase Postgres best practices)
-- Composite indexes for common query patterns
CREATE INDEX idx_servers_category_region ON servers(category, region) WHERE verification_status = 'verified';
CREATE INDEX idx_servers_verification_created ON servers(verification_status, created_at DESC);
CREATE INDEX idx_servers_owner_verification ON servers(owner_id, verification_status) WHERE owner_id IS NOT NULL;

-- Partial index for unclaimed servers (smaller, faster)
CREATE INDEX idx_servers_unclaimed ON servers(created_at DESC) WHERE verification_status = 'unclaimed';

-- GIN index for full-text search on name + description
CREATE INDEX idx_servers_search ON servers USING GIN (to_tsvector('english', name || ' ' || description));

-- Server metrics indexes for time-series queries
CREATE INDEX idx_server_metrics_server_time ON server_metrics(server_id, checked_at DESC);
CREATE INDEX idx_server_metrics_status ON server_metrics(status, checked_at) WHERE status = 'offline';
```

### Row-Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE servers ENABLE ROW LEVEL SECURITY;
ALTER TABLE server_metrics ENABLE ROW LEVEL SECURITY;

-- Public read access for all servers
CREATE POLICY "Servers are viewable by everyone"
  ON servers FOR SELECT
  USING (true);

-- Authenticated users can create servers
CREATE POLICY "Authenticated users can create servers"
  ON servers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = listed_by);

-- Only verified owners can update their servers
CREATE POLICY "Owners can update their servers"
  ON servers FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id AND verification_status = 'verified')
  WITH CHECK (auth.uid() = owner_id);

-- System (service_role) can update metrics
CREATE POLICY "System can manage metrics"
  ON server_metrics FOR ALL
  TO service_role
  USING (true);

-- Public read for metrics
CREATE POLICY "Metrics are viewable by everyone"
  ON server_metrics FOR SELECT
  USING (true);
```

### API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/servers` | List servers with filters | Public |
| GET | `/api/servers/:id` | Server details | Public |
| POST | `/api/servers` | Create server listing | Required |
| PATCH | `/api/servers/:id` | Update server (owner only) | Owner |
| POST | `/api/servers/:id/claim` | Start claim process | Required |
| POST | `/api/servers/:id/verify` | Verify ownership | Required |
| GET | `/api/servers/:id/status` | Get current status | Public |

### Cron Job (Status Checker)

```typescript
// app/api/cron/check-servers/route.ts
import { createClient } from '@/lib/supabase/server';
import { after } from 'next/server';

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  const supabase = createClient({ admin: true });
  
  // Fetch active servers
  const { data: servers } = await supabase
    .from('servers')
    .select('id, ip_address, port')
    .eq('verification_status', 'verified');

  if (!servers) return Response.json({ checked: 0 });

  // Use after() for non-blocking status checks (Vercel best practice: server-after-nonblocking)
  after(async () => {
    // Parallel status checks (Vercel best practice: async-parallel)
    const checks = servers.map(async (server) => {
      const start = Date.now();
      try {
        // TCP connection test with 10s timeout
        await fetch(`http://${server.ip_address}:${server.port}`, {
          signal: AbortSignal.timeout(10000)
        });
        return {
          server_id: server.id,
          status: 'online',
          latency_ms: Date.now() - start,
          checked_at: new Date().toISOString()
        };
      } catch {
        return {
          server_id: server.id,
          status: 'offline',
          latency_ms: null,
          checked_at: new Date().toISOString()
        };
      }
    });

    const results = await Promise.all(checks);
    
    // Batch insert metrics
    await supabase.from('server_metrics').insert(results);
  });

  return Response.json({ checked: servers.length });
}

// vercel.json
// { "crons": [{ "path": "/api/cron/check-servers", "schedule": "*/5 * * * *" }] }
```

---

## Success Metrics

| Metric | Target | Timeframe |
|--------|--------|-----------|
| Servers listed | 100+ | Launch week |
| Servers claimed/verified | 20+ | Month 1 |
| Add server completion rate | >80% | Ongoing |
| Claim verification success | >70% | Ongoing |
| Status check uptime | 99.9% | Ongoing |

---

## Open Questions

1. Should we allow duplicate IP addresses (same server listed multiple times)?
2. What happens if original lister disputes an owner's claim?
3. Should we rate-limit server creation per user?
4. Do we need CAPTCHA on the add server form?
