'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveDiscordUsername(responseId: number, discordUsername: string) {
  try {
    const supabase = await createClient()

    // Fetch existing metadata first so we don't overwrite geo data
    const { data: existing } = await supabase
      .from('survey_responses')
      .select('metadata')
      .eq('id', responseId)
      .single()

    const existingMeta = (existing?.metadata as Record<string, unknown>) ?? {}

    // Merge Discord info into existing metadata
    const { error } = await supabase
      .from('survey_responses')
      .update({
        metadata: {
          ...existingMeta,
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
