import { z } from 'zod'

export const createServerSchema = z.object({
  name: z.string().min(3).max(50),
  slug: z
    .string()
    .min(3)
    .max(60)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only'),
  description: z.string().min(50).max(500),
  ip_address: z.string().min(7).max(45),
  port: z.coerce.number().int().min(1).max(65535).default(24454),
  category: z.string().min(1),
  region: z.string().min(1),
  language: z.string().default('English'),
  discord_url: z.string().url().optional().or(z.literal('')),
  website_url: z.string().url().optional().or(z.literal('')),
  hosting_provider: z.string().max(50).optional().or(z.literal('')),
})

export const updateServerSchema = createServerSchema.partial().omit({ slug: true })

export const claimServerSchema = z.object({
  server_id: z.string().uuid(),
})

export const verifyServerSchema = z.object({
  server_id: z.string().uuid(),
  method: z.enum(['console_file', 'dns_txt']),
})

export type CreateServerInput = z.infer<typeof createServerSchema>
export type UpdateServerInput = z.infer<typeof updateServerSchema>
