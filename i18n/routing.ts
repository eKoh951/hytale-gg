import {defineRouting} from 'next-intl/routing';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from './locales';

export const routing = defineRouting({
  locales: SUPPORTED_LOCALES as unknown as string[],
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'always', // Always show locale in URL (/en/* or /es/*)
});
