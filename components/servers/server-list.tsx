import { useTranslations } from 'next-intl'
import { CompactCard } from './server-card/compact-card'
import type { ServerWithTags } from '@/lib/data/servers'

export function ServerList({
  servers,
  total,
  page,
  pageSize,
}: {
  servers: ServerWithTags[]
  total: number
  page: number
  pageSize: number
}) {
  const t = useTranslations('servers')
  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)

  if (servers.length === 0) {
    const tf = useTranslations('filters')
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">{tf('noResults')}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {t('showing', { from, to, total })}
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {servers.map((server) => (
          <CompactCard key={server.id} server={server} />
        ))}
      </div>
    </div>
  )
}
