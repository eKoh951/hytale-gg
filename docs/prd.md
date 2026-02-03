# hytale.gg Product Requirements Document (PRD)

**Version**: 1.0  
**Last Updated**: February 2, 2026  
**Product Owner**: pixelkoh (Erick Ponce)  
**Status**: Draft - Open for Discussion

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Project Overview](#2-project-overview)
3. [Target Audience](#3-target-audience)
4. [Core Features & Requirements](#4-core-features--requirements)
5. [User Flows](#5-user-flows)
6. [Technical Architecture](#6-technical-architecture)
7. [Data Model](#7-data-model)
8. [Implementation Plan](#8-implementation-plan)
9. [Success Metrics & KPIs](#9-success-metrics--kpis)
10. [Risk Assessment](#10-risk-assessment)
11. [Open Questions & Discussion Points](#11-open-questions--discussion-points)

---

## 1. Executive Summary

### Vision
Build the premier mobile-first, bilingual Hytale server directory with creator-driven discovery, positioning hytale.gg as the go-to community hub for Hytale players seeking servers, resources, and authentic content creator reviews.

### Mission
Help players find their perfect Hytale community through personalized recommendations, authentic video reviews, and a seamless mobile-first experience.

### Market Opportunity
- **Timing**: Hytale launched January 13, 2026 (3 weeks ago) - perfect window for first-mover advantage
- **Gap**: No mobile-first, creator-integrated server directory exists in the Hytale space
- **Audience**: 62M+ YouTube trailer views indicate massive potential player base
- **Commitment**: Hypixel Studios has announced 10-year development commitment
- **Console Expansion**: Q3-Q4 2026 console release will significantly expand the audience

### Success Targets (Year 1)
| Metric | Target |
|--------|--------|
| Daily Active Users | 1,000+ |
| Listed Servers | 500+ |
| Creator Reviews per Week | 5+ |
| Mobile Traffic | 60%+ |

---

## 2. Project Overview

### 2.1 What is hytale.gg?

hytale.gg is a community-driven platform that helps Hytale players discover servers, explore mods, and find communities that match their playstyle. Unlike existing competitors that focus solely on traditional server listings, hytale.gg differentiates through:

1. **Mobile-First Design**: Progressive Web App (PWA) optimized for the TikTok generation
2. **Creator Integration**: Authentic video reviews embedded from TikTok, YouTube, and Twitch
3. **AI-Powered Assistant**: Bilingual (English/Spanish) natural language help for new players
4. **Personalized Discovery**: Machine learning-based server recommendations
5. **Personal Organization**: Custom tagging system for personal server collections

### 2.2 Why Now?

| Factor | Implication |
|--------|-------------|
| Hytale Early Access just launched | Community is forming; habits not yet established |
| No dominant mobile-first platform | First-mover advantage available |
| Creator ecosystem emerging | Partnership opportunities before saturation |
| 10-year development commitment | Long-term platform viability assured |
| Console release in H2 2026 | Massive audience expansion incoming |

### 2.3 Competitive Landscape

| Competitor | Strengths | Weaknesses |
|------------|-----------|------------|
| HytaleTop100 | Server rankings, active blog | Desktop-focused, English only |
| Hytale123 | Comprehensive wiki | Desktop-focused, no creator integration |
| Hytale Hub | Forums, tournaments | Traditional format, dated UX |
| Fandom Wiki | Established platform | Generic template, no community features |

**hytale.gg Differentiators**:
- Mobile-first PWA architecture
- Creator video review integration
- AI-powered game assistant
- Bilingual support (English/Spanish)
- Personal tagging and organization system
- Real-time ping testing

---

## 3. Target Audience

### 3.1 Primary Personas

#### Persona 1: The New Explorer
- **Demographics**: 16-25 years old, US-based
- **Behavior**: Discovers games through TikTok/YouTube, plays on mobile & PC
- **Needs**: Easy server discovery, beginner-friendly guides, quick information
- **Goals**: Find a welcoming community to start their Hytale journey
- **Pain Points**: Overwhelmed by choices, doesn't know what makes a good server

#### Persona 2: The Minecraft Veteran
- **Demographics**: 18-30 years old, experienced sandbox gamer
- **Behavior**: Migrating from Minecraft, seeks similar but improved experience
- **Needs**: Advanced filtering, server comparison, performance metrics (ping)
- **Goals**: Find high-quality servers matching their preferred playstyle
- **Pain Points**: Hard to assess server quality before investing time

#### Persona 3: The Content Consumer
- **Demographics**: 14-28 years old, follows gaming creators
- **Behavior**: Watches streams and videos before trying games/servers
- **Needs**: Authentic reviews, video content, creator recommendations
- **Goals**: Trust creator opinions to guide their server choices
- **Pain Points**: Reviews scattered across platforms, hard to find reliable opinions

#### Persona 4: The Server Owner
- **Demographics**: 20-35 years old, technically skilled
- **Behavior**: Runs a Hytale server, wants to grow community
- **Needs**: Visibility, analytics, player feedback, listing management
- **Goals**: Attract players and understand what works
- **Pain Points**: Difficult to stand out, limited analytics on player discovery

### 3.2 Geographic Focus

| Priority | Region | Language |
|----------|--------|----------|
| Primary | United States | English |
| Secondary | Latin America | Spanish |
| Tertiary | Europe, Asia | English |

---

## 4. Core Features & Requirements

### Phase 1: Foundation Platform (MVP)

#### 4.1 Server Discovery

**User Story**: As a Hytale player, I want to discover servers that match my playstyle so I can find communities I'll enjoy.

**Requirements**:

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| SD-01 | Server listing display | P0 | Shows name, IP, description, player count, status |
| SD-02 | Category filtering | P0 | Filter by PvP, Survival, Creative, Roleplay, etc. |
| SD-03 | Search functionality | P0 | Keyword search returns results within 2 seconds |
| SD-04 | Region filtering | P0 | Filter by US, EU, Asia, Latin America |
| SD-05 | Real-time player count | P1 | Updates every 5 minutes |
| SD-06 | Server status indicators | P0 | Shows online/offline status accurately |
| SD-07 | Multiple filter combination | P1 | Apply multiple filters simultaneously |
| SD-08 | Sort options | P1 | Sort by popularity, player count, newest, rating |

**UI/UX Considerations**:
- Card-based layout for mobile scrolling
- Quick-filter chips at top of list
- Server cards show key info at a glance
- One-tap to copy server IP

#### 4.2 Ping Testing

**User Story**: As a player, I want to test my connection quality to servers before joining so I don't waste time on laggy experiences.

**Requirements**:

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| PT-01 | One-click ping test | P0 | Test initiates from browser with single tap |
| PT-02 | Visual latency indicators | P0 | Shows Excellent (<50ms), Good (50-100ms), Poor (>100ms) |
| PT-03 | Historical ping data | P2 | Track last 30 days of ping history |
| PT-04 | Ping-based recommendations | P2 | Suggest low-ping servers to user |
| PT-05 | Connection quality score | P1 | Aggregate score combining ping, stability |

**Technical Considerations**:
- Browser-based WebSocket ping (limited accuracy)
- Consider server-side ping proxy for better accuracy
- Cache results to reduce redundant tests

#### 4.3 Personal Tags System

**User Story**: As a player, I want to tag servers with my own labels so I can organize and remember servers that interest me.

**Requirements**:

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| TG-01 | Custom tag creation | P0 | Users can create tags with name and color |
| TG-02 | Tag application to servers | P0 | Apply unlimited tags to any server |
| TG-03 | Tag-based filtering | P0 | Filter server list by selected tags |
| TG-04 | Personal collections | P1 | Group tagged servers into named collections |
| TG-05 | Tag sharing | P3 | Optionally share tags with community |
| TG-06 | Smart tag suggestions | P2 | Suggest tags based on server description |

**Data Privacy**:
- Personal tags are private by default
- Explicit opt-in for sharing

#### 4.4 Mobile-First Design (PWA)

**User Story**: As a mobile user, I want a fast, intuitive experience so I can discover servers while playing or on the go.

**Requirements**:

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| PWA-01 | PWA installability | P0 | Passes Lighthouse PWA audit |
| PWA-02 | Touch-optimized interface | P0 | All interactions work smoothly on 4"+ screens |
| PWA-03 | Offline server list | P1 | Cached data loads offline within 2 seconds |
| PWA-04 | Push notifications | P2 | Notify for favorite server status changes |
| PWA-05 | Mobile gestures | P1 | Swipe actions for common operations |
| PWA-06 | Service worker caching | P0 | Core assets cached for offline access |

**Performance Targets**:
- Lighthouse Performance: >90
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Core Web Vitals: All green

---

### Phase 2: Differentiation Features

#### 4.5 AI Game Assistant

**User Story**: As a new player, I want to ask questions about Hytale in natural language so I can learn the game quickly.

**Requirements**:

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| AI-01 | Natural language queries | P1 | Understands common Hytale questions |
| AI-02 | Bilingual support | P1 | Responds accurately in English and Spanish |
| AI-03 | Knowledge base updates | P2 | Updates with game patches within 1 week |
| AI-04 | Contextual server recommendations | P2 | Suggests servers based on questions asked |
| AI-05 | Voice input (mobile) | P3 | Accept voice queries on mobile devices |
| AI-06 | Conversation history | P2 | Remember context within session |

**Technical Approach**:
- OpenAI API integration via Vercel AI SDK
- Custom knowledge base with Hytale-specific content
- RAG (Retrieval Augmented Generation) for accuracy

#### 4.6 Creator Review Integration

**User Story**: As a player, I want to see authentic video reviews of servers so I can make informed decisions.

**Requirements**:

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| CR-01 | Video embedding | P1 | Embed TikTok, YouTube, Twitch videos smoothly |
| CR-02 | Creator verification | P1 | Verified creators have visible badges |
| CR-03 | Review scoring system | P2 | Consistent rating criteria across reviews |
| CR-04 | Review discussions | P2 | Community can comment on reviews |
| CR-05 | Creator spotlights | P2 | Featured creator sections |
| CR-06 | Review submission workflow | P1 | Creators can submit reviews for approval |

**Content Strategy**:
- Target: 5 creator reviews per week (aligned with pixelkoh content schedule)
- Verification criteria: 1000+ followers on any platform

#### 4.7 Advanced Recommendation Engine

**User Story**: As a player, I want personalized server recommendations so I can discover communities I'll love.

**Requirements**:

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| RE-01 | Behavior-based suggestions | P2 | Recommendations improve with interaction |
| RE-02 | "Players like you" | P2 | Show what similar users enjoyed |
| RE-03 | Trending identification | P2 | Highlight trending servers weekly |
| RE-04 | Recommendation explanations | P2 | Show why each server is recommended |
| RE-05 | Privacy controls | P1 | Users can opt-out of tracking |

---

### Phase 3: Platform Expansion

#### 4.8 Mod Discovery Hub

**Requirements**:

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| MOD-01 | Mod database and search | P2 | Covers 100+ popular mods |
| MOD-02 | Server-mod compatibility | P2 | Warnings prevent conflicts |
| MOD-03 | Installation guides | P2 | Step-by-step instructions |
| MOD-04 | Community ratings | P3 | Ratings influence mod visibility |

#### 4.9 Community Tools

**Requirements**:

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| CT-01 | Event calendar | P2 | Create events with all details |
| CT-02 | Tournament hosting | P3 | Auto-generate tournament brackets |
| CT-03 | Community forums | P3 | Support rich media and moderation |
| CT-04 | Team recruitment | P3 | Recruitment posts find matching players |

#### 4.10 Analytics Dashboard (Server Owners)

**Requirements**:

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| AN-01 | Player count trends | P2 | Real-time analytics updates |
| AN-02 | Geographic distribution | P3 | Show where players come from |
| AN-03 | Exportable reports | P3 | Export in multiple formats |
| AN-04 | Performance alerts | P3 | Trigger for issues |

---

## 5. User Flows

### 5.1 Server Discovery Flow (Primary)

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER JOURNEY                             │
└─────────────────────────────────────────────────────────────────┘

[Landing Page]
     │
     ├──► Browse All Servers ──► [Server List]
     │                                │
     │                                ├──► Apply Filters (Category, Region)
     │                                │         │
     │                                │         └──► View Filtered Results
     │                                │
     │                                ├──► Search by Keyword
     │                                │         │
     │                                │         └──► View Search Results
     │                                │
     │                                └──► Click Server Card
     │                                          │
     │                                          ▼
     │                              [Server Detail Page]
     │                                          │
     │                                          ├──► View Server Info
     │                                          ├──► Run Ping Test
     │                                          ├──► Watch Creator Reviews
     │                                          ├──► Add Personal Tags
     │                                          ├──► Copy Server IP
     │                                          └──► Add to Favorites
     │
     ├──► Ask AI Assistant ──► [Chat Interface]
     │                                │
     │                                └──► Ask Question
     │                                          │
     │                                          └──► Receive Answer + Server Suggestions
     │
     └──► View Creator Reviews ──► [Reviews Page]
                                          │
                                          └──► Browse by Creator/Server
                                                    │
                                                    └──► Watch Video Review
```

### 5.2 Server Owner Flow

```
[Register/Login]
     │
     └──► [Dashboard]
              │
              ├──► Add New Server
              │         │
              │         └──► Fill Server Details
              │                   │
              │                   └──► Submit for Review
              │                            │
              │                            └──► [Pending Approval]
              │                                      │
              │                                      └──► [Server Listed]
              │
              ├──► Manage Existing Servers
              │         │
              │         ├──► Edit Details
              │         ├──► View Analytics
              │         └──► Respond to Reviews
              │
              └──► View Analytics Dashboard
                        │
                        ├──► Player Trends
                        ├──► Geographic Data
                        └──► Export Reports
```

### 5.3 Creator Review Flow

```
[Creator Login]
     │
     └──► [Creator Dashboard]
              │
              ├──► Submit New Review
              │         │
              │         ├──► Select Server
              │         ├──► Add Video URL
              │         ├──► Fill Rating Criteria
              │         └──► Submit
              │                   │
              │                   └──► [Pending Approval]
              │                            │
              │                            └──► [Review Published]
              │
              └──► Manage Reviews
                        │
                        ├──► View Performance
                        └──► Edit/Delete Reviews
```

---

## 6. Technical Architecture

### 6.1 Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Frontend** | Next.js 16 + React 19 | Modern SSR/SSG, excellent DX, PWA support |
| **Styling** | Tailwind CSS 4 | Utility-first, design system ready |
| **UI Components** | shadcn/ui | Accessible, customizable components |
| **State Management** | SWR | Data fetching, caching, sync |
| **Database** | PostgreSQL (Supabase/Neon) | Relational data, real-time subscriptions |
| **Cache** | Redis (Upstash) | Session storage, rate limiting, real-time |
| **Search** | Elasticsearch or Algolia | Fast server discovery (Phase 2) |
| **AI** | Vercel AI SDK + OpenAI | Assistant functionality |
| **Authentication** | Supabase Auth or custom | User accounts |
| **Hosting** | Vercel | Edge network, automatic scaling |
| **CDN** | Vercel Edge | Global distribution |

### 6.2 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Web App   │  │     PWA     │  │   Mobile    │             │
│  │  (Browser)  │  │  (Installed)│  │  (Future)   │             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                     │
│         └────────────────┼────────────────┘                     │
│                          │                                       │
└──────────────────────────┼───────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                       EDGE LAYER (Vercel)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Next.js 16 App                        │    │
│  ├─────────────────────────────────────────────────────────┤    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │    │
│  │  │   Server    │  │   API       │  │   Server    │      │    │
│  │  │ Components  │  │   Routes    │  │   Actions   │      │    │
│  │  └─────────────┘  └─────────────┘  └─────────────┘      │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐                       │
│  │  Edge Functions │  │  Middleware     │                       │
│  │  (Rate Limit)   │  │  (Auth/i18n)    │                       │
│  └─────────────────┘  └─────────────────┘                       │
│                                                                  │
└──────────────────────────┬───────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SERVICE LAYER                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │   Supabase   │  │    Redis     │  │   OpenAI     │           │
│  │  (Database   │  │   (Upstash)  │  │   (AI SDK)   │           │
│  │   + Auth)    │  │              │  │              │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐                              │
│  │  Server      │  │   Video      │                              │
│  │  Monitor     │  │   Embeds     │                              │
│  │  (Cron Job)  │  │  (oEmbed)    │                              │
│  └──────────────┘  └──────────────┘                              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 6.3 Performance Requirements

| Metric | Target | Measurement |
|--------|--------|-------------|
| Lighthouse Performance | >90 | Automated testing |
| First Contentful Paint | <1.5s | Web Vitals |
| Largest Contentful Paint | <2.5s | Web Vitals |
| Time to Interactive | <3s | Web Vitals |
| Cumulative Layout Shift | <0.1 | Web Vitals |
| API Response Time | <200ms | P95 latency |
| Search Response Time | <500ms | P95 latency |

### 6.4 Security Requirements

| Requirement | Implementation |
|-------------|----------------|
| HTTPS | Enforced via Vercel |
| Authentication | Supabase Auth with MFA option |
| Authorization | Row Level Security (RLS) |
| Input Validation | Zod schemas + server-side validation |
| Rate Limiting | Upstash Redis rate limiter |
| SQL Injection | Parameterized queries via Supabase |
| XSS Protection | React DOM escaping + CSP headers |

---

## 7. Data Model

### 7.1 Entity Relationship Diagram

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│     USERS       │       │     SERVERS     │       │    CATEGORIES   │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id (PK)         │       │ id (PK)         │       │ id (PK)         │
│ email           │       │ name            │       │ name            │
│ username        │       │ ip_address      │       │ slug            │
│ avatar_url      │       │ description     │       │ icon            │
│ role            │       │ owner_id (FK)   │───────│ description     │
│ language_pref   │       │ region          │       └─────────────────┘
│ created_at      │       │ status          │
│ updated_at      │       │ player_count    │       ┌─────────────────┐
└────────┬────────┘       │ max_players     │       │    REGIONS      │
         │                │ created_at      │       ├─────────────────┤
         │                │ updated_at      │       │ id (PK)         │
         │                └────────┬────────┘       │ name            │
         │                         │                │ code            │
         │                         │                └─────────────────┘
         ▼                         ▼
┌─────────────────┐       ┌─────────────────┐
│   USER_TAGS     │       │ SERVER_CATEGORIES│
├─────────────────┤       ├─────────────────┤
│ id (PK)         │       │ server_id (FK)  │
│ user_id (FK)    │       │ category_id (FK)│
│ name            │       └─────────────────┘
│ color           │
│ created_at      │       ┌─────────────────┐
└────────┬────────┘       │    REVIEWS      │
         │                ├─────────────────┤
         ▼                │ id (PK)         │
┌─────────────────┐       │ server_id (FK)  │
│ SERVER_USER_TAGS│       │ creator_id (FK) │
├─────────────────┤       │ video_url       │
│ server_id (FK)  │       │ platform        │
│ user_id (FK)    │       │ rating          │
│ tag_id (FK)     │       │ content         │
│ created_at      │       │ status          │
└─────────────────┘       │ created_at      │
                          └─────────────────┘
┌─────────────────┐
│   FAVORITES     │       ┌─────────────────┐
├─────────────────┤       │   PING_LOGS     │
│ user_id (FK)    │       ├─────────────────┤
│ server_id (FK)  │       │ id (PK)         │
│ created_at      │       │ server_id (FK)  │
└─────────────────┘       │ user_id (FK)    │
                          │ latency_ms      │
                          │ region          │
                          │ created_at      │
                          └─────────────────┘
```

### 7.2 Core Tables

#### Users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  avatar_url TEXT,
  role VARCHAR(20) DEFAULT 'user', -- user, creator, server_owner, admin
  language_pref VARCHAR(5) DEFAULT 'en', -- en, es
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Servers
```sql
CREATE TABLE servers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  ip_address VARCHAR(255) NOT NULL,
  description TEXT,
  owner_id UUID REFERENCES users(id),
  region VARCHAR(20) NOT NULL, -- us, eu, asia, latam
  status VARCHAR(20) DEFAULT 'pending', -- pending, active, offline, banned
  player_count INTEGER DEFAULT 0,
  max_players INTEGER,
  website_url TEXT,
  discord_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 8. Implementation Plan

### Overview

The implementation is divided into 5 phases over approximately 18-22 weeks. **Phase 0 (Foundational)** establishes the visual identity and backend services before feature development begins. Each subsequent phase builds upon the previous, with clear deliverables and dependencies.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        IMPLEMENTATION TIMELINE                          │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Phase 0: Foundation              Phase 1: MVP Foundation               │
│  ┌─────────────────────┐          ┌─────────────────────┐              │
│  │ Weeks 1-2           │          │ Weeks 3-8           │              │
│  │                     │          │                     │              │
│  │ • Visual Prototype  │    ──►   │ • Core Infrastructure│             │
│  │ • Design System     │          │ • Server Directory  │              │
│  │ • Backend Services  │          │ • User Accounts     │              │
│  │ • Auth Setup        │          │ • Mobile PWA        │              │
│  └─────────────────────┘          └─────────────────────┘              │
│                                                                         │
│  Phase 2: Differentiation         Phase 3: Expansion                    │
│  ┌─────────────────────┐          ┌─────────────────────┐              │
│  │ Weeks 9-14          │          │ Weeks 15-18         │              │
│  │                     │          │                     │              │
│  │ • AI Assistant      │    ──►   │ • Mod Discovery     │              │
│  │ • Creator Reviews   │          │ • Community Tools   │              │
│  │ • Recommendations   │          │ • Events System     │              │
│  │ • Enhanced UX       │          │                     │              │
│  └─────────────────────┘          └─────────────────────┘              │
│                                                                         │
│  Phase 4: Growth                                                        │
│  ┌─────────────────────┐                                               │
│  │ Weeks 19-22         │                                               │
│  │                     │                                               │
│  │ • Analytics         │                                               │
│  │ • Optimization      │                                               │
│  │ • Marketing Launch  │                                               │
│  └─────────────────────┘                                               │
│                                                                         │
└────────────────────────────────────────────────────────────────────────┘
```

---

### Phase 0: Foundation (Weeks 1-2)

**Goal**: Establish the visual identity, design system, and backend infrastructure before feature development begins. This phase prioritizes rapid iteration on design direction and ensures backend services are properly configured.

#### Week 1: Visual Prototype & Design System

**Objective**: Create a high-fidelity visual prototype that establishes the look and feel of hytale.gg, enabling stakeholder feedback before committing to implementation.

**Deliverables**:
- [ ] Landing page visual prototype (fully interactive mockup)
- [ ] Design system documentation
- [ ] Component library foundation (Button, Card, Input, etc.)
- [ ] Color palette implementation (brand colors to CSS variables)
- [ ] Typography system (Inter + Press Start 2P integration)
- [ ] Dark mode as default theme (gaming audience preference)
- [ ] Responsive breakpoint strategy
- [ ] Animation and interaction patterns

**Design Principles**:
```
1. Dark-first: Gaming audiences prefer dark themes
2. Mobile-first: Primary target is mobile users (60%+ target)
3. Voxel aesthetic: Subtle nods to Hytale's blocky art style
4. Performance: Design for speed (minimal assets, optimized images)
5. Accessibility: WCAG 2.1 AA compliance from the start
```

**Visual Prototype Scope**:
The landing page prototype should showcase:
- Hero section with value proposition
- Server discovery preview (mock server cards)
- Feature highlights (ping testing, tags, creator reviews)
- Mobile navigation pattern
- CTA for server owners and players
- Footer with links and branding

**Design Tokens Implementation**:
```css
/* Core brand colors from branding.md */
--primary: #8B4FC1;      /* Purple - brand primary */
--secondary: #FFB800;    /* Yellow - accent, CTAs */
--background: #0A0A0A;   /* Very dark - gaming theme */
--card: #1F2937;         /* Darker card surfaces */
--grass: #7CBD3E;        /* Hytale grass block green */
--dirt: #8B6F47;         /* Hytale dirt brown */
```

**Acceptance Criteria**:
- [ ] Landing page visually approved by stakeholder
- [ ] Design system covers 80%+ of anticipated UI needs
- [ ] All components support dark mode
- [ ] Responsive design works on 320px - 1920px viewports
- [ ] Lighthouse accessibility score > 90

---

#### Week 2: Backend Services Setup

**Objective**: Configure all backend services required for MVP development, ensuring authentication and data persistence are ready before feature implementation.

**Deliverables**:
- [ ] Supabase project setup and configuration
- [ ] Database schema deployment (core tables)
- [ ] Authentication system (Google OAuth + Discord OAuth)
- [ ] Upstash Redis integration for caching
- [ ] Environment variables documented and configured
- [ ] API route structure established
- [ ] Rate limiting middleware
- [ ] Error handling patterns

**Backend Services Architecture**:
```
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND SERVICES                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────┐    ┌─────────────────┐                     │
│  │    Supabase     │    │  Upstash Redis  │                     │
│  │                 │    │                 │                     │
│  │ • PostgreSQL DB │    │ • Session Cache │                     │
│  │ • Auth (OAuth)  │    │ • Rate Limiting │                     │
│  │ • Row Level Sec │    │ • Real-time     │                     │
│  │ • Real-time     │    │ • Job Queues    │                     │
│  └────────┬────────┘    └────────┬────────┘                     │
│           │                      │                               │
│           └──────────┬───────────┘                               │
│                      │                                           │
│           ┌──────────▼──────────┐                               │
│           │   Next.js 16 API    │                               │
│           │   (Route Handlers)  │                               │
│           └─────────────────────┘                               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Supabase Configuration Tasks**:
```
1. Create Supabase project
2. Configure OAuth providers:
   - Google OAuth (primary)
   - Discord OAuth (gaming community preferred)
3. Deploy initial schema:
   - users table with profiles
   - servers table (ready for Phase 1)
   - user_roles enum
4. Configure Row Level Security (RLS) policies
5. Set up database triggers for updated_at
6. Create storage buckets for avatars
```

**Upstash Redis Configuration Tasks**:
```
1. Create Upstash Redis database
2. Configure rate limiting:
   - API endpoints: 100 req/min per IP
   - Auth endpoints: 10 req/min per IP
   - Search: 30 req/min per user
3. Set up session caching strategy
4. Prepare pub/sub for real-time updates (Phase 1)
```

**Authentication Flow**:
```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   User      │      │  Next.js    │      │  Supabase   │
│  (Browser)  │      │   App       │      │    Auth     │
└──────┬──────┘      └──────┬──────┘      └──────┬──────┘
       │                    │                     │
       │ Click "Login"      │                     │
       │───────────────────►│                     │
       │                    │ Redirect to OAuth   │
       │                    │────────────────────►│
       │                    │                     │
       │◄───────────────────│◄────────────────────│
       │  OAuth Provider    │  Provider Login     │
       │    (Google/Discord)│                     │
       │                    │                     │
       │ Auth callback      │                     │
       │───────────────────►│ Exchange code       │
       │                    │────────────────────►│
       │                    │                     │
       │                    │◄────────────────────│
       │                    │  Session + User     │
       │◄───────────────────│                     │
       │  Authenticated     │                     │
       └────────────────────┴─────────────────────┘
```

**Environment Variables Required**:
```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Upstash Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# OAuth (configured in Supabase dashboard)
# - Google Client ID/Secret
# - Discord Client ID/Secret
```

**Acceptance Criteria**:
- [ ] User can sign up/login with Google OAuth
- [ ] User can sign up/login with Discord OAuth
- [ ] User profile created automatically on first login
- [ ] Session persists across page refreshes
- [ ] Rate limiting active on API routes
- [ ] Redis caching operational
- [ ] Database schema deployed and accessible
- [ ] RLS policies prevent unauthorized data access

---

**Phase 0 Exit Criteria**:
- [ ] Visual prototype approved for implementation
- [ ] Design system documented and components ready
- [ ] Supabase fully configured with auth working
- [ ] Upstash Redis integrated and tested
- [ ] All environment variables documented
- [ ] Development environment ready for Phase 1

**Phase 0 Dependencies Graph**:
```
Week 1                              Week 2
┌─────────────────────────┐        ┌─────────────────────────┐
│ Visual Prototype        │        │ Backend Services        │
├─────────────────────────┤        ├─────────────────────────┤
│                         │        │                         │
│ Day 1-2: Design tokens  │───────►│ Day 1-2: Supabase setup │
│          Brand colors   │        │          Schema deploy  │
│          Typography     │        │                         │
│                         │        │ Day 3-4: Auth config    │
│ Day 3-4: Components     │───────►│          Google OAuth   │
│          Button, Card   │        │          Discord OAuth  │
│          Input, etc.    │        │                         │
│                         │        │ Day 5: Redis setup      │
│ Day 5-7: Landing page   │───────►│       Rate limiting     │
│          Full prototype │        │       Caching           │
│          Responsive     │        │                         │
│          Interactions   │        │ Day 6-7: Integration    │
│                         │        │          Testing        │
└─────────────────────────┘        └─────────────────────────┘
```

**Risks & Mitigations**:
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Design iteration delays | Medium | Medium | Set clear feedback deadline, limit revision rounds |
| OAuth configuration issues | Low | High | Follow Supabase docs exactly, test on staging first |
| Redis connection issues | Low | Medium | Use Upstash REST API (more reliable than TCP) |

---

### Phase 1: MVP Foundation (Weeks 3-8)

**Goal**: Launch a functional server directory with core features that users can immediately benefit from.

#### Week 1-2: Infrastructure & Design System

**Deliverables**:
- [ ] Database schema design and setup (Supabase/Neon)
- [ ] Authentication system implementation
- [ ] Design system and component library (based on branding.md)
- [ ] Project scaffolding and CI/CD pipeline
- [ ] Base layout and navigation components

**Dependencies**: None (starting point)

**Technical Tasks**:
```
1. Setup database integration (Supabase preferred)
2. Configure authentication (email + OAuth)
3. Implement design tokens from branding guide:
   - Primary: #8B4FC1 (Purple)
   - Accent: #FFB800 (Yellow)
   - Typography: Inter (body), Press Start 2P (accent)
4. Create base components: Header, Footer, Navigation
5. Setup PWA manifest and service worker
```

#### Week 3-4: Server Directory Core

**Deliverables**:
- [ ] Server listing page with grid/list views
- [ ] Server detail page
- [ ] Category and region filtering
- [ ] Basic search functionality
- [ ] Server submission form (for owners)
- [ ] Admin approval workflow

**Dependencies**: Week 1-2 (infrastructure)

**Technical Tasks**:
```
1. Server CRUD operations
2. Server card and detail components
3. Filter and search UI components
4. Server status monitoring (cron job)
5. Player count tracking integration
```

#### Week 5-6: User Features & PWA

**Deliverables**:
- [ ] User profiles and settings
- [ ] Personal tagging system
- [ ] Favorites/bookmarks functionality
- [ ] Ping testing feature
- [ ] PWA optimization and offline support
- [ ] Mobile-responsive polish

**Dependencies**: Week 3-4 (server directory)

**Technical Tasks**:
```
1. Tag CRUD and server-tag associations
2. Favorites system with real-time sync
3. Browser-based ping implementation
4. Service worker caching strategy
5. Push notification setup
```

**Phase 1 Exit Criteria**:
- [ ] Users can browse, search, and filter servers
- [ ] Users can create accounts and manage profiles
- [ ] Users can tag servers and add favorites
- [ ] PWA passes Lighthouse audit >90
- [ ] Server owners can submit and manage listings

---

### Phase 2: Differentiation Features (Weeks 7-12)

**Goal**: Add unique features that differentiate hytale.gg from competitors.

#### Week 7-8: AI Game Assistant

**Deliverables**:
- [ ] Chat interface for AI assistant
- [ ] Hytale knowledge base compilation
- [ ] Bilingual response capability (EN/ES)
- [ ] Server recommendation integration
- [ ] Conversation history

**Dependencies**: Phase 1 complete

**Technical Tasks**:
```
1. Vercel AI SDK integration
2. Custom system prompts for Hytale
3. RAG implementation for knowledge base
4. Language detection and response
5. Chat UI component
```

#### Week 9-10: Creator Review System

**Deliverables**:
- [ ] Creator verification system
- [ ] Video review submission workflow
- [ ] Video embedding (TikTok, YouTube, Twitch)
- [ ] Review display on server pages
- [ ] Creator dashboard

**Dependencies**: Phase 1 (user accounts)

**Technical Tasks**:
```
1. Creator role and verification
2. oEmbed integration for video platforms
3. Review moderation workflow
4. Creator profile pages
5. Review rating system
```

#### Week 11-12: Recommendations & Polish

**Deliverables**:
- [ ] Basic recommendation algorithm
- [ ] "Trending servers" feature
- [ ] "Similar servers" suggestions
- [ ] Enhanced search with relevance scoring
- [ ] Performance optimization
- [ ] Bug fixes and polish

**Dependencies**: Week 7-10

**Technical Tasks**:
```
1. User interaction tracking
2. Recommendation engine (collaborative filtering)
3. Trending calculation algorithm
4. Search ranking improvements
5. Performance profiling and optimization
```

**Phase 2 Exit Criteria**:
- [ ] AI assistant answers Hytale questions accurately
- [ ] Creator reviews display on server pages
- [ ] Recommendations show relevant servers
- [ ] 5+ creator reviews published
- [ ] Search returns relevant results quickly

---

### Phase 3: Platform Expansion (Weeks 13-16)

**Goal**: Expand platform capabilities to serve broader community needs.

#### Week 13-14: Mod Discovery Hub

**Deliverables**:
- [ ] Mod database and listing
- [ ] Server-mod compatibility tracking
- [ ] Mod installation guides
- [ ] Community mod ratings
- [ ] Mod search and filtering

**Dependencies**: Phase 2 complete

#### Week 15-16: Community Tools

**Deliverables**:
- [ ] Event calendar and creation
- [ ] Community forums (basic)
- [ ] Team recruitment system
- [ ] Badge and achievement system

**Dependencies**: Week 13-14

**Phase 3 Exit Criteria**:
- [ ] 50+ mods catalogued
- [ ] Event system functional
- [ ] Community engagement features live

---

### Phase 4: Growth & Optimization (Weeks 17-20)

**Goal**: Prepare for scale and launch marketing initiatives.

#### Week 17-18: Analytics & Server Owner Tools

**Deliverables**:
- [ ] Server owner analytics dashboard
- [ ] Player trend visualizations
- [ ] Performance alerts
- [ ] Export functionality

**Dependencies**: Phase 3 complete

#### Week 19-20: Launch Preparation

**Deliverables**:
- [ ] Performance optimization
- [ ] Security audit
- [ ] Documentation
- [ ] Marketing website updates
- [ ] Soft launch to community

**Dependencies**: All previous phases

**Phase 4 Exit Criteria**:
- [ ] All features functional and tested
- [ ] Performance benchmarks met
- [ ] 100+ servers listed
- [ ] Ready for public launch

---

### Implementation Dependencies Graph

```
Week 1-2: Infrastructure ─────┬────────────────────────────────────────────►
                              │
Week 3-4: Server Directory ───┼──┬─────────────────────────────────────────►
                              │  │
Week 5-6: User Features ──────┼──┼──┬──────────────────────────────────────►
                              │  │  │
Week 7-8: AI Assistant ───────┘  │  │  ┌───────────────────────────────────►
                                 │  │  │
Week 9-10: Creator Reviews ──────┘  │  │  ┌────────────────────────────────►
                                    │  │  │
Week 11-12: Recommendations ────────┘  │  │  ┌─────────────────────────────►
                                       │  │  │
Week 13-14: Mod Discovery ─────────────┘  │  │  ┌──────────────────────────►
                                          │  │  │
Week 15-16: Community Tools ──────────────┘  │  │  ┌───────────────────────►
                                             │  │  │
Week 17-18: Analytics ───────────────────────┘  │  │  ┌────────────────────►
                                                │  │  │
Week 19-20: Launch Prep ────────────────────────┘  └──┴────────────────────►
```

---

## 9. Success Metrics & KPIs

### 9.1 User Engagement Metrics

| Metric | Target (Month 1) | Target (Month 3) | Target (Month 6) |
|--------|------------------|------------------|------------------|
| Daily Active Users | 100 | 500 | 1,000 |
| Weekly Active Users | 400 | 2,000 | 4,000 |
| Session Duration | 3 min | 4 min | 5 min |
| Pages per Session | 3 | 4 | 5 |
| Return Visitor Rate | 20% | 30% | 40% |
| Mobile vs Desktop | 50/50 | 55/45 | 60/40 |

### 9.2 Content Metrics

| Metric | Target (Month 1) | Target (Month 3) | Target (Month 6) |
|--------|------------------|------------------|------------------|
| Listed Servers | 50 | 200 | 500 |
| Creator Reviews | 10 | 50 | 150 |
| User-Generated Tags | 100 | 500 | 2,000 |
| AI Assistant Queries | 500 | 2,500 | 10,000 |

### 9.3 Technical Performance

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Uptime | 99.9% | <99.5% |
| API Latency (P95) | <200ms | >500ms |
| Page Load Time | <2s | >3s |
| Error Rate | <0.1% | >1% |
| Lighthouse Score | >90 | <80 |

### 9.4 Business Metrics

| Metric | Target (Month 3) | Target (Month 6) |
|--------|------------------|------------------|
| Registered Users | 500 | 2,000 |
| Server Owner Accounts | 50 | 200 |
| Verified Creators | 10 | 30 |
| Monthly Page Views | 50,000 | 200,000 |

---

## 10. Risk Assessment

### 10.1 Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Server monitoring accuracy | Medium | High | Implement multiple check methods, user reporting |
| Ping test browser limitations | High | Medium | Consider server-side proxy, set user expectations |
| Video embed API changes | Medium | Medium | Abstract embed layer, monitor platform APIs |
| Database scaling issues | Low | High | Use managed database, implement caching early |
| AI hallucinations | Medium | Medium | Implement RAG, human review of knowledge base |

### 10.2 Market Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Hytale development slows | Low | Critical | Diversify features, build general community tools |
| Competitor launches first | Medium | High | Move fast, focus on unique differentiators |
| Low server owner adoption | Medium | High | Offer free premium features initially, outreach |
| Creator partnerships difficult | Medium | Medium | Leverage pixelkoh network, offer incentives |

### 10.3 Operational Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Content moderation burden | High | Medium | Implement auto-moderation, clear guidelines |
| Single-person development | High | Medium | Prioritize ruthlessly, use managed services |
| Knowledge base outdated | Medium | Medium | Weekly update schedule, community contributions |

---

## 11. Open Questions & Discussion Points

The following items require further discussion and decision-making:

### 11.1 Technical Decisions

1. **Database Choice**: Supabase (all-in-one with auth) vs Neon (PostgreSQL only) + separate auth?
   - *Recommendation*: Supabase for faster development with built-in auth and real-time

2. **Search Solution**: Built-in PostgreSQL full-text vs Algolia/Elasticsearch?
   - *Recommendation*: Start with PostgreSQL, migrate to Algolia at scale

3. **Ping Testing Approach**: Browser-only vs server-side proxy?
   - *Recommendation*: Browser-first with clear accuracy disclaimers, add proxy later

### 11.2 Product Decisions

4. **Monetization Model**: When and how to introduce monetization?
   - Options: Featured listings, premium profiles, ads, affiliate partnerships
   - *Discussion needed*: Timeline and approach

5. **Server Verification**: How strict should server verification be?
   - Options: Open submission, manual review, automated checks
   - *Recommendation*: Manual review initially, automate at scale

6. **Creator Verification Threshold**: What qualifies a "verified creator"?
   - Options: 500/1000/5000 followers, content quality review
   - *Recommendation*: 1000+ followers on any platform + content review

### 11.3 Scope Decisions

7. **Phase 1 Scope**: Should AI Assistant be moved to Phase 1 for differentiation?
   - *Trade-off*: Faster differentiation vs longer MVP timeline

8. **Language Priority**: Launch bilingual immediately or English-first?
   - *Recommendation*: English-first MVP, Spanish in Phase 2

9. **Mobile App**: PWA only or native app in roadmap?
   - *Recommendation*: PWA for foreseeable future, evaluate native app post-launch

### 11.4 Resource Questions

10. **Development Resources**: Solo development realistic for timeline?
    - *Consideration*: May need to extend timeline or reduce scope

11. **Content Creation Balance**: How much time for platform vs TikTok/streaming?
    - *Recommendation*: Define weekly time allocation

---

## Appendix A: Brand Guidelines Reference

See `/docs/branding.md` for complete brand guidelines including:
- Logo variants and usage
- Color palette (Primary: #8B4FC1, Accent: #FFB800)
- Typography (Inter for body, Press Start 2P for accent)
- Icon specifications

## Appendix B: Market Research Reference

See `/docs/hytale-market-research-feb-2026.md` for:
- Current Hytale state and roadmap
- Competitor analysis
- Market opportunity assessment
- Target audience demographics

## Appendix C: Feature Roadmap Reference

See `/docs/roadmap.md` for detailed:
- Feature specifications
- User stories
- Acceptance criteria
- Technical architecture requirements

---

**Document Status**: Draft - Open for Review  
**Next Review Date**: [To be scheduled]  
**Feedback**: Please add comments or questions to the "Open Questions" section

---

*This PRD is a living document and will be updated as decisions are made and requirements evolve.*
