import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/lib/types/database.types'

type Tag = Database['public']['Tables']['tags']['Row']
type TagSuggestion = Database['public']['Tables']['tag_suggestions']['Row']

export type ServerTagWithCount = {
  tag_id: string
  tag_name: string
  tag_slug: string
  tag_type: string
  count: number
}

export async function getServerTagsWithCounts(serverId: string): Promise<ServerTagWithCount[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('server_tags')
    .select('tag_id, tags (name, slug, type)')
    .eq('server_id', serverId)

  if (error) {
    console.error('Error fetching server tags:', error)
    return []
  }

  const counts = new Map<string, { name: string; slug: string; type: string; count: number }>()
  for (const row of data ?? []) {
    const tag = row.tags as unknown as { name: string; slug: string; type: string } | null
    if (!tag) continue
    const existing = counts.get(row.tag_id)
    if (existing) {
      existing.count++
    } else {
      counts.set(row.tag_id, { name: tag.name, slug: tag.slug, type: tag.type, count: 1 })
    }
  }

  return Array.from(counts.entries())
    .map(([tag_id, { name, slug, type, count }]) => ({
      tag_id,
      tag_name: name,
      tag_slug: slug,
      tag_type: type,
      count,
    }))
    .sort((a, b) => b.count - a.count)
}

export async function getVisibleVibeTags(serverId: string, minVotes = 3): Promise<ServerTagWithCount[]> {
  const all = await getServerTagsWithCounts(serverId)
  return all
    .filter((t) => t.tag_type === 'vibe' && t.count >= minVotes)
    .slice(0, 3)
}

export async function getPendingTagSuggestions() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('tag_suggestions')
    .select('*, profiles:suggested_by (display_name, username)')
    .eq('status', 'pending')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching tag suggestions:', error)
    return []
  }

  return (data ?? []) as Array<
    TagSuggestion & { profiles: { display_name: string; username: string | null } | null }
  >
}

export async function getFlaggedReviews() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      profiles:user_id (display_name, username),
      servers:entity_id (name, slug)
    `)
    .eq('status', 'flagged')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching flagged reviews:', error)
    return []
  }

  return data ?? []
}

export async function canUserCreateTag(userId: string): Promise<boolean> {
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('created_at')
    .eq('id', userId)
    .single()

  if (!profile?.created_at) return false

  const accountAge = Date.now() - new Date(profile.created_at).getTime()
  const fourteenDays = 14 * 24 * 60 * 60 * 1000
  if (accountAge < fourteenDays) return false

  const { count } = await supabase
    .from('reviews')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('status', 'published')

  return (count ?? 0) >= 5
}
