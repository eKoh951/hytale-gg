'use server'

import { updateTag } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { TablesUpdate } from '@/lib/types/database.types'

type ProfileUpdate = TablesUpdate<'profiles'>

interface UpdateProfileResult {
  success: boolean
  error?: string
  message?: string
}

/**
 * Update user profile
 * Invalidates cache immediately with updateTag()
 */
export async function updateProfile(
  userId: string,
  data: ProfileUpdate
): Promise<UpdateProfileResult> {
  try {
    const supabase = await createClient()

    // Verify user is updating their own profile
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user || user.id !== userId) {
      return {
        success: false,
        error: 'Unauthorized',
      }
    }

    // Update profile
    const { error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', userId)

    if (error) {
      console.error('Error updating profile:', error)
      return {
        success: false,
        error: 'Failed to update profile',
      }
    }

    // Invalidate cache immediately
    updateTag(`profile-${userId}`)

    return {
      success: true,
      message: 'Profile updated successfully',
    }
  } catch (error) {
    console.error('Unexpected error updating profile:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

/**
 * Update user stats
 * Called when user joins server, earns achievement, etc.
 */
export async function updateUserStats(
  userId: string,
  stats: {
    servers_joined?: number
    hours_played?: number
    achievements_unlocked?: number
  }
): Promise<UpdateProfileResult> {
  try {
    const supabase = await createClient()

    // Verify user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return {
        success: false,
        error: 'Unauthorized',
      }
    }

    // Update stats
    const { error } = await supabase
      .from('user_stats')
      .update({
        ...stats,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)

    if (error) {
      console.error('Error updating stats:', error)
      return {
        success: false,
        error: 'Failed to update stats',
      }
    }

    // Invalidate cache
    updateTag(`stats-${userId}`)

    return {
      success: true,
      message: 'Stats updated successfully',
    }
  } catch (error) {
    console.error('Unexpected error updating stats:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

/**
 * Unlock achievement for user
 */
export async function unlockAchievement(
  userId: string,
  achievementId: string
): Promise<UpdateProfileResult> {
  try {
    const supabase = await createClient()

    // Verify user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return {
        success: false,
        error: 'Unauthorized',
      }
    }

    // Insert user achievement (will be ignored if already exists due to unique constraint)
    const { error } = await supabase
      .from('user_achievements')
      .insert({
        user_id: userId,
        achievement_id: achievementId,
      })

    if (error && error.code !== '23505') {
      // 23505 is unique constraint violation (already unlocked)
      console.error('Error unlocking achievement:', error)
      return {
        success: false,
        error: 'Failed to unlock achievement',
      }
    }

    // Invalidate cache
    updateTag(`achievements-${userId}`)
    updateTag(`achievement-${userId}-${achievementId}`)

    // Increment achievements_unlocked in user_stats
    const { data: stats } = await supabase
      .from('user_stats')
      .select('achievements_unlocked')
      .eq('user_id', userId)
      .single()

    if (stats) {
      await supabase
        .from('user_stats')
        .update({
          achievements_unlocked: (stats.achievements_unlocked || 0) + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId)

      updateTag(`stats-${userId}`)
    }

    return {
      success: true,
      message: 'Achievement unlocked!',
    }
  } catch (error) {
    console.error('Unexpected error unlocking achievement:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

/**
 * Log user activity
 */
export async function logActivity(
  userId: string,
  action: string,
  serverName?: string
): Promise<UpdateProfileResult> {
  try {
    const supabase = await createClient()

    // Verify user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return {
        success: false,
        error: 'Unauthorized',
      }
    }

    // Insert activity
    const { error } = await supabase.from('user_activity').insert({
      user_id: userId,
      action,
      server_name: serverName,
    })

    if (error) {
      console.error('Error logging activity:', error)
      return {
        success: false,
        error: 'Failed to log activity',
      }
    }

    // Don't invalidate activity cache - it's dynamic and streams in

    return {
      success: true,
      message: 'Activity logged',
    }
  } catch (error) {
    console.error('Unexpected error logging activity:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}
