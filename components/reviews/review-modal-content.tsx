'use client'

import { useState } from 'react'
import { QuickRateForm } from './quick-rate-form'
import { DetailedReviewForm } from './detailed-review-form'
import { cn } from '@/lib/utils'

type Dimension = { id: string; name: string }

type ModalLabels = {
  quickTab: string
  detailedTab: string
  quickDescription: string
  detailedDescription: string
  form: {
    overallRating: string
    dimensionRatings: string
    reviewText: string
    reviewTextPlaceholder: string
    recommend: string
    recommendYes: string
    recommendNo: string
    playDuration: string
    playDurationPlaceholder: string
    videoUrl: string
    videoUrlPlaceholder: string
    videoPlatform: string
    submit: string
    submitting: string
    success: string
    charCount: string
  }
}

export function ReviewModalContent({
  entityType,
  entityId,
  dimensions,
  labels,
}: {
  entityType: string
  entityId: string
  dimensions: Dimension[]
  labels: ModalLabels
}) {
  const [tab, setTab] = useState<'quick' | 'detailed'>('quick')

  return (
    <div className="space-y-4">
      {/* Tab selector */}
      <div className="flex gap-1 rounded-lg bg-muted p-1">
        <button
          type="button"
          className={cn(
            'flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors',
            tab === 'quick' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'
          )}
          onClick={() => setTab('quick')}
        >
          {labels.quickTab}
        </button>
        <button
          type="button"
          className={cn(
            'flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors',
            tab === 'detailed' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'
          )}
          onClick={() => setTab('detailed')}
        >
          {labels.detailedTab}
        </button>
      </div>

      <p className="text-xs text-muted-foreground">
        {tab === 'quick' ? labels.quickDescription : labels.detailedDescription}
      </p>

      {tab === 'quick' ? (
        <QuickRateForm
          entityType={entityType}
          entityId={entityId}
          dimensions={dimensions}
          labels={labels.form}
        />
      ) : (
        <DetailedReviewForm
          entityType={entityType}
          entityId={entityId}
          dimensions={dimensions}
          labels={labels.form}
        />
      )}
    </div>
  )
}
