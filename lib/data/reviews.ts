import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/lib/types/database.types'

type Review = Database['public']['Tables']['reviews']['Row']
type ReviewRating = Database['public']['Tables']['review_ratings']['Row']
type ReviewComment = Database['public']['Tables']['review_comments']['Row']
type OwnerResponse = Database['public']['Tables']['owner_responses']['Row']

export type ReviewWithDetails = Review & {
  review_ratings: Array<ReviewRating & { tags: { name: string; slug: string } }>
  review_comments: ReviewComment[]
  owner_responses: OwnerResponse[]
  profiles: { display_name: string; username: string | null; avatar_url: string | null } | null
}

export type ReviewFilters = {
  sort?: 'newest' | 'helpful' | 'rating_high' | 'rating_low'
  page?: number
  limit?: number
}

const PAGE_SIZE = 10

export async function getReviewsForEntity(
  entityType: string,
  entityId: string,
  filters: ReviewFilters = {}
) {
  const supabase = await createClient()
  const { sort = 'newest', page = 1, limit = PAGE_SIZE } = filters

  let query = supabase
    .from('reviews')
    .select(
      `
      *,
      review_ratings (
        *,
        tags:dimension_id (name, slug)
      ),
      review_comments (*),
      owner_responses (*),
      profiles:user_id (display_name, username, avatar_url)
    `,
      { count: 'exact' }
    )
    .eq('entity_type', entityType)
    .eq('entity_id', entityId)
    .eq('status', 'published')

  switch (sort) {
    case 'newest':
      query = query.order('created_at', { ascending: false })
      break
    case 'helpful':
      query = query.order('helpful_count', { ascending: false })
      break
    case 'rating_high':
      query = query.order('rating_overall', { ascending: false })
      break
    case 'rating_low':
      query = query.order('rating_overall', { ascending: true })
      break
  }

  const from = (page - 1) * limit
  query = query.range(from, from + limit - 1)

  const { data, error, count } = await query

  if (error) {
    console.error('Error fetching reviews:', error)
    throw new Error('Failed to fetch reviews')
  }

  return {
    reviews: (data ?? []) as unknown as ReviewWithDetails[],
    total: count ?? 0,
    page,
    pageSize: limit,
    totalPages: Math.ceil((count ?? 0) / limit),
  }
}

export async function getReviewSummary(entityType: string, entityId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('reviews')
    .select('rating_overall, is_recommended')
    .eq('entity_type', entityType)
    .eq('entity_id', entityId)
    .eq('status', 'published')

  if (error) {
    console.error('Error fetching review summary:', error)
    return { avgRating: 0, totalReviews: 0, recommendPct: 0, distribution: [0, 0, 0, 0, 0] }
  }

  const reviews = data ?? []
  const total = reviews.length
  if (total === 0) {
    return { avgRating: 0, totalReviews: 0, recommendPct: 0, distribution: [0, 0, 0, 0, 0] }
  }

  const sum = reviews.reduce((acc, r) => acc + Number(r.rating_overall), 0)
  const recommended = reviews.filter((r) => r.is_recommended === true).length
  const distribution = [0, 0, 0, 0, 0]
  for (const r of reviews) {
    const idx = Math.min(Math.max(Math.round(Number(r.rating_overall)) - 1, 0), 4)
    distribution[idx]++
  }

  return {
    avgRating: Math.round((sum / total) * 10) / 10,
    totalReviews: total,
    recommendPct: Math.round((recommended / total) * 100),
    distribution,
  }
}

export async function getDimensionAverages(entityType: string, entityId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('review_ratings')
    .select(`
      score,
      dimension_id,
      tags:dimension_id (name, slug),
      reviews!inner (entity_type, entity_id, status)
    `)
    .eq('reviews.entity_type', entityType)
    .eq('reviews.entity_id', entityId)
    .eq('reviews.status', 'published')

  if (error) {
    console.error('Error fetching dimension averages:', error)
    return []
  }

  const grouped = new Map<string, { name: string; slug: string; scores: number[] }>()
  for (const row of data ?? []) {
    const tag = row.tags as unknown as { name: string; slug: string }
    if (!tag) continue
    const key = row.dimension_id
    if (!grouped.has(key)) {
      grouped.set(key, { name: tag.name, slug: tag.slug, scores: [] })
    }
    grouped.get(key)!.scores.push(row.score)
  }

  return Array.from(grouped.entries()).map(([id, { name, slug, scores }]) => ({
    dimension_id: id,
    name,
    slug,
    avg: Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10,
    count: scores.length,
  }))
}

export async function getUserReviewForEntity(userId: string, entityType: string, entityId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('reviews')
    .select('id')
    .eq('user_id', userId)
    .eq('entity_type', entityType)
    .eq('entity_id', entityId)
    .maybeSingle()

  return data?.id ?? null
}

export async function getUserSavedReviews(userId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('review_saves')
    .select('review_id')
    .eq('user_id', userId)

  return new Set((data ?? []).map((s) => s.review_id))
}
