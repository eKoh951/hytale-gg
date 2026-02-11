'use client'

import { useActionState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, Check, X, AlertTriangle } from 'lucide-react'
import { adminReviewAction, type TagActionState } from '@/app/actions/tag-actions'

type FlaggedReview = {
  id: string
  entity_type: string
  entity_id: string
  rating_overall: number
  review_text: string | null
  status: string
  created_at: string | null
  profiles: { display_name: string; username: string | null } | null
  servers: { name: string; slug: string } | null
}

const initialState: TagActionState = { success: false }

export function ReviewModerationQueue({ reviews }: { reviews: FlaggedReview[] }) {
  if (reviews.length === 0) {
    return (
      <div className="rounded-xl border p-8 text-center">
        <p className="text-muted-foreground">No flagged reviews. All clear!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {reviews.map((review) => (
        <FlaggedReviewRow key={review.id} review={review} />
      ))}
    </div>
  )
}

function FlaggedReviewRow({ review }: { review: FlaggedReview }) {
  const [state, formAction, isPending] = useActionState(adminReviewAction, initialState)

  if (state.success) {
    return (
      <div className="rounded-lg border p-4 bg-muted/50">
        <p className="text-sm text-green-600">{state.message}</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border p-4 space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30">
              <AlertTriangle className="mr-1 size-3" />
              Flagged
            </Badge>
            {review.servers && (
              <span className="text-sm font-medium">{review.servers.name}</span>
            )}
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`size-3 ${Number(review.rating_overall) >= s ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`}
                />
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-1">
            By {review.profiles?.display_name ?? 'Unknown'} ·{' '}
            {review.created_at ? new Date(review.created_at).toLocaleDateString() : ''}
          </p>

          {review.review_text && (
            <p className="text-sm mt-2 line-clamp-3">{review.review_text}</p>
          )}
        </div>
      </div>

      {state.message && !state.success && (
        <p className="text-xs text-destructive">{state.message}</p>
      )}

      <div className="flex items-center gap-2">
        <form action={formAction}>
          <input type="hidden" name="review_id" value={review.id} />
          <input type="hidden" name="action" value="published" />
          <Button size="sm" variant="default" disabled={isPending} className="gap-1">
            <Check className="size-3" /> Restore
          </Button>
        </form>

        <form action={formAction}>
          <input type="hidden" name="review_id" value={review.id} />
          <input type="hidden" name="action" value="removed" />
          <Button size="sm" variant="destructive" disabled={isPending} className="gap-1">
            <X className="size-3" /> Remove
          </Button>
        </form>
      </div>
    </div>
  )
}
