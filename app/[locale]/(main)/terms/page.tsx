import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { generateHreflangAlternates, generateOGLocales, getOGLocale } from '@/lib/utils/seo';
import type { Locale } from '@/i18n/locales';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('metadata.terms');

  const alternates = generateHreflangAlternates('/terms');

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

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'legal.terms' });

  const accountItems = ['accurate', 'security', 'activity', 'notify'] as const;
  const contentItems = ['own', 'grant', 'responsible', 'noInfringe'] as const;
  const prohibitedItems = ['false', 'harass', 'spam', 'impersonate', 'scrape', 'interfere', 'illegal'] as const;
  const listingItems = ['accurate', 'ownership', 'compliance', 'removal'] as const;

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
          {/* 1. Acceptance */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">
              {t('sections.acceptance.title')}
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {t('sections.acceptance.description')}
            </p>
          </section>

          {/* 2. Account Responsibilities */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">
              {t('sections.accountResponsibilities.title')}
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {t('sections.accountResponsibilities.description')}
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              {accountItems.map((key) => (
                <li key={key} className="text-sm leading-6 text-muted-foreground">
                  {t(`sections.accountResponsibilities.items.${key}`)}
                </li>
              ))}
            </ul>
          </section>

          {/* 3. User Content */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">
              {t('sections.userContent.title')}
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {t('sections.userContent.description')}
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              {contentItems.map((key) => (
                <li key={key} className="text-sm leading-6 text-muted-foreground">
                  {t(`sections.userContent.items.${key}`)}
                </li>
              ))}
            </ul>
          </section>

          {/* 4. Prohibited Conduct */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">
              {t('sections.prohibitedConduct.title')}
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {t('sections.prohibitedConduct.description')}
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              {prohibitedItems.map((key) => (
                <li key={key} className="text-sm leading-6 text-muted-foreground">
                  {t(`sections.prohibitedConduct.items.${key}`)}
                </li>
              ))}
            </ul>
          </section>

          {/* 5. Server Listings */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">
              {t('sections.serverListings.title')}
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {t('sections.serverListings.description')}
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              {listingItems.map((key) => (
                <li key={key} className="text-sm leading-6 text-muted-foreground">
                  {t(`sections.serverListings.items.${key}`)}
                </li>
              ))}
            </ul>
          </section>

          {/* 6. Moderation */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">
              {t('sections.moderation.title')}
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {t('sections.moderation.description')}
            </p>
          </section>

          {/* 7. Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">
              {t('sections.intellectualProperty.title')}
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {t('sections.intellectualProperty.description')}
            </p>
          </section>

          {/* 8. Disclaimer */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">
              {t('sections.disclaimer.title')}
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {t('sections.disclaimer.description')}
            </p>
          </section>

          {/* 9. Limitation */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">
              {t('sections.limitation.title')}
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {t('sections.limitation.description')}
            </p>
          </section>

          {/* 10. Termination */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">
              {t('sections.termination.title')}
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {t('sections.termination.description')}
            </p>
          </section>

          {/* 11. Governing Law */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">
              {t('sections.governing.title')}
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {t('sections.governing.description')}
            </p>
          </section>

          {/* 12. Changes */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">
              {t('sections.changes.title')}
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {t('sections.changes.description')}
            </p>
          </section>

          {/* 13. Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground">
              {t('sections.contact.title')}
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {t('sections.contact.description')}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {t('sections.contact.email', { email: 'legal@hytale.gg' })}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
