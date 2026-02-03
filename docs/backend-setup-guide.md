# hytale.GG Backend Setup Guide

**Phase 0: Foundation - Backend Services Configuration**

This guide provides step-by-step instructions for configuring the backend services required for hytale.gg MVP development.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Supabase Setup](#2-supabase-setup)
3. [Upstash Redis Setup](#3-upstash-redis-setup)
4. [Authentication Configuration](#4-authentication-configuration)
5. [Database Schema](#5-database-schema)
6. [Environment Variables](#6-environment-variables)
7. [Integration Testing](#7-integration-testing)
8. [Next Steps](#8-next-steps)

---

## 1. Overview

### Services Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      hytale.GG Backend                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Next.js 16 App                        │    │
│  │                  (Vercel Deployment)                     │    │
│  └────────────────────────┬────────────────────────────────┘    │
│                           │                                      │
│           ┌───────────────┼───────────────┐                     │
│           │               │               │                     │
│           ▼               ▼               ▼                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  Supabase   │  │   Upstash   │  │   Vercel    │             │
│  │             │  │    Redis    │  │   AI SDK    │             │
│  │ • Database  │  │             │  │             │             │
│  │ • Auth      │  │ • Caching   │  │ • AI Chat   │             │
│  │ • Storage   │  │ • Rate Limit│  │ • RAG       │             │
│  │ • Realtime  │  │ • Sessions  │  │             │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Dependencies

| Service | Purpose | Required for Phase |
|---------|---------|-------------------|
| Supabase | Database, Auth, Storage | Phase 0 |
| Upstash Redis | Caching, Rate Limiting | Phase 0 |
| Vercel AI SDK | AI Assistant | Phase 2 |

---

## 2. Supabase Setup

### 2.1 Create Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Configure:
   - **Organization**: Select or create
   - **Name**: `hytale-gg`
   - **Database Password**: Generate strong password (save securely)
   - **Region**: Choose closest to target audience (e.g., `us-east-1`)
4. Click "Create new project"
5. Wait for project initialization (~2 minutes)

### 2.2 Get API Keys

Navigate to **Settings > API**:

```
Project URL: https://[YOUR_PROJECT_REF].supabase.co
Anon Key:    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Service Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (keep secret!)
```

### 2.3 Enable Required Extensions

In **SQL Editor**, run:

```sql
-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For text search
CREATE EXTENSION IF NOT EXISTS "citext";  -- Case-insensitive text
```

---

## 3. Upstash Redis Setup

### 3.1 Create Database

1. Go to [upstash.com](https://upstash.com) and sign in
2. Click "Create Database"
3. Configure:
   - **Name**: `hytale-gg-cache`
   - **Region**: Match Supabase region
   - **TLS**: Enable (recommended)
4. Click "Create"

### 3.2 Get Credentials

From the database dashboard:

```
REST URL:  https://[YOUR_REGION]-[HASH].upstash.io
REST Token: AX...
```

### 3.3 Configure Rate Limiting

Create rate limit configurations in your app:

```typescript
// lib/ratelimit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// API rate limiting: 100 requests per minute per IP
export const apiRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "1 m"),
  analytics: true,
  prefix: "ratelimit:api",
});

// Auth rate limiting: 10 requests per minute per IP
export const authRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"),
  analytics: true,
  prefix: "ratelimit:auth",
});

// Search rate limiting: 30 requests per minute per user
export const searchRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, "1 m"),
  analytics: true,
  prefix: "ratelimit:search",
});
```

---

## 4. Authentication Configuration

### 4.1 Enable OAuth Providers in Supabase

Navigate to **Authentication > Providers**:

#### Google OAuth

1. Enable Google provider
2. Create Google Cloud project at [console.cloud.google.com](https://console.cloud.google.com)
3. Enable Google+ API
4. Create OAuth credentials:
   - **Authorized redirect URIs**: `https://[YOUR_PROJECT_REF].supabase.co/auth/v1/callback`
5. Copy Client ID and Client Secret to Supabase

#### Discord OAuth

1. Enable Discord provider
2. Create Discord application at [discord.com/developers](https://discord.com/developers)
3. Under OAuth2:
   - Add redirect: `https://[YOUR_PROJECT_REF].supabase.co/auth/v1/callback`
   - Copy Client ID and Client Secret to Supabase

### 4.2 Configure Auth Settings

In **Authentication > Settings**:

```
Site URL: https://hytale.gg (or localhost:3000 for dev)
Redirect URLs:
  - https://hytale.gg/*
  - http://localhost:3000/*

JWT Expiry: 3600 (1 hour)
Enable email confirmations: Yes (for email sign-up later)
```

### 4.3 Supabase Client Setup

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

```typescript
// lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component - ignore
          }
        },
      },
    }
  );
}
```

### 4.4 Auth Middleware

```typescript
// middleware.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session if expired
  await supabase.auth.getUser();

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

---

## 5. Database Schema

### 5.1 Initial Migration

Create file: `scripts/001-initial-schema.sql`

```sql
-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(50) UNIQUE,
  display_name VARCHAR(100),
  avatar_url TEXT,
  bio TEXT,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'creator', 'server_owner', 'admin')),
  language_pref VARCHAR(5) DEFAULT 'en' CHECK (language_pref IN ('en', 'es')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Servers table
CREATE TABLE public.servers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  ip_address VARCHAR(255) NOT NULL,
  description TEXT,
  short_description VARCHAR(255),
  owner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  region VARCHAR(20) NOT NULL CHECK (region IN ('us', 'eu', 'asia', 'latam')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'offline', 'banned')),
  player_count INTEGER DEFAULT 0,
  max_players INTEGER,
  website_url TEXT,
  discord_url TEXT,
  banner_url TEXT,
  logo_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  verified BOOLEAN DEFAULT FALSE,
  last_ping_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Server categories
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) UNIQUE NOT NULL,
  slug VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  display_order INTEGER DEFAULT 0
);

-- Server-category junction
CREATE TABLE public.server_categories (
  server_id UUID REFERENCES public.servers(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
  PRIMARY KEY (server_id, category_id)
);

-- User tags (personal organization)
CREATE TABLE public.tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL,
  color VARCHAR(7) DEFAULT '#8B4FC1',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, name)
);

-- Server-tag junction (user's personal tags on servers)
CREATE TABLE public.server_tags (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  server_id UUID REFERENCES public.servers(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, server_id, tag_id)
);

-- Favorites
CREATE TABLE public.favorites (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  server_id UUID REFERENCES public.servers(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, server_id)
);

-- Ping logs (for historical data)
CREATE TABLE public.ping_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  server_id UUID REFERENCES public.servers(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  latency_ms INTEGER NOT NULL,
  user_region VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_servers_status ON public.servers(status);
CREATE INDEX idx_servers_region ON public.servers(region);
CREATE INDEX idx_servers_featured ON public.servers(featured) WHERE featured = TRUE;
CREATE INDEX idx_servers_name_trgm ON public.servers USING gin(name gin_trgm_ops);
CREATE INDEX idx_ping_logs_server ON public.ping_logs(server_id);
CREATE INDEX idx_ping_logs_created ON public.ping_logs(created_at);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_servers_updated_at
  BEFORE UPDATE ON public.servers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 5.2 Row Level Security (RLS)

Create file: `scripts/002-rls-policies.sql`

```sql
-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.servers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.server_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.server_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ping_logs ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Servers policies
CREATE POLICY "Active servers are viewable by everyone"
  ON public.servers FOR SELECT
  USING (status = 'active' OR owner_id = auth.uid());

CREATE POLICY "Server owners can insert"
  ON public.servers FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Server owners can update their servers"
  ON public.servers FOR UPDATE
  USING (owner_id = auth.uid());

-- Categories policies (public read)
CREATE POLICY "Categories are viewable by everyone"
  ON public.categories FOR SELECT
  USING (true);

-- Server categories policies
CREATE POLICY "Server categories are viewable by everyone"
  ON public.server_categories FOR SELECT
  USING (true);

CREATE POLICY "Server owners can manage categories"
  ON public.server_categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.servers
      WHERE id = server_id AND owner_id = auth.uid()
    )
  );

-- Tags policies (private to user)
CREATE POLICY "Users can view their own tags"
  ON public.tags FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage their own tags"
  ON public.tags FOR ALL
  USING (user_id = auth.uid());

-- Server tags policies
CREATE POLICY "Users can view their own server tags"
  ON public.server_tags FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage their own server tags"
  ON public.server_tags FOR ALL
  USING (user_id = auth.uid());

-- Favorites policies
CREATE POLICY "Users can view their own favorites"
  ON public.favorites FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage their own favorites"
  ON public.favorites FOR ALL
  USING (user_id = auth.uid());

-- Ping logs policies
CREATE POLICY "Ping logs are viewable by everyone"
  ON public.ping_logs FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create ping logs"
  ON public.ping_logs FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);
```

### 5.3 Seed Data

Create file: `scripts/003-seed-data.sql`

```sql
-- Insert default categories
INSERT INTO public.categories (name, slug, description, icon, display_order) VALUES
  ('Survival', 'survival', 'Classic survival gameplay', 'tent', 1),
  ('PvP', 'pvp', 'Player vs player combat', 'sword', 2),
  ('Creative', 'creative', 'Unlimited building', 'paintbrush', 3),
  ('Roleplay', 'roleplay', 'Immersive roleplaying', 'theater', 4),
  ('Adventure', 'adventure', 'Quest and exploration', 'map', 5),
  ('Minigames', 'minigames', 'Quick fun games', 'gamepad', 6),
  ('Economy', 'economy', 'Trading and commerce', 'coins', 7),
  ('Factions', 'factions', 'Team-based territories', 'flag', 8);
```

---

## 6. Environment Variables

### 6.1 Required Variables

Create `.env.local` (never commit this file):

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR_PROJECT_REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# Upstash Redis
UPSTASH_REDIS_REST_URL=https://[YOUR_REGION]-[HASH].upstash.io
UPSTASH_REDIS_REST_TOKEN=AX...

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 6.2 Production Variables (Vercel)

Add these in Vercel Dashboard > Project > Settings > Environment Variables:

| Variable | Environment | Notes |
|----------|-------------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | All | Public |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | All | Public |
| `SUPABASE_SERVICE_ROLE_KEY` | Production, Preview | Secret |
| `UPSTASH_REDIS_REST_URL` | All | Secret |
| `UPSTASH_REDIS_REST_TOKEN` | All | Secret |
| `NEXT_PUBLIC_SITE_URL` | Production | `https://hytale.gg` |

---

## 7. Integration Testing

### 7.1 Test Checklist

- [ ] Supabase connection works
- [ ] Google OAuth sign-in works
- [ ] Discord OAuth sign-in works
- [ ] Profile created automatically on first login
- [ ] Session persists across page refreshes
- [ ] Redis connection works
- [ ] Rate limiting is active
- [ ] RLS policies working correctly

### 7.2 Test Scripts

```typescript
// app/api/test/supabase/route.ts
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .limit(1);

    if (error) throw error;

    return NextResponse.json({
      status: "ok",
      message: "Supabase connection successful",
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: String(error) },
      { status: 500 }
    );
  }
}
```

```typescript
// app/api/test/redis/route.ts
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });

    await redis.set("test-key", "hello", { ex: 60 });
    const value = await redis.get("test-key");

    return NextResponse.json({
      status: "ok",
      message: "Redis connection successful",
      value,
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: String(error) },
      { status: 500 }
    );
  }
}
```

---

## 8. Next Steps

After completing this setup:

1. **Run migrations** in Supabase SQL Editor (001, 002, 003)
2. **Test OAuth** by attempting sign-in flows
3. **Verify RLS** by testing data access with different users
4. **Configure rate limits** and test they're working
5. **Begin Phase 1** development with server directory features

### Phase 1 Dependencies

With Phase 0 complete, you're ready to build:

- Server listing pages
- Server detail pages
- Category filtering
- Search functionality
- User dashboard
- Server submission form

---

**Last Updated**: February 2, 2026
**Status**: Ready for implementation
