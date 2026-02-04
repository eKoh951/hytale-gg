import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/lib/types/database.types'

type Profile = Database['public']['Tables']['profiles']['Row']
type UserStats = Database['public']['Tables']['user_stats']['Row']
type Achievement = Database['public']['Tables']['achievements']['Row']
type UserAchievement = Database['public']['Tables']['user_achievements']['Row']
type UserActivity = Database['public']['Tables']['user_activity']['Row']

/**
 * Fetch user profile
 */
export async function getProfile(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching profile:', error)
    throw new Error('Failed to fetch profile')
  }

  return data as Profile
}

/**
 * Fetch user stats
 */
export async function getUserStats(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) {
    console.error('Error fetching user stats:', error)
    throw new Error('Failed to fetch user stats')
  }

  return data as UserStats
}

/**
 * Fetch user achievements
 */
export async function getUserAchievements(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('user_achievements')
    .select(`
      id,
      unlocked_at,
      achievement_id,
      achievements (
        id,
        name,
        description,
        icon,
        color
      )
    `)
    .eq('user_id', userId)
    .order('unlocked_at', { ascending: false })

  if (error) {
    console.error('Error fetching user achievements:', error)
    throw new Error('Failed to fetch user achievements')
  }

  return (data || []) as unknown as Array<{
    id: string
    unlocked_at: string | null
    achievement_id: string
    achievements: Achievement | null
  }>
}

/**
 * Fetch recent user activity - NOT CACHED (dynamic)
 * Returns latest activities for streaming
 */
export async function getRecentActivity(userId: string, limit: number = 10) {
  // No 'use cache' - this is dynamic content that streams in
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('user_activity')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching recent activity:', error)
    throw new Error('Failed to fetch recent activity')
  }

  return data as UserActivity[]
}

/**
 * Fetch all achievements for display
 */
export async function getAllAchievements() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching achievements:', error)
    throw new Error('Failed to fetch achievements')
  }

  return data as Achievement[]
}

/**
 * Check if user has unlocked an achievement
 */
export async function hasAchievement(userId: string, achievementId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('user_achievements')
    .select('id')
    .eq('user_id', userId)
    .eq('achievement_id', achievementId)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Error checking achievement:', error)
    return false
  }

  return !!data
}
