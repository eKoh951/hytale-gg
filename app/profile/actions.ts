'use server'

import { updateTag } from 'next/cache'
import { redirect } from 'next/navigation'
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

/**
 * Upload avatar to Supabase Storage
 */
export async function uploadAvatar(
  userId: string,
  file: File
): Promise<UpdateProfileResult> {
  try {
    const supabase = await createClient()

    // Verify user
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

    // Validate file
    if (!file.type.startsWith('image/')) {
      return {
        success: false,
        error: 'File must be an image',
      }
    }

    if (file.size > 2 * 1024 * 1024) {
      return {
        success: false,
        error: 'File size must be less than 2MB',
      }
    }

    // Generate file path: avatars/{userId}/avatar.{ext}
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const filePath = `${userId}/avatar.${ext}`

    // Delete old avatar if it exists
    const { data: existingFiles } = await supabase.storage
      .from('avatars')
      .list(userId)

    if (existingFiles && existingFiles.length > 0) {
      const oldFiles = existingFiles.map((f) => `${userId}/${f.name}`)
      await supabase.storage.from('avatars').remove(oldFiles)
    }

    // Upload new avatar
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true })

    if (uploadError) {
      console.error('Error uploading avatar:', uploadError)
      return {
        success: false,
        error: 'Failed to upload avatar',
      }
    }

    // Get public URL
    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
    const avatarUrl = data.publicUrl

    // Update profile with new avatar URL
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: avatarUrl })
      .eq('id', userId)

    if (updateError) {
      console.error('Error updating profile avatar:', updateError)
      return {
        success: false,
        error: 'Failed to update profile',
      }
    }

    // Invalidate profile cache
    updateTag(`profile-${userId}`)

    return {
      success: true,
      message: 'Avatar uploaded successfully',
    }
  } catch (error) {
    console.error('Unexpected error uploading avatar:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

/**
 * Check username availability
 */
export async function checkUsernameAvailability(
  username: string,
  excludeUserId?: string
): Promise<{ available: boolean; error?: string }> {
  try {
    // Validate username format
    const usernameRegex = /^[a-z0-9_]{3,20}$/
    if (!usernameRegex.test(username)) {
      return {
        available: false,
        error: 'Username must be 3-20 characters, lowercase letters, numbers, and underscores only',
      }
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', username.toLowerCase())
      .single()

    // If error is "no rows", username is available
    if (error?.code === 'PGRST116') {
      return { available: true }
    }

    // If we found a user, check if it's the same user
    if (data && excludeUserId && data.id === excludeUserId) {
      return { available: true }
    }

    // Username is taken
    if (data) {
      return {
        available: false,
        error: 'Username is already taken',
      }
    }

    // Other error
    if (error) {
      console.error('Error checking username:', error)
      return {
        available: false,
        error: 'Failed to check username availability',
      }
    }

    return { available: true }
  } catch (error) {
    console.error('Unexpected error checking username:', error)
    return {
      available: false,
      error: 'An unexpected error occurred',
    }
  }
}

/**
 * Update user username
 */
export async function updateUsername(
  userId: string,
  newUsername: string
): Promise<UpdateProfileResult> {
  try {
    const supabase = await createClient()

    // Verify user
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

    // Validate username format
    const usernameRegex = /^[a-z0-9_]{3,20}$/
    if (!usernameRegex.test(newUsername)) {
      return {
        success: false,
        error: 'Username must be 3-20 characters, lowercase letters, numbers, and underscores only',
      }
    }

    // Check availability
    const { data: existing } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', newUsername.toLowerCase())
      .single()

    if (existing && existing.id !== userId) {
      return {
        success: false,
        error: 'Username is already taken',
      }
    }

    // Update username
    const { error } = await supabase
      .from('profiles')
      .update({ username: newUsername.toLowerCase() })
      .eq('id', userId)

    if (error) {
      console.error('Error updating username:', error)
      return {
        success: false,
        error: 'Failed to update username',
      }
    }

    // Invalidate profile cache
    updateTag(`profile-${userId}`)

    // Redirect to new profile URL
    redirect(`/profile/${newUsername.toLowerCase()}`)
  } catch (error) {
    // Rethrow redirect errors (they're not actual errors, just Next.js flow control)
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error
    }
    
    console.error('Unexpected error updating username:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}
