'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerSchema, updateServerSchema, claimServerSchema } from '@/lib/validations/server'

export type ServerActionState = {
  success: boolean
  errors?: Record<string, string[]>
  message?: string
}

export async function createServer(
  _prevState: ServerActionState,
  formData: FormData
): Promise<ServerActionState> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, message: 'You must be signed in to list a server.' }
  }

  const raw = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    description: formData.get('description') as string,
    ip_address: formData.get('ip_address') as string,
    port: formData.get('port') as string,
    category: formData.get('category') as string,
    region: formData.get('region') as string,
    language: (formData.get('language') as string) || 'English',
    discord_url: (formData.get('discord_url') as string) || '',
    website_url: (formData.get('website_url') as string) || '',
    hosting_provider: (formData.get('hosting_provider') as string) || '',
  }

  const result = createServerSchema.safeParse(raw)

  if (!result.success) {
    const flat = result.error.flatten()
    return {
      success: false,
      errors: flat.fieldErrors as Record<string, string[]>,
      message: 'Please fix the errors below.',
    }
  }

  const { discord_url, website_url, hosting_provider, ...rest } = result.data

  const { error } = await supabase.from('servers').insert({
    ...rest,
    discord_url: discord_url || null,
    website_url: website_url || null,
    hosting_provider: hosting_provider || null,
    listed_by: user.id,
    verification_status: 'unclaimed',
  })

  if (error) {
    if (error.code === '23505') {
      return {
        success: false,
        errors: { slug: ['This slug is already taken. Please choose another.'] },
        message: 'Slug conflict.',
      }
    }
    console.error('Error creating server:', error)
    return { success: false, message: 'Failed to create server. Please try again.' }
  }

  revalidatePath('/[locale]/(main)/servers')
  redirect(`/servers/${result.data.slug}`)
}

export async function updateServer(
  serverId: string,
  _prevState: ServerActionState,
  formData: FormData
): Promise<ServerActionState> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, message: 'You must be signed in.' }
  }

  const { data: server } = await supabase
    .from('servers')
    .select('owner_id, verification_status')
    .eq('id', serverId)
    .single()

  if (!server || server.owner_id !== user.id || server.verification_status !== 'verified') {
    return { success: false, message: 'You are not authorized to edit this server.' }
  }

  const raw = Object.fromEntries(
    ['name', 'description', 'ip_address', 'port', 'category', 'region', 'language', 'discord_url', 'website_url', 'hosting_provider']
      .filter((key) => formData.has(key))
      .map((key) => [key, formData.get(key) as string])
  )

  const result = updateServerSchema.safeParse(raw)

  if (!result.success) {
    const flat = result.error.flatten()
    return {
      success: false,
      errors: flat.fieldErrors as Record<string, string[]>,
      message: 'Please fix the errors below.',
    }
  }

  const updates = { ...result.data }
  if (updates.discord_url === '') updates.discord_url = undefined
  if (updates.website_url === '') updates.website_url = undefined
  if (updates.hosting_provider === '') updates.hosting_provider = undefined

  const { error } = await supabase
    .from('servers')
    .update(updates)
    .eq('id', serverId)

  if (error) {
    console.error('Error updating server:', error)
    return { success: false, message: 'Failed to update server.' }
  }

  revalidatePath('/[locale]/(main)/servers')
  return { success: true, message: 'Server updated successfully.' }
}

export async function claimServer(
  _prevState: ServerActionState,
  formData: FormData
): Promise<ServerActionState> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, message: 'You must be signed in.' }
  }

  const serverId = formData.get('server_id') as string
  const parsed = claimServerSchema.safeParse({ server_id: serverId })
  if (!parsed.success) {
    return { success: false, message: 'Invalid server ID.' }
  }

  const { data: server } = await supabase
    .from('servers')
    .select('verification_status')
    .eq('id', parsed.data.server_id)
    .single()

  if (!server) {
    return { success: false, message: 'Server not found.' }
  }

  if (server.verification_status !== 'unclaimed') {
    return { success: false, message: 'This server has already been claimed.' }
  }

  const verificationCode = crypto.randomUUID().replace(/-/g, '').slice(0, 16)
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

  const { error } = await supabase
    .from('servers')
    .update({
      owner_id: user.id,
      verification_status: 'pending',
      verification_code: verificationCode,
      verification_expires_at: expiresAt,
    })
    .eq('id', parsed.data.server_id)

  if (error) {
    console.error('Error claiming server:', error)
    return { success: false, message: 'Failed to claim server.' }
  }

  return {
    success: true,
    message: `Verification code: ${verificationCode}. Place a file named hytale-verify.txt with this code in your server's console directory, or add a DNS TXT record. You have 24 hours.`,
  }
}
