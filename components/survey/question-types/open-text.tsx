'use client'

import { useTranslations } from 'next-intl'
import { Textarea } from '@/components/ui/textarea'
import type { Question } from '@/lib/surveys/types'

interface OpenTextProps {
  question: Question
  value: string | null
  onChange: (value: string) => void
}

export function OpenText({ question, value, onChange }: OpenTextProps) {
  const t = useTranslations()

  const maxLength = question.constraints?.maxLength || 500
  const currentLength = value?.length || 0

  const placeholder = question.subtitleKey
    ? t(question.subtitleKey)
    : t('survey.common.otherPlaceholder')

  return (
    <div className="flex flex-col gap-2">
      <Textarea
        placeholder={placeholder}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        rows={6}
        className="resize-none"
      />
      <div className="flex justify-end text-xs text-muted-foreground">
        {currentLength} / {maxLength}
      </div>
    </div>
  )
}
