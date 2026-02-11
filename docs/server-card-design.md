# Server Card: Data, Elements & Social Validation Design

Defining WHAT data and elements belong on a server card, WHY each drives player decisions, and HOW they map to social validation — before touching any layout.

---

## The Core Question

> "I'm a Hytale player. I see 20 server cards. What makes me pick THIS one?"

The answer isn't one thing — it's a stack of signals processed in ~2 seconds. Research from Steam (capsule → click → wishlist funnel), Roblox (genre + social proof subtitles), and RateMyServer (multi-dimensional trust) all point to the same framework:

**Players decide in layers:**
1. **Visual hook** (do I want to look closer?) — 0.3s
2. **Social proof** (do other people like this?) — 0.5s  
3. **Relevance match** (is this MY kind of server?) — 0.7s
4. **Trust signals** (will I waste my time?) — 0.5s

---

## Element-by-Element Analysis

### LAYER 1: Visual Hook (the "scroll stopper")

| Element | Why It Matters | Source Insight |
|---------|---------------|----------------|
| **Cover image/banner** | A picture is worth 1000 words of description. Shows what the server FEELS like — builds, landscapes, PvP arenas | Steam: "Capsule image is the single biggest lever for click-throughs." First 4 screenshots determine if users click. |
| **Server icon/logo** | Brand recognition for returning players, professionalism signal | Roblox: Game icon is the primary tile element. Minecraft lists: server icon is the first visual. |
| **Short video clip (optional)** | Movement catches the eye in a grid of static cards. Hover-to-play like Steam | Steam: "Auto-plays first trailer silently." Roblox: considering video tiles for discovery |

**Recommendation:**
- **Cover image** (required, 16:9 banner) — owner-uploaded, with a fallback/placeholder
- **Server icon** (required, 64×64) — round or square with rounded corners
- Short **video clip** (optional, hover-to-play) — Phase 2, huge differentiator but complex

---

### LAYER 2: Social Proof (the "others trust this" signal)

| Element | Why It Matters | Source Insight |
|---------|---------------|----------------|
| **Player count (live)** | Most universal trust signal. "847 playing" = this server is alive | BattleMetrics ranks purely by this. FiveM sorts by player count. Every Minecraft list shows it. |
| **Star rating (aggregate)** | Quick quality snapshot. Compressed social proof | Roblox uses thumbs up/down %. RateMyServer has composite score. Steam has review sentiment. |
| **Review count** | "4.2★ from 47 reviews" is way more credible than "4.2★ from 2 reviews" | Amazon/Steam pattern: rating + count together build trust |
| **Social proof badge** | "Top Trending", "Hidden Gem", "New" — Roblox tested these as subtitle metadata and saw increased engagement | Roblox DevForum Aug 2025: "Social proof descriptors such as 'Top Trending' or 'Up-and-Coming'" |
| **Verified badge** | Owner proved they control this server — not a scam listing | Your PRD already has this. Hytale Universe is the only competitor with verification. |
| **"Friends playing" indicator** | THE most powerful social proof. "2 friends are here" | Your competitive analysis lists this as a gap NO competitor has |

**Recommendation:**
- **Player count** (live, required) — "847 / 1000 online"
- **Star rating + review count** — "4.2★ (47)" — compact, scannable
- **Badge** (contextual, max 1) — "Featured", "Hidden Gem", "New", "Trending"
- **Verified checkmark** — small icon next to server name
- **Friends playing** (Phase 2) — "2 friends here" with tiny avatars

---

### LAYER 3: Relevance Match (the "is this for ME?" filter)

| Element | Why It Matters | Source Insight |
|---------|---------------|----------------|
| **Category/gamemode tags** | PvP, Survival, Creative, RPG — instant genre matching | Every competitor has this. Roblox testing genre subtitles. Your current mock has this. |
| **Vibe tags** | "Chill Builders", "Hardcore PvP", "Noob-Friendly" — emotional/cultural fit | Your competitive analysis: NO competitor has this. Differentiator. |
| **Region badge** | NA, EU, LATAM, ASIA — latency matters hugely for gaming | Your current mock has this. BattleMetrics has distance-based filtering. |
| **Language** | "English", "Spanish", "Multi" — critical for your bilingual strategy | Your current mock has this. No competitor does bilingual. |
| **Short description** | 1-2 lines that explain what makes this server special | Steam: "Explain what the player does. Highlight how the game changes." |

**Recommendation:**
- **Category tags** (1-3, required) — badges: "Survival", "PvP"  
- **Vibe tags** (0-2, optional) — different visual style from categories: "Chill", "Competitive", "Noob-Friendly"
- **Region** — small badge or flag icon
- **Language** — only show if not matching user's locale
- **Description** — 1-2 lines, truncated with ellipsis

---

### LAYER 4: Trust Signals (the "will I waste my time?" check)

| Element | Why It Matters | Source Insight |
|---------|---------------|----------------|
| **Online status** | Green dot = alive. Red = dead. Instant filter. | Your PRD: table stakes. HyServers and HytaleTop100 have it. |
| **Uptime indicator** | "99.2% uptime" — tells you this server is reliable, not just online right now | BattleMetrics tracks historical availability. No Hytale competitor has this. |
| **Discord member count** | Large Discord = active community, you'll have people to play with | Your research: Discord links are a validated player need |
| **Ping/latency** | Your current mock shows this — directly predicts play experience | BattleMetrics uses GeoIP distance as proxy. Your mock has ping bars. |
| **Last updated** | Shows server is actively maintained, not abandoned | Common on all server lists |

**Recommendation:**
- **Online status dot** (required) — green/red, always visible
- **Ping** — bars + ms, using GeoIP estimation
- **Discord shortcut** — small icon with member count, opens invite link
- **Uptime %** — Phase 2, requires accumulated monitoring data

---

## What About Reviews ON the Card?

Your concern about reviews being too friction-heavy is valid. Here's the nuanced take:

### On the card itself (browse view): NO full reviews
- Reviews add too much visual noise to a compact card
- Players don't read reviews while scanning a grid
- A **star rating + count** is the compressed version of all reviews

### On the card (expanded/featured view): YES, a highlight
- Show **1 featured review snippet** — "Great community, active events every weekend" — 1 line
- This is what Steam does with "Most Helpful Review" on hover
- Server owner or algorithm picks the featured snippet

### On the detail page: YES, full review system
- This is where structured ratings, photos, and longer comments live
- This is the RateMyServer model — AFTER you've clicked through

### The review SUBMISSION flow (separate concern):
- Keep it ultra-low-friction: tap stars on 3-4 dimensions + optional comment
- Photo/video upload as optional bonus, not required
- "Quick rate" (just stars, no text) for players who won't write
- This feeds back into the card's aggregate rating

---

## Proposed Server Card Data Model

```typescript
interface ServerCardData {
  // Identity
  id: string;
  name: string;
  slug: string;
  icon_url: string;          // 64x64 server icon
  cover_url: string | null;  // 16:9 banner image
  video_url: string | null;  // Phase 2: hover-to-play clip
  description: string;       // 50-500 chars
  
  // Social proof
  player_count: number;      // live
  max_players: number;
  rating_avg: number;        // 1-5 stars
  review_count: number;
  featured_review?: string;  // 1-line snippet for expanded view
  badge?: 'featured' | 'hidden_gem' | 'new' | 'trending' | 'best_week';
  is_verified: boolean;
  friends_playing?: number;  // Phase 2
  
  // Relevance
  categories: string[];      // ["Survival", "PvE"]
  vibe_tags: string[];       // ["Chill", "Noob-Friendly"]
  region: string;            // "NA" | "EU" | "LATAM" | "ASIA"
  language: string;          // "English" | "Spanish" | "Multi"
  
  // Trust
  status: 'online' | 'offline';
  ping_ms: number | null;    // GeoIP estimated
  discord_url: string | null;
  discord_member_count?: number;
  uptime_pct?: number;       // Phase 2
  
  // Meta
  created_at: string;
  updated_at: string;
}
```

---

## Card Variants

### Compact Card (grid browsing, search results)
Shows: icon + name + verified ✓ + status dot + categories (max 2) + region + rating★(count) + player count + badge (if any)

### Expanded Card (Featured Today, Hidden Gems, hover preview)
Shows: everything in compact PLUS cover image + description (2 lines) + vibe tags + featured review snippet + Discord shortcut + ping

### Detail Page Header (not a "card" but uses same data)
Shows: full cover image + all data + full review section + screenshots gallery + video embed

---

## Social Validation Stack (Why Players Click "Join")

Ranked by conversion impact (based on Steam/Roblox/Amazon research):

1. **Visual hook** — Cover image / icon (Steam: "single biggest lever")
2. **Player count** — "847 playing" (universal trust, used by every platform)
3. **Rating + count** — "4.2★ (47)" (compressed social proof)
4. **Friends playing** — "2 friends here" (strongest social signal, Phase 2)
5. **Badge** — "Hidden Gem" / "Featured" (platform endorsement)
6. **Category match** — "Survival" = "this is my type of game"
7. **Vibe match** — "Chill Builders" = "these are my people"
8. **Verified** — "not a scam"
9. **Description** — confirms what the visual promised
10. **Discord size** — "3,200 members" = active community

---

## Resolved Decisions

### 1. Media: Screenshots + Video (Steam-style)
- **Source:** Scraped during initial listing + owner-uploaded + player-submitted
- **Card behavior:** On hover, auto-play video (if available) or cycle through screenshots (like Steam capsules)
- **Video formats:** Support BOTH landscape (desktop) and vertical (mobile/reels-style 9:16)
  - Vertical video is huge — TikTok/Reels generation consumes content this way
  - Desktop: 16:9 video plays in-card on hover
  - Mobile: Vertical video plays fullscreen or in a stories-like viewer
- **Fallback chain:** Video → Screenshot carousel → Auto-generated placeholder with server icon

### 2. Vibe Tags: Predefined + User-Submitted with Approval
- **Initial predefined set:** "Chill", "Competitive", "Noob-Friendly", "Hardcore", "Roleplay-Heavy", "Builder-Focused", "Event-Driven", "Toxic-Free", "18+", "Family-Friendly"
- **User-created tags:** Players can suggest new vibe tags → go through moderation/approval queue before becoming available site-wide
- **Display:** Visually distinct from category tags (different color/style) so players instantly know "Survival" = what you do, "Chill" = how it feels

### 3. Review System: Dual-Path (Quick Rate + Detailed Review)

See full design below.

### 4. Video Priority: MVP
- Video is a strong social proof element and a key differentiator (NO competitor has this)
- Support both mobile (9:16 vertical) and desktop (16:9 landscape) formats from day 1
- Consider: embedded YouTube/TikTok links as a lightweight v1 before custom hosting

### 5. Friends Playing: Phase 2
- Nobody knows the site yet, so this has zero value at launch
- Will become the single strongest social signal once the user base grows
- Requires: auth, play session tracking, friend graph

---

## Review System: Deep Design

### The Problem with One-Size-Fits-All Reviews

Steam research reveals 3 distinct reviewer archetypes:
1. **The Quick Rater** — Just wants to thumbs up/down. "I simply want to add a rating." If forced to write, they leave "it's good lol" or a joke. (Jabłoński archetype)
2. **The Detailed Reviewer** — Writes 200-1000 words, lists pros/cons, considers multiple dimensions. Does it for the community AND to critically think about their experience. (Dorkoski/Chapin archetype)
3. **The Feedback Giver** — Wants to tell the server owner what's broken or what could improve. More like a bug report or suggestion than a public review.

**Key insight:** Steam forces all 3 into the same text box, which creates noise. We can do better by giving each archetype their own path.

### Dual-Path Review Flow

#### Path A: Quick Rate (10 seconds, low friction)
**Who it's for:** Players who want to help rank servers but won't write paragraphs.

Flow:
1. Tap "Rate this server"
2. Give 1-5 stars on **3 quick dimensions** (tap, no typing required):
   - **Fun** — "How much did you enjoy playing here?"
   - **Community** — "Are the people friendly and helpful?"
   - **Stability** — "Did the server run smoothly?"
3. (Optional) Add 1 vibe tag that describes the server: "Chill", "Competitive", etc.
4. Done. ~10 seconds.

**Why 3 dimensions, not 1 or 10:**
- 1 star (like Roblox thumbs) loses all nuance — a server can be fun but laggy
- 10 categories (like RateMyServer) is too much friction for quick raters
- 3 dimensions capture the essentials: gameplay quality, social quality, technical quality
- Each feeds into the aggregate rating AND gives server owners actionable data

#### Path B: Detailed Review (2-5 minutes, high value)
**Who it's for:** Players who want to help others decide AND give server owners real feedback.

Flow:
1. Start with the same 3 quick dimensions (stars)
2. **Expand** into sub-dimensions (optional, shown as expandable sections):
   - **Fun:** Economy balance, Content variety, PvP fairness, Event quality
   - **Community:** Friendliness, Moderation quality, Activity level, Toxicity
   - **Stability:** Uptime, Lag/TPS, Bug frequency, Update frequency
3. **Write a text review** (min 50 chars, no max)
4. **Attach media** (optional):
   - Screenshots (drag & drop or paste)
   - Video clip (upload or paste YouTube/TikTok link)
5. **Play duration** auto-detected or self-reported: "I played for ~2 weeks"
6. **Recommend?** Final binary: "Would you recommend this server?" (Yes/No)
7. Submit

#### Path C: Private Feedback to Owner (not a public review)
**Who it's for:** Players who want to report issues or suggest improvements without posting publicly.

Flow:
1. Select category: Bug Report, Suggestion, Complaint, Praise
2. Write message (private, only server owner sees it)
3. Optional: attach screenshot
4. Server owner can respond privately

**Why this matters for server owners:**
- Public negative reviews can feel like attacks
- Private feedback channel gives players an alternative to "review bombing"
- Server owners get actionable feedback they can act on before it becomes a public complaint
- Builds trust: "This platform helps me improve, not just judge me"

### How Reviews Feed Back to the Card

| Review Data | Where It Shows | Card Variant |
|-------------|---------------|--------------|
| Aggregate stars (3 dimensions) | Single composite ★ rating | Compact + Expanded |
| Review count | "(47 reviews)" next to stars | Compact + Expanded |
| Top vibe tags from quick raters | Vibe tag badges | Expanded |
| Featured review snippet | 1-line quote | Expanded only |
| "Would recommend" % | "92% recommend" | Detail page |
| Sub-dimension breakdown | Radar chart or bar chart | Detail page |
| Play duration of reviewer | Credibility signal on review | Detail page |
| Media attachments | Screenshot gallery, video section | Detail page |

### Review Credibility Signals
- **Verified playtime** — if we can detect it, auto-tag "Played 2 weeks"
- **Account age** — newer accounts' reviews weighted less in aggregate
- **Review history** — "This user has reviewed 12 servers" = more credible
- **"Helpful" votes** — other users can mark a review as helpful (Steam model)
- **Owner response** — server owners can publicly respond to reviews (Google Maps model)

### Anti-Abuse
- Rate limit: 1 review per server per user (can edit/update)
- Minimum account age to review (e.g., 24 hours)
- Report button on every review
- Moderation queue for flagged reviews
- Review bombing detection: if a server gets 10+ negative reviews in 24h, flag for manual review

---

## Updated Server Card Data Model

```typescript
interface ServerCardData {
  // Identity
  id: string;
  name: string;
  slug: string;
  icon_url: string;
  cover_url: string | null;       // 16:9 banner image
  media: ServerMedia[];            // screenshots + videos
  description: string;

  // Social proof
  player_count: number;
  max_players: number;
  rating_fun: number;              // 1-5 avg from reviews
  rating_community: number;        // 1-5 avg from reviews
  rating_stability: number;        // 1-5 avg from reviews
  rating_overall: number;          // weighted composite
  review_count: number;
  recommend_pct: number;           // % who said "yes recommend"
  featured_review?: string;        // 1-line snippet
  badge?: 'featured' | 'hidden_gem' | 'new' | 'trending' | 'best_week';
  is_verified: boolean;
  friends_playing?: number;        // Phase 2

  // Relevance
  categories: string[];            // ["Survival", "PvE"]
  vibe_tags: string[];             // ["Chill", "Noob-Friendly"] — aggregated from reviews
  region: string;
  language: string;

  // Trust
  status: 'online' | 'offline';
  ping_ms: number | null;
  discord_url: string | null;
  discord_member_count?: number;
  uptime_pct?: number;             // Phase 2

  // Meta
  created_at: string;
  updated_at: string;
}

interface ServerMedia {
  id: string;
  type: 'screenshot' | 'video';
  url: string;
  thumbnail_url: string;
  aspect_ratio: '16:9' | '9:16';  // landscape or vertical
  source: 'owner' | 'player' | 'scraped';
  uploaded_by: string;
  created_at: string;
}
```

---

## Final Element Stack (by conversion impact)

| Priority | Element | Card Compact | Card Expanded | Detail Page |
|----------|---------|:---:|:---:|:---:|
| 1 | Cover image / video hover | ✅ | ✅ | ✅ |
| 2 | Player count (live) | ✅ | ✅ | ✅ |
| 3 | Rating ★ + count | ✅ | ✅ | ✅ |
| 4 | Badge (Featured/Gem/New) | ✅ | ✅ | ✅ |
| 5 | Server name + verified ✓ | ✅ | ✅ | ✅ |
| 6 | Category tags | ✅ | ✅ | ✅ |
| 7 | Online status dot | ✅ | ✅ | ✅ |
| 8 | Region | ✅ | ✅ | ✅ |
| 9 | Vibe tags | — | ✅ | ✅ |
| 10 | Description (1-2 lines) | — | ✅ | ✅ |
| 11 | Featured review snippet | — | ✅ | ✅ |
| 12 | Discord shortcut | — | ✅ | ✅ |
| 13 | Ping | — | ✅ | ✅ |
| 14 | "% recommend" | — | — | ✅ |
| 15 | Sub-dimension breakdown | — | — | ✅ |
| 16 | Full reviews + media | — | — | ✅ |
| 17 | Private feedback button | — | — | ✅ |
| 18 | Friends playing (Phase 2) | ✅ | ✅ | ✅ |

---

## Resolved: Video Storage — Storj vs Supabase Pro

### Cost Comparison (for video hosting)

| Factor | Storj (Regional) | Storj (Global) | Supabase Pro |
|--------|:-:|:-:|:-:|
| **Storage** | $10/TB/mo | $15/TB/mo | $0.021/GB ($21/TB/mo) |
| **Egress** | Included (1× stored) | Included (1× stored) | $0.09/GB ($90/TB) — or $0.03/GB cached via CDN |
| **Base cost** | $5/mo minimum | $5/mo minimum | $25/mo (includes $10 compute credit) |
| **File size limit** | Unlimited | Unlimited | 500 GB per file (Pro) |
| **CDN** | Built-in (distributed) | Built-in (distributed) | Smart CDN on Pro |
| **S3 compatible** | Yes | Yes | No (custom API, but has CDN) |

### Recommendation: Hybrid approach
- **Images (all servers):** Supabase Storage — you're already using it, 100 GB included in Pro, images are small (~500KB each), CDN cached egress is cheap ($0.03/GB)
- **Videos (premium servers only):** Storj Regional at $10/TB — dramatically cheaper egress (included vs $0.09/GB on Supabase), and video files are large + frequently streamed
- **Estimated costs at scale:**
  - 500 servers × 5 images avg × 500KB = ~1.25 GB images → **$0 on Supabase Pro** (within 100 GB included)
  - 50 premium servers × 1 video avg × 50MB = ~2.5 GB video → **~$0.03/mo on Storj** (well within $5 minimum)
  - At 10,000 videos: ~500 GB storage + ~2 TB/mo egress → **Storj: ~$10/mo** vs **Supabase: ~$190/mo** (10× cheaper)

### Video as premium feature
- Free servers: screenshots only (Supabase Storage)
- Premium servers: screenshots + video (Storj)
- This keeps costs near-zero during early growth and creates a monetization lever

---

## Resolved: Steam Review Interaction Analysis

### What Steam Does (from your screenshot)

Each review shows these interactive elements:

**Reviewer identity & credibility:**
- Avatar + username
- Game library size ("267 games", "1,809 games")
- Review count ("5 reviews", "47 reviews")
- Playtime at review ("226.6 hrs on record")
- Date posted
- Transparency tag ("Product received for free")

**Recommendation signal:**
- Binary: "Recommended" 👍 or "Not Recommended" 👎

**Community engagement:**
- **"Was this review helpful?"** → Yes / No / Funny / Award
- **Helpful count**: "1,455 people found this review helpful"
- **Funny count**: "36 people found this review funny"
- **Comment thread**: 31 💬 / 13 💬 — full threaded discussion
- **Emoji reactions** with counts: 👏73, 💯18, 🎯9, 🏆41
- **Awards** (cost Steam Points): various visual badges with different meanings
- **Bookmark/favorite star**

### What We Should Adopt, Skip, or Improve

| Steam Feature | Our Decision | Reasoning |
|---------------|:---:|---|
| **Helpful? Yes/No** | ✅ Adopt | Core signal for sorting. Simple, proven. Determines which reviews surface on cards. |
| **Funny** | ✅ Adopt (rename: "Entertaining") | Separates joke reviews from helpful ones. Steam's 2024 Helpfulness update treats "Funny" reviews differently in sorting — we should too. |
| **Comment threads** | ✅ Adopt | Huge value for server owners and community discussion. Owners can respond publicly here. Players can ask follow-up questions. |
| **Emoji reactions** | ✅ Adopt (simplified) | Use 4-5 curated reactions, not 20+. Suggested: 👍 Helpful, 😂 Funny, 🔥 Based, 💡 Insightful. Low-friction engagement. |
| **Playtime at review** | ✅ Adopt | Critical credibility signal. "Played 2 months" review >> "Played 10 minutes" review. Self-reported or auto-detected. |
| **Review count + game count** | ✅ Adopt (adapted) | Show "X servers reviewed" instead of "X games". Establishes reviewer credibility. |
| **Awards (paid)** | ❌ Skip for now | Steam awards cost Points (microtransaction). Too complex for MVP, unclear value. Revisit Phase 3. |
| **Bookmark/save review** | ✅ Adopt | Let users save helpful reviews to reference later. Simple feature, high value. |
| **"Product received for free"** | ✅ Adopt (adapted) | Flag if reviewer is a server staff member, moderator, or has a relationship with the server. Transparency matters. |

### Our Review Card Layout (inspired by Steam, improved)

```
┌─────────────────────────────────────────────────────┐
│ [Avatar] Username          ★★★★☆ (4.2 overall)     │
│ 12 servers reviewed · Played ~3 weeks               │
│ Posted Feb 10, 2026                                  │
│                                                      │
│ ┌─────────────────────────────────────────────┐      │
│ │ Fun: ★★★★★  Community: ★★★★☆  Stability: ★★★★☆ │ │
│ └─────────────────────────────────────────────┘      │
│                                                      │
│ 👍 Recommended                                       │
│                                                      │
│ "Incredible survival server. The economy is well     │
│ balanced and the community events are amazing.       │
│ Staff is responsive and fair. Only downside is       │
│ occasional lag during peak hours."                   │
│                                                      │
│ [📸 Screenshot 1] [📸 Screenshot 2]                  │
│                                                      │
│ Was this helpful?  [👍 Yes] [👎 No] [😂 Funny]       │
│                                                      │
│ 234 found helpful · 12 found funny                   │
│ 💬 8 comments · [💾 Save]                             │
│                                                      │
│ ▼ Owner Response                                     │
│ │ "Thanks for the review! We're upgrading our        │
│ │ server hardware next week to fix peak lag."        │
│ └────────────────────────────────────────────        │
└─────────────────────────────────────────────────────┘
```

---

## Resolved: User-Created Tags & Review Dimensions

### System Design (RedGIFs/Reddit-inspired)

The pattern: platforms start with curated categories, then let trusted users create new ones with guardrails.

**Requirements to CREATE a new tag or review dimension:**

| Requirement | Value | Why |
|-------------|-------|-----|
| Account age | ≥ 14 days | Prevents spam accounts |
| Reviews submitted | ≥ 5 | Ensures they understand the system |
| Account standing | No active bans/warnings | Trust signal |
| Approval | Moderator queue | Human review before going site-wide |

**Lifecycle of a user-created tag:**
1. User suggests tag with name + description + category (vibe/dimension)
2. Enters moderation queue
3. Moderator approves, rejects, or merges with existing tag
4. If approved: available site-wide but **starts as "experimental"** (shown with a small indicator)
5. After 50+ uses across 10+ servers: promoted to **"established"** (full visibility)
6. Tags with <5 uses after 90 days: auto-archived

**For review dimensions specifically:**
- Start with the core 3: **Fun**, **Community**, **Stability**
- User-created dimensions follow same approval flow but with higher bar (10+ reviews, 30+ day account)
- Examples of dimensions users might create: "Fairness/P2W", "Event Quality", "Build Variety", "Moderation Quality", "Lore/Story"
- Server owners can also suggest dimensions relevant to their server type
- Max 3 additional dimensions per review (to keep friction low)

### Vibe Tag Threshold
- **3+ unique users** must tag a server with the same vibe tag before it displays on the card
- Prevents single-user spam tags
- Tags show with a count indicator: "Chill (12)" meaning 12 players tagged this server as Chill
- Most-voted tags appear first, max 3 vibe tags displayed on expanded card

---

## Resolved: Owner Responses — Public (Google Maps Model)

**Recommendation: Public responses, with guardrails.**

Why public:
- **Transparency** — players see the owner cares and responds to feedback
- **Google Maps proves it works** — businesses respond publicly and it builds trust
- **Steam does this too** — developers can respond to reviews, visible to all
- **It's a differentiator** — no Hytale competitor has owner-response functionality

Guardrails:
- Owner gets **1 response per review** (no flame wars)
- Response is visually distinct (indented, different background, "Owner Response" label)
- Players can still comment in the thread for back-and-forth discussion
- Abusive owner responses can be reported

Additionally, **Path C (Private Feedback)** remains as a separate channel for issues that shouldn't be public. So the full system is:
- **Public reviews** → public owner response (1 per review)
- **Private feedback** → private owner response (unlimited back-and-forth)

---

## Future Scalability: Server Hosting Reviews

Noted for future expansion — the review system architecture should be designed with this in mind:

- The `ServerCardData` model and review system can be generalized to a `ReviewableEntity` pattern
- Same review infrastructure (dimensions, reactions, comments, owner responses) applies to hosting providers
- Future entity types: `server`, `hosting_provider`, `mod`, `resource_pack`
- Database schema should use a polymorphic `reviewable_type` + `reviewable_id` pattern rather than hardcoding `server_id`
- This means: reviews table has `entity_type: 'server' | 'host' | 'mod'` + `entity_id: UUID`

This doesn't change the MVP implementation — just informs the schema design to avoid costly migrations later.

---

## Summary: All Decisions Finalized

| # | Decision | Status |
|---|----------|--------|
| 1 | **Media:** Images on Supabase, video on Storj (premium only) | ✅ Resolved |
| 2 | **Review dimensions:** Core 3 (Fun/Community/Stability) + user-created with approval | ✅ Resolved |
| 3 | **Vibe tag threshold:** 3+ users, user-created with 14d account + 5 reviews + mod approval | ✅ Resolved |
| 4 | **Owner responses:** Public (Google Maps model) + private feedback channel | ✅ Resolved |
| 5 | **Review interactions:** Helpful/Funny votes, emoji reactions (4), comments, save | ✅ Resolved |
| 6 | **Steam-inspired additions:** Playtime, reviewer credibility, transparency tags | ✅ Resolved |
| 7 | **Hosting reviews:** Future-proof schema with polymorphic reviewable entities | ✅ Noted |

No remaining open questions. Plan ready for implementation.
