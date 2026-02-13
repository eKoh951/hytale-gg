import { useTranslations } from 'next-intl'
import { CardStatus } from './card-status'
import { CardRating } from './card-rating'
import { CardBadge } from './card-badge'
import { CardCopyIp } from './card-copy-ip'
import type { ServerDetail } from '@/lib/data/servers'

export function DetailHeader({ server }: { server: ServerDetail }) {
  const t = useTranslations('server')

  return (
    <div className="space-y-4">
      {/* Cover */}
      {server.cover_url && (
        <div className="relative h-48 sm:h-64 rounded-xl overflow-hidden bg-muted">
          <img
            src={server.cover_url}
            alt=""
            className="size-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="size-16 shrink-0 rounded-xl bg-muted flex items-center justify-center overflow-hidden border">
            {server.icon_url ? (
              <img
                src={server.icon_url}
                alt=""
                className="size-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-muted-foreground">
                {server.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold">{server.name}</h1>
              {server.verification_status === 'verified' && <CardBadge type="verified" />}
            </div>
            <div className="flex items-center gap-3">
              <CardStatus status={server.current_status} />
              <CardRating rating={server.rating_avg} reviewCount={server.review_count} />
              {server.recommend_pct != null && server.review_count != null && server.review_count > 0 && (
                <span className="text-xs text-muted-foreground">
                  {t('recommend', { pct: Math.round(Number(server.recommend_pct)) })}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <CardCopyIp
            ip={server.ip_address}
            port={server.port}
            copyLabel={t('actions.copy')}
            copiedLabel={t('copied')}
          />
        </div>
      </div>
    </div>
  )
}
