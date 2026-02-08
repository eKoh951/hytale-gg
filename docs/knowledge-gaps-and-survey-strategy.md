# Knowledge Gaps & Survey Strategy

Summary of what we know, what we don't know, and how two targeted surveys will fill the gaps before building hytale.gg.

---

## 🔴 Critical Knowledge Gaps

### Gap 1: Rating Criteria Weights — Are We Right?
| What We Assumed | Evidence Level | Survey Question |
|-----------------|---------------|------------------|
| Community & Staff: 35% | Medium (Reddit quotes) | Player Q7-Q8 |
| Performance & Stability: 30% | Medium (Hytale-specific) | Player Q7-Q8 |
| Gameplay & Content: 25% | Low (inferred) | Player Q7-Q8 |
| Fairness (No P2W): 10% | Medium (leave trigger) | Player Q7-Q8 |

**Risk if wrong**: Entire ranking algorithm produces bad recommendations.

### Gap 2: How Hytale Players Find Servers TODAY
| What We Assumed | Evidence Level | Survey Question |
|-----------------|---------------|------------------|
| 40-50% word of mouth | Low (Minecraft data, not Hytale) | Player Q4 |
| 25-35% YouTube | Low (Minecraft data) | Player Q4 (now split: YouTube vs TikTok vs Twitch) |
| 15-25% directories | Low (Minecraft data) | Player Q4 |

**Risk if wrong**: We promote in the wrong channels.

### Gap 3: Feature Priorities — What Would Players Actually USE?
| Feature We Assumed Matters | Evidence Level | Survey Question |
|---------------------------|---------------|------------------|
| LFG boards | Low (forum requests) | Player Q11 MaxDiff |
| Server vibe tags | Low (one Reddit thread) | Player Q10 MaxDiff |
| Creator video reviews | Low (our assumption) | Player Q10 MaxDiff, Q13-Q15 |
| Friend activity feed | Low (social assumption) | Player Q11 MaxDiff |
| Rotating featured servers | Low (our thesis) | Player Q11 MaxDiff |

> Removed push notifications (servers are 24/7 on VPS) and QR quick-join (Hytale is PC-only).

**Risk if wrong**: We build features nobody uses.

### Gap 4: Research Behavior Between Discovery and Join
| What We Assumed | Evidence Level | Survey Question |
|-----------------|---------------|------------------|
| Players research before joining | Low (general assumption) | Player Q16 |
| Listing pages matter | Low (competitor pattern) | Player Q16 |
| Discord is a research step | Low (community pattern) | Player Q16 |

**Risk if wrong**: We over-invest in listing page detail when players just YOLO join.

### Gap 5: Would Players Actually Write Reviews?
| What We Assumed | Evidence Level | Survey Question |
|-----------------|---------------|------------------|
| Players will write reviews | Very Low (hope) | Player Q13 |
| Players trust creator reviews | Low (YouTube data) | Player Q14-Q15 |

**Risk if wrong**: Review system is empty, no quality signal.

### Gap 6: Server Owner Willingness to Pay
| What We Assumed | Evidence Level | Survey Question |
|-----------------|---------------|-----------------|
| $10-30/mo for analytics | Very Low (guess) | Owner Q8-Q9 |
| Owners want retention data | Low (Roblox analogy) | Owner Q8 (100-pt) |

**Risk if wrong**: SaaS model doesn't work, no revenue.

### Gap 7: Bilingual Demand
| What We Assumed | Evidence Level | Survey Question |
|-----------------|---------------|------------------|
| Spanish-speaking players exist | Low (your audience) | Player Q17 |

**Risk if wrong**: We invest in i18n with no demand.

### Gap 8: Game Mode Distribution Among Multiplayer Players
| What We Assumed | Evidence Level | Survey Question |
|-----------------|---------------|------------------|
| PvP is dominant | Low (Minecraft data) | Player Q3 |

**Risk if wrong**: We prioritize the wrong game mode.

### Gap 9: Vote-Based Ranking Frustration (Core Thesis Validation)
| What We Assumed | Evidence Level | Survey Question |
|-----------------|---------------|------------------|
| Vote-based ranking is broken | Medium (Reddit) | Player Q6 ("Same servers always at top") |

**Risk if wrong**: Our core thesis is wrong.

---

## 🟡 Medium Knowledge Gaps

| Gap | Evidence Level | How We'll Fill It |
|-----|---------------|-------------------|
| Game mode distribution among multiplayer players | None | Player Q3 (new) |
| Server switching frequency + unsatisfied market size | None | Player Q9 |
| Research behavior before joining | None | Player Q16 (new) |
| Mobile browsing behavior (PC-only game) | None | Player Q16 ("browse on my phone" option) |
| Anonymous vs named reviews | None | Player Q14 ("username and playtime visible" option) |
| Recent vs all-time review split (Steam dual score) | None | Player Q14 ("separate recent and all-time scores" option) |
| Server update frequency as trust signal (Roblox pattern) | None | Player Q12 MaxDiff ("actively updated" option) |
| Bookmark/save servers for later (Steam wishlist pattern) | None | Player Q16 ("save/bookmark" option) |
| Follow servers for update notifications (Steam follow) | None | Player Q16 ("follow for notifications" option) |
| Review format preference (binary vs stars vs multi-criteria) | None | Player Q15 + Owner Q17 — **blocks Review PRD implementation** |
| Hosting provider distribution | None | Owner Q5 (new — feeds Hosting Reviews PRD) |
| Owner monthly spend (anchors WTP) | None | Owner Q6 (new — segments price sensitivity) |
| Competitor market share among owners | None | Owner Q7 |
| Owner satisfaction with current directories | None | Owner Q8 |
| Top 3 growth challenges for owners | None | Owner Q9 (top 3, not single-select — reveals cluster of pain points) |
| #1 listing friction point | None | Owner Q10 (new — what to eliminate in listing UX) |
| Auto-seeding sentiment (would owners welcome auto-imported listings?) | None | Owner Q11 (new — **validates or kills scraper strategy**) |
| Which analytics data owners actually value (funnel-based) | None | Owner Q13 (100-pt allocation — rewritten with owner-friendly language) |
| What upgrade features trigger payment (freemium design) | None | Owner Q14 (new — **determines free vs paid tier split**) |
| Price sensitivity for analytics (after seeing value) | None | Owner Q14b (new — separated from feature question) |
| Owner sentiment toward reviews | None | Owner Q15-Q16 |
| What would make owners list immediately | None | Owner Q18 (open text) |

### Gaps Identified But NOT in Survey (accepted risks or deferred)

| Gap | Why Not in Survey | How We'll Address It |
|-----|-------------------|---------------------|
| Would players voluntarily add servers they don't own? | Behavioral — people lie about future actions | Test in beta with real behavior data |
| Do players want an AI game assistant? | Too speculative for a 4-min survey | Phase 2 — validate with prototype |
| Do players want personal tags/collections? | Nice-to-have, not critical for MVP decisions | Build lightweight, measure adoption |
| Do players want browser-based ping testing? | Lag concern validated by Q7, specific feature is design decision | Build it — low risk, high table-stakes value |

---

## 🟢 What We're Confident About (No Survey Needed)

| Finding | Evidence Level | Source |
|---------|---------------|--------|
| Vote-based ranking is broken | High | Multiple Reddit threads + all competitors use it |
| No competitor has creator reviews | High | Direct site scraping of all 5 |
| No competitor is mobile-first | High | Direct site scraping |
| No competitor is bilingual | High | Direct site scraping |
| Hytale uses QUIC/UDP protocol | High | Official docs |
| ~700-800 servers exist across directories | High | Direct counts |
| YouTube server review gap exists | High | Perplexity research |
| 420K+ Twitch viewers at launch | High | PC Gamer, multiple sources |

---

## 📋 Survey Distribution Strategy

### Player Survey (Target: 200 responses)

| Channel | Expected Responses | Timing |
|---------|-------------------|--------|
| r/HytaleInfo (75K+ members) | 50-80 | Post as "Help us build a better server finder" |
| r/hytale | 20-40 | Cross-post |
| Hytale Discord (official) | 30-50 | Share in #community or #servers |
| Twitter/X @pixelkoh | 10-20 | Thread with survey link |
| TikTok @pixelkoh | 10-20 | Video asking for help |
| Server Discord communities | 20-30 | DM to active server Discords |

### Server Owner Survey (Target: 50 responses)

| Channel | Expected Responses | Timing |
|---------|-------------------|--------|
| r/HytaleInfo server promo threads | 10-15 | DM owners who post |
| Competitor directory listings | 15-20 | Contact top servers on HytaleTop100 |
| Hosting provider Discords | 10-15 | Cybrancee, Apex, Pine communities |
| Direct outreach (top 20 servers) | 5-10 | Personal Discord DMs |

### Timeline

| Week | Action |
|------|--------|
| **Week 1** | Create surveys in Google Forms / Tally |
| **Week 1** | Post player survey on Reddit + Discord |
| **Week 2** | Direct outreach to server owners |
| **Week 2-3** | Collect responses (keep open 2 weeks) |
| **Week 3** | Analyze results, update requirements |
| **Week 3** | Conduct 5-10 owner interviews (Discord calls) |
| **Week 4** | Final requirements document with data backing |

---

## 🎯 Decision Matrix: What Changes Based on Results

| If Survey Shows... | Then We... |
|-------------------|------------|
| Community < Performance in Q7 | Swap weights: Performance 35%, Community 30% |
| "Same servers always at top" is #1 frustration (Q6) | Double down on discovery algorithm as MVP centerpiece |
| Most players "just join and see" (Q16) | Simplify listing pages, invest in quick-join UX |
| Players won't write reviews (Q13) | Pivot to creator-only reviews + automated signals |
| Owners won't pay for analytics (Owner Q14) | Drop SaaS model, monetize via hosting affiliates |
| LFG ranks low in MaxDiff (Q11) | Move to Phase 2, not MVP |
| >30% Spanish speakers (Q17) | Accelerate bilingual launch |
| Owners hate reviews (Owner Q15) | Add owner response feature as MUST, not SHOULD |
| YouTube >> TikTok for discovery (Q4) | Prioritize YouTube server review content over TikTok |
| "Haven't found a server I like" is >20% (Q9) | Confirms large unsatisfied market — validate TAM |
| PvP is dominant game mode (Q3) | Weight PvP-specific features higher in MVP |
| Binary review format wins Q15 | Restructure Review PRD: drop 4-dimension stars, implement Recommend/Don't Recommend + text |
| Multi-criteria wins Q15 | Proceed with current Review PRD as-is |
| "Username visible" ranks high in Q14 | Reviews MUST show identity — answer Review PRD open question #3 as "always show username" |
| "Browse on phone" ranks high in Q16 | Validates mobile-first PWA investment — keep 60% mobile target |
| Nobody picks "browse on phone" in Q16 | Deprioritize PWA, focus on responsive desktop web |
| "Love it" + "Great, can edit" > 60% in Owner Q11 | Full auto-seeding at launch — scrape competitors, create unclaimed listings |
| "Approve first" dominates Owner Q11 | Build notification + claim flow — scrape but don't publish until owner approves |
| "Rather do it myself" > 30% in Owner Q11 | Pivot to "Import from URL" button — owner-initiated, not automatic |
| "Multiple sites" or "banners" wins Owner Q10 | Auto-seeding + auto-generated banners are top priority features |
| "Initial visibility" wins Owner Q10 | Discovery algorithm matters more than listing UX for owners |
| "Actively updated" ranks high in Q12 MaxDiff | Factor update frequency into Quality Score — reward active server owners (Roblox pattern) |
| "Recent vs all-time" ranks high in Q14 | Implement Steam-style dual scoring — servers that improved aren't punished by old reviews |
| "Save/bookmark" ranks high in Q16 | Bookmarks become Phase 1 feature + quality score signal (like Steam wishlists) |
| "Follow for notifications" ranks high in Q16 | Build server follow system with update/event alerts — retention mechanism |

---

## Files Reference

| Document | Purpose |
|----------|---------|
| `docs/player-server-discovery-survey.md` | Full player survey (17 questions) |
| `docs/server-owner-survey.md` | Full owner survey (18 questions) + interview guide |
| `docs/server-directory-competitive-analysis-feb-2026.md` | Competitive intelligence |
| `docs/roadmap.md` | Product roadmap (updated with survey caveats) |
| `tasks/prd-review-system.md` | Review system PRD (blocked on Q15 results) |
| `tasks/prd-discovery-system.md` | Discovery system PRD (Hidden Gems added) |
| `tasks/prd-server-listing.md` | Server listing PRD |
| `tasks/prd-analytics-dashboard.md` | Analytics dashboard PRD |
| `tasks/prd-hosting-reviews.md` | Hosting reviews PRD |
| `.windsurf/plans/hytale-server-directory-requirements-730f16.md` | Requirements (v4) |
| `.windsurf/plans/hytale-player-pain-points-research-d5d4d5.md` | Pain points research |
