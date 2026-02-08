# Server Owner Survey & Interview Guide

Survey designed to understand server owner needs, growth challenges, and willingness to pay for analytics tools. Follows survey science best practices. **Survey is brand-neutral — do NOT mention hytale.gg anywhere respondents can see.**

**Goal**: Understand what server owners need from a directory, what would make them list, and willingness to pay for premium features.
**Target**: Active Hytale server owners/admins running servers in Feb 2026.
**Length**: ~5.5 minutes (18 questions).
**Distribution**: r/HytaleInfo server promotion threads, Hytale hosting provider Discords, direct outreach to servers listed on competitor directories.

---

## Survey Design Principles Applied

| Principle | How We Apply It |
|-----------|----------------|
| **No NPS** (Judd Antin) | CSAT 5-point scales |
| **Force prioritization** (Nicole Forsgren) | "Pick top 3" constraints |
| **100-point allocation** (Naomi Ionita) | Spend 100 points across features |
| **Single-variable questions** (Nicole Forsgren) | One concept per question |
| **Attribution overlay** (Nilan Peiris) | Track where owners currently list + why |

---

## Section 1: Screening & Server Profile (6 questions)

### Q1. What is your role?
*Single select — screens out non-owners*
- [ ] Server owner
- [ ] Server admin / co-owner
- [ ] Staff / moderator
- [ ] I don't run or manage a server → **End survey** (thank you screen)

> **Design note**: Player survey had no screening and risked contamination. This ensures every response comes from someone who actually manages a server.

### Q2. How long has your Hytale server been running?
*Single select*
- [ ] Less than 1 week
- [ ] 1-2 weeks
- [ ] 3-4 weeks
- [ ] More than a month
- [ ] Since before Early Access (testing/pre-launch)

> **Design note**: Evergreen time options (same fix as player survey). "Before EA" captures beta testers who are a distinct segment.

### Q3. What is your server's average daily player count?
*Single select*
- [ ] 1-5 players
- [ ] 6-20 players
- [ ] 21-50 players
- [ ] 51-100 players
- [ ] 100+ players

### Q4. What is your primary game mode?
*Single select*
- [ ] Survival / SMP
- [ ] PvP / Factions
- [ ] RPG / Adventure
- [ ] Creative / Building
- [ ] Minigames
- [ ] Multiple modes (Survival + PvP, etc.)
- [ ] Other: ___

> **Design note**: Removed "Economy / Roleplay" combo (double-barreled, not in player survey). Added "Multiple modes" — many servers offer several game types. Now consistent with player survey Q3.

### Q5. What hosting provider do you use?
*Single select — feeds Hosting Reviews PRD*
- [ ] Self-hosted (own hardware or VPS)
- [ ] Oracle Free Tier
- [ ] GPORTAL
- [ ] Ghostcap
- [ ] Game Host Bros
- [ ] DatHost
- [ ] Pine Hosting
- [ ] Wasabi Hosting
- [ ] I don't want to disclose
- [ ] Other: ___

> **Design note**: Directly feeds `prd-hosting-reviews.md` seed data and validates the hosting provider distribution. Options from Apify research + Reddit 48-comment thread.

### Q6. How much do you spend monthly on your server? (hosting, plugins, etc.)
*Single select — anchors willingness to pay (Q12)*
- [ ] $0 (free tier / self-hosted)
- [ ] $1-10/month
- [ ] $11-25/month
- [ ] $26-50/month
- [ ] $50+/month
- [ ] I don't want to disclose

> **Design note**: Anchors Q12 (WTP for analytics). An owner spending $0/mo on Oracle Free Tier has a very different price sensitivity than one spending $50/mo on GPORTAL. Without this, WTP data is uninterpretable.

---

## Section 2: Current Discovery & Pain Points (3 questions)

**Knowledge gap**: Where do owners currently list? What's broken?

### Q7. Where is your server currently listed? (Select all that apply)
*Multi-select*
- [ ] HytaleTop100
- [ ] HyServers.gg
- [ ] Hytale Universe
- [ ] hytale-servers.com
- [ ] serverlist.gg
- [ ] Reddit posts
- [ ] Discord servers
- [ ] In-game server browser
- [ ] My own website / landing page
- [ ] Not listed anywhere
- [ ] Other: ___

> **Design note**: Added "In-game server browser" (Hytale has one) and "My own website" (serious owners have dedicated sites).

### Q8. How satisfied are you with your current server listing platform(s)?
*5-point CSAT scale*
- [ ] 1 - Very dissatisfied
- [ ] 2 - Dissatisfied
- [ ] 3 - Neutral
- [ ] 4 - Satisfied
- [ ] 5 - Very satisfied

### Q9. What are your TOP 3 biggest challenges in growing your server?
*Multi-select, exactly 3 — Nicole Forsgren method*
- [ ] Getting new players to find my server
- [ ] Keeping players coming back after they join
- [ ] Standing out from other servers
- [ ] Getting honest feedback from players
- [ ] Competing with servers that buy votes or pay for top spots
- [ ] Figuring out what players actually want
- [ ] Technical problems (lag, hosting, DDoS)
- [ ] Managing staff and moderators
- [ ] Other: ___

> **Design note**: Switched from single-select to top 3 (Nicole Forsgren method — same as Q12). Single-select lost too much data: if 40% pick "discovery," we don't know if retention is close behind at 35% or irrelevant at 3%. Top 3 gives us the cluster of real pain points. Language simplified: removed "retention" jargon, "sponsored slots" → "pay for top spots," etc.

---

## Section 3: Listing Friction & Automation (2 questions)

**Knowledge gap**: What makes listing painful? Would owners welcome auto-seeding?

### Q10. What is the most annoying part of listing or advertising your server on directories?
*Single select — forces prioritization*
- [ ] Writing a compelling description
- [ ] Creating banners, images, or promotional graphics
- [ ] Setting up vote rewards (Votifier, vote links, etc.)
- [ ] Listing on multiple sites with different requirements
- [ ] Keeping information up-to-date across all platforms
- [ ] Getting initial visibility before anyone knows about my server
- [ ] The verification / ownership claiming process
- [ ] I'm not listed anywhere, so I haven't experienced this
- [ ] Other: ___

> **Design note**: Forced single-select captures the #1 friction point. If "multiple sites" or "creating banners" wins, it directly validates the auto-seeding and auto-generated banner features. If "initial visibility" wins, it validates the discovery algorithm investment over listing UX.

### Q11. Imagine a new directory automatically found your server from your existing listings (HytaleTop100, HyServers, etc.) and created a listing for you. How would you feel?
*Single select — validates auto-seeding value proposition*
- [ ] Love it — one less site I have to manually set up
- [ ] Great, as long as I can claim and edit it afterward
- [ ] OK, but I'd want to approve it before it goes live
- [ ] I'd rather add my server myself
- [ ] I'm not listed anywhere else, so this doesn't apply to me

> **Design note**: This is the core value proposition question. If the top 2 options dominate ("love it" + "great, can edit"), auto-seeding is validated. If "approve first" wins, we need a notification/claim flow. If "rather do it myself" wins, the whole scraping strategy needs rethinking. The last option catches new owners who are a different segment entirely.

---

## Section 4: Directory Feature Prioritization (3 questions)

**Knowledge gap**: What would make owners list on a new directory?

### Q12. Pick your TOP 3 most important features in a server directory:
*Multi-select, exactly 3 — Nicole Forsgren method*
- [ ] Fair ranking that doesn't favor big/paying servers
- [ ] Detailed analytics (who visits, where they come from)
- [ ] Player reviews visible on my listing
- [ ] Ability to respond to player reviews publicly
- [ ] Creator/YouTuber reviews of my server
- [ ] Automated server status monitoring
- [ ] Discord notifications (new review alerts, server status updates)
- [ ] Easy server claiming and verified owner badge
- [ ] Auto-imported listing from other directories (zero setup)
- [ ] Other: ___

> **Design note**: Swapped "Mobile-optimized listing page" for "Ability to respond to reviews" (Review PRD US-006 — owners care about this, mobile is wrong audience). Updated Discord wording from "vote notifications" to "review alerts" (we're review-based, not vote-based). Changed "Easy claiming" to include "verified owner badge" (Server Listing PRD verification system). Added "Auto-imported listing" to see if owners rank it as a top-3 priority (reinforces Q11). Added "Other" for blind spots.

### Q13. Imagine a server directory gives you a free dashboard. You have 100 points to spend on what info matters most to you. Distribute them:
*100-point allocation — Naomi Ionita method*

| What you'd see on your dashboard | Points (total must = 100) |
|---------|:---:|
| **Where your players come from** (which sites, searches, or links bring people to your listing) | ___ |
| **How well your listing converts** (how many people see it vs. how many actually click to join) | ___ |
| **Whether players stick around** (how many come back after their first time on your server) | ___ |
| **What players say about you** (common themes from reviews — what people love and what they complain about) | ___ |
| **How you compare to similar servers** (see your stats next to servers in your same category) | ___ |
| **Track which promotions work** (custom links for Discord/Reddit/TikTok so you know which posts actually bring players) | ___ |

> **Design note**: Rewritten in owner language — zero jargon. Replaced "D1/D7/D30 return rates" with "whether players stick around." Swapped weak options (peak times, competitor comparison as standalone) for funnel-critical data: listing conversion rate and referral tracking links. 6 features is still manageable for 100-point allocation. Referral tracking is the standout — no directory offers it, and owners already spend $497+ on moreplayers.net campaigns with no way to measure ROI.

### Q14. If those basic stats were free, which extras would make you consider paying a small monthly fee?
*Multi-select, pick up to 2 — tests upgrade drivers*
- [ ] See if players come back after joining (and when they stop)
- [ ] See what players say about my server (review themes and trends)
- [ ] Custom tracking links to measure my promotions (Discord posts, Reddit, TikTok)
- [ ] Get alerts when my rating drops or traffic spikes
- [ ] Export my data to a spreadsheet
- [ ] Compare my stats to similar servers
- [ ] None — the free basics are enough for me

> **Design note**: Tests the freemium upgrade path. Instead of asking "would you pay $X?" (which gets aspirational answers), we ask what FEATURE would trigger the upgrade. If "tracking links" and "player retention" dominate, those are the paid tier. If "none" wins, the SaaS model is dead — monetize elsewhere. Deliberately no price anchoring here — that's what Q14b is for.

### Q14b. If those extra features cost a monthly fee, what would feel fair?
*Single select*
- [ ] Under $5/month
- [ ] $5-10/month
- [ ] $10-20/month
- [ ] I'd only try it if there was a free trial first
- [ ] I wouldn't pay for analytics
- [ ] Depends on how much it actually helps me grow

> **Design note**: Separated from Q14a so price comes AFTER they've thought about value. "Depends on how much it helps" captures owners who are value-driven, not price-driven — these are ideal premium customers. Cross-reference with Q6 (monthly spend) for price sensitivity segmentation: owners spending $50+/mo on hosting are more likely to pay $10-20/mo for analytics.

---

## Section 5: Reviews & Trust (3 questions)

**Knowledge gap**: How do owners feel about reviews? What format do they prefer?

### Q15. How would you feel about player reviews on your server listing?
*Single select*
- [ ] Great — honest feedback helps me improve
- [ ] Fine, but I want to be able to respond to reviews
- [ ] Worried about fake/unfair negative reviews
- [ ] I'd prefer no reviews — just votes

### Q16. If a content creator (YouTuber/TikToker) offered to review your server, would you...
*Single select*
- [ ] Welcome it — free exposure
- [ ] Welcome it, but want to know beforehand
- [ ] Only if I can see the review before it's published
- [ ] Not interested in creator reviews

### Q17. What review format would give you the most useful feedback as an owner?
*Single select — validates Review PRD from owner perspective*
- [ ] Simple "Recommend / Don't Recommend" with a text comment (Steam style)
- [ ] 1-5 star rating with a text comment (Amazon/Google style)
- [ ] Rate specific aspects separately — community, performance, content, fairness (multi-criteria)
- [ ] I don't want reviews on my listing

> **Design note**: Mirrors player survey Q15 but from the owner perspective. If players prefer binary but owners prefer multi-criteria (because it gives actionable feedback), we have a design tension to resolve. If both agree, the decision is clear. The "I don't want reviews" option captures review-hostile owners for segmentation.

---

## Section 6: Final (1 question)

### Q18. What ONE thing would make you immediately list your server on a new directory?
*Open text — captures unfiltered needs*

_______________________________________________

---

## Thank You Screen

> Thanks for helping us understand what server owners need! Your answers will directly shape the tools we build.
> [Optional] Leave your Discord username if you'd like to be notified when results are published.

---

## Analysis Plan

| Question | Knowledge Gap It Fills | Decision It Informs |
|----------|----------------------|---------------------|
| Q1 | Role screening | Data integrity — filter non-owners |
| Q2-Q3 | Server age + size | Segment by maturity and scale |
| Q4 | Game mode distribution | Cross-reference with player survey Q3 |
| Q5 | Hosting provider distribution | Hosting Reviews PRD seed data, hosting comparison page |
| Q6 | Monthly server spend | Anchors WTP (Q14b), price sensitivity segmentation |
| Q7 | Current directory usage | Competitor market share |
| Q8 | Satisfaction with competitors | Market opportunity |
| Q9 | Top 3 growth challenges (cluster, not just #1) | What to solve first for owners — reveals if retention is close behind discovery |
| Q10 | #1 listing friction point | **Listing UX design — what to eliminate first** |
| Q11 | Auto-seeding sentiment | **Validates or kills the scraper strategy** |
| Q12 | Directory feature priorities (incl. review response, auto-import) | MVP feature list (owner side) |
| Q13 | Analytics feature value — funnel-based (100-pt) | Free tier dashboard design, which data owners actually want |
| Q14 | What upgrade features trigger payment | **Freemium tier design — what goes in free vs paid** |
| Q14b | Price sensitivity (after seeing value) | Pricing model validation |
| Q15-Q16 | Review sentiment + creator review sentiment | Review system design, owner response feature priority |
| Q17 | Review FORMAT preference (owner perspective) | **Cross-reference with player Q15 — validates or creates tension for Review PRD** |
| Q18 | Open-ended needs | Uncover blind spots |

### Statistical Targets
- **Minimum responses**: 30 for directional insights (smaller population than players)
- **Target**: 50-100 responses
- **100-point allocation**: Requires minimum 20 responses for meaningful averages
- **Open text Q18**: Code responses into themes after 30+ answers

### Segmentation Plan
- **By server size (Q3)**: Small (1-20) vs Medium (21-100) vs Large (100+)
- **By monthly spend (Q6)**: Free tier vs Budget ($1-25) vs Premium ($26+)
- **By hosting provider (Q5)**: Self-hosted vs managed hosting
- **By satisfaction (Q8)**: Dissatisfied (opportunity) vs Satisfied (what's working)
- **By listing friction (Q10)**: Content creation burden vs multi-platform burden vs visibility burden
- **By upgrade willingness (Q14)**: Free-forever vs feature-driven upgraders vs price-sensitive

### Cross-Survey Analysis
- **Q4 vs Player Q3**: Do owner game modes match player game modes? Imbalance = opportunity.
- **Q17 vs Player Q15**: Do owners and players agree on review format? Disagreement = design tension.
- **Q9 vs Player Q6**: Do owner top-3 challenges align with player frustrations? Overlap = high-priority features.

### Auto-Seeding Decision Matrix
| If Q11 Shows... | Then We... |
|-----------------|------------|
| "Love it" + "Great, can edit" > 60% | Full auto-seeding at launch — scrape all competitors, create unclaimed listings |
| "Approve first" is dominant | Build notification + claim flow — scrape but don't publish until owner approves |
| "Rather do it myself" > 30% | Pivot to "Import from URL" button — owner-initiated, not automatic |
| "Not listed anywhere" > 40% | Focus on zero-friction manual listing UX — these are NEW owners, scraping doesn't help them |

### Freemium Decision Matrix
| If Q14/Q14b Show... | Then We... |
|---------------------|------------|
| "Tracking links" + "player retention" dominate Q14 | Those are the paid tier features — everything else is free |
| "None" > 40% in Q14 | SaaS model is dead for this audience — monetize via hosting affiliates instead |
| "Under $5" dominates Q14b | Price at $4.99/mo — low barrier, volume play |
| "$5-10" + "$10-20" combined > 50% | Price at $9.99/mo — sweet spot |
| "Depends on how much it helps" > 30% | Offer usage-based pricing or ROI-guarantee trial |
| "Free trial first" > 40% | 14-day free trial is mandatory for conversion |

---

## Interview Guide (For 1-on-1 Follow-ups)

For the top 5-10 most engaged survey respondents, conduct 15-minute Discord calls:

### Opening (2 min)
> "Thanks for taking our survey. I'm building a new Hytale server discovery platform. I'd love to hear more about your experience running a server."

### Discovery & Friction (5 min)
1. "Walk me through how you get new players today. What's working?"
2. "What's the most frustrating part of being listed on [their current directory]?"
3. "Have you ever lost players to a competing server? What happened?"
4. "You said [Q10 answer] is the most annoying part of listing. Tell me more — how much time do you spend on that?"

### Listing Friction Deep-Dive (3 min)
5. "How many sites is your server listed on? How long did it take to set up each one?"
6. "Does your listing have a banner or image? Did you make it yourself? How long did that take?"
7. "If we could auto-create a professional-looking banner from your server name and game mode, would you use that or upload your own?"
8. "If your server was already listed on a new directory because they found it on [their Q7 answer], would that feel helpful or invasive?"

### Feature Validation (3 min)
9. "If I showed you a dashboard that told you [their top Q13 feature], how would you use that info?"
10. "Would you change anything about your server based on player review data?"
11. "How would you feel if your server was featured as 'Server of the Day' to thousands of players?"

### Willingness to Pay (2 min)
12. "You said you spend [Q6 answer] monthly. What's the breakdown? (hosting, plugins, etc.)"
13. "If analytics could help you retain 10% more players, what would that be worth to you?"
14. "At what price would analytics feel like a no-brainer? At what price would you say no?"

### Close
> "Anything else you wish a server directory did for you?"
