'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveDiscordUsername(responseId: number, discordUsername: string) {
  try {
    const supabase = await createClient()
    
    // Update the response metadata with Discord username
    const { error } = await supabase
      .from('survey_responses')
      .update({
        metadata: {
          discord_username: discordUsername.trim(),
          discord_saved_at: new Date().toISOString(),
        },
      })
      .eq('id', responseId)

    if (error) {
      console.error('Failed to save Discord username:', error)
      throw new Error('Failed to save Discord username')
    }

    revalidatePath('/survey/[slug]')
    return { success: true }
  } catch (error) {
    console.error('Error saving Discord username:', error)
    throw error
  }
}
