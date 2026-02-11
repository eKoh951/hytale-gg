import { useTranslations } from 'next-intl'
import { getNewServers } from '@/lib/data/discovery'
import { CompactCard } from '@/components/servers/server-card/compact-card'

export async function NewServers() {
  const servers = await getNewServers()
  const t = useTranslations('server')

  if (servers.length === 0) return null

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">{t('new')}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {servers.map((server) => (
          <CompactCard key={server.id} server={server} />
        ))}
      </div>
    </section>
  )
}
