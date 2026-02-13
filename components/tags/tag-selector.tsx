'use client'

import { useActionState } from 'react'
import { Badge } from '@/components/ui/badge'
import { applyTag, type TagActionState } from '@/app/actions/tag-actions'
import { cn } from '@/lib/utils'

type TagOption = { id: string; name: string; slug: string }

const initialState: TagActionState = { success: false }

export function TagSelector({
  serverId,
  tags,
  appliedTagIds,
  applyLabel,
}: {
  serverId: string
  tags: TagOption[]
  appliedTagIds: Set<string>
  applyLabel: string
}) {
  const [state, formAction, isPending] = useActionState(applyTag, initialState)

  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => {
        const applied = appliedTagIds.has(tag.id)
        return (
          <form key={tag.id} action={formAction}>
            <input type="hidden" name="server_id" value={serverId} />
            <input type="hidden" name="tag_id" value={tag.id} />
            <button type="submit" disabled={applied || isPending}>
              <Badge
                variant={applied ? 'default' : 'outline'}
                className={cn(
                  'cursor-pointer transition-colors',
                  applied && 'opacity-60 cursor-not-allowed'
                )}
              >
                {tag.name}
                {applied && ' ✓'}
              </Badge>
            </button>
          </form>
        )
      })}
      {state.message && (
        <span className={cn('text-xs', state.success ? 'text-green-600' : 'text-destructive')}>
          {state.message}
        </span>
      )}
    </div>
  )
}
