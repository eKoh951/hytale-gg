import { ClipboardList, Users, CheckCircle2, XCircle } from 'lucide-react'
import { setRequestLocale } from 'next-intl/server'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'

async function getOverviewStats() {
  const supabase = await createClient()

  const [surveysResult, responsesResult, completedResult, screenedOutResult] = await Promise.all([
    supabase.from('surveys').select('id', { count: 'exact', head: true }),
    supabase.from('survey_responses').select('id', { count: 'exact', head: true }),
    supabase
      .from('survey_responses')
      .select('id', { count: 'exact', head: true })
      .not('completed_at', 'is', null),
    supabase
      .from('survey_responses')
      .select('id', { count: 'exact', head: true })
      .eq('screened_out', true),
  ])

  return {
    totalSurveys: surveysResult.count ?? 0,
    totalResponses: responsesResult.count ?? 0,
    completedResponses: completedResult.count ?? 0,
    screenedOut: screenedOutResult.count ?? 0,
  }
}

const statCards = [
  {
    key: 'totalSurveys' as const,
    title: 'Total Surveys',
    icon: ClipboardList,
    color: 'text-blue-500',
  },
  {
    key: 'totalResponses' as const,
    title: 'Total Responses',
    icon: Users,
    color: 'text-green-500',
  },
  {
    key: 'completedResponses' as const,
    title: 'Completed',
    icon: CheckCircle2,
    color: 'text-emerald-500',
  },
  {
    key: 'screenedOut' as const,
    title: 'Screened Out',
    icon: XCircle,
    color: 'text-red-500',
  },
]

export default async function AdminOverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const stats = await getOverviewStats()

  return (
    <div className="space-y-6 pt-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of survey activity and responses.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.key}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className={`size-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats[card.key]}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
