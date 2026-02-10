import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { getSurveyListStats } from '@/lib/admin/survey-analytics'

const STATUS_VARIANT: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  active: 'default',
  closed: 'secondary',
  draft: 'outline',
}

export default async function AdminSurveysPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const surveys = await getSurveyListStats()

  return (
    <div className="space-y-6 pt-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Surveys</h1>
        <p className="text-muted-foreground">
          All surveys and their response statistics.
        </p>
      </div>

      {surveys.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No surveys found.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {surveys.map((survey) => {
            const completionRate = survey.total > 0
              ? Math.round((survey.completed / survey.total) * 100)
              : 0

            return (
              <Card key={survey.slug}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{survey.title}</CardTitle>
                    <Badge variant={STATUS_VARIANT[survey.status] ?? 'outline'}>
                      {survey.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Completion rate</span>
                      <span className="font-medium tabular-nums">{completionRate}%</span>
                    </div>
                    <Progress value={completionRate} className="h-2" />
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div>
                      <p className="text-lg font-bold tabular-nums">{survey.completed}</p>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold tabular-nums">{survey.screenedOut}</p>
                      <p className="text-xs text-muted-foreground">Screened Out</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold tabular-nums">{survey.inProgress}</p>
                      <p className="text-xs text-muted-foreground">In Progress</p>
                    </div>
                  </div>

                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/${locale}/admin/surveys/${survey.slug}`}>
                      View Results
                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
