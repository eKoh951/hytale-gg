import { useTranslations } from 'next-intl'
import { getHiddenGems } from '@/lib/data/discovery'
import { ExpandedCard } from '@/components/servers/server-card/expanded-card'

export async function HiddenGems() {
  const servers = await getHiddenGems()
  const t = useTranslations('server')

  if (servers.length === 0) return null

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">{t('hiddenGem')}s</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {servers.map((server) => (
          <ExpandedCard key={server.id} server={server} badgeType="hidden_gem" />
        ))}
      </div>
    </section>
  )
}
