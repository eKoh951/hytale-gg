import { Star, Award, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useTranslations } from 'next-intl'
import type { ReviewWithDetails } from '@/lib/data/reviews'
import { cn } from '@/lib/utils'

export function ReviewHeader({ review }: { review: ReviewWithDetails }) {
  const t = useTranslations('reviews.card')
  const profile = review.profiles

  return (
    <div className="flex items-start gap-3">
      <Avatar className="size-9">
        <AvatarImage src={profile?.avatar_url ?? undefined} />
        <AvatarFallback>
          {(profile?.display_name ?? '?').charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium truncate">
            {profile?.display_name ?? 'Anonymous'}
          </span>
          {review.is_creator_review && (
            <Badge variant="outline" className="text-[10px] bg-purple-500/10 text-purple-600 border-purple-500/30">
              <Award className="mr-0.5 size-3" />
              {t('creatorReview')}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2 mt-0.5">
          {/* Star rating */}
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  'size-3.5',
                  Number(review.rating_overall) >= star
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted-foreground/30'
                )}
              />
            ))}
          </div>

          {review.play_duration_text && (
            <span className="text-xs text-muted-foreground flex items-center gap-0.5">
              <Clock className="size-3" />
              {t('played', { duration: review.play_duration_text })}
            </span>
          )}

          <span className="text-xs text-muted-foreground">
            {t('postedOn', {
              date: review.created_at
                ? new Date(review.created_at).toLocaleDateString()
                : '',
            })}
          </span>
        </div>
      </div>
    </div>
  )
}
