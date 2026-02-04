import { Hero } from "@/components/landing/hero";
import { Reviews } from "@/components/landing/reviews";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

// Generate metadata using translations
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata.home');
  
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
    },
    keywords: ['hytale', 'server list', 'gaming', 'minecraft', 'server directory', 'multiplayer'],
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

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);
  
  return (
    <>
      <main>
        <Hero />
        <Reviews />
      </main>
    </>
  );
}
