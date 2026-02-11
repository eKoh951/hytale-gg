import { z } from 'zod'

const dimensionRatingSchema = z.object({
  dimension_id: z.string().uuid(),
  score: z.coerce.number().int().min(1).max(5),
})

export const quickRateSchema = z.object({
  entity_type: z.enum(['server', 'host', 'mod']).default('server'),
  entity_id: z.string().uuid(),
  rating_overall: z.coerce.number().min(1).max(5),
  ratings: z.array(dimensionRatingSchema).min(1).max(10),
  is_recommended: z.coerce.boolean().optional(),
})

export const detailedReviewSchema = z.object({
  entity_type: z.enum(['server', 'host', 'mod']).default('server'),
  entity_id: z.string().uuid(),
  rating_overall: z.coerce.number().min(1).max(5),
  ratings: z.array(dimensionRatingSchema).min(1).max(10),
  review_text: z.string().min(50),
  is_recommended: z.coerce.boolean().optional(),
  play_duration_text: z.string().max(50).optional().or(z.literal('')),
  video_url: z.string().url().optional().or(z.literal('')),
  video_platform: z.string().max(20).optional().or(z.literal('')),
})

export const voteSchema = z.object({
  review_id: z.string().uuid(),
  vote_type: z.enum(['helpful', 'not_helpful', 'funny']),
})

export const reactionSchema = z.object({
  review_id: z.string().uuid(),
  reaction: z.enum(['helpful', 'funny', 'based', 'insightful']),
})

export const commentSchema = z.object({
  review_id: z.string().uuid(),
  comment_text: z.string().min(1).max(1000),
  parent_comment_id: z.string().uuid().optional(),
})

export const saveReviewSchema = z.object({
  review_id: z.string().uuid(),
})

export const ownerResponseSchema = z.object({
  review_id: z.string().uuid(),
  response_text: z.string().min(1).max(500),
})

export type QuickRateInput = z.infer<typeof quickRateSchema>
export type DetailedReviewInput = z.infer<typeof detailedReviewSchema>
