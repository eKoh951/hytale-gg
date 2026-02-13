import { z } from 'zod'

export const BUCKET_CONFIG = {
  'server-icons': { maxSize: 512_000, label: 'Server Icon' },
  'server-covers': { maxSize: 2_097_152, label: 'Server Cover' },
  'server-screenshots': { maxSize: 5_242_880, label: 'Screenshot' },
  'review-media': { maxSize: 10_485_760, label: 'Review Media' },
} as const

export type BucketName = keyof typeof BUCKET_CONFIG

export const uploadMetaSchema = z.object({
  bucket: z.enum(['server-icons', 'server-covers', 'server-screenshots', 'review-media']),
  entityId: z.string().uuid(),
  fileName: z.string().min(1),
})
