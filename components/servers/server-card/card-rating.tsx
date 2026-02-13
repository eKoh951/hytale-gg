import { Star } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

export function CardRating({
  rating,
  reviewCount,
  className,
}: {
  rating: number | null
  reviewCount: number | null
  className?: string
}) {
  const t = useTranslations('server')
  const avg = rating ?? 0
  const count = reviewCount ?? 0

  if (count === 0) {
    return (
      <span className={cn('text-xs text-muted-foreground', className)}>
        {t('noReviews')}
      </span>
    )
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
      <span className="text-sm font-medium">{avg.toFixed(1)}</span>
      <span className="text-xs text-muted-foreground">
        ({count === 1 ? t('reviewsSingular') : t('reviews', { count })})
      </span>
    </div>
  )
}
