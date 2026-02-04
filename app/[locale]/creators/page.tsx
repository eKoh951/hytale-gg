import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

// Generate metadata using translations
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata.creators');
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

// Force static generation
export const dynamic = 'force-static';
export const revalidate = 86400;

// Generate static params for all locales
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

export default async function CreatorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);
  
  const t = await getTranslations('creators');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
      <p className="text-muted-foreground mb-8">{t('description')}</p>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold">Creator 1</h2>
          <p className="text-sm text-muted-foreground">Amazing Hytale content creator</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold">Creator 2</h2>
          <p className="text-sm text-muted-foreground">Building tutorials and guides</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold">Creator 3</h2>
          <p className="text-sm text-muted-foreground">PvP strategies and tips</p>
        </div>
      </div>
    </div>
  );
}
