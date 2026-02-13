'use client'

import { useActionState, useState } from 'react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DimensionRating } from './dimension-rating'
import { submitQuickRate, type ReviewActionState } from '@/app/actions/review-actions'
import { cn } from '@/lib/utils'

type Dimension = { id: string; name: string }

type QuickRateLabels = {
  overallRating: string
  dimensionRatings: string
  recommend: string
  recommendYes: string
  recommendNo: string
  submit: string
  submitting: string
  success: string
}

const initialState: ReviewActionState = { success: false }

export function QuickRateForm({
  entityType,
  entityId,
  dimensions,
  labels,
}: {
  entityType: string
  entityId: string
  dimensions: Dimension[]
  labels: QuickRateLabels
}) {
  const [state, formAction, isPending] = useActionState(submitQuickRate, initialState)
  const [overall, setOverall] = useState(0)
  const [hoveredOverall, setHoveredOverall] = useState(0)
  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [recommended, setRecommended] = useState<boolean | null>(null)

  function handleDimensionChange(dimensionId: string, score: number) {
    setRatings((prev) => ({ ...prev, [dimensionId]: score }))
  }

  if (state.success) {
    return (
      <div className="py-8 text-center">
        <p className="text-green-600 font-medium">{labels.success}</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="entity_type" value={entityType} />
      <input type="hidden" name="entity_id" value={entityId} />
      <input type="hidden" name="rating_overall" value={overall} />
      <input type="hidden" name="is_recommended" value={recommended === null ? '' : String(recommended)} />
      <input
        type="hidden"
        name="ratings"
        value={JSON.stringify(
          Object.entries(ratings)
            .filter(([, v]) => v > 0)
            .map(([dimension_id, score]) => ({ dimension_id, score }))
        )}
      />

      {state.message && !state.success && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}

      {/* Overall Rating */}
      <div className="space-y-2">
        <label className="text-sm font-medium">{labels.overallRating}</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="p-1 transition-transform hover:scale-110"
              onMouseEnter={() => setHoveredOverall(star)}
              onMouseLeave={() => setHoveredOverall(0)}
              onClick={() => setOverall(star)}
            >
              <Star
                className={cn(
                  'size-7 transition-colors',
                  (hoveredOverall || overall) >= star
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted-foreground/30'
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Dimension Ratings */}
      <div className="space-y-3">
        <label className="text-sm font-medium">{labels.dimensionRatings}</label>
        {dimensions.map((dim) => (
          <DimensionRating
            key={dim.id}
            dimensionId={dim.id}
            label={dim.name}
            value={ratings[dim.id] ?? 0}
            onChange={handleDimensionChange}
          />
        ))}
      </div>

      {/* Recommend */}
      <div className="space-y-2">
        <label className="text-sm font-medium">{labels.recommend}</label>
        <div className="flex gap-3">
          <Button
            type="button"
            variant={recommended === true ? 'default' : 'outline'}
            size="sm"
            onClick={() => setRecommended(true)}
          >
            {labels.recommendYes}
          </Button>
          <Button
            type="button"
            variant={recommended === false ? 'destructive' : 'outline'}
            size="sm"
            onClick={() => setRecommended(false)}
          >
            {labels.recommendNo}
          </Button>
        </div>
      </div>

      <Button type="submit" disabled={isPending || overall === 0}>
        {isPending ? labels.submitting : labels.submit}
      </Button>
    </form>
  )
}
