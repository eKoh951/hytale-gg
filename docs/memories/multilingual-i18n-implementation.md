# Multilingual i18n Implementation Memory

**Project**: hytale.gg server directory
**Date**: February 4, 2026
**Status**: Planning complete, ready to implement

## Technology Stack
- **Framework**: Next.js 16.1.6 with App Router
- **i18n Library**: next-intl 4.8.2
- **Routing**: proxy.ts pattern (Next.js 16, replaces middleware.ts)
- **Languages**: English (en), Spanish (es)
- **URL Structure**: Subdirectories (/en/*, /es/*)

## Confirmed Decisions ✅

1. **Default Locale**: Auto-detect browser language at root `/`
2. **Translation Service**: AI-assisted translation (no manual review needed)
3. **URL Redirects**: Implement smart redirects with language detection (e.g., `/profile` → `/en/profile` or `/es/profile`)
4. **Language Switcher**: Display in both header and footer
5. **User Preference**: Store in Supabase `profiles` table
6. **Server Content**: Single language by default, optional multilingual if users want to add translations

## Implementation Plan

**File Structure:**
```
├── messages/
│   ├── en.json          # English translations
│   └── es.json          # Spanish translations
├── proxy.ts             # Locale detection & routing (Next.js 16)
└── i18n/
    ├── routing.ts       # Routing configuration
    ├── request.ts       # Request configuration & messages
    └── navigation.ts    # Navigation wrappers (Link, useRouter, etc.)
```

**App Directory:**
```
app/
├── [locale]/
│   ├── layout.tsx      # Locale-aware layout with NextIntlClientProvider
│   ├── page.tsx        # Homepage
│   ├── profile/
│   ├── settings/
│   └── branding/
└── layout.tsx          # Root layout (minimal, just <html>/<body>)
```

## Key Code Patterns

**proxy.ts:**
```typescript
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
```

**Component Usage:**
```typescript
// Import from @/i18n/navigation (not next/link)
import {Link} from '@/i18n/navigation';
import {useTranslations} from 'next-intl';

export function Header() {
  const t = useTranslations('navigation');
  return <Link href="/servers">{t('servers')}</Link>;
}
```

## Translation Scope (Est. ~170-200 strings)

**High Priority:**
- Navigation: "Servers", "Creators", "List a Server"
- Hero: "Find your Hytale server", search placeholder, categories
- Server cards: player counts, ping indicators, "Copied!" message
- Footer: section headings, all links, description text

**Medium Priority:**
- Profile pages: achievements, settings labels
- Branding page: metadata titles/descriptions
- Auth flows: sign-in messages, error messages

## SEO Requirements
- Hreflang tags for all pages
- Canonical URLs per locale
- Sitemap with both /en/* and /es/* URLs
- Language switcher in header + footer

## Performance Considerations
- Build time expected to double (~2x)
- Offset by Next.js 16 Turbopack (2-5x faster baseline)
- Static generation for all pages
- Monitor build times post-implementation

## Database Changes Needed
- Add `preferred_locale` column to Supabase `profiles` table
- Nullable, default null (use browser detection)
- Store user's language choice (en/es)

## Migration Notes
- Next.js 16: `middleware.ts` → `proxy.ts`
- Function export must be named `proxy` (not `middleware`)
- All internal links must use `@/i18n/navigation` imports
- Layout restructuring: move everything under `[locale]` segment

## Critical Bug Fix - February 4, 2026

### **Issue**: Server Components Not Using Correct Locale
**Problem**: When calling `getTranslations()` without locale parameter in Server Components, next-intl falls back to default locale (English) instead of using the current URL locale.

### **Root Cause**: 
```typescript
// WRONG - Uses default locale (English)
const t = await getTranslations('branding');

// CORRECT - Uses current locale from params
const { locale } = await params;
const t = await getTranslations({ locale, namespace: 'branding' });
```

### **Solution**: 
Always pass the `locale` parameter to `getTranslations()` in Server Components:

```typescript
export default async function BrandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'branding' });
  // Now correctly uses Spanish for /es/branding
}
```

### **Key Learning**: 
- **Server Components**: Must use `getTranslations({ locale, namespace })` with explicit locale
- **Client Components**: Use `useTranslations('namespace')` - rely on NextIntlClientProvider
- **Layout**: Must pass `messages={await getMessages({locale})}` to NextIntlClientProvider

### **Files Updated**:
- `app/[locale]/branding/page.tsx` - Fixed Server Component locale usage
- `app/[locale]/layout.tsx` - Added proper message passing to client components

### **Result**: 
- `/es/branding` now shows Spanish translations
- `/en/branding` continues to show English translations
- Both Server and Client Components work correctly

## Critical Discovery - next-intl Pathnames Implementation

### **Issue**: next-intl Pathnames Not Working with Direct URL Navigation
**Problem**: Despite correct configuration, localized pathnames like `/es/guia-de-marca` returned 404 errors when accessed directly via URL bar.

### **Root Cause Analysis**:
Through extensive debugging, we discovered that:
1. **next-intl middleware runs correctly** and processes the request
2. **Pathnames configuration is loaded properly** 
3. **But no internal rewrite occurs** - the URL stays `/es/guia-de-marca` instead of being rewritten to `/es/branding`
4. **next-intl pathnames are designed for navigation components** (`Link`, `useRouter`) rather than direct URL navigation

### **Debug Evidence**:
```javascript
// Middleware logs showed:
🔍 Middleware running for: /es/guia-de-marca  ✅
routing { '/branding': { en: '/branding', es: '/guia-de-marca' } }  ✅
🔍 After i18n routing, URL is still: /es/guia-de-marca  ❌ No rewrite!
🔍 i18nResponse status: 200  ✅
GET /es/guia-de-marca 404 in 71ms  ❌ Next.js serves 404
```

### **Solution**: Next.js Rewrites + next-intl Navigation
**Hybrid Approach**: Use Next.js rewrites for direct URL navigation + keep next-intl for navigation components.

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Spanish localized pathnames
      {
        source: '/es/guia-de-marca',
        destination: '/es/branding',
      },
      {
        source: '/es/prueba',
        destination: '/es/test',
      },
      // Add more as needed
    ];
  },
};
```

### **How It Works**:
1. **User types**: `/es/guia-de-marca`
2. **Next.js rewrite**: `/es/guia-de-marca` → `/es/branding` (internal)
3. **Next.js serves**: Content from `/es/branding` page
4. **User sees**: `/es/guia-de-marca` in browser (URL unchanged)
5. **Navigation components**: Still use next-intl `Link` with internal paths

### **Key Learning**:
- **next-intl pathnames**: Work great for navigation components but not direct URL access
- **Next.js rewrites**: Handle direct URL navigation and browser refresh scenarios
- **Hybrid approach**: Best of both worlds - SEO-friendly URLs + reliable navigation

### **Files Updated**:
- `next.config.ts` - Added rewrites for localized pathnames
- `i18n/routing.ts` - Simplified back to basic configuration (removed pathnames)
- `proxy.ts` - Cleaned up debug logs

### **Result**:
- ✅ `/es/guia-de-marca` now works via direct URL navigation
- ✅ `/es/branding` continues to work
- ✅ Navigation components still use next-intl properly
- ✅ SEO-friendly Spanish URLs achieved

## Implementation Status
- Dependencies installed (next-intl 4.8.2)
- Plan created and approved
- Next.js 16 proxy pattern researched
- **CRITICAL BUG FIXED** - Server Components now use correct locale
- Branding page fully internationalized
- Ready to continue with remaining pages

## Next Steps
1. Create i18n configuration files (routing.ts, request.ts, navigation.ts)
2. Create proxy.ts for locale detection
3. Restructure app directory under [locale]
4. Create translation files (en.json, es.json)
5. Update components to use translations
6. Implement SEO optimization
7. Test and validate

## Questions for Post-Implementation Review
- Build time impact acceptable?
- SEO indexing working correctly?
- User feedback on translations?
- Language switcher placement effective?
- Spanish market adoption metrics?