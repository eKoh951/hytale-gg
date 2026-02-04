import { createClient } from '@/lib/supabase/server';
import { cache } from 'react';
import { type Locale, isSupportedLocale, detectLocaleFromBrowserCode, DEFAULT_LOCALE } from '@/i18n/locales';
import type { Database } from '@/lib/types/database.types';

// Use auto-generated database types instead of custom interface
type UserPreferences = Database['public']['Tables']['user_preferences']['Row'];

// Cache user preferences for performance (server-cache-react best practice)
const getCachedUserPreferences = cache(async (userId: string): Promise<UserPreferences | null> => {
  const supabase = await createClient();
  
  // Query performance: Select only needed columns (query-performance best practice)
  const { data, error } = await supabase
    .from('user_preferences')
    .select('id, user_id, preferred_locale, auto_detect, created_at, updated_at')
    .eq('user_id', userId)
    .single();
    
  if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
    console.error('[getUserPreferences] Error fetching preferences:', { userId, error: error.message });
    return null;
  }
  
  return data;
});

// Get user preferences with caching
export async function getUserPreferences(userId: string): Promise<UserPreferences | null> {
  return getCachedUserPreferences(userId);
}

// Save user preference (parallel operations - async-parallel)
export async function saveUserPreference(
  userId: string, 
  locale: Locale, 
  autoDetect: boolean = true
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  
  try {
    // Schema design: Let database trigger handle updated_at automatically
    const { error } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: userId,
        preferred_locale: locale,
        auto_detect: autoDetect
      }, {
        onConflict: 'user_id'
      });
      
    if (error) {
      console.error('[saveUserPreference] Error saving preference:', { userId, locale, error: error.message });
      return { success: false, error: error.message };
    }
    
    // React.cache will automatically handle cache invalidation on next request
    return { success: true };
    
  } catch (error) {
    console.error('[saveUserPreference] Unexpected error:', { userId, locale, error });
    return { success: false, error: 'Unexpected error occurred' };
  }
}

// Smart language detection logic
export async function detectLanguage(
  request: Request,
  userId?: string
): Promise<{ locale: Locale; source: string }> {
  // 1. Check cookie first (fastest)
  const cookieHeader = request.headers.get('cookie');
  const cookieLocale = getCookieValue(cookieHeader, 'NEXT_LOCALE');
  
  if (cookieLocale && isSupportedLocale(cookieLocale)) {
    return { locale: cookieLocale, source: 'cookie' };
  }
  
  // 2. Check user preferences if logged in (async-dependencies)
  if (userId) {
    const preferences = await getUserPreferences(userId);
    if (preferences) {
      return { 
        locale: preferences.preferred_locale as Locale, 
        source: 'user_preference' 
      };
    }
  }
  
  // 3. Smart detection for Latino users
  const acceptLanguage = request.headers.get('accept-language') || '';
  const detectedLocale = detectLocaleFromHeaders(acceptLanguage);
  
  return { 
    locale: detectedLocale.locale, 
    source: detectedLocale.source 
  };
}

// Helper function to get cookie value
function getCookieValue(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;
  
  const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
  const targetCookie = cookies.find(cookie => cookie.startsWith(`${name}=`));
  
  return targetCookie ? targetCookie.split('=')[1] : null;
}

// Smart locale detection from headers (scalable for any language)
function detectLocaleFromHeaders(acceptLanguage: string): { locale: Locale; source: string } {
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
      return { locale: detectedLocale, source: `browser_${detectedLocale}` };
    }
  }
  
  // Default to configured default locale
  return { locale: DEFAULT_LOCALE, source: 'default' };
}

// Set language cookie
export function setLanguageCookie(locale: Locale, response?: Response): void {
  const cookieValue = `NEXT_LOCALE=${locale}; max-age=31536000; path=/; SameSite=Lax`;
  
  if (response) {
    response.headers.set('Set-Cookie', cookieValue);
  } else {
    // For client-side usage
    document.cookie = cookieValue;
  }
}

// Create default preferences for new users
export async function createDefaultPreferences(
  userId: string, 
  detectedLocale: Locale = DEFAULT_LOCALE
): Promise<{ success: boolean; error?: string }> {
  return saveUserPreference(userId, detectedLocale, true);
}
