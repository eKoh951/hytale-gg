import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { Card } from '@/components/ui/card'
import { CardStatus } from './card-status'
import { CardRating } from './card-rating'
import { CardBadge } from './card-badge'
import { CardVibeTags } from './card-vibe-tags'
import { CardCopyIp } from './card-copy-ip'
import type { ServerWithTags } from '@/lib/data/servers'

function isNew(createdAt: string | null): boolean {
  if (!createdAt) return false
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
  return new Date(createdAt).getTime() > weekAgo
}

export function CompactCard({ server }: { server: ServerWithTags }) {
  const t = useTranslations('server')

  return (
    <Card className="group relative gap-3 p-4 transition-colors hover:border-primary/30">
      <Link
        href={{ pathname: '/servers/[slug]', params: { slug: server.slug } }}
        className="absolute inset-0 z-10"
        aria-label={server.name}
      />

      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="size-12 shrink-0 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
          {server.icon_url ? (
            <img
              src={server.icon_url}
              alt=""
              className="size-full object-cover"
            />
          ) : (
            <span className="text-lg font-bold text-muted-foreground">
              {server.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-semibold">{server.name}</h3>
            {server.verification_status === 'verified' && <CardBadge type="verified" />}
            {isNew(server.created_at) && <CardBadge type="new" />}
          </div>

          <p className="line-clamp-1 text-xs text-muted-foreground">
            {server.description}
          </p>

          <div className="flex items-center gap-3">
            <CardStatus status={server.current_status} />
            <CardRating rating={server.rating_avg} reviewCount={server.review_count} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <CardVibeTags serverTags={server.server_tags} />
        <div className="relative z-20">
          <CardCopyIp
            ip={server.ip_address}
            port={server.port}
            copyLabel={t('actions.copy')}
            copiedLabel={t('copied')}
          />
        </div>
      </div>
    </Card>
  )
}
