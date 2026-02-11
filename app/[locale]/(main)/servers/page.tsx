import { Suspense } from 'react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { getServers, type ServerFilters } from '@/lib/data/servers'
import { ServerList } from '@/components/servers/server-list'
import { ServerFilters as ServerFiltersComponent } from '@/components/servers/server-filters'
import { Skeleton } from '@/components/ui/skeleton'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata.servers')

  return {
    title: t('title'),
    description: t('description'),
  }
}

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<Record<string, string | undefined>>
}

async function ServerListSection({ filters }: { filters: ServerFilters }) {
  const result = await getServers(filters)

  return (
    <ServerList
      servers={result.servers}
      total={result.total}
      page={result.page}
      pageSize={result.pageSize}
    />
  )
}

function ServerListSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-[140px] rounded-xl" />
      ))}
    </div>
  )
}

export default async function ServersPage({ params, searchParams }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const sp = await searchParams

  const [t, tCat, tReg, tFilters] = await Promise.all([
    getTranslations('servers'),
    getTranslations('categories'),
    getTranslations('regions'),
    getTranslations('filters'),
  ])

  const filters: ServerFilters = {
    category: sp.category,
    region: sp.region,
    status: sp.status,
    search: sp.search,
    sort: (sp.sort as ServerFilters['sort']) ?? 'quality',
    page: sp.page ? parseInt(sp.page, 10) : 1,
  }

  const filterLabels = {
    search: tFilters('search'),
    category: tFilters('category'),
    region: tFilters('region'),
    sort: tFilters('sort'),
    status: tFilters('status'),
    clearFilters: tFilters('clearFilters'),
    categories: {
      all: tCat('all'),
      survival: tCat('survival'),
      pvp: tCat('pvp'),
      creative: tCat('creative'),
      roleplay: tCat('roleplay'),
      minigames: tCat('minigames'),
      modded: tCat('modded'),
    },
    regions: {
      all: tReg('all'),
      na: tReg('na'),
      eu: tReg('eu'),
      asia: tReg('asia'),
      latam: tReg('latam'),
      oce: tReg('oce'),
    },
    sortOptions: {
      quality: tFilters('sortOptions.quality'),
      newest: tFilters('sortOptions.newest'),
      name: tFilters('sortOptions.name'),
      players: tFilters('sortOptions.players'),
    },
    statusOptions: {
      all: tFilters('statusOptions.all'),
      online: tFilters('statusOptions.online'),
    },
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground mt-1">{t('description')}</p>
      </div>

      <Suspense>
        <ServerFiltersComponent labels={filterLabels} />
      </Suspense>

      <Suspense fallback={<ServerListSkeleton />}>
        <ServerListSection filters={filters} />
      </Suspense>
    </div>
  )
}
