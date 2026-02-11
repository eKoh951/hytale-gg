'use client'

import { useActionState, useState } from 'react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DimensionRating } from './dimension-rating'
import { submitDetailedReview, type ReviewActionState } from '@/app/actions/review-actions'
import { cn } from '@/lib/utils'

type Dimension = { id: string; name: string }

type DetailedReviewLabels = {
  overallRating: string
  dimensionRatings: string
  reviewText: string
  reviewTextPlaceholder: string
  recommend: string
  recommendYes: string
  recommendNo: string
  playDuration: string
  playDurationPlaceholder: string
  videoUrl: string
  videoUrlPlaceholder: string
  videoPlatform: string
  submit: string
  submitting: string
  success: string
  charCount: string
}

const initialState: ReviewActionState = { success: false }

export function DetailedReviewForm({
  entityType,
  entityId,
  dimensions,
  labels,
}: {
  entityType: string
  entityId: string
  dimensions: Dimension[]
  labels: DetailedReviewLabels
}) {
  const [state, formAction, isPending] = useActionState(submitDetailedReview, initialState)
  const [overall, setOverall] = useState(0)
  const [hoveredOverall, setHoveredOverall] = useState(0)
  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [recommended, setRecommended] = useState<boolean | null>(null)
  const [textLength, setTextLength] = useState(0)

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
        <Label>{labels.overallRating}</Label>
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
        <Label>{labels.dimensionRatings}</Label>
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

      {/* Review Text */}
      <div className="space-y-2">
        <Label htmlFor="review_text">{labels.reviewText}</Label>
        <Textarea
          id="review_text"
          name="review_text"
          placeholder={labels.reviewTextPlaceholder}
          rows={5}
          onChange={(e) => setTextLength(e.target.value.length)}
        />
        <p className={cn('text-xs', textLength >= 50 ? 'text-muted-foreground' : 'text-destructive')}>
          {labels.charCount.replace('{count}', String(textLength))}
        </p>
        {state.errors?.review_text && (
          <p className="text-xs text-destructive">{state.errors.review_text[0]}</p>
        )}
      </div>

      {/* Recommend */}
      <div className="space-y-2">
        <Label>{labels.recommend}</Label>
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

      {/* Play Duration */}
      <div className="space-y-2">
        <Label htmlFor="play_duration_text">{labels.playDuration}</Label>
        <Input
          id="play_duration_text"
          name="play_duration_text"
          placeholder={labels.playDurationPlaceholder}
        />
      </div>

      {/* Video URL */}
      <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
        <div className="space-y-2">
          <Label htmlFor="video_url">{labels.videoUrl}</Label>
          <Input id="video_url" name="video_url" placeholder={labels.videoUrlPlaceholder} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="video_platform">{labels.videoPlatform}</Label>
          <Input id="video_platform" name="video_platform" placeholder="YouTube" />
        </div>
      </div>

      <Button type="submit" disabled={isPending || overall === 0}>
        {isPending ? labels.submitting : labels.submit}
      </Button>
    </form>
  )
}
