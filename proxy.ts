import { type NextRequest, NextResponse } from "next/server"
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { updateSession } from "./lib/supabase/proxy"
import { createClient } from '@/lib/supabase/server';
import { getUserPreferences } from '@/lib/utils/preferences';
import { isSupportedLocale, detectLocaleFromBrowserCode, DEFAULT_LOCALE, type Locale } from '@/i18n/locales';

// Create next-intl middleware
const handleI18nRouting = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  let detectedLocale: Locale | null = null;
  
  // Step 1: Check cookie first (fastest - 0ms)
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  
  if (cookieLocale && isSupportedLocale(cookieLocale)) {
    detectedLocale = cookieLocale;
  }
  
  // Step 2: Check if user is logged in and has preferences (only if no cookie)
  if (!detectedLocale) {
    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const preferences = await getUserPreferences(user.id);
        
        if (preferences && preferences.preferred_locale && isSupportedLocale(preferences.preferred_locale)) {
          detectedLocale = preferences.preferred_locale;
        }
      }
    } catch (error) {
      console.error('[Middleware] Error fetching user preferences:', error);
    }
  }
  
  // Step 3: Apply smart detection from browser (only if no cookie and no user preference)
  if (!detectedLocale) {
    const acceptLanguage = request.headers.get('accept-language') || '';
    detectedLocale = detectLocaleFromBrowser(acceptLanguage);
  }
  
  // Step 4: Handle routing with detected locale
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = pathname.startsWith('/en') || pathname.startsWith('/es');
  
  // If root path, set header and let page component handle redirect
  if (pathname === '/') {
    const response = NextResponse.next();
    
    // Set x-locale header for root page to read
    response.headers.set('x-locale', detectedLocale);
    
    // Set cookie for future requests
    response.cookies.set('NEXT_LOCALE', detectedLocale, {
      maxAge: 31536000, // 1 year
      path: '/',
      sameSite: 'lax'
    });
    
    return response;
  }
  
  // If path has locale but it's different from detected, redirect
  if (pathnameHasLocale) {
    const currentLocale = pathname.split('/')[1];
    if (currentLocale !== detectedLocale && !cookieLocale) {
      // Only redirect if there's no cookie (user hasn't explicitly chosen)
      const url = request.nextUrl.clone();
      url.pathname = url.pathname.replace(`/${currentLocale}`, `/${detectedLocale}`);
      const response = NextResponse.redirect(url);
      
      // Set cookie for future requests
      response.cookies.set('NEXT_LOCALE', detectedLocale, {
        maxAge: 31536000, // 1 year
        path: '/',
        sameSite: 'lax'
      });
      
      return response;
    }
  }
  
  // Normal routing with i18n
  const i18nResponse = handleI18nRouting(request);
  
  // Set cookie if not already set
  if (i18nResponse && !cookieLocale) {
    i18nResponse.cookies.set('NEXT_LOCALE', detectedLocale, {
      maxAge: 31536000, // 1 year
      path: '/',
      sameSite: 'lax'
    });
  }
  
  // Handle Supabase session management
  return await updateSession(request);
}

// Helper function for smart locale detection (scalable for any language)
function detectLocaleFromBrowser(acceptLanguage: string): Locale {
  // Parse Accept-Language header
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, quality = '1'] = lang.trim().split(';q=');
      return { code: code.toLowerCase(), quality: parseFloat(quality) };
    })
    .sort((a, b) => b.quality - a.quality);
  
  // Try to match each language preference to a supported locale
  for (const lang of languages) {
    const detectedLocale = detectLocaleFromBrowserCode(lang.code);
    if (detectedLocale) {
      return detectedLocale;
    }
  }
  
  // Default to configured default locale
  return DEFAULT_LOCALE;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api, _next/static, _next/image, favicon.ico, static files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|trpc|_next|_vercel|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}