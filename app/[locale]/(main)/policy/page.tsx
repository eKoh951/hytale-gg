import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { generateHreflangAlternates, generateOGLocales, getOGLocale } from '@/lib/utils/seo';
import type { Locale } from '@/i18n/locales';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('metadata.policy');

  const alternates = generateHreflangAlternates('/policy');

  return {
    title: t('title'),
    description: t('description'),
    alternates,
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: getOGLocale(locale as Locale),
      alternateLocale: generateOGLocales(locale as Locale),
    },
  };
}

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

export default async function PolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'legal.policy' });

  const infoSections = ['accountData', 'usageData', 'serverData', 'reviewData'] as const;
  const usageItems = ['provide', 'account', 'communicate', 'security', 'analytics', 'legal'] as const;
  const sharingItems = ['providers', 'legal', 'consent'] as const;
  const rightsItems = ['access', 'correct', 'delete', 'export', 'withdraw'] as const;

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            {t('title')}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t('lastUpdated', { date: 'February 12, 2026' })}
          </p>
          <p className="mt-6 text-base leading-7 text-muted-foreground">
            {t('intro')}
          </p>
        </header>

        <div className="space-y-10">
          {/* 1. Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">
              {t('sections.informationWeCollect.title')}
            </h2>
            <div className="mt-4 space-y-6">
              {infoSections.map((key) => (
                <div key={key}>
                  <h3 className="text-lg font-medium text-foreground">
                    {t(`sections.informationWeCollect.${key}.title`)}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {t(`sections.informationWeCollect.${key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 2. How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">
              {t('sections.howWeUse.title')}
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              {usageItems.map((key) => (
                <li key={key} className="text-sm leading-6 text-muted-foreground">
                  {t(`sections.howWeUse.items.${key}`)}
                </li>
              ))}
            </ul>
          </section>

          {/* 3. Data Sharing */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">
              {t('sections.dataSharing.title')}
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {t('sections.dataSharing.description')}
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              {sharingItems.map((key) => (
                <li key={key} className="text-sm leading-6 text-muted-foreground">
                  {t(`sections.dataSharing.items.${key}`)}
                </li>
              ))}
            </ul>
          </section>

          {/* 4. Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">
              {t('sections.cookies.title')}
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {t('sections.cookies.description')}
            </p>
          </section>

          {/* 5. Data Security */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">
              {t('sections.dataSecurity.title')}
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {t('sections.dataSecurity.description')}
            </p>
          </section>

          {/* 6. Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">
              {t('sections.yourRights.title')}
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {t('sections.yourRights.description')}
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              {rightsItems.map((key) => (
                <li key={key} className="text-sm leading-6 text-muted-foreground">
                  {t(`sections.yourRights.items.${key}`)}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {t('sections.yourRights.contact')}
            </p>
          </section>

          {/* 7. Children's Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">
              {t('sections.children.title')}
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {t('sections.children.description')}
            </p>
          </section>

          {/* 8. Changes */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">
              {t('sections.changes.title')}
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {t('sections.changes.description')}
            </p>
          </section>

          {/* 9. Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">
              {t('sections.contact.title')}
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {t('sections.contact.description')}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {t('sections.contact.email', { email: 'privacy@hytale.gg' })}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
