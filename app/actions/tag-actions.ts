'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import {
  applyTagSchema,
  suggestTagSchema,
  adminTagActionSchema,
  adminReviewActionSchema,
} from '@/lib/validations/tag'
import { canUserCreateTag } from '@/lib/data/tags'

export type TagActionState = {
  success: boolean
  message?: string
  errors?: Record<string, string[]>
}

async function getAuthUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return { supabase, user }
}

export async function applyTag(
  _prevState: TagActionState,
  formData: FormData
): Promise<TagActionState> {
  const { supabase, user } = await getAuthUser()
  if (!user) return { success: false, message: 'You must be signed in.' }

  const parsed = applyTagSchema.safeParse({
    server_id: formData.get('server_id'),
    tag_id: formData.get('tag_id'),
  })
  if (!parsed.success) return { success: false, message: 'Invalid input.' }

  const { error } = await supabase
    .from('server_tags')
    .insert({ ...parsed.data, user_id: user.id })

  if (error) {
    if (error.code === '23505') {
      return { success: false, message: 'You already applied this tag.' }
    }
    console.error('Error applying tag:', error)
    return { success: false, message: 'Failed to apply tag.' }
  }

  await supabase
    .from('tags')
    .update({ use_count: supabase as never })
    .eq('id', parsed.data.tag_id)

  revalidatePath('/[locale]/(main)/servers/[slug]')
  return { success: true }
}

export async function suggestTag(
  _prevState: TagActionState,
  formData: FormData
): Promise<TagActionState> {
  const { supabase, user } = await getAuthUser()
  if (!user) return { success: false, message: 'You must be signed in.' }

  const canCreate = await canUserCreateTag(user.id)
  if (!canCreate) {
    return { success: false, message: 'You need an account older than 14 days and at least 5 reviews to suggest tags.' }
  }

  const parsed = suggestTagSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description') || '',
    type: formData.get('type'),
  })
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      message: 'Invalid input.',
    }
  }

  const { error } = await supabase
    .from('tag_suggestions')
    .insert({ ...parsed.data, suggested_by: user.id })

  if (error) {
    console.error('Error suggesting tag:', error)
    return { success: false, message: 'Failed to submit suggestion.' }
  }

  return { success: true, message: 'Tag suggestion submitted for review!' }
}

export async function adminTagAction(
  _prevState: TagActionState,
  formData: FormData
): Promise<TagActionState> {
  const { supabase, user } = await getAuthUser()
  if (!user) return { success: false, message: 'Unauthorized.' }

  const { data: roles } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)

  const isAdmin = roles?.some((r) => r.role === 'admin' || r.role === 'moderator')
  if (!isAdmin) return { success: false, message: 'Unauthorized.' }

  const parsed = adminTagActionSchema.safeParse({
    suggestion_id: formData.get('suggestion_id'),
    action: formData.get('action'),
    merged_into_tag_id: formData.get('merged_into_tag_id') || undefined,
  })
  if (!parsed.success) return { success: false, message: 'Invalid input.' }

  if (parsed.data.action === 'approved') {
    const { data: suggestion } = await supabase
      .from('tag_suggestions')
      .select('name, type, description')
      .eq('id', parsed.data.suggestion_id)
      .single()

    if (suggestion) {
      const slug = suggestion.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      await supabase.from('tags').insert({
        name: suggestion.name,
        slug,
        type: suggestion.type,
        description: suggestion.description,
        status: 'experimental',
        approved_by: user.id,
      })
    }
  }

  await supabase
    .from('tag_suggestions')
    .update({
      status: parsed.data.action,
      reviewed_by: user.id,
      merged_into_tag_id: parsed.data.merged_into_tag_id ?? null,
    })
    .eq('id', parsed.data.suggestion_id)

  revalidatePath('/[locale]/(admin)/admin/tags')
  return { success: true, message: `Tag suggestion ${parsed.data.action}.` }
}

export async function adminReviewAction(
  _prevState: TagActionState,
  formData: FormData
): Promise<TagActionState> {
  const { supabase, user } = await getAuthUser()
  if (!user) return { success: false, message: 'Unauthorized.' }

  const { data: roles } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)

  const isAdmin = roles?.some((r) => r.role === 'admin' || r.role === 'moderator')
  if (!isAdmin) return { success: false, message: 'Unauthorized.' }

  const parsed = adminReviewActionSchema.safeParse({
    review_id: formData.get('review_id'),
    action: formData.get('action'),
  })
  if (!parsed.success) return { success: false, message: 'Invalid input.' }

  const { error } = await supabase
    .from('reviews')
    .update({ status: parsed.data.action })
    .eq('id', parsed.data.review_id)

  if (error) {
    console.error('Error updating review:', error)
    return { success: false, message: 'Failed to update review.' }
  }

  revalidatePath('/[locale]/(admin)/admin/reviews')
  return { success: true, message: `Review ${parsed.data.action}.` }
}
