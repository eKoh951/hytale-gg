'use client'

import { useActionState, useRef, useState } from 'react'
import { Upload, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { uploadMedia, type MediaActionState } from '@/app/actions/media-actions'
import { BUCKET_CONFIG, type BucketName } from '@/lib/validations/media'
import { cn } from '@/lib/utils'

const initialState: MediaActionState = { success: false }

export function ImageUpload({
  bucket,
  entityId,
  label,
  currentUrl,
  accept = 'image/png,image/jpeg,image/webp',
  className,
}: {
  bucket: BucketName
  entityId: string
  label: string
  currentUrl?: string | null
  accept?: string
  className?: string
}) {
  const [state, formAction, isPending] = useActionState(uploadMedia, initialState)
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null)
  const fileRef = useRef<HTMLInputElement>(null)
  const config = BUCKET_CONFIG[bucket]
  const maxMB = (config.maxSize / 1_048_576).toFixed(1)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
  }

  function clearPreview() {
    setPreview(currentUrl ?? null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const displayUrl = state.success && state.url ? state.url : preview

  return (
    <div className={cn('space-y-2', className)}>
      <label className="text-sm font-medium">{label}</label>

      <form action={formAction}>
        <input type="hidden" name="bucket" value={bucket} />
        <input type="hidden" name="entityId" value={entityId} />

        <div className="relative">
          {displayUrl ? (
            <div className="relative rounded-lg overflow-hidden border bg-muted">
              <img
                src={displayUrl}
                alt=""
                className={cn(
                  'w-full object-cover',
                  bucket === 'server-icons' ? 'h-24 w-24' : 'h-40'
                )}
              />
              <button
                type="button"
                onClick={clearPreview}
                className="absolute top-2 right-2 rounded-full bg-background/80 p-1 hover:bg-background"
              >
                <X className="size-4" />
              </button>
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center rounded-lg border border-dashed p-6 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => fileRef.current?.click()}
            >
              <Upload className="size-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Click to upload (max {maxMB}MB)
              </p>
            </div>
          )}

          <input
            ref={fileRef}
            type="file"
            name="file"
            accept={accept}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {preview && preview !== currentUrl && (
          <Button type="submit" size="sm" disabled={isPending} className="mt-2 gap-1">
            {isPending ? (
              <>
                <Loader2 className="size-3 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="size-3" />
                Upload
              </>
            )}
          </Button>
        )}
      </form>

      {state.message && (
        <p className={cn('text-xs', state.success ? 'text-green-600' : 'text-destructive')}>
          {state.message}
        </p>
      )}
    </div>
  )
}
