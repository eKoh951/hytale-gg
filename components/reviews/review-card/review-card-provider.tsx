import { createContext, useContext, type ReactNode } from 'react'
import type { ReviewWithDetails } from '@/lib/data/reviews'

const ReviewCardContext = createContext<ReviewWithDetails | null>(null)

export function useReviewCard() {
  const ctx = useContext(ReviewCardContext)
  if (!ctx) throw new Error('useReviewCard must be used within ReviewCardProvider')
  return ctx
}

export function ReviewCardProvider({
  review,
  children,
}: {
  review: ReviewWithDetails
  children: ReactNode
}) {
  return (
    <ReviewCardContext value={review}>
      {children}
    </ReviewCardContext>
  )
}
