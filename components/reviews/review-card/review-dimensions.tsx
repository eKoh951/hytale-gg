import { Star } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { ReviewWithDetails } from '@/lib/data/reviews'

export function ReviewDimensions({ review }: { review: ReviewWithDetails }) {
  const t = useTranslations('reviews.dimensions')
  const ratings = review.review_ratings ?? []

  if (ratings.length === 0) return null

  return (
    <div className="flex flex-wrap gap-3">
      {ratings.map((r) => {
        const tag = r.tags as unknown as { name: string; slug: string } | null
        if (!tag) return null
        return (
          <div key={r.dimension_id} className="flex items-center gap-1 text-xs">
            <span className="text-muted-foreground">{tag.name}</span>
            <Star className="size-3 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{r.score}</span>
          </div>
        )
      })}
    </div>
  )
}
