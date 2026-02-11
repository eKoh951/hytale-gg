'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { uploadMetaSchema, BUCKET_CONFIG, type BucketName } from '@/lib/validations/media'

export type MediaActionState = {
  success: boolean
  message?: string
  url?: string
}

export async function uploadMedia(
  _prevState: MediaActionState,
  formData: FormData
): Promise<MediaActionState> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, message: 'You must be signed in.' }

  const file = formData.get('file') as File | null
  if (!file || file.size === 0) {
    return { success: false, message: 'No file selected.' }
  }

  const parsed = uploadMetaSchema.safeParse({
    bucket: formData.get('bucket'),
    entityId: formData.get('entityId'),
    fileName: file.name,
  })
  if (!parsed.success) {
    return { success: false, message: 'Invalid upload parameters.' }
  }

  const { bucket, entityId } = parsed.data
  const config = BUCKET_CONFIG[bucket]

  if (file.size > config.maxSize) {
    const maxMB = (config.maxSize / 1_048_576).toFixed(1)
    return { success: false, message: `File too large. Maximum size is ${maxMB}MB.` }
  }

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const folder = bucket === 'review-media' ? user.id : entityId
  const path = `${folder}/${crypto.randomUUID()}.${ext}`

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '31536000',
      upsert: false,
    })

  if (error) {
    console.error('Upload error:', error)
    return { success: false, message: 'Upload failed. Please try again.' }
  }

  const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(path)

  // Update DB references based on bucket type
  if (bucket === 'server-icons') {
    await supabase
      .from('servers')
      .update({ icon_url: publicUrl })
      .eq('id', entityId)
  } else if (bucket === 'server-covers') {
    await supabase
      .from('servers')
      .update({ cover_url: publicUrl })
      .eq('id', entityId)
  } else if (bucket === 'server-screenshots') {
    await supabase.from('server_media').insert({
      server_id: entityId,
      type: 'screenshot',
      url: publicUrl,
      uploaded_by: user.id,
    })
  } else if (bucket === 'review-media') {
    await supabase.from('review_media').insert({
      review_id: entityId,
      type: 'screenshot',
      url: publicUrl,
    })
  }

  revalidatePath('/[locale]/(main)/servers/[slug]')
  return { success: true, url: publicUrl, message: 'Upload successful!' }
}

export async function deleteMedia(
  _prevState: MediaActionState,
  formData: FormData
): Promise<MediaActionState> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, message: 'You must be signed in.' }

  const bucket = formData.get('bucket') as BucketName
  const path = formData.get('path') as string

  if (!bucket || !path) {
    return { success: false, message: 'Invalid parameters.' }
  }

  const { error } = await supabase.storage.from(bucket).remove([path])

  if (error) {
    console.error('Delete error:', error)
    return { success: false, message: 'Failed to delete file.' }
  }

  revalidatePath('/[locale]/(main)/servers/[slug]')
  return { success: true, message: 'File deleted.' }
}
