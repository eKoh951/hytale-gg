import { createClient } from '@/lib/supabase/server'
import type { ServerWithTags } from './servers'

export async function getFeaturedServers(date?: string) {
  const supabase = await createClient()
  const targetDate = date ?? new Date().toISOString().split('T')[0]

  const { data, error } = await supabase
    .from('featured_servers')
    .select(`
      *,
      servers:server_id (
        *,
        server_tags (
          tag_id,
          tags (*)
        )
      )
    `)
    .eq('featured_date', targetDate)
    .eq('section', 'featured')
    .order('position')
    .limit(3)

  if (error) {
    console.error('Error fetching featured servers:', error)
    return []
  }

  return (data ?? [])
    .map((f) => f.servers)
    .filter(Boolean) as unknown as ServerWithTags[]
}

export async function getHiddenGems(date?: string) {
  const supabase = await createClient()
  const targetDate = date ?? new Date().toISOString().split('T')[0]

  const { data, error } = await supabase
    .from('featured_servers')
    .select(`
      *,
      servers:server_id (
        *,
        server_tags (
          tag_id,
          tags (*)
        )
      )
    `)
    .eq('featured_date', targetDate)
    .eq('section', 'hidden_gem')
    .order('position')
    .limit(4)

  if (error) {
    console.error('Error fetching hidden gems:', error)
    return []
  }

  return (data ?? [])
    .map((f) => f.servers)
    .filter(Boolean) as unknown as ServerWithTags[]
}

export async function getNewServers(limit = 6) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('servers')
    .select(`
      *,
      server_tags (
        tag_id,
        tags (*)
      )
    `)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching new servers:', error)
    return []
  }

  return (data ?? []) as unknown as ServerWithTags[]
}

export async function getServersByCategory(category: string, limit = 6) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('servers')
    .select(`
      *,
      server_tags (
        tag_id,
        tags (*)
      )
    `)
    .eq('category', category)
    .order('quality_score', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching servers by category:', error)
    return []
  }

  return (data ?? []) as unknown as ServerWithTags[]
}

export async function searchServers(query: string, limit = 10) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('servers')
    .select(`
      *,
      server_tags (
        tag_id,
        tags (*)
      )
    `)
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order('quality_score', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error searching servers:', error)
    return []
  }

  return (data ?? []) as unknown as ServerWithTags[]
}
