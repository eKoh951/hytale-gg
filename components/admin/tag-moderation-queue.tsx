'use client'

import { useActionState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Check, X, GitMerge } from 'lucide-react'
import { adminTagAction, type TagActionState } from '@/app/actions/tag-actions'

type Suggestion = {
  id: string
  name: string
  description: string | null
  type: string
  status: string
  created_at: string | null
  profiles: { display_name: string; username: string | null } | null
}

const initialState: TagActionState = { success: false }

export function TagModerationQueue({
  suggestions,
  existingTags,
}: {
  suggestions: Suggestion[]
  existingTags: Array<{ id: string; name: string }>
}) {
  if (suggestions.length === 0) {
    return (
      <div className="rounded-xl border p-8 text-center">
        <p className="text-muted-foreground">No pending tag suggestions.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {suggestions.map((suggestion) => (
        <TagSuggestionRow
          key={suggestion.id}
          suggestion={suggestion}
          existingTags={existingTags}
        />
      ))}
    </div>
  )
}

function TagSuggestionRow({
  suggestion,
  existingTags,
}: {
  suggestion: Suggestion
  existingTags: Array<{ id: string; name: string }>
}) {
  const [state, formAction, isPending] = useActionState(adminTagAction, initialState)

  if (state.success) {
    return (
      <div className="rounded-lg border p-4 bg-muted/50">
        <p className="text-sm text-green-600">{state.message}</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border p-4 space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{suggestion.name}</span>
            <Badge variant="outline" className="text-xs">{suggestion.type}</Badge>
          </div>
          {suggestion.description && (
            <p className="text-sm text-muted-foreground mt-1">{suggestion.description}</p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Suggested by {suggestion.profiles?.display_name ?? 'Unknown'} ·{' '}
            {suggestion.created_at ? new Date(suggestion.created_at).toLocaleDateString() : ''}
          </p>
        </div>
      </div>

      {state.message && !state.success && (
        <p className="text-xs text-destructive">{state.message}</p>
      )}

      <div className="flex items-center gap-2 flex-wrap">
        {/* Approve */}
        <form action={formAction}>
          <input type="hidden" name="suggestion_id" value={suggestion.id} />
          <input type="hidden" name="action" value="approved" />
          <Button size="sm" variant="default" disabled={isPending} className="gap-1">
            <Check className="size-3" /> Approve
          </Button>
        </form>

        {/* Reject */}
        <form action={formAction}>
          <input type="hidden" name="suggestion_id" value={suggestion.id} />
          <input type="hidden" name="action" value="rejected" />
          <Button size="sm" variant="destructive" disabled={isPending} className="gap-1">
            <X className="size-3" /> Reject
          </Button>
        </form>

        {/* Merge */}
        <form action={formAction} className="flex items-center gap-1">
          <input type="hidden" name="suggestion_id" value={suggestion.id} />
          <input type="hidden" name="action" value="merged" />
          <Select name="merged_into_tag_id">
            <SelectTrigger className="w-[160px] h-8 text-xs">
              <SelectValue placeholder="Merge into..." />
            </SelectTrigger>
            <SelectContent>
              {existingTags.map((tag) => (
                <SelectItem key={tag.id} value={tag.id}>{tag.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline" disabled={isPending} className="gap-1">
            <GitMerge className="size-3" /> Merge
          </Button>
        </form>
      </div>
    </div>
  )
}
