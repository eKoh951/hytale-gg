'use client'

import { useState, lazy, Suspense } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { MessageSquarePlus } from 'lucide-react'

const ReviewModalContent = lazy(() =>
  import('./review-modal-content').then((m) => ({ default: m.ReviewModalContent }))
)

type Dimension = { id: string; name: string }

type ReviewModalLabels = {
  title: string
  writeReview: string
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

export function ReviewModal({
  entityType,
  entityId,
  dimensions,
  labels,
  disabled,
  disabledReason,
}: {
  entityType: string
  entityId: string
  dimensions: Dimension[]
  labels: ReviewModalLabels
  disabled?: boolean
  disabledReason?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="gap-2" title={disabledReason}>
          <MessageSquarePlus className="size-4" />
          {labels.writeReview}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{labels.title}</DialogTitle>
        </DialogHeader>
        <Suspense fallback={<Skeleton className="h-[300px]" />}>
          <ReviewModalContent
            entityType={entityType}
            entityId={entityId}
            dimensions={dimensions}
            labels={labels}
          />
        </Suspense>
      </DialogContent>
    </Dialog>
  )
}
