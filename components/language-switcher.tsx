'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useTransition } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { SUPPORTED_LOCALES, getLocaleMetadata, type Locale } from '@/i18n/locales';

export function LanguageSwitcher() {
  const t = useTranslations('navigation');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const currentLocaleMetadata = getLocaleMetadata(locale);

  // Parallel updates: Supabase + cookie (via router navigation)
  // Using functional state updates pattern (rerender-functional-setstate)
  const handleLocaleChange = async (newLocale: Locale) => {
    if (newLocale === locale) return;

    // Start transition for UI update (non-blocking)
    startTransition(() => {
      // This will trigger middleware which sets the cookie
      router.replace(pathname, { locale: newLocale });
    });

    // Parallel: Update Supabase preference in background (async-parallel)
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Update user preference in Supabase (parallel with cookie update)
        const response = await fetch('/api/preferences/language', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ locale: newLocale }),
        });

        if (!response.ok) {
          console.error('[LanguageSwitcher] Failed to update preference');
        }
      }
    } catch (error) {
      console.error('[LanguageSwitcher] Error updating preference:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          disabled={isPending}
          className="gap-2"
          aria-label={t('changeLanguage')}
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLocaleMetadata.nativeName}</span>
          <span className="sm:hidden">{currentLocaleMetadata.code.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {SUPPORTED_LOCALES.map((localeOption) => {
          const metadata = getLocaleMetadata(localeOption);
          return (
            <DropdownMenuItem
              key={localeOption}
              onClick={() => handleLocaleChange(localeOption)}
              disabled={isPending || localeOption === locale}
              className="gap-2"
            >
              <span className="text-lg">{metadata.flag}</span>
              <span>{metadata.nativeName}</span>
              {localeOption === locale && (
                <span className="ml-auto text-xs text-muted-foreground">✓</span>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
