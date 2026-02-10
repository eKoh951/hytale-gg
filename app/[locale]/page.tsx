import { pick } from 'es-toolkit';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { createClient } from '@/lib/supabase/server';
import { getAllSurveyConfigs, getTotalQuestions } from '@/lib/surveys/get-survey';
import { HomeSurveyList } from '@/components/landing/home-survey-list';
import type { Metadata } from 'next';

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

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

const ESTIMATED_MINUTES: Record<string, number> = {
  'player-discovery': 4,
  'server-owner': 5,
};

async function getActiveSurveySlugs(): Promise<string[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('surveys')
    .select('slug')
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  return data?.map((s) => s.slug) ?? [];
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, messages] = await Promise.all([
    getTranslations({ locale }),
    getMessages({ locale }),
  ]);
  const activeSlugs = await getActiveSurveySlugs();
  const allConfigs = getAllSurveyConfigs();

  const activeSurveys = allConfigs
    .filter((config) => activeSlugs.includes(config.slug))
    .map((config) => ({
      slug: config.slug,
      title: t(config.titleKey),
      description: t(config.descriptionKey),
      totalQuestions: getTotalQuestions(config),
      estimatedMinutes: ESTIMATED_MINUTES[config.slug] ?? Math.ceil(getTotalQuestions(config) * 0.3),
    }));

  return (
    <main>
      <NextIntlClientProvider messages={pick(messages as Record<string, unknown>, ['survey'])}>
        <HomeSurveyList
          surveys={activeSurveys}
          title={t('survey.listing.title')}
          subtitle={t('survey.listing.subtitle')}
        />
      </NextIntlClientProvider>
    </main>
  );
}
