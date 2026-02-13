import { useTranslations } from 'next-intl'
import { ReviewHeader } from './review-card/review-header'
import { ReviewDimensions } from './review-card/review-dimensions'
import { ReviewBody } from './review-card/review-body'
import { ReviewActions } from './review-card/review-actions'
import { ReviewOwnerResponse } from './review-card/review-owner-response'
import type { ReviewWithDetails } from '@/lib/data/reviews'

type ReviewListLabels = {
  actionLabels: {
    helpful: string
    notHelpful: string
    funny: string
    save: string
    saved: string
    comment: string
  }
}

export function ReviewList({
  reviews,
  savedReviewIds,
  labels,
}: {
  reviews: ReviewWithDetails[]
  savedReviewIds: Set<string>
  labels: ReviewListLabels
}) {
  const t = useTranslations('reviews')

  if (reviews.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">{t('noReviews')}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="rounded-xl border p-4 space-y-3">
          <ReviewHeader review={review} />
          <ReviewDimensions review={review} />
          <ReviewBody review={review} />
          <ReviewActions
            reviewId={review.id}
            helpfulCount={review.helpful_count ?? 0}
            funnyCount={review.funny_count ?? 0}
            commentCount={review.review_comments?.length ?? 0}
            isSaved={savedReviewIds.has(review.id)}
            labels={labels.actionLabels}
          />
          {review.owner_responses?.[0] && (
            <ReviewOwnerResponse response={review.owner_responses[0]} />
          )}
        </div>
      ))}
    </div>
  )
}
