import { setRequestLocale } from 'next-intl/server'
import { getFlaggedReviews } from '@/lib/data/tags'
import { ReviewModerationQueue } from '@/components/admin/review-moderation-queue'

export default async function AdminReviewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const flaggedReviews = await getFlaggedReviews()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Review Moderation</h1>
        <p className="text-muted-foreground">Review flagged content and take action.</p>
      </div>

      <ReviewModerationQueue reviews={flaggedReviews} />
    </div>
  )
}
