import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { SubmitServerForm } from '@/components/servers/submit-server-form'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata.submit')

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function SubmitPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const [tSubmit, tCat, tReg] = await Promise.all([
    getTranslations('submit'),
    getTranslations('categories'),
    getTranslations('regions'),
  ])

  const labels = {
    nameLabel: tSubmit('nameLabel'),
    namePlaceholder: tSubmit('namePlaceholder'),
    slugLabel: tSubmit('slugLabel'),
    slugPlaceholder: tSubmit('slugPlaceholder'),
    slugHint: tSubmit('slugHint'),
    descriptionLabel: tSubmit('descriptionLabel'),
    descriptionPlaceholder: tSubmit('descriptionPlaceholder'),
    ipLabel: tSubmit('ipLabel'),
    ipPlaceholder: tSubmit('ipPlaceholder'),
    portLabel: tSubmit('portLabel'),
    categoryLabel: tSubmit('categoryLabel'),
    categoryPlaceholder: tSubmit('categoryPlaceholder'),
    regionLabel: tSubmit('regionLabel'),
    regionPlaceholder: tSubmit('regionPlaceholder'),
    languageLabel: tSubmit('languageLabel'),
    discordLabel: tSubmit('discordLabel'),
    discordPlaceholder: tSubmit('discordPlaceholder'),
    websiteLabel: tSubmit('websiteLabel'),
    websitePlaceholder: tSubmit('websitePlaceholder'),
    hostingLabel: tSubmit('hostingLabel'),
    hostingPlaceholder: tSubmit('hostingPlaceholder'),
    submitButton: tSubmit('submitButton'),
    submitting: tSubmit('submitting'),
    categories: {
      survival: tCat('survival'),
      pvp: tCat('pvp'),
      creative: tCat('creative'),
      roleplay: tCat('roleplay'),
      minigames: tCat('minigames'),
      modded: tCat('modded'),
    },
    regions: {
      na: tReg('na'),
      eu: tReg('eu'),
      asia: tReg('asia'),
      latam: tReg('latam'),
      oce: tReg('oce'),
    },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{tSubmit('title')}</h1>
        <p className="text-muted-foreground mt-1">{tSubmit('subtitle')}</p>
      </div>

      <SubmitServerForm labels={labels} />
    </div>
  )
}
