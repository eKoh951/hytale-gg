import {defineRouting} from 'next-intl/routing';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from './locales';

export const routing = defineRouting({
  locales: SUPPORTED_LOCALES as unknown as string[],
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'always', // Always show locale in URL (/en/* or /es/*)
  
  // Localized pathnames for SEO-friendly URLs
  pathnames: {
    '/': '/',
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
    '/branding': {
      en: '/branding',
      es: '/guia-de-marca'
    },
    '/profile': {
      en: '/profile',
      es: '/perfil'
    },
    '/settings': {
      en: '/settings',
      es: '/configuracion'
    },
    '/survey/[slug]': {
      en: '/survey/[slug]',
      es: '/encuesta/[slug]'
    },
    // Additional footer pages
    '/mods': '/mods',
    '/events': '/events',
    '/guide': '/guide',
    '/api': '/api',
    '/blog': '/blog',
    '/faq': '/faq',
    '/dashboard': '/dashboard',
    '/analytics': '/analytics',
    '/verify': '/verify',
    '/privacy': '/privacy',
    '/terms': '/terms',
    '/contact': '/contact'
  }
});
