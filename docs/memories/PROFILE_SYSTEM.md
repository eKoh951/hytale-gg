# Profile & Supabase System Documentation

## Supabase Configuration

### Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` - Publishable API key (not ANON_KEY)

### Client Files
- **`lib/supabase/server.ts`** - Server-side client with async `createClient()` using `cookies()` from next/headers
- **`lib/supabase/client.ts`** - Browser client with `createBrowserClient`
- **`lib/supabase/proxy.ts`** - Middleware session handling with `updateSession()`
- **`proxy.ts`** (root) - Next.js middleware config with matcher excluding static files

### Project Details
- **Project**: vercel-hytale-gg
- **Project ID**: adkjqnhytspczubeqvnc
- **Region**: us-east-1
- **Status**: ACTIVE_HEALTHY

---

## Authentication System

### Components
- **`components/auth/auth-provider.tsx`** - AuthProvider context with `useAuth()` hook
- **`components/auth/user-profile-menu.tsx`** - UserProfileMenu component

### Auth State & Actions
```typescript
const { state: { user, isLoading }, actions: { signIn, signOut } } = useAuth()
```

### Sign In Flow
- Sign in via `/auth/signin` POST endpoint
- Returns redirect URL on success
- Integrated into Header component with loading skeleton

---

## Profile System

### Data Layer (`lib/data/profile.ts`)

| Function | Purpose |
|----------|---------|
| `getUserIdByUsername(username)` | Lookup user by username |
| `getProfile(userId)` | Fetch profile data |
| `getUserStats(userId)` | Fetch user stats |
| `getUserAchievements(userId)` | Fetch achievements with join |
| `getRecentActivity(userId, limit)` | Dynamic, not cached |
| `getAllAchievements()` | All achievements |
| `hasAchievement(userId, achievementId)` | Check unlock status |

### Server Actions (`app/profile/actions.ts`)

| Action | Purpose | Cache Invalidation |
|--------|---------|-------------------|
| `updateProfile(userId, data)` | Update profile fields | `updateTag('profile-{userId}')` |
| `updateUserStats(userId, stats)` | Update stats | `updateTag('stats-{userId}')` |
| `unlockAchievement(userId, achievementId)` | Unlock achievement | `updateTag('achievements-{userId}')` |
| `logActivity(userId, action, serverName)` | Log user activity | None (dynamic) |
| `uploadAvatar(userId, file)` | Upload to Supabase Storage | `updateTag('profile-{userId}')` |
| `checkUsernameAvailability(username, excludeUserId)` | Validate username | N/A |
| `updateUsername(userId, newUsername)` | Update and redirect | `updateTag('profile-{userId}')` |

### Profile Components

#### Server Components (Async)
- **`profile-hero.tsx`** - Hero section with avatar and user info
- **`profile-avatar.tsx`** - Avatar with level badge
- **`profile-info.tsx`** - User info display
- **`achievements-card.tsx`** - Achievements display
- **`gaming-stats-card.tsx`** - Stats card
- **`recent-activity-card.tsx`** - Activity feed (dynamic, streams in)

#### Client Components
- **`profile-information-card.tsx`** - Editable profile form with:
  - Username validation (debounced)
  - Display name, bio, location, Discord ID
  - Real-time availability checking
  - Success/error messages
- **`image-cropper.tsx`** - Avatar cropping with `react-easy-crop`

#### Loading & Error
- **`skeletons.tsx`** - Loading skeletons for all sections
- **`loading.tsx`** - Page loading state
- **`error.tsx`** - Error boundary

### Profile Routes

- **`app/profile/[username]/page.tsx`** - Main profile page with Suspense boundaries
  - Looks up user by username
  - Checks if viewing own profile
  - Renders hero, stats, achievements, activity, profile info
- **`app/profile/[username]/loading.tsx`** - Loading state
- **`app/profile/[username]/error.tsx`** - Error boundary

---

## Database Schema

### Tables Used
- **profiles** - User profile data (display_name, bio, location, discord_id, avatar_url, username, level)
- **user_stats** - User statistics (servers_joined, hours_played, achievements_unlocked)
- **achievements** - Achievement definitions (name, description, icon, color)
- **user_achievements** - User achievement unlocks (user_id, achievement_id, unlocked_at)
- **user_activity** - User activity log (user_id, action, server_name, created_at)

### Types
- **`lib/types/database.types.ts`** - Generated Supabase types

---

## Next.js Configuration

### Experimental Features
```typescript
experimental: {
  cacheComponents: true,
}
```

### Cache Invalidation Strategy
- Uses `updateTag()` from `next/cache` for immediate cache invalidation
- Profile data tagged with `profile-{userId}`
- Stats tagged with `stats-{userId}`
- Achievements tagged with `achievements-{userId}`
- Activity is dynamic (not cached) and streams in

### Middleware
- `proxy.ts` handles session updates
- Matcher excludes static files, images, favicon

---

## Utilities

### `lib/utils/user.ts`
- **`getInitials(name)`** - Extract initials from name
- **`getDisplayName(user)`** - Get display name from user metadata or email

---

## Key Implementation Details

### Username Changes
- Validates format: 3-20 chars, lowercase, alphanumeric + underscores
- Checks availability before update
- Redirects to new profile URL after update

### Avatar Upload
- Validates file type (image only)
- Max size: 2MB
- Deletes old avatars before uploading new one
- Stores in Supabase Storage with timestamp to prevent caching
- Updates profile with public URL

### Profile Information Card
- Only visible on own profile (`isOwnProfile`)
- Debounced username availability check (500ms)
- Real-time validation feedback with icons
- Form state management with `useActionState`

### Recent Activity
- Dynamic content (no caching)
- Streams in via Suspense
- Logged via `logActivity()` server action

### Achievements
- Unique constraint prevents duplicate unlocks
- Automatically increments `achievements_unlocked` in user_stats
- Displays with icon and color from achievement definition

---

## Layout Integration

### `app/layout.tsx`
- Wraps app with `AuthProvider`
- Renders `Header` and `Footer` globally
- Header shows auth state and user profile menu

### `app/page.tsx`
- Removed Header/Footer (now in layout)
- Renders Hero and Reviews

### `components/landing/header.tsx`
- Integrated with `useAuth()` hook
- Shows loading skeleton while auth state loads
- Displays user profile menu when authenticated
- Sign in button when not authenticated
- Mobile menu with profile/settings/sign out options

---

## Development Notes

- Profile pages are dynamic and use Suspense for streaming
- Server actions handle all mutations with proper auth checks
- Cache invalidation is immediate with `updateTag()`
- Username lookups are case-insensitive
- Activity logging doesn't require cache invalidation (dynamic content)
