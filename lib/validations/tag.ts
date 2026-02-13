import { z } from 'zod'

export const applyTagSchema = z.object({
  server_id: z.string().uuid(),
  tag_id: z.string().uuid(),
})

export const suggestTagSchema = z.object({
  name: z.string().min(2).max(30),
  description: z.string().max(200).optional().or(z.literal('')),
  type: z.enum(['category', 'vibe', 'dimension']),
})

export const adminTagActionSchema = z.object({
  suggestion_id: z.string().uuid(),
  action: z.enum(['approved', 'rejected', 'merged']),
  merged_into_tag_id: z.string().uuid().optional(),
})

export const adminReviewActionSchema = z.object({
  review_id: z.string().uuid(),
  action: z.enum(['published', 'flagged', 'removed']),
})
