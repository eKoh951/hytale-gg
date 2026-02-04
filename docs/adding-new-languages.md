# Adding New Languages - Step-by-Step Guide

This guide shows how easy it is to add new languages to the platform thanks to our centralized locale configuration.

## 🎯 Current Architecture (Scalable)

All locale configuration is centralized in `/i18n/locales.ts`. This means:
- ✅ Add language once, works everywhere
- ✅ Type-safe locale handling
- ✅ Automatic browser detection
- ✅ No hardcoded locale checks

## 📝 How to Add Portuguese (or any language)

### Step 1: Update Locale Configuration (5 minutes)

**File**: `i18n/locales.ts`

```typescript
export const SUPPORTED_LOCALES = ['en', 'es', 'pt'] as const;
//                                          ^^^^^ Add here

export const LOCALE_METADATA: Record<Locale, {...}> = {
  en: { ... },
  es: { ... },
  pt: {  // Add this block
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇧🇷',
    direction: 'ltr',
    browserCodes: ['pt', 'pt-BR', 'pt-PT']
  }
};
```

**That's it for the code!** Everything else automatically works:
- ✅ Middleware detects Portuguese browsers
- ✅ Routing handles `/pt/` URLs
- ✅ Type system enforces Portuguese support
- ✅ Database accepts Portuguese preferences

### Step 2: Add Localized Pathnames (Optional - 5 minutes)

**File**: `i18n/routing.ts`

```typescript
pathnames: {
  '/servers': {
    en: '/servers',
    es: '/servidores',
    pt: '/servidores'  // Add Portuguese paths
  },
  '/creators': {
    en: '/creators',
    es: '/creadores',
    pt: '/criadores'
  },
  // ... etc
}
```

### Step 3: Add Next.js Rewrites (5 minutes)

**File**: `next.config.ts`

```typescript
{
  source: '/pt/servidores',
  destination: '/pt/servers',
},
{
  source: '/pt/criadores',
  destination: '/pt/creators',
},
// ... etc
```

### Step 4: Create Translation File (30-60 minutes)

**File**: `messages/pt.json`

Copy `messages/en.json` or `messages/es.json` and translate the strings.

```json
{
  "navigation": {
    "servers": "Servidores",
    "creators": "Criadores",
    // ... etc
  }
}
```

### Step 5: Update Database Migration (1 minute)

**File**: `supabase/migrations/XXX_update_locale_enum.sql` (if using enum)

```sql
ALTER TYPE locale_enum ADD VALUE 'pt';
```

Or if using TEXT (current setup), no change needed! ✅

## 🚀 What Automatically Works

Once you add a language to `SUPPORTED_LOCALES`, these features work automatically:

### ✅ Middleware Detection
```typescript
// User with browser language: pt-BR
Accept-Language: pt-BR,pt;q=0.9,en;q=0.8
→ Automatically detected as Portuguese
→ Redirected to /pt/
→ Cookie set: NEXT_LOCALE=pt
```

### ✅ Type Safety
```typescript
// TypeScript will enforce Portuguese
const locale: Locale = 'pt'; // ✅ Works
const locale: Locale = 'fr'; // ❌ Type error!
```

### ✅ User Preferences
```typescript
// Database automatically accepts Portuguese
await saveUserPreference(userId, 'pt'); // ✅ Works
```

### ✅ Smart Detection
```typescript
// All locale checks use centralized function
if (isSupportedLocale('pt')) { ... } // ✅ Works
```

## 📊 Comparison: Before vs After

### ❌ Before (Hardcoded)
```typescript
// Had to update every file manually:
if (locale === 'en' || locale === 'es') { ... }
if (locale === 'en' || locale === 'es') { ... }
if (locale === 'en' || locale === 'es') { ... }
// ... 50+ places to update! 😱
```

### ✅ After (Centralized)
```typescript
// Only update one place:
export const SUPPORTED_LOCALES = ['en', 'es', 'pt'] as const;

// Everything else uses:
if (isSupportedLocale(locale)) { ... } // ✅ Automatically works everywhere!
```

## 🎯 Summary: Adding Portuguese

**Total Time**: ~45-75 minutes

| Step | Time | Files |
|------|------|-------|
| 1. Locale config | 5 min | 1 file |
| 2. Pathnames | 5 min | 1 file |
| 3. Rewrites | 5 min | 1 file |
| 4. Translations | 30-60 min | 1 file |
| 5. Database | 1 min | N/A (TEXT) |

**No code changes needed** in:
- ✅ Middleware
- ✅ Preferences functions
- ✅ Type definitions
- ✅ Components
- ✅ Database schema

## 🌍 Supported Language Codes

When adding languages, use these browser codes for detection:

- **Portuguese**: `['pt', 'pt-BR', 'pt-PT']`
- **French**: `['fr', 'fr-FR', 'fr-CA']`
- **German**: `['de', 'de-DE', 'de-AT', 'de-CH']`
- **Italian**: `['it', 'it-IT']`
- **Japanese**: `['ja', 'ja-JP']`
- **Korean**: `['ko', 'ko-KR']`
- **Chinese**: `['zh', 'zh-CN', 'zh-TW']`

This architecture scales to **any number of languages** with minimal effort! 🚀
