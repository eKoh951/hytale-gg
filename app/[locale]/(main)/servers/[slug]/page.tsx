import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { getServerBySlug, getTags } from '@/lib/data/servers'
import { getReviewsForEntity, getReviewSummary, getDimensionAverages, getUserSavedReviews } from '@/lib/data/reviews'
import { createClient } from '@/lib/supabase/server'
import { DetailHeader } from '@/components/servers/server-card/detail-header'
import { ReviewSummary } from '@/components/reviews/review-summary'
import { ReviewList } from '@/components/reviews/review-list'
import { ReviewModal } from '@/components/reviews/review-modal'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const server = await getServerBySlug(slug)

  if (!server) {
    return { title: 'Server Not Found' }
  }

  return {
    title: `${server.name} | hytale.GG`,
    description: server.description,
    openGraph: {
      title: server.name,
      description: server.description,
      images: server.cover_url ? [server.cover_url] : undefined,
    },
  }
}

export default async function ServerDetailPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const server = await getServerBySlug(slug)
  if (!server) notFound()

  const t = await getTranslations('detail')

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <DetailHeader server={server} />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <section>
            <h2 className="text-xl font-semibold mb-3">{t('about')}</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {server.description}
            </p>
          </section>

          {/* Media */}
          {server.server_media.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-3">{t('media')}</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {server.server_media
                  .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
                  .map((media) => (
                    <div
                      key={media.id}
                      className="aspect-video rounded-lg bg-muted overflow-hidden"
                    >
                      {media.type === 'screenshot' ? (
                        <img
                          src={media.url}
                          alt=""
                          className="size-full object-cover"
                        />
                      ) : (
                        <video
                          src={media.url}
                          poster={media.thumbnail_url ?? undefined}
                          controls
                          className="size-full object-cover"
                        />
                      )}
                    </div>
                  ))}
              </div>
            </section>
          )}

          {/* Reviews */}
          <section>
            <Suspense fallback={<Skeleton className="h-[200px] rounded-xl" />}>
              <ReviewsSection serverId={server.id} />
            </Suspense>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="rounded-xl border p-4 space-y-3">
            <h3 className="font-semibold">{t('info')}</h3>

            <InfoRow label={t('ip')} value={server.ip_address} />
            <InfoRow label={t('port')} value={String(server.port ?? 24454)} />
            <InfoRow label={t('category')} value={server.category} />
            <InfoRow label={t('region')} value={server.region} />
            <InfoRow label={t('language')} value={server.language ?? 'English'} />

            {server.discord_url && (
              <InfoRow label={t('discord')}>
                <a
                  href={server.discord_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline truncate"
                >
                  {server.discord_url}
                </a>
              </InfoRow>
            )}

            {server.website_url && (
              <InfoRow label={t('website')}>
                <a
                  href={server.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline truncate"
                >
                  {server.website_url}
                </a>
              </InfoRow>
            )}

            {server.hosting_provider && (
              <InfoRow label={t('hostingProvider')} value={server.hosting_provider} />
            )}

            <InfoRow
              label={t('createdAt')}
              value={server.created_at ? new Date(server.created_at).toLocaleDateString() : '—'}
            />
          </div>

          {/* Vibes */}
          {server.server_tags.filter((st) => st.tags?.type === 'vibe').length > 0 && (
            <div className="rounded-xl border p-4 space-y-2">
              <h3 className="font-semibold">{t('vibes')}</h3>
              <div className="flex flex-wrap gap-1.5">
                {server.server_tags
                  .filter((st) => st.tags?.type === 'vibe')
                  .map((st) => (
                    <span
                      key={st.tag_id}
                      className="inline-flex items-center rounded-md border bg-secondary/50 px-2 py-0.5 text-xs"
                    >
                      {st.tags?.name}
                    </span>
                  ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

async function ReviewsSection({ serverId }: { serverId: string }) {
  const tReviews = await getTranslations('reviews')
  const tForm = await getTranslations('reviews.form')
  const tModal = await getTranslations('reviews.modal')
  const tCard = await getTranslations('reviews.card')

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [{ reviews, total }, summary, dimensionAverages, dimensions] = await Promise.all([
    getReviewsForEntity('server', serverId),
    getReviewSummary('server', serverId),
    getDimensionAverages('server', serverId),
    getTags('dimension'),
  ])

  const savedIds = user ? await getUserSavedReviews(user.id) : new Set<string>()

  const modalLabels = {
    title: tModal('title'),
    writeReview: tReviews('writeReview'),
    quickTab: tModal('quickTab'),
    detailedTab: tModal('detailedTab'),
    quickDescription: tModal('quickDescription'),
    detailedDescription: tModal('detailedDescription'),
    form: {
      overallRating: tForm('overallRating'),
      dimensionRatings: tForm('dimensionRatings'),
      reviewText: tForm('reviewText'),
      reviewTextPlaceholder: tForm('reviewTextPlaceholder'),
      recommend: tForm('recommend'),
      recommendYes: tForm('recommendYes'),
      recommendNo: tForm('recommendNo'),
      playDuration: tForm('playDuration'),
      playDurationPlaceholder: tForm('playDurationPlaceholder'),
      videoUrl: tForm('videoUrl'),
      videoUrlPlaceholder: tForm('videoUrlPlaceholder'),
      videoPlatform: tForm('videoPlatform'),
      submit: tForm('submit'),
      submitting: tForm('submitting'),
      success: tForm('success'),
      charCount: tForm('charCount'),
    },
  }

  const actionLabels = {
    helpful: tCard('helpful'),
    notHelpful: tCard('notHelpful'),
    funny: tCard('funny'),
    save: tCard('save'),
    saved: tCard('saved'),
    comment: tCard('comment'),
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{tReviews('title')}</h2>
        <ReviewModal
          entityType="server"
          entityId={serverId}
          dimensions={dimensions.map((d) => ({ id: d.id, name: d.name }))}
          labels={modalLabels}
          disabled={!user}
          disabledReason={!user ? tReviews('signInToReview') : undefined}
        />
      </div>

      <ReviewSummary summary={summary} dimensionAverages={dimensionAverages} />

      <ReviewList
        reviews={reviews}
        savedReviewIds={savedIds}
        labels={{ actionLabels }}
      />
    </div>
  )
}

function InfoRow({
  label,
  value,
  children,
}: {
  label: string
  value?: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-sm text-muted-foreground shrink-0">{label}</span>
      {children ?? <span className="text-sm font-medium truncate">{value}</span>}
    </div>
  )
}
