'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function DimensionRating({
  dimensionId,
  label,
  value,
  onChange,
}: {
  dimensionId: string
  label: string
  value: number
  onChange: (dimensionId: string, score: number) => void
}) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm font-medium min-w-[80px]">{label}</span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="p-0.5 transition-transform hover:scale-110"
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(dimensionId, star)}
          >
            <Star
              className={cn(
                'size-5 transition-colors',
                (hovered || value) >= star
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-muted-foreground/30'
              )}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
