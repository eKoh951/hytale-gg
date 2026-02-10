import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getSurveyConfig } from '@/lib/surveys/get-survey'
import { SurveyShell } from './survey-shell';

interface SurveyPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: SurveyPageProps) {
  const { locale, slug } = await params
  const config = getSurveyConfig(slug)
  if (!config) return {}

  const t = await getTranslations({ locale })

  return {
    title: t(config.titleKey),
    description: t(config.descriptionKey),
  }
}

export default async function SurveyPage({ params }: SurveyPageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const config = getSurveyConfig(slug)
  if (!config) notFound()

  return <SurveyShell slug={slug} locale={locale} />
}
