'use client'

import { useActionState } from 'react'
import { ThumbsUp, ThumbsDown, Laugh, Bookmark, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  voteOnReview,
  reactToReview,
  saveReview,
  type ReviewActionState,
} from '@/app/actions/review-actions'
import { cn } from '@/lib/utils'

const initialState: ReviewActionState = { success: false }

type ActionLabels = {
  helpful: string
  notHelpful: string
  funny: string
  save: string
  saved: string
  comment: string
}

export function ReviewActions({
  reviewId,
  helpfulCount,
  funnyCount,
  commentCount,
  isSaved,
  labels,
}: {
  reviewId: string
  helpfulCount: number
  funnyCount: number
  commentCount: number
  isSaved: boolean
  labels: ActionLabels
}) {
  const [voteState, voteAction] = useActionState(voteOnReview, initialState)
  const [reactState, reactAction] = useActionState(reactToReview, initialState)
  const [saveState, saveAction] = useActionState(saveReview, initialState)

  const saved = saveState.success ? saveState.message === 'saved' : isSaved

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {/* Helpful */}
      <form action={voteAction}>
        <input type="hidden" name="review_id" value={reviewId} />
        <input type="hidden" name="vote_type" value="helpful" />
        <Button variant="ghost" size="sm" type="submit" className="h-7 gap-1 text-xs">
          <ThumbsUp className="size-3" />
          {labels.helpful}
          {helpfulCount > 0 && <span className="text-muted-foreground">({helpfulCount})</span>}
        </Button>
      </form>

      {/* Funny */}
      <form action={reactAction}>
        <input type="hidden" name="review_id" value={reviewId} />
        <input type="hidden" name="reaction" value="funny" />
        <Button variant="ghost" size="sm" type="submit" className="h-7 gap-1 text-xs">
          <Laugh className="size-3" />
          {labels.funny}
          {funnyCount > 0 && <span className="text-muted-foreground">({funnyCount})</span>}
        </Button>
      </form>

      {/* Save */}
      <form action={saveAction}>
        <input type="hidden" name="review_id" value={reviewId} />
        <Button
          variant="ghost"
          size="sm"
          type="submit"
          className={cn('h-7 gap-1 text-xs', saved && 'text-primary')}
        >
          <Bookmark className={cn('size-3', saved && 'fill-current')} />
          {saved ? labels.saved : labels.save}
        </Button>
      </form>

      {/* Comment count indicator */}
      {commentCount > 0 && (
        <span className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
          <MessageCircle className="size-3" />
          {commentCount}
        </span>
      )}
    </div>
  )
}
