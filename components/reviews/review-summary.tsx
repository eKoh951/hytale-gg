import { Star } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

type SummaryData = {
  avgRating: number
  totalReviews: number
  recommendPct: number
  distribution: number[]
}

type DimensionAvg = {
  dimension_id: string
  name: string
  slug: string
  avg: number
  count: number
}

export function ReviewSummary({
  summary,
  dimensionAverages,
}: {
  summary: SummaryData
  dimensionAverages: DimensionAvg[]
}) {
  const t = useTranslations('reviews.summary')
  const td = useTranslations('reviews.dimensions')

  if (summary.totalReviews === 0) return null

  return (
    <div className="rounded-xl border p-4 space-y-4">
      <h3 className="font-semibold">{t('title')}</h3>

      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="text-4xl font-bold">{summary.avgRating.toFixed(1)}</div>
          <div className="flex gap-0.5 justify-center mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  'size-4',
                  summary.avgRating >= star
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted-foreground/30'
                )}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {t('basedOn', { count: summary.totalReviews })}
          </p>
        </div>

        {/* Distribution bars */}
        <div className="flex-1 space-y-1">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = summary.distribution[stars - 1]
            const pct = summary.totalReviews > 0 ? (count / summary.totalReviews) * 100 : 0
            return (
              <div key={stars} className="flex items-center gap-2 text-xs">
                <span className="w-3 text-right">{stars}</span>
                <Star className="size-3 fill-yellow-400 text-yellow-400" />
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-6 text-right text-muted-foreground">{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      {summary.recommendPct > 0 && (
        <p className="text-sm text-muted-foreground">
          {t('recommend', { pct: summary.recommendPct })}
        </p>
      )}

      {/* Dimension averages */}
      {dimensionAverages.length > 0 && (
        <div className="space-y-2 pt-2 border-t">
          <h4 className="text-sm font-medium">{td('title')}</h4>
          {dimensionAverages.map((dim) => (
            <div key={dim.dimension_id} className="flex items-center justify-between gap-2">
              <span className="text-sm">{dim.name}</span>
              <div className="flex items-center gap-1">
                <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{dim.avg.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
