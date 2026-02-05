import { MetadataRoute } from 'next';
import { SUPPORTED_LOCALES } from '@/i18n/locales';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hytale.gg';
  
  // Define all routes that should be in the sitemap
  const routes = ['', '/servers', '/creators', '/branding', '/submit'];
  
  const entries: MetadataRoute.Sitemap = [];
  
  // Generate sitemap entries for each locale and route
  for (const locale of SUPPORTED_LOCALES) {
    for (const route of routes) {
      // Get the localized path from routing config
      const pathnames = routing.pathnames as Record<string, any>;
      let localizedPath = route;
      
      if (route && pathnames && pathnames[route]) {
        const localeConfig = pathnames[route];
        
        // If it's an object with locale keys, get the localized path
        if (typeof localeConfig === 'object' && localeConfig[locale]) {
          localizedPath = localeConfig[locale];
        } else if (typeof localeConfig === 'string') {
          localizedPath = localeConfig;
        }
      }
      
      const url = `${baseUrl}/${locale}${localizedPath}`;
      
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: route === '' ? 1.0 : 0.8,
      });
    }
  }
  
  return entries;
}
