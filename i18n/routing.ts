import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'always', // Always show locale in URL (/en/* or /es/*)
  pathnames: {
    // Shared paths (same for both languages)
    '/': '/',
    '/branding': '/branding',
    
    // Localized paths for SEO
    '/servers': {
      en: '/servers',
      es: '/servidores'
    },
    '/creators': {
      en: '/creators', 
      es: '/creadores'
    },
    '/submit': {
      en: '/submit',
      es: '/agregar'
    },
    '/profile': {
      en: '/profile',
      es: '/perfil'
    },
    '/settings': {
      en: '/settings',
      es: '/configuracion'
    }
  }
});
