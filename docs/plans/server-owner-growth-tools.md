# Server Owner Growth Tools — Analytics & Actionable Insights

Research-driven plan for giving Hytale server owners the tools to understand, measure, and grow their player base — going beyond basic analytics into actionable growth intelligence.

---

## The Gap: "What Happened" vs "How to Grow"

The existing analytics PRD (`tasks/prd-analytics-dashboard.md`) covers **visibility metrics**: views, clicks, reviews, uptime, traffic sources. These answer "what happened."

Server owners need **growth tools** that answer:
- "Why are players leaving after 10 minutes?"
- "What's my best traffic source for players who actually stay?"
- "How do I compare to similar servers in my category?"
- "What should I change to get more players?"

This is the difference between a **dashboard** and a **growth platform**.

---

## Competitive Research: Who Does This Well?

### Roblox Creator Hub (Gold Standard)
Roblox gives experience creators a full analytics suite organized around the **player lifecycle**:

| Dashboard | Key Metrics | Why It Matters |
|-----------|-------------|----------------|
| **Retention** | D1, D7, D30 retention cohorts + cohort tables | Shows if players come back. Broken down by daily/weekly cohorts to correlate with updates/events. |
| **Engagement** | DAU, session time, session count, first-session retention curve | Shows how deeply players engage. The "new user first session retention" chart shows minute-by-minute dropoff. |
| **Acquisition** | Source breakdown (home, search, teleport, ads), conversion rate per source | Shows WHERE players come from and which sources produce players that actually stay. |
| **Demographics** | Age, gender, country, language, platform, OS | Shows WHO your players are to inform content decisions. |
| **Feedback** | Ratings, thumbs up/down trends | Shows player sentiment over time. |
| **Monetization** | Revenue, ARPU, payer conversion | Shows business health. |

**Key Roblox innovation:** Benchmarking — compare YOUR metrics against similar experiences in the same genre. "Your D1 retention is 25%, top 25% of RPG experiences have 35%."

**Key Roblox innovation:** Explore mode — filter any chart by age, platform, country, new vs returning. This lets owners identify underperforming segments.

### Discord Server Insights (Community Growth Framework)
Discord structures growth around a **3-stage funnel**:

1. **Acquisition** — Where do members come from? Which invite links bring high-quality members?
2. **Activation** — Do new members send their first message? When? What helps them engage?
3. **Retention** — Do members come back after week 1? "First week retention" = visited again 7-14 days after joining.

**Key Discord insight:** They emphasize that raw member count is vanity — what matters is:
- **Communicators** — members who actually chat (not lurkers)
- **Visitors** — members who open the server (even without chatting)
- **First-day activation** — did a new member interact on their first day?

### BattleMetrics (Player Intelligence)
BattleMetrics focuses on **player-level data**:
- Individual player tracking (join/leave times, playtime history)
- Player queries (find related players, custom scoring rules)
- Real-time RCON (remote server control)
- Server rank tracking over time

**Key BattleMetrics insight:** Server owners care about *individual* player behavior, not just aggregates. "Who's my most active player?" "When do my regulars play?"

---

## The Growth Framework for hytale.GG

Combining all three platforms into a unified model for Hytale server owners:

### The Server Growth Funnel

```
DISCOVER → VISIT → JOIN → PLAY → STAY → ADVOCATE
   |          |       |      |       |        |
   |          |       |      |       |        └─ Leaves a review, invites friends
   |          |       |      |       └─ Returns after D1, D7, D30
   |          |       |      └─ Plays for >10 min first session
   |          |       └─ Clicks "Connect" / copies IP
   |          └─ Views server detail page
   └─ Sees server card in browse/search/featured
```

Each stage has metrics, and each stage has **actionable advice**.

---

## Tiered Feature Set

### Free Tier (All Verified Owners) — "Know Your Numbers"

Already in existing PRD. Confirms what's there:

| Feature | Metric | From Existing PRD |
|---------|--------|:-:|
| Page views (7d, 30d) | Discovery | ✅ |
| Click-through rate | Visit → Join | ✅ |
| Review analytics | Sentiment | ✅ |
| Uptime history | Trust | ✅ |
| Traffic sources | Acquisition | ✅ |
| Data export (CSV/JSON) | Self-serve | ✅ |

### Premium Tier 1: "Growth Dashboard" (~$10-15/mo) — "Understand Your Players"

New features beyond existing PRD:

#### 1. Player Retention Curves (Roblox-inspired)
- **D1 / D7 / D30 retention** — % of new players who return after 1 day, 7 days, 30 days
- **Cohort analysis** — group players by join week, see how each cohort retains over time
- **Correlation with events** — "Players who joined during your Halloween event had 40% higher D7 retention"
- **Data source:** Player session tracking (requires server plugin or API integration)

#### 2. Session Analytics (Roblox Engagement model)
- **Average session time** — how long players stay per visit
- **Session frequency** — how often players come back
- **First-session retention curve** — minute-by-minute dropoff chart for new players
  - "50% of new players leave within 5 minutes" → signals onboarding problem
- **Peak hours** — when your server is busiest (helps schedule events)
- **Data source:** Server metrics polling (existing infra) + session start/end tracking

#### 3. Acquisition Quality (Discord-inspired)
- **Conversion by source** — not just "100 views from search" but "100 views from search → 20 clicked → 8 joined → 3 stayed D7"
- **Source quality ranking** — "Players from Featured have 2× better retention than players from Search"
- **Traffic source ROI** — if owners run ads or promotions, they can see which ones actually bring retaining players
- **Data source:** Extend existing traffic source tracking with downstream conversion

#### 4. Review Sentiment Trends
- **Rating over time** — line chart of Fun/Community/Stability ratings over weeks/months
- **Sentiment heatmap** — "Community rating dipped in January" — correlate with events
- **Word cloud** — most common words in reviews (positive and negative)
- **Data source:** Existing review data, basic NLP

#### 5. Competitor Benchmarking (Roblox-inspired)
- **Percentile ranking** — "Your server is in the top 20% for Community rating among Survival servers"
- **Category averages** — "Average session time for PvP servers is 45 min, yours is 22 min"
- **Anonymous** — never reveal which specific servers are ahead/behind
- **Data source:** Aggregate platform data (we have all servers' metrics)

### Premium Tier 2: "Growth Intelligence" (~$25-30/mo) — "Know What to Do"

#### 6. Actionable Growth Tips (AI-powered, our differentiator)
Instead of just showing numbers, **tell owners what to do**:

| Signal | Insight | Suggested Action |
|--------|---------|-----------------|
| D1 retention < 15% | "Most new players don't come back" | "Consider improving your first-play experience. Top servers greet new players, have a tutorial, and deliver fun within 5 minutes." |
| Session time declining | "Players are spending less time per visit" | "Check if recent changes affected gameplay. Consider adding new content or events to re-engage." |
| Community rating dropping | "Players rate your community lower lately" | "Review recent moderation logs. Consider hosting community events or improving onboarding." |
| High views, low CTR | "Players see your card but don't click" | "Your cover image may need updating. Top-performing servers use action screenshots. Consider adding a video." |
| Low Stability rating | "Players report lag/crashes" | "Your uptime is 94% (category avg: 99%). Consider upgrading server hardware or switching hosts." |

**Key insight:** This is what NO competitor does. BattleMetrics shows data. Discord shows data. Roblox shows data + benchmarks. **Nobody** tells you what to change.

#### 7. Player Segments (BattleMetrics-inspired)
- **Regulars** — play 3+ times/week
- **Casuals** — play 1-2 times/week
- **At Risk** — used to play regularly, haven't been seen in 7+ days
- **Churned** — haven't played in 30+ days
- **New** — joined in the last 7 days
- Show counts and trends for each segment
- "You have 12 At Risk players this week (up from 5 last week)"

#### 8. Event Impact Analysis
- Before/after metrics for server events
- "Your Build Competition event increased DAU by 35% and D7 retention by 12%"
- Helps owners understand which activities drive growth

#### 9. Listing Optimization Score
- Score 0-100 on how well their listing is optimized
- Checks: cover image quality, description length, video present, screenshots count, Discord linked, categories set, vibe tags
- "Your listing score is 65/100. Add a video (+15), write a longer description (+10), link your Discord (+10)"

#### 10. Custom Alerts (Discord/Email)
- "Your daily players dropped 30% compared to last week"
- "Your rating dropped below 4.0"
- "You received 5+ negative reviews in 24 hours"
- "Your server has been offline for 30+ minutes"

---

## Data Architecture Considerations

### What We Can Track Without Server Plugin

Using only our platform's data (page views, clicks, reviews, server status polling):

| Metric | Source | Accuracy |
|--------|--------|----------|
| Page views / CTR | Platform tracking | ✅ Exact |
| Traffic sources | Referrer + UTM | ✅ Exact |
| Review trends | Review database | ✅ Exact |
| Uptime / Status | Server polling | ✅ Exact |
| Online player count | Server query | ✅ Exact (snapshot) |
| Listing optimization | Platform data | ✅ Exact |
| Competitor benchmarks | Aggregate data | ✅ Exact |

### What Requires Server Plugin / Integration (Phase 2+)

| Metric | Requires | Complexity |
|--------|----------|:---:|
| Individual player sessions | Server plugin or query API | Medium |
| D1/D7/D30 retention | Player identity tracking | High |
| Session time per player | Server plugin | Medium |
| Player segments | Player identity + session history | High |
| First-session dropoff curve | Server plugin | High |

**Recommendation:** Start with platform-only metrics (free + Premium Tier 1 basics), then add server integration as an optional "enhanced analytics" feature. This mirrors how BattleMetrics works — servers install an RCON connection to unlock deeper data.

### Lightweight Alternative: Estimate Retention from Polling

Even without a server plugin, we can **estimate** retention:
- We poll servers every 5 minutes for player count
- If we can get the player **list** (names/UUIDs) from the Hytale server query protocol, we can track individual players across polls
- This gives us join/leave events, session duration, and return visits **without any plugin**
- Accuracy depends on polling frequency (5 min = miss sessions < 5 min)

This is exactly how BattleMetrics works for most games.

---

## Phasing

| Phase | Features | Pricing | Dependencies |
|-------|----------|---------|--------------|
| **Phase 1 (MVP)** | Free dashboard (existing PRD) | Free | Views/clicks/reviews tracking |
| **Phase 2** | Premium T1: Retention estimates, session analytics, acquisition quality, sentiment trends, benchmarking | ~$10-15/mo | Player list polling, aggregate data pipeline |
| **Phase 3** | Premium T2: AI growth tips, player segments, event impact, listing optimization score, custom alerts | ~$25-30/mo | NLP pipeline, alerting system, AI inference |
| **Phase 4** | Server plugin for exact tracking, hosting provider reviews | TBD | Plugin SDK, enhanced tracking |

---

## Revenue Model Comparison

| Platform | Free | Paid | Pricing |
|----------|------|------|---------|
| **BattleMetrics** | Basic server tracking | RCON, player bans, advanced queries | $4-20/mo per server |
| **Discord** | Server Insights (500+ members) | No paid tier | Free |
| **Roblox** | Full analytics (10+ DAU) | No paid tier | Free (revenue from Robux) |
| **hytale.GG** | Views, clicks, reviews, uptime | Retention, benchmarks, AI tips, alerts | $10-30/mo |

BattleMetrics is the closest model — free basic tracking, paid for advanced features. The difference is we add **actionable intelligence** (growth tips, listing optimization) that BattleMetrics doesn't have.

---

## Open Questions

1. **Player identity tracking:** Can the Hytale server query protocol return player names/UUIDs? This determines whether we can track retention without a plugin.
2. **Pricing model:** Per-server pricing (like BattleMetrics) or per-owner flat rate?
3. **AI growth tips:** Use an LLM to generate insights, or hand-craft rule-based tips? (Rule-based is cheaper and more predictable for v1)
4. **Hosting reviews integration:** When we add server hosting reviews (from the server card plan), should hosting analytics also be a premium feature for hosting providers?
5. **Data retention:** How long should we store player-level session data? (Privacy/storage tradeoff — propose 90 days, same as existing PRD)
