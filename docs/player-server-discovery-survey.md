# Player Server Discovery Survey

Survey designed to validate hytale.gg assumptions and fill knowledge gaps. Follows survey science best practices (CSAT over NPS, single-variable questions, forced prioritization, MaxDiff).

**Goal**: Validate our rating criteria, feature priorities, and discovery assumptions with real Hytale players.
**Target**: Hytale players who have played multiplayer in the last 30 days.
**Length**: ~4 minutes (17 questions).
**Distribution**: Reddit r/HytaleInfo, r/hytale, Hytale Discord servers, Twitter/X.

---

## Survey Design Principles Applied

| Principle | How We Apply It |
|-----------|----------------|
| **No NPS** (Judd Antin) | Use CSAT 5-point scales instead |
| **Force prioritization** (Nicole Forsgren) | "Pick your top 3" + frequency questions |
| **Single-variable questions** (Nicole Forsgren) | One concept per question, no double-barrels |
| **MaxDiff for features** (Madhavan Ramanujam) | Most/least important feature sets |
| **Right timing** (Gia Laudi) | Target players with 2+ weeks multiplayer experience |
| **Mobile-friendly** (Judd Antin) | All scales visible without scrolling, max 5 options |

---

## Section 1: Screening (2 questions)

### Q1. How long have you been playing Hytale multiplayer?
*Single select*
- [ ] I haven't played multiplayer yet → **End survey** (thank you screen)
- [ ] Less than 1 week
- [ ] 1-2 weeks
- [ ] 3-4 weeks
- [ ] More than a month

> **Design note**: Options are evergreen (relative time, not calendar-anchored). EA launched Jan 13, 2026 — calendar-specific options like "1-3 months" would be impossible to select and make the survey look out of touch.

### Q2. How many different Hytale servers have you tried?
*Single select*
- [ ] 1
- [ ] 2-3
- [ ] 4-6
- [ ] 7-10
- [ ] More than 10

### Q3. What game mode do you primarily play?
*Single select — critical for segmenting all other answers*
- [ ] Survival / SMP
- [ ] PvP / Factions
- [ ] RPG / Adventure
- [ ] Creative / Building
- [ ] Minigames
- [ ] I play multiple modes equally
- [ ] Other: ___

> **Design note**: Added because a PvP player's priorities differ massively from a Creative builder's. Every competitor has gamemode filters. Without this we can't segment ANY answer.

---

## Section 2: Discovery (3 questions)

**Knowledge gap**: How do Hytale players specifically find servers today?

### Q4. How did you find the server(s) you play on? (Select all that apply)
*Multi-select, max 3*
- [ ] Friend/word of mouth
- [ ] YouTube video or tutorial
- [ ] TikTok or short-form video
- [ ] Twitch stream
- [ ] Discord server
- [ ] Reddit post
- [ ] Server listing website (e.g., HytaleTop100, HyServers)
- [ ] In-game server browser
- [ ] Twitter/X
- [ ] Other: ___

> **Design note**: Split "YouTube/TikTok" — they're different discovery behaviors (long-form reviews vs short-form clips). Added Twitch. Removed Twitter/X (low signal from research). If we want to know whether to invest in YouTube server reviews vs TikTok clips, we need them separate.

### Q5. How satisfied are you with how easy it is to find good Hytale servers?
*5-point CSAT scale*
- [ ] 1 - Very dissatisfied
- [ ] 2 - Dissatisfied
- [ ] 3 - Neutral
- [ ] 4 - Satisfied
- [ ] 5 - Very satisfied

### Q6. What is the SINGLE biggest frustration when looking for a server?
*Single select — forces prioritization*
- [ ] Too many options, hard to know which is good
- [ ] Can't tell if a server is active or dead
- [ ] Servers don't match their description
- [ ] Can't find servers for my playstyle
- [ ] Same servers always at the top of lists
- [ ] No reviews or reliable info about the server before joining
- [ ] Server listings feel outdated or abandoned
- [ ] Server is too laggy after joining
- [ ] Don't know anyone on the server
- [ ] Other: ___

> **Design note**: Added "Same servers always at the top" — directly validates our core thesis that vote-based ranking is broken. Added "No reviews or reliable info" — validates review system need. Added "Listings feel outdated" — validates competitor weakness. Removed nothing — just expanded options.

---

## Section 3: What Matters in a Server (3 questions)

**Knowledge gap**: Validate our 4 rating dimensions and weights.

### Q7. When choosing a server, pick your TOP 3 most important factors:
*Multi-select, exactly 3 — Nicole Forsgren's "pick three" method*
- [ ] Friendly community & helpful staff
- [ ] Low lag and stable performance
- [ ] Unique gameplay or custom content
- [ ] Mod/plugin variety and support
- [ ] No pay-to-win mechanics
- [ ] Active player count (people are actually online)
- [ ] Good moderation (no hackers/griefers)
- [ ] Server region close to me (low ping)
- [ ] Regular updates and new content
- [ ] Other: ___

> **Design note**: Added "Server region close to me" — region filters are table stakes (HyServers, Universe, hytale-servers all have them). Region/ping is a separate concern from "Low lag and stable performance" — a well-optimized server can still be geographically far.

### Q8. Of your top 3, which one would make you LEAVE a server if it was bad?
*Single select from Q7 answers — identifies dealbreakers*
- [ ] (Dynamic: shows only their Q7 selections)

### Q9. How often do you switch servers?
*Single select*
- [ ] I stick with one server
- [ ] Every few weeks
- [ ] Every few days
- [ ] I play on multiple servers regularly
- [ ] I haven't found a server I like yet

> **Design note**: Added "Haven't found one I like" — captures the unsatisfied market, the exact people hytale.gg is built for.

---

## Section 4: Feature Prioritization — MaxDiff (3 questions)

**Knowledge gap**: Which features would players actually USE?

> **Design note**: Each set has 4 options testing a different dimension of our value proposition. All options are plausible for a PC game. Removed: QR code (Hytale is PC-only), push notifications for server activity (servers are on VPS/24/7), "server is online" (table stakes, not a differentiator — competitors already have it).

### Q10. MaxDiff Set 1 — Information before joining:
*"Which is MOST important and LEAST important to you?" Pick one most, one least.*

| Feature | Most Important | Least Important |
|---------|:-:|:-:|
| Read player reviews with specific ratings (community, performance, fairness) | ○ | ○ |
| Watch a video review showing actual gameplay on the server | ○ | ○ |
| See real-time player count and peak hours | ○ | ○ |
| Server "vibe tags" (e.g., "Chill builders", "Hardcore PvP", "Beginner-friendly") | ○ | ○ |

> Tests: text reviews vs video reviews vs hard data vs categorization

### Q11. MaxDiff Set 2 — How servers should surface to you:
*"Which is MOST important and LEAST important to you?" Pick one most, one least.*

| Feature | Most Important | Least Important |
|---------|:-:|:-:|
| Rotating "Server of the Day" spotlights (not always the same servers on top) | ○ | ○ |
| Filter servers by difficulty level (beginner-friendly vs. expert) | ○ | ○ |
| "Looking for Group" board to find teammates | ○ | ○ |
| See what servers your friends play on | ○ | ○ |

> Tests: algorithmic discovery vs filtering vs social LFG vs friend-based discovery

### Q12. MaxDiff Set 3 — Trust & quality signals:
*"Which is MOST important and LEAST important to you?" Pick one most, one least.*

| Feature | Most Important | Least Important |
|---------|:-:|:-:|
| Reviews show how many hours the reviewer played on that server | ○ | ○ |
| Server owner can respond to reviews | ○ | ○ |
| See a server's player retention rate (do people keep coming back?) | ○ | ○ |
| Filter to hide pay-to-win servers | ○ | ○ |
| The server is actively updated with new content or events | ○ | ○ |

> Tests: verified experience vs owner engagement vs retention data vs fairness filtering vs active maintenance. Added "actively updated" — Roblox's algorithm heavily weights recency/update frequency. Steam players check "last updated" dates. If this ranks high, update frequency should factor into the Quality Score.

---

## Section 5: Reviews & Trust (3 questions)

**Knowledge gap**: Would players write reviews? What makes reviews valuable?

> **Design note**: Modeled after trust patterns from **Steam**, Amazon, and Google Maps. Steam: hours played badge, helpful votes, aggregate sentiment labels ("Mostly Positive"), Curators as separate section. Amazon: verified purchase → verified playtime. Google Maps: owner responses, specific aspect ratings. Applied the strongest patterns to server reviews.

### Q13. How likely are you to write a review for a server you've played on?
*Single select — clean behavior question, no mixing with trust*
- [ ] Very likely — I like sharing my experience
- [ ] Only if I had a strong experience (really great or really bad)
- [ ] Unlikely — I'd read reviews but not write them
- [ ] Not interested in reviews at all

### Q14. What makes a server review trustworthy? (Pick top 2)
*Multi-select, max 2 — tests Steam/Amazon/Google Maps trust patterns*
- [ ] Shows how many hours the reviewer played on that server (Steam's hours played badge)
- [ ] Rates specific aspects separately (community, performance, fairness — not just 1-5 stars)
- [ ] Includes screenshots or video of actual gameplay
- [ ] The review is recent (less than 2 weeks old)
- [ ] Other players voted the review as "helpful" (Steam's helpful system)
- [ ] An overall sentiment summary like "Mostly Positive" or "Mixed" based on all reviews (Steam's aggregate label)
- [ ] The reviewer's username and playtime are visible (not anonymous)
- [ ] Separate "recent" and "all-time" review scores so you can see if a server improved (Steam's dual score)

> **Design note**: Swapped out "server owner responded" — already tested in Q12 MaxDiff ("Server owner can respond to reviews"). Replaced with Steam's aggregate sentiment label, which is a powerful trust shortcut: players see "Overwhelmingly Positive" and trust immediately without reading individual reviews. Added "username and playtime visible" — directly answers Review PRD open question #3 (anonymous vs named reviews). If this ranks high, reviews MUST show identity. Added "recent vs all-time" dual score (Steam pattern) — if this ranks high, we need to implement split scoring so servers that improved aren't punished by old reviews.

### Q15. What review format would be most useful for evaluating a server?
*Single select — fundamental design decision, tests Steam vs Amazon vs multi-criteria*
- [ ] Simple "Recommend / Don't Recommend" with a text comment (Steam style)
- [ ] 1-5 star rating with a text comment (Amazon/Google style)
- [ ] Rate specific aspects separately — community, performance, content, fairness (multi-criteria)
- [ ] Just show me an overall label like "Mostly Positive" — I don't read individual reviews

> **Design note**: Replaced creator trust question (already covered by Q10 MaxDiff: "Watch a video review showing actual gameplay"). This question tests a critical design decision we had ZERO data on: Steam uses binary thumbs up/down, Amazon uses stars, we assumed multi-criteria. The answer fundamentally shapes our review UI. Creator review *placement* (separate section like Steam Curators vs mixed with player reviews) is a design decision we can make based on Q10 results + Steam's proven pattern.

---

## Section 6: Research Behavior & Demographics (2 questions)

**Knowledge gap**: What do players do between hearing about a server and joining it? Language preference.

> **Design note**: Q16 was reframed from "how do you discover servers" (which overlapped with Q4) to "what do you do AFTER hearing about a server" — captures the research step between discovery and join. This is a genuinely different variable.

### Q16. After you hear about a server, what do you do before joining? (Pick top 2)
*Multi-select, max 2 — captures research behavior*
- [ ] Just join it and see for myself
- [ ] Check the server's listing page (player count, description, reviews)
- [ ] Join their Discord to get a feel for the community
- [ ] Look for YouTube/Twitch content about the server
- [ ] Ask friends or other players about it
- [ ] Browse server listing sites on my phone, then join from PC later
- [ ] Save/bookmark it to try later when I have time
- [ ] Follow the server to get notified about updates or events

> **Design note**: Added mobile browsing option to implicitly capture mobile research behavior. The roadmap targets 60% mobile traffic but we have zero data. If this option ranks high, it validates mobile-first investment. If nobody picks it, we can deprioritize PWA. Added "save/bookmark" (Steam wishlist pattern) — if high, bookmarks become both a feature AND a quality score signal. Added "follow for notifications" (Steam follow pattern) — tests whether players want persistent server relationships, which validates event notifications and update alerts.

### Q17. What language do you prefer for gaming content?
*Single select*
- [ ] English
- [ ] Spanish
- [ ] Portuguese
- [ ] French
- [ ] German
- [ ] Other: ___

---

## Thank You Screen

> Thanks for helping us build a better way to find Hytale servers!
> Follow @pixelkoh for updates.
> [Optional] Leave your Discord username to join our beta testers.

---

## Analysis Plan

| Question | Knowledge Gap It Fills | Decision It Informs |
|----------|----------------------|---------------------|
| Q1-Q2 | Player experience level | Segment by experience |
| Q3 | Game mode preference | Segment ALL other answers by playstyle |
| Q4 | How players find servers (by channel) | Where to promote hytale.gg, YouTube vs TikTok vs Twitch |
| Q5 | Satisfaction with current options | Market opportunity size |
| Q6 | #1 frustration (incl. vote manipulation, no reviews) | What to solve first, validates core thesis |
| Q7-Q8 | Rating criteria validation (incl. region) | Confirm/adjust 35/30/25/10 weights |
| Q9 | Server switching + unsatisfied market size | Retention metric design, TAM for discovery |
| Q10 | Info before joining: text vs video reviews vs data vs tags | Review system design, vibe tags priority |
| Q11 | Discovery method: algorithmic vs filter vs social vs friends | Featured rotation, LFG, friend feed priority |
| Q12 | Trust signals: verified playtime vs owner response vs retention vs P2W filter vs active updates (Roblox) | Quality score formula, review design, **update frequency in algorithm** |
| Q13 | Review writing likelihood | Review system viability |
| Q14 | Which trust patterns matter (Steam/Amazon/Google Maps) + anonymous vs named + recent vs all-time (Steam dual score) | Review UI design, aggregate labels, helpful votes, **Review PRD open Q #3**, split scoring |
| Q15 | Review FORMAT preference (Steam binary vs Amazon stars vs multi-criteria) | **Fundamental review system architecture — blocks Review PRD** |
| Q16 | Research behavior + mobile browsing + bookmarks (Steam wishlist) + follow for notifications (Steam follow) | Listing page design, Discord integration, **mobile-first PWA**, bookmark feature, server follow/notify |
| Q17 | Language preference | Bilingual priority |

### Statistical Targets
- **Minimum responses**: 50 for directional insights, 200 for statistical significance
- **Confidence level**: 95% with ±7% margin at n=200
- **MaxDiff analysis**: Requires minimum 30 responses per set

### Segmentation Plan
- **By game mode (Q3)**: PvP players vs Creative builders vs Survival vs RPG
- **By experience (Q1-Q2)**: New players vs veterans, single-server vs multi-server
- **By satisfaction (Q5)**: Dissatisfied (opportunity) vs Satisfied (what's working)
- **By switching (Q9)**: Loyal vs explorers vs unsatisfied
