import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

// Generate metadata using translations
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata.submit');
  
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

export default async function SubmitPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);
  
  const t = await getTranslations('submit');
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
      <p className="text-muted-foreground mb-8">{t('description')}</p>
      
      <div className="space-y-6">
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">{t('serverInfo')}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t('serverName')}</label>
              <input type="text" className="w-full p-2 border rounded" placeholder={t('serverNamePlaceholder')} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t('serverIP')}</label>
              <input type="text" className="w-full p-2 border rounded" placeholder="play.hytale.gg:25565" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t('description')}</label>
              <textarea className="w-full p-2 border rounded" rows={4} placeholder={t('descriptionPlaceholder')} />
            </div>
          </div>
        </div>
        
        <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
          {t('submitServer')}
        </button>
      </div>
    </div>
  );
}
