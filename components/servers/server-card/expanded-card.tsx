import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Card } from '@/components/ui/card'
import { CardStatus } from './card-status'
import { CardRating } from './card-rating'
import { CardBadge } from './card-badge'
import { CardVibeTags } from './card-vibe-tags'
import { CardCopyIp } from './card-copy-ip'
import type { ServerWithTags } from '@/lib/data/servers'

export function ExpandedCard({
  server,
  badgeType,
}: {
  server: ServerWithTags
  badgeType?: 'featured' | 'hidden_gem'
}) {
  const t = useTranslations('server')

  return (
    <Card className="group relative gap-0 overflow-hidden p-0 transition-colors hover:border-primary/30">
      <Link
        href={`/servers/${server.slug}`}
        className="absolute inset-0 z-10"
        aria-label={server.name}
      />

      {/* Cover */}
      <div className="relative h-32 bg-muted">
        {server.cover_url ? (
          <img
            src={server.cover_url}
            alt=""
            className="size-full object-cover"
          />
        ) : (
          <div className="size-full bg-linear-to-br from-primary/20 to-primary/5" />
        )}
        {badgeType && (
          <div className="absolute left-3 top-3">
            <CardBadge type={badgeType} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3 p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="size-10 shrink-0 rounded-lg bg-muted flex items-center justify-center overflow-hidden border -mt-8 relative z-1">
            {server.icon_url ? (
              <img
                src={server.icon_url}
                alt=""
                className="size-full object-cover"
              />
            ) : (
              <span className="text-base font-bold text-muted-foreground">
                {server.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-semibold">{server.name}</h3>
              {server.verification_status === 'verified' && <CardBadge type="verified" />}
            </div>
            <CardStatus status={server.current_status} />
          </div>
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {server.description}
        </p>

        <CardVibeTags serverTags={server.server_tags} />

        <div className="flex items-center justify-between">
          <CardRating rating={server.rating_avg} reviewCount={server.review_count} />
          <div className="relative z-20">
            <CardCopyIp
              ip={server.ip_address}
              port={server.port}
              copyLabel={t('actions.copy')}
              copiedLabel={t('copied')}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}
