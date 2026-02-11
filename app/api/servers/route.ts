import { NextRequest, NextResponse } from 'next/server'
import { getServers, type ServerFilters } from '@/lib/data/servers'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const filters: ServerFilters = {
    category: searchParams.get('category') ?? undefined,
    region: searchParams.get('region') ?? undefined,
    status: searchParams.get('status') ?? undefined,
    search: searchParams.get('search') ?? undefined,
    sort: (searchParams.get('sort') as ServerFilters['sort']) ?? 'quality',
    page: searchParams.has('page') ? parseInt(searchParams.get('page')!, 10) : 1,
    limit: searchParams.has('limit') ? parseInt(searchParams.get('limit')!, 10) : 20,
  }

  try {
    const result = await getServers(filters)

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch servers' },
      { status: 500 }
    )
  }
}
