/**
 * Centralized locale configuration
 * To add a new language, just add it to the SUPPORTED_LOCALES array
 */

export const SUPPORTED_LOCALES = ['en', 'es'] as const;
export const DEFAULT_LOCALE = 'en' as const;

// Type-safe locale type derived from config
export type Locale = (typeof SUPPORTED_LOCALES)[number];

// Locale metadata for display and detection
export const LOCALE_METADATA: Record<Locale, {
  name: string;
  nativeName: string;
  flag: string;
  direction: 'ltr' | 'rtl';
  browserCodes: string[]; // For Accept-Language detection
}> = {
  en: {
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    direction: 'ltr',
    browserCodes: ['en', 'en-US', 'en-GB', 'en-CA', 'en-AU']
  },
  es: {
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    direction: 'ltr',
    browserCodes: ['es', 'es-ES', 'es-MX', 'es-AR', 'es-CO', 'es-419']
  }
  // To add Portuguese, just add this:
  // pt: {
  //   name: 'Portuguese',
  //   nativeName: 'Português',
  //   flag: '🇧🇷',
  //   direction: 'ltr',
  //   browserCodes: ['pt', 'pt-BR', 'pt-PT']
  // }
};

// Helper to check if a locale is supported
export function isSupportedLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}

// Helper to detect locale from browser language codes
export function detectLocaleFromBrowserCode(code: string): Locale | null {
  const normalizedCode = code.toLowerCase();
  
  for (const locale of SUPPORTED_LOCALES) {
    const browserCodes = LOCALE_METADATA[locale].browserCodes;
    if (browserCodes.some(bc => normalizedCode.startsWith(bc.toLowerCase()))) {
      return locale;
    }
  }
  
  return null;
}

// Helper to get locale display name
export function getLocaleDisplayName(locale: Locale, inLocale: Locale = locale): string {
  return LOCALE_METADATA[locale].nativeName;
}

// Helper to get locale metadata
export function getLocaleMetadata(locale: Locale) {
  return {
    ...LOCALE_METADATA[locale],
    code: locale
  };
}
