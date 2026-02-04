import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { BrandGuidelines } from "./components/brand-guidelines";
import { Suspense } from "react";
import { ComponentRegistry } from "./components/component-registry";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { generateHreflangAlternates, generateOGLocales, getOGLocale } from '@/lib/utils/seo';
import type { Locale } from '@/i18n/locales';

// Generate metadata using translations
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('metadata.branding');
  
  // Generate hreflang alternates (automatically scales with new languages)
  const alternates = generateHreflangAlternates('/branding');
  
  return {
    title: t('title'),
    description: t('description'),
    alternates, // Hreflang tags for all supported locales
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: getOGLocale(locale as Locale),
      alternateLocale: generateOGLocales(locale as Locale),
    },
    keywords: ['brand guidelines', 'hytale', 'gaming', 'design system', 'logo', 'colors'],
    authors: [{ name: 'hytale.GG' }],
  };
}

// Force static generation for this page with revalidation
export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate once per day

// Generate static params for all locales
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

export default async function BrandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);
  
  const t = await getTranslations({ locale, namespace: 'branding' });
  
  return (
      <main className="min-h-screen bg-background pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense 
          fallback={
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="animate-pulse text-center mb-16">
                <div className="h-12 bg-muted rounded-lg w-3/4 mx-auto mb-4" />
                <div className="h-6 bg-muted rounded-lg w-1/2 mx-auto" />
              </div>
            </div>
          }
        >
          <BrandGuidelines />
          <ComponentRegistry />
        </Suspense>
      </main>
  );
}
