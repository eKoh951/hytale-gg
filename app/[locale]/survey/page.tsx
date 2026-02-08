import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getAllSurveyConfigs, getTotalQuestions } from '@/lib/surveys/get-survey'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ClipboardList, Clock, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

interface SurveyListPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: SurveyListPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.surveys' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }]
}

async function getActiveSurveySlugs(): Promise<string[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('surveys')
    .select('slug')
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  return data?.map((s) => s.slug) ?? []
}

const ESTIMATED_MINUTES: Record<string, number> = {
  'player-discovery': 4,
  'server-owner': 5,
}

export default async function SurveyListPage({ params }: SurveyListPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale })
  const activeSlugs = await getActiveSurveySlugs()
  const allConfigs = getAllSurveyConfigs()

  const activeSurveys = allConfigs.filter((config) =>
    activeSlugs.includes(config.slug)
  )

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {t('survey.listing.title')}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            {t('survey.listing.subtitle')}
          </p>
        </div>

        {/* Survey Cards */}
        {activeSurveys.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
              <ClipboardList className="h-12 w-12 text-muted-foreground/50" />
              <p className="text-lg text-muted-foreground">
                {t('survey.listing.noSurveys')}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col gap-5">
            {activeSurveys.map((config) => {
              const totalQuestions = getTotalQuestions(config)
              const estimatedMinutes = ESTIMATED_MINUTES[config.slug] ?? Math.ceil(totalQuestions * 0.3)

              return (
                <Card
                  key={config.slug}
                  className="group border-2 transition-colors hover:border-primary/40"
                >
                  <CardHeader>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">
                        <Clock className="mr-1 h-3 w-3" />
                        {t('survey.listing.estimatedTime', { minutes: estimatedMinutes })}
                      </Badge>
                      <Badge variant="outline">
                        {t('survey.listing.questions', { count: totalQuestions })}
                      </Badge>
                    </div>
                    <CardTitle className="mt-2 text-2xl">
                      {t(config.titleKey)}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {t(config.descriptionKey)}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button asChild className="gap-2">
                      <Link href={{ pathname: '/survey/[slug]', params: { slug: config.slug } }}>
                        {t('survey.listing.takeSurvey')}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
