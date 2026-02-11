import { getTranslations } from 'next-intl/server'
import { getFeaturedServers } from '@/lib/data/discovery'
import { ExpandedCard } from '@/components/servers/server-card/expanded-card'

export async function FeaturedServers() {
  const servers = await getFeaturedServers()
  const t = await getTranslations('server')

  if (servers.length === 0) return null

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">{t('featured')}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {servers.map((server) => (
          <ExpandedCard key={server.id} server={server} badgeType="featured" />
        ))}
      </div>
    </section>
  )
}
