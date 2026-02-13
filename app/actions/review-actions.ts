'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import {
  quickRateSchema,
  detailedReviewSchema,
  voteSchema,
  reactionSchema,
  commentSchema,
  saveReviewSchema,
  ownerResponseSchema,
} from '@/lib/validations/review'

export type ReviewActionState = {
  success: boolean
  errors?: Record<string, string[]>
  message?: string
}

async function getAuthUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return { supabase, user }
}

export async function submitQuickRate(
  _prevState: ReviewActionState,
  formData: FormData
): Promise<ReviewActionState> {
  const { supabase, user } = await getAuthUser()
  if (!user) return { success: false, message: 'You must be signed in.' }

  const raw = {
    entity_type: formData.get('entity_type') as string,
    entity_id: formData.get('entity_id') as string,
    rating_overall: formData.get('rating_overall') as string,
    is_recommended: formData.get('is_recommended') as string,
    ratings: JSON.parse((formData.get('ratings') as string) || '[]'),
  }

  const result = quickRateSchema.safeParse(raw)
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
      message: 'Please fix the errors below.',
    }
  }

  const { ratings, ...reviewData } = result.data

  const { data: review, error: reviewError } = await supabase
    .from('reviews')
    .insert({
      ...reviewData,
      user_id: user.id,
      review_type: 'quick' as const,
    })
    .select('id')
    .single()

  if (reviewError) {
    if (reviewError.code === '23505') {
      return { success: false, message: 'You have already reviewed this.' }
    }
    console.error('Error creating review:', reviewError)
    return { success: false, message: 'Failed to submit review.' }
  }

  if (ratings.length > 0) {
    const { error: ratingsError } = await supabase
      .from('review_ratings')
      .insert(ratings.map((r) => ({ review_id: review.id, ...r })))

    if (ratingsError) {
      console.error('Error inserting ratings:', ratingsError)
    }
  }

  revalidatePath('/[locale]/(main)/servers/[slug]')
  return { success: true, message: 'Review submitted!' }
}

export async function submitDetailedReview(
  _prevState: ReviewActionState,
  formData: FormData
): Promise<ReviewActionState> {
  const { supabase, user } = await getAuthUser()
  if (!user) return { success: false, message: 'You must be signed in.' }

  const raw = {
    entity_type: formData.get('entity_type') as string,
    entity_id: formData.get('entity_id') as string,
    rating_overall: formData.get('rating_overall') as string,
    review_text: formData.get('review_text') as string,
    is_recommended: formData.get('is_recommended') as string,
    play_duration_text: (formData.get('play_duration_text') as string) || '',
    video_url: (formData.get('video_url') as string) || '',
    video_platform: (formData.get('video_platform') as string) || '',
    ratings: JSON.parse((formData.get('ratings') as string) || '[]'),
  }

  const result = detailedReviewSchema.safeParse(raw)
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
      message: 'Please fix the errors below.',
    }
  }

  const { ratings, video_url, video_platform, play_duration_text, ...reviewData } = result.data

  const { data: review, error: reviewError } = await supabase
    .from('reviews')
    .insert({
      ...reviewData,
      video_url: video_url || null,
      video_platform: video_platform || null,
      play_duration_text: play_duration_text || null,
      user_id: user.id,
      review_type: 'detailed' as const,
    })
    .select('id')
    .single()

  if (reviewError) {
    if (reviewError.code === '23505') {
      return { success: false, message: 'You have already reviewed this.' }
    }
    console.error('Error creating review:', reviewError)
    return { success: false, message: 'Failed to submit review.' }
  }

  if (ratings.length > 0) {
    const { error: ratingsError } = await supabase
      .from('review_ratings')
      .insert(ratings.map((r) => ({ review_id: review.id, ...r })))

    if (ratingsError) {
      console.error('Error inserting ratings:', ratingsError)
    }
  }

  revalidatePath('/[locale]/(main)/servers/[slug]')
  return { success: true, message: 'Review submitted!' }
}

export async function voteOnReview(
  _prevState: ReviewActionState,
  formData: FormData
): Promise<ReviewActionState> {
  const { supabase, user } = await getAuthUser()
  if (!user) return { success: false, message: 'You must be signed in.' }

  const parsed = voteSchema.safeParse({
    review_id: formData.get('review_id'),
    vote_type: formData.get('vote_type'),
  })
  if (!parsed.success) return { success: false, message: 'Invalid vote.' }

  const { error } = await supabase
    .from('review_votes')
    .upsert(
      { ...parsed.data, user_id: user.id },
      { onConflict: 'review_id,user_id' }
    )

  if (error) {
    console.error('Error voting:', error)
    return { success: false, message: 'Failed to vote.' }
  }

  if (parsed.data.vote_type === 'helpful') {
    const { data: review } = await supabase
      .from('reviews')
      .select('helpful_count')
      .eq('id', parsed.data.review_id)
      .single()
    if (review) {
      await supabase
        .from('reviews')
        .update({ helpful_count: (review.helpful_count ?? 0) + 1 })
        .eq('id', parsed.data.review_id)
    }
  }

  return { success: true }
}

export async function reactToReview(
  _prevState: ReviewActionState,
  formData: FormData
): Promise<ReviewActionState> {
  const { supabase, user } = await getAuthUser()
  if (!user) return { success: false, message: 'You must be signed in.' }

  const parsed = reactionSchema.safeParse({
    review_id: formData.get('review_id'),
    reaction: formData.get('reaction'),
  })
  if (!parsed.success) return { success: false, message: 'Invalid reaction.' }

  const { error } = await supabase
    .from('review_reactions')
    .upsert(
      { ...parsed.data, user_id: user.id },
      { onConflict: 'review_id,user_id,reaction' }
    )

  if (error) {
    console.error('Error reacting:', error)
    return { success: false, message: 'Failed to react.' }
  }

  return { success: true }
}

export async function commentOnReview(
  _prevState: ReviewActionState,
  formData: FormData
): Promise<ReviewActionState> {
  const { supabase, user } = await getAuthUser()
  if (!user) return { success: false, message: 'You must be signed in.' }

  const parsed = commentSchema.safeParse({
    review_id: formData.get('review_id'),
    comment_text: formData.get('comment_text'),
    parent_comment_id: formData.get('parent_comment_id') || undefined,
  })
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      message: 'Invalid comment.',
    }
  }

  const { error } = await supabase
    .from('review_comments')
    .insert({ ...parsed.data, user_id: user.id })

  if (error) {
    console.error('Error commenting:', error)
    return { success: false, message: 'Failed to comment.' }
  }

  return { success: true }
}

export async function saveReview(
  _prevState: ReviewActionState,
  formData: FormData
): Promise<ReviewActionState> {
  const { supabase, user } = await getAuthUser()
  if (!user) return { success: false, message: 'You must be signed in.' }

  const parsed = saveReviewSchema.safeParse({ review_id: formData.get('review_id') })
  if (!parsed.success) return { success: false, message: 'Invalid review.' }

  const { data: existing } = await supabase
    .from('review_saves')
    .select('review_id')
    .eq('review_id', parsed.data.review_id)
    .eq('user_id', user.id)
    .maybeSingle()

  if (existing) {
    await supabase
      .from('review_saves')
      .delete()
      .eq('review_id', parsed.data.review_id)
      .eq('user_id', user.id)
    return { success: true, message: 'unsaved' }
  }

  const { error } = await supabase
    .from('review_saves')
    .insert({ review_id: parsed.data.review_id, user_id: user.id })

  if (error) {
    console.error('Error saving review:', error)
    return { success: false, message: 'Failed to save.' }
  }

  return { success: true, message: 'saved' }
}

export async function respondToReview(
  _prevState: ReviewActionState,
  formData: FormData
): Promise<ReviewActionState> {
  const { supabase, user } = await getAuthUser()
  if (!user) return { success: false, message: 'You must be signed in.' }

  const parsed = ownerResponseSchema.safeParse({
    review_id: formData.get('review_id'),
    response_text: formData.get('response_text'),
  })
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      message: 'Invalid response.',
    }
  }

  const { data: review } = await supabase
    .from('reviews')
    .select('entity_id, entity_type')
    .eq('id', parsed.data.review_id)
    .single()

  if (!review) return { success: false, message: 'Review not found.' }

  const { data: server } = await supabase
    .from('servers')
    .select('owner_id, verification_status')
    .eq('id', review.entity_id)
    .single()

  if (!server || server.owner_id !== user.id || server.verification_status !== 'verified') {
    return { success: false, message: 'Only verified server owners can respond.' }
  }

  const { error } = await supabase
    .from('owner_responses')
    .insert({ ...parsed.data, owner_id: user.id })

  if (error) {
    if (error.code === '23505') {
      return { success: false, message: 'You have already responded to this review.' }
    }
    console.error('Error responding:', error)
    return { success: false, message: 'Failed to respond.' }
  }

  return { success: true, message: 'Response posted!' }
}
