import type { ReviewWithDetails } from '@/lib/data/reviews'

export function ReviewBody({ review }: { review: ReviewWithDetails }) {
  if (!review.review_text) return null

  return (
    <div className="space-y-2">
      <p className="text-sm leading-relaxed whitespace-pre-line">
        {review.review_text}
      </p>

      {review.video_url && (
        <a
          href={review.video_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
        >
          🎬 {review.video_platform ?? 'Video'} review
        </a>
      )}
    </div>
  )
}
