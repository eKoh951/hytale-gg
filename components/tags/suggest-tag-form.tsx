'use client'

import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { suggestTag, type TagActionState } from '@/app/actions/tag-actions'

type SuggestTagLabels = {
  title: string
  nameLabel: string
  namePlaceholder: string
  descriptionLabel: string
  descriptionPlaceholder: string
  typeLabel: string
  types: Record<string, string>
  submit: string
  submitting: string
  success: string
  requirementsNotMet: string
}

const initialState: TagActionState = { success: false }

export function SuggestTagForm({
  labels,
  canSuggest,
}: {
  labels: SuggestTagLabels
  canSuggest: boolean
}) {
  const [state, formAction, isPending] = useActionState(suggestTag, initialState)

  if (!canSuggest) {
    return (
      <p className="text-sm text-muted-foreground">{labels.requirementsNotMet}</p>
    )
  }

  if (state.success) {
    return <p className="text-sm text-green-600">{labels.success}</p>
  }

  return (
    <form action={formAction} className="space-y-4">
      {state.message && !state.success && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}

      <div className="space-y-2">
        <Label htmlFor="tag-name">{labels.nameLabel}</Label>
        <Input id="tag-name" name="name" placeholder={labels.namePlaceholder} required />
        {state.errors?.name && <p className="text-xs text-destructive">{state.errors.name[0]}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="tag-desc">{labels.descriptionLabel}</Label>
        <Textarea id="tag-desc" name="description" placeholder={labels.descriptionPlaceholder} rows={2} />
      </div>

      <div className="space-y-2">
        <Label>{labels.typeLabel}</Label>
        <Select name="type" required>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(labels.types).map(([key, label]) => (
              <SelectItem key={key} value={key}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={isPending} size="sm">
        {isPending ? labels.submitting : labels.submit}
      </Button>
    </form>
  )
}
