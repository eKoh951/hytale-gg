import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/lib/types/database.types'

type Server = Database['public']['Tables']['servers']['Row']
type ServerMedia = Database['public']['Tables']['server_media']['Row']
type Tag = Database['public']['Tables']['tags']['Row']

export type ServerWithTags = Server & {
  server_tags: Array<{ tag_id: string; tags: Tag }>
}

export type ServerDetail = ServerWithTags & {
  server_media: ServerMedia[]
}

export type ServerFilters = {
  category?: string
  region?: string
  status?: string
  search?: string
  sort?: 'quality' | 'newest' | 'name' | 'players'
  page?: number
  limit?: number
}

const PAGE_SIZE = 20

export async function getServers(filters: ServerFilters = {}) {
  const supabase = await createClient()
  const {
    category,
    region,
    status,
    search,
    sort = 'quality',
    page = 1,
    limit = PAGE_SIZE,
  } = filters

  let query = supabase
    .from('servers')
    .select(
      `
      *,
      server_tags (
        tag_id,
        tags (*)
      )
    `,
      { count: 'exact' }
    )

  if (category && category !== 'all') {
    query = query.eq('category', category)
  }
  if (region && region !== 'all') {
    query = query.eq('region', region)
  }
  if (status === 'online') {
    query = query.eq('current_status', 'online')
  }
  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
  }

  switch (sort) {
    case 'quality':
      query = query.order('quality_score', { ascending: false })
      break
    case 'newest':
      query = query.order('created_at', { ascending: false })
      break
    case 'name':
      query = query.order('name', { ascending: true })
      break
    case 'players':
      query = query.order('review_count', { ascending: false })
      break
  }

  const from = (page - 1) * limit
  query = query.range(from, from + limit - 1)

  const { data, error, count } = await query

  if (error) {
    console.error('Error fetching servers:', error)
    throw new Error('Failed to fetch servers')
  }

  return {
    servers: (data ?? []) as unknown as ServerWithTags[],
    total: count ?? 0,
    page,
    pageSize: limit,
    totalPages: Math.ceil((count ?? 0) / limit),
  }
}

export async function getServerBySlug(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('servers')
    .select(
      `
      *,
      server_tags (
        tag_id,
        tags (*)
      ),
      server_media (*)
    `
    )
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching server:', error)
    return null
  }

  return data as unknown as ServerDetail
}

export async function getServerById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('servers')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching server by id:', error)
    return null
  }

  return data as Server
}

export async function getTags(type?: 'category' | 'vibe' | 'dimension') {
  const supabase = await createClient()
  let query = supabase.from('tags').select('*').order('name')

  if (type) {
    query = query.eq('type', type)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching tags:', error)
    throw new Error('Failed to fetch tags')
  }

  return (data ?? []) as Tag[]
}
