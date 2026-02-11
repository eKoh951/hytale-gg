'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type MediaItem = {
  id: string
  url: string
  thumbnail_url?: string | null
  type: string
}

export function MediaGallery({
  items,
  className,
}: {
  items: MediaItem[]
  className?: string
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (items.length === 0) return null

  function openLightbox(index: number) {
    setLightboxIndex(index)
  }

  function closeLightbox() {
    setLightboxIndex(null)
  }

  function prev() {
    setLightboxIndex((i) => (i !== null ? (i - 1 + items.length) % items.length : null))
  }

  function next() {
    setLightboxIndex((i) => (i !== null ? (i + 1) % items.length : null))
  }

  return (
    <>
      {/* Thumbnail grid */}
      <div className={cn('grid gap-2 grid-cols-2 sm:grid-cols-3', className)}>
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            className="aspect-video rounded-lg overflow-hidden bg-muted cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => openLightbox(i)}
          >
            <img
              src={item.thumbnail_url ?? item.url}
              alt=""
              className="size-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
            onClick={closeLightbox}
          >
            <X className="size-6" />
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-10"
                onClick={(e) => { e.stopPropagation(); prev() }}
              >
                <ChevronLeft className="size-8" />
              </button>
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-10"
                onClick={(e) => { e.stopPropagation(); next() }}
              >
                <ChevronRight className="size-8" />
              </button>
            </>
          )}

          <div
            className="max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {items[lightboxIndex].type === 'screenshot' ? (
              <img
                src={items[lightboxIndex].url}
                alt=""
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
            ) : (
              <video
                src={items[lightboxIndex].url}
                controls
                autoPlay
                className="max-w-full max-h-[90vh] rounded-lg"
              />
            )}
          </div>

          <div className="absolute bottom-4 text-white/60 text-sm">
            {lightboxIndex + 1} / {items.length}
          </div>
        </div>
      )}
    </>
  )
}
