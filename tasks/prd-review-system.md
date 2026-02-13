# PRD: Review System

> **⛔ SUPERSEDED** — This PRD is superseded by `docs/server-card-design.md` and the engineering plan at `docs/plans/server-card-engineering-plan.md`. Key changes: flexible review dimensions via junction table (not hardcoded columns), dual-path reviews (Quick + Detailed, no Private Feedback), polymorphic `reviews` table supporting future hosting reviews. Do not implement from this PRD.

> ⚠️ **SURVEY DEPENDENCY**: This PRD assumes multi-criteria 1-5 star ratings. Player survey Q15 tests whether players prefer Steam-style binary (Recommend/Don't Recommend), Amazon-style stars, or our multi-criteria approach. **Do NOT begin implementation until Q15 results are in.** If binary wins, the schema, weighted formula, and all acceptance criteria need restructuring.
>
> Additionally, survey Q14 tests whether "reviewer's username and playtime are visible" is a top trust signal. If it is, reviews MUST show identity (not anonymous) — see Open Question #3.

## Introduction

The Review System enables players and creators to rate and review servers using a unified 4-dimension rating system. Creator reviews (with video content) receive higher visibility and weight in the quality score, incentivizing content creation while maintaining consistent rating criteria across all review types.

**Problem:** Fake reviews and self-votes plague existing directories. Players say directories are "full of 5-star self-votes from server owners."

**Solution:** A structured rating system with 4 dimensions (Community, Performance, Content, Fairness), weighted by evidence (Creator reviews count more), with anti-fraud measures (IP limits, behavior analysis).

---

## Goals

- Enable players to submit structured reviews with 4 rating dimensions
- Allow creators to submit video-enhanced reviews
- Weight creator reviews higher in quality score (2x)
- Prevent fake reviews through anti-fraud measures
- Enable server owners to respond to reviews
- Surface helpful reviews through voting

---

## User Stories

### US-001: Submit Player Review
**Description:** As a player, I want to review a server so I can help others decide if it's worth joining.

**Acceptance Criteria:**
- [ ] "Write Review" button on server detail page (requires auth)
- [ ] User can only submit 1 review per server
- [ ] Form requires: 4 dimension ratings (1-5 stars each), review text (50-2000 chars)
- [ ] Form accepts optional: pros list (max 3), cons list (max 3)
- [ ] Overall rating auto-calculated from dimensions
- [ ] Review saved and displayed immediately
- [ ] User can edit their review within 24 hours
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

---

### US-002: Rate 4 Dimensions
**Description:** As a player, I want to rate specific aspects of a server so my feedback is structured and useful.

**Acceptance Criteria:**
- [ ] 4 rating fields: Community (35%), Performance (30%), Content (25%), Fairness (10%)
- [ ] Each dimension has tooltip explaining what to consider
- [ ] Star selector (1-5) for each dimension
- [ ] Overall score = weighted average, displayed as calculated
- [ ] Cannot submit without rating all 4 dimensions
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

**Dimension Definitions:**
- **Community (35%):** Staff quality, player friendliness, toxicity level, moderation
- **Performance (30%):** Lag, stability, uptime, connection quality
- **Content (25%):** Things to do, updates, economy, variety
- **Fairness (10%):** No pay-to-win, progression balance, rule enforcement

---

### US-003: Submit Creator Review
**Description:** As a content creator, I want to submit a video review so I can provide in-depth coverage.

**Acceptance Criteria:**
- [ ] "Creator Review" tab on review form
- [ ] Requires video URL (YouTube, TikTok, or Twitch)
- [ ] Video URL validates against platform patterns
- [ ] Same 4-dimension ratings required
- [ ] Same text review required (can be transcript summary)
- [ ] Video embeds on server detail page
- [ ] Creator badge displayed on review
- [ ] Review weight = 2x in quality score calculations
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

---

### US-004: View Server Reviews
**Description:** As a player, I want to read reviews for a server so I can make an informed decision.

**Acceptance Criteria:**
- [ ] Reviews section on server detail page
- [ ] Shows: reviewer name, date, overall rating, dimension breakdown, text, pros/cons
- [ ] Creator reviews highlighted with badge and video embed
- [ ] Sort options: Most Recent, Most Helpful, Highest Rating, Lowest Rating
- [ ] Pagination (10 reviews per page)
- [ ] Average rating summary at top (overall + per dimension)
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

---

### US-005: Vote Review Helpfulness
**Description:** As a player, I want to vote on reviews so helpful ones rise to the top.

**Acceptance Criteria:**
- [ ] "Helpful" and "Not Helpful" buttons on each review
- [ ] One vote per user per review
- [ ] Vote count displayed (e.g., "15 found helpful")
- [ ] Helpfulness score = (Helpful - Not Helpful) / Total
- [ ] Reviews with >75% helpfulness and 10+ votes auto-featured
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

---

### US-006: Server Owner Response
**Description:** As a server owner, I want to respond to reviews so I can address feedback publicly.

**Acceptance Criteria:**
- [ ] "Respond" button visible only to verified server owner
- [ ] One response allowed per review
- [ ] Response text max 500 characters
- [ ] Response can be edited within 24 hours
- [ ] Response displayed below review with "Owner Response" label
- [ ] Reviewer notified of owner response
- [ ] Typecheck/lint passes
- [ ] Verify in browser using dev-browser skill

---

### US-007: Review Moderation
**Description:** As a platform, I need to moderate reviews so the system isn't abused.

**Acceptance Criteria:**
- [ ] Profanity filter flags common inappropriate words
- [ ] All-caps check flags reviews >50% uppercase
- [ ] Spam detection flags duplicate/templated content
- [ ] 3+ user reports triggers manual review queue
- [ ] Admin can: approve, edit, remove review
- [ ] Removed reviews show "[Review removed for policy violation]"
- [ ] User receives notification if review is moderated
- [ ] Typecheck/lint passes

---

### US-008: Anti-Fraud Measures
**Description:** As a platform, I need to prevent fake reviews so ratings are trustworthy.

**Acceptance Criteria:**
- [ ] Max 3 reviews per IP address per day
- [ ] New accounts (< 24 hours) cannot review
- [ ] Suspicious patterns flagged: same IP reviewing same server multiple times, burst of reviews
- [ ] Flagged reviews require manual approval
- [ ] Server owners cannot review their own servers
- [ ] Typecheck/lint passes

---

## Functional Requirements

- **FR-1:** Users must be authenticated to submit reviews
- **FR-2:** Users can submit only 1 review per server
- **FR-3:** Review text must be 50-2000 characters
- **FR-4:** All 4 dimension ratings are required (1-5 stars)
- **FR-5:** Overall rating = (Community × 0.35) + (Performance × 0.30) + (Content × 0.25) + (Fairness × 0.10)
- **FR-6:** Creator reviews require valid video URL from YouTube, TikTok, or Twitch
- **FR-7:** Creator reviews weighted 2x in quality score
- **FR-8:** Reviews editable for 24 hours after submission
- **FR-9:** Owner responses limited to 500 characters
- **FR-10:** Max 3 reviews per IP per day
- **FR-11:** New accounts must wait 24 hours before reviewing
- **FR-12:** Server owners cannot review their own servers

---

## Non-Goals (Out of Scope)

- **Verified Playtime** - Requires Hytale API integration (Phase 2). ⚠️ *If survey Q14 confirms playtime is the #1 trust signal, implement a Phase 1 workaround: self-reported hours or "time since first review on this server" as a proxy.*
- **Creator Verification Badges** - Phase 2 (follower count check)
- **Sentiment Analysis** - Phase 3 (SaaS feature)
- **Review Photos/Screenshots** - Phase 2
- **Review Threading/Replies** - Not planned

---

## Technical Considerations

### Database Schema

```sql
-- reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  server_id UUID REFERENCES servers(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  overall_rating DECIMAL(2,1) NOT NULL,
  community_rating INTEGER NOT NULL CHECK (community_rating BETWEEN 1 AND 5),
  performance_rating INTEGER NOT NULL CHECK (performance_rating BETWEEN 1 AND 5),
  content_rating INTEGER NOT NULL CHECK (content_rating BETWEEN 1 AND 5),
  fairness_rating INTEGER NOT NULL CHECK (fairness_rating BETWEEN 1 AND 5),
  review_text TEXT NOT NULL CHECK (char_length(review_text) BETWEEN 50 AND 2000),
  pros TEXT[],
  cons TEXT[],
  video_url VARCHAR(255),
  video_platform VARCHAR(20),  -- youtube, tiktok, twitch
  is_creator_review BOOLEAN DEFAULT FALSE,
  helpful_count INTEGER DEFAULT 0,
  not_helpful_count INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'published',  -- published, flagged, removed
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(server_id, user_id)
);

-- review_votes table
CREATE TABLE review_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  is_helpful BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(review_id, user_id)
);

-- owner_responses table
CREATE TABLE owner_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID REFERENCES reviews(id) ON DELETE CASCADE UNIQUE,
  owner_id UUID REFERENCES auth.users(id),
  response_text VARCHAR(500) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes (Supabase best practices)
-- Composite index for server reviews page (most common query)
CREATE INDEX idx_reviews_server_created ON reviews(server_id, created_at DESC) WHERE status = 'published';

-- Composite index for "Most Helpful" sort
CREATE INDEX idx_reviews_server_helpful ON reviews(server_id, helpful_count DESC) WHERE status = 'published';

-- Partial index for creator reviews (higher priority)
CREATE INDEX idx_reviews_creator ON reviews(server_id, created_at DESC) WHERE is_creator_review = true AND status = 'published';

-- Index for user's review history
CREATE INDEX idx_reviews_user_created ON reviews(user_id, created_at DESC);

-- Index for review moderation queue
CREATE INDEX idx_reviews_flagged ON reviews(created_at DESC) WHERE status = 'flagged';

-- Review votes composite index
CREATE INDEX idx_review_votes_review_user ON review_votes(review_id, user_id);
```

### Row-Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE owner_responses ENABLE ROW LEVEL SECURITY;

-- Public read for published reviews
CREATE POLICY "Published reviews are viewable"
  ON reviews FOR SELECT
  USING (status = 'published');

-- Users can create reviews (1 per server)
CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
    NOT EXISTS (
      SELECT 1 FROM reviews WHERE server_id = NEW.server_id AND user_id = auth.uid()
    )
  );

-- Users can edit their own reviews within 24 hours
CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id AND created_at > NOW() - INTERVAL '24 hours')
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own reviews
CREATE POLICY "Users can delete own reviews"
  ON reviews FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Review votes policies
CREATE POLICY "Users can vote on reviews"
  ON review_votes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can see all votes"
  ON review_votes FOR SELECT
  USING (true);

-- Owner responses (only verified owners)
CREATE POLICY "Verified owners can respond"
  ON owner_responses FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM servers s
      JOIN reviews r ON r.server_id = s.id
      WHERE r.id = review_id
        AND s.owner_id = auth.uid()
        AND s.verification_status = 'verified'
    )
  );

CREATE POLICY "Everyone can see owner responses"
  ON owner_responses FOR SELECT
  USING (true);
```

### API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/servers/:id/reviews` | List reviews for server | Public |
| POST | `/api/servers/:id/reviews` | Submit review | Required |
| PATCH | `/api/reviews/:id` | Edit review (24h window) | Author |
| DELETE | `/api/reviews/:id` | Delete own review | Author |
| POST | `/api/reviews/:id/vote` | Vote helpful/not helpful | Required |
| POST | `/api/reviews/:id/respond` | Owner response | Owner |
| POST | `/api/reviews/:id/report` | Report review | Required |

### Client Component with Optimistic Updates (Vercel Best Practices)

```typescript
// components/reviews/review-form.tsx
'use client';
import { useTransition } from 'react';
import { submitReview } from '@/app/actions/review-actions';

// Vercel best practice: rerender-use-transition-loading
export function ReviewForm({ serverId }: { serverId: string }) {
  const [isPending, startTransition] = useTransition();
  
  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await submitReview(formData);
    });
  }
  
  return (
    <form action={handleSubmit}>
      {/* Form fields */}
      <button disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}

// app/actions/review-actions.ts
'use server';
import { createClient } from '@/lib/supabase/server';
import { revalidateTag } from 'next/cache';

// Vercel best practice: server-auth-actions
export async function submitReview(formData: FormData) {
  const supabase = createClient();
  
  // Authenticate
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');
  
  const review = {
    server_id: formData.get('server_id'),
    user_id: user.id,
    community_rating: Number(formData.get('community_rating')),
    performance_rating: Number(formData.get('performance_rating')),
    content_rating: Number(formData.get('content_rating')),
    fairness_rating: Number(formData.get('fairness_rating')),
    review_text: formData.get('review_text'),
    // Calculate weighted average
    overall_rating: (
      Number(formData.get('community_rating')) * 0.35 +
      Number(formData.get('performance_rating')) * 0.30 +
      Number(formData.get('content_rating')) * 0.25 +
      Number(formData.get('fairness_rating')) * 0.10
    )
  };
  
  const { error } = await supabase.from('reviews').insert(review);
  
  if (!error) {
    // Revalidate server page cache
    revalidateTag(`server:${review.server_id}`);
  }
  
  return { error };
}
```

### Video Embed Patterns

```typescript
const VIDEO_PATTERNS = {
  youtube: /^https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/,
  tiktok: /^https?:\/\/(www\.)?tiktok\.com\/@[\w.-]+\/video\/\d+/,
  twitch: /^https?:\/\/(www\.)?twitch\.tv\/videos\/\d+/
};
```

---

## Success Metrics

| Metric | Target | Timeframe |
|--------|--------|-----------|
| Reviews submitted | 50+ | Month 1 |
| Creator reviews | 20+ | Month 1 (your reviews) |
| Avg review length | 200+ chars | Ongoing |
| Helpfulness vote rate | 20%+ of viewers | Month 2 |
| Owner response rate | 30%+ | Month 2 |
| Fraudulent reviews | <5% | Ongoing |

---

## Open Questions

1. Should we require minimum account age before reviewing?
2. How do we verify creator follower counts for badges?
3. Should reviews be anonymous or always show username? → *Survey Q14 now tests this directly ("reviewer's username and playtime are visible" option). Decision blocked on survey results.*
4. Do we need a "Report Inaccurate" option separate from "Report Abuse"?
