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
  // Step 1: Check cookie first (fastest - 0ms)
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  
  // If we have a cookie with supported locale, use it and proceed with normal routing
  if (cookieLocale && isSupportedLocale(cookieLocale)) {
    const i18nResponse = handleI18nRouting(request);
    return await updateSession(request);
  }
  
  // Step 2: Check if user is logged in (parallel with i18n routing)
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    // Step 3: Fetch from Supabase if user is logged in
    if (user) {
      const preferences = await getUserPreferences(user.id);
      
      if (preferences && preferences.preferred_locale) {
        // Create response with cookie set
        const response = NextResponse.next();
        response.cookies.set('NEXT_LOCALE', preferences.preferred_locale, {
          maxAge: 31536000, // 1 year
          path: '/',
          sameSite: 'lax'
        });
        
        // Redirect to preferred locale if needed
        const currentLocale = request.nextUrl.pathname.split('/')[1];
        if (currentLocale !== preferences.preferred_locale) {
          const newUrl = request.nextUrl.clone();
          newUrl.pathname = newUrl.pathname.replace(`/${currentLocale}`, `/${preferences.preferred_locale}`);
          return NextResponse.redirect(newUrl);
        }
        
        return await updateSession(request);
      }
    }
  } catch (error) {
    console.error('Error in language detection middleware:', error);
  }
  
  // Step 4: Apply smart detection for Latino users (browser language)
  const acceptLanguage = request.headers.get('accept-language') || '';
  const detectedLocale = detectLocaleFromBrowser(acceptLanguage);
  
  // Set cookie for future requests
  const response = handleI18nRouting(request);
  if (response) {
    response.cookies.set('NEXT_LOCALE', detectedLocale, {
      maxAge: 31536000, // 1 year
      path: '/',
      sameSite: 'lax'
    });
  }
  
  // Then, handle Supabase session management
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