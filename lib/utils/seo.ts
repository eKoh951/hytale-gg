import { SUPPORTED_LOCALES, type Locale } from '@/i18n/locales';
import { routing } from '@/i18n/routing';

/**
 * Generates hreflang alternate URLs for all supported locales
 * Automatically scales when new languages are added to SUPPORTED_LOCALES
 * 
 * @param pathname - Internal pathname (e.g., '/branding', '/servers')
 * @returns Object with language alternates for Next.js metadata
 */
export function generateHreflangAlternates(pathname: string) {
  const languages: Record<string, string> = {};
  
  // Generate alternate URLs for each supported locale
  for (const locale of SUPPORTED_LOCALES) {
    // Get the localized pathname from routing config
    const localizedPath = getLocalizedPath(pathname, locale);
    languages[locale] = localizedPath;
  }
  
  // Set default locale (usually English)
  languages['x-default'] = getLocalizedPath(pathname, 'en');
  
  return { languages };
}

/**
 * Gets the localized URL path for a given pathname and locale
 * Handles pathnames configuration from routing.ts
 * 
 * @param pathname - Internal pathname (e.g., '/branding')
 * @param locale - Target locale (e.g., 'es')
 * @returns Localized URL (e.g., '/es/guia-de-marca')
 */
function getLocalizedPath(pathname: string, locale: Locale): string {
  // Check if this pathname has localized variants
  const pathnames = routing.pathnames as Record<string, any>;
  
  if (pathnames && pathnames[pathname]) {
    const localeConfig = pathnames[pathname];
    
    // If it's an object with locale keys, get the localized path
    if (typeof localeConfig === 'object' && localeConfig[locale]) {
      return `/${locale}${localeConfig[locale]}`;
    }
    
    // If it's a string (same path for all locales)
    if (typeof localeConfig === 'string') {
      return `/${locale}${localeConfig}`;
    }
  }
  
  // Default: use the pathname as-is with locale prefix
  return `/${locale}${pathname}`;
}

/**
 * Generates Open Graph locale tags for all supported locales
 * Automatically scales when new languages are added
 * 
 * @param currentLocale - Current page locale
 * @returns Array of alternate locales for OG tags
 */
export function generateOGLocales(currentLocale: Locale): string[] {
  return SUPPORTED_LOCALES
    .filter(locale => locale !== currentLocale)
    .map(locale => {
      // Map locale codes to OG locale format
      const ogLocaleMap: Record<Locale, string> = {
        en: 'en_US',
        es: 'es_ES',
        // When you add Portuguese: pt: 'pt_BR',
      };
      return ogLocaleMap[locale];
    });
}

/**
 * Gets the Open Graph locale string for a given locale
 * 
 * @param locale - Locale code (e.g., 'es')
 * @returns OG locale string (e.g., 'es_ES')
 */
export function getOGLocale(locale: Locale): string {
  const ogLocaleMap: Record<Locale, string> = {
    en: 'en_US',
    es: 'es_ES',
    // When you add Portuguese: pt: 'pt_BR',
  };
  return ogLocaleMap[locale] || 'en_US';
}
