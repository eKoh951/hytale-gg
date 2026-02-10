import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { setRequestLocale, getTranslations } from 'next-intl/server'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getSurveyResults } from '@/lib/admin/survey-analytics'
import { SurveyResultsClient } from './results-client'

export default async function AdminSurveyResultsPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale })
  const resolve = (key: string) => {
    try {
      return t(key as any)
    } catch {
      return key.split('.').pop() ?? key
    }
  }

  const results = await getSurveyResults(slug, resolve)
  if (!results) notFound()

  const completionRate = results.meta.totalStarted > 0
    ? Math.round((results.meta.totalCompleted / results.meta.totalStarted) * 100)
    : 0

  return (
    <div className="space-y-6 pt-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="icon" className="size-8">
              <Link href={`/${locale}/admin/surveys`}>
                <ArrowLeft className="size-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">
              {results.meta.surveyTitle}
            </h1>
          </div>
          <div className="flex items-center gap-3 pl-10 text-sm text-muted-foreground">
            <span className="font-medium tabular-nums">
              {results.meta.totalCompleted} completed
            </span>
            <span>·</span>
            <span>{results.meta.totalStarted} started</span>
            <span>·</span>
            <span>{results.meta.screenedOut} screened out</span>
            <span>·</span>
            <Badge variant="secondary" className="tabular-nums">
              {completionRate}% completion
            </Badge>
          </div>
        </div>
      </div>

      <Separator />

      {/* Question-by-question results — client component for # / % toggle */}
      <SurveyResultsClient questions={results.questions} />
    </div>
  )
}
