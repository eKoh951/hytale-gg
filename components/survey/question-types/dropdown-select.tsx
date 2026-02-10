'use client'

import { useTranslations } from 'next-intl'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import type { Question } from '@/lib/surveys/types'

interface DropdownSelectProps {
  question: Question
  value: { selected: string; other?: string } | null
  onChange: (value: { selected: string; other?: string }) => void
}

export function DropdownSelect({ question, value, onChange }: DropdownSelectProps) {
  const t = useTranslations()

  const handleSelect = (optionKey: string) => {
    if (optionKey === 'other') {
      onChange({ selected: 'other', other: value?.other || '' })
    } else {
      onChange({ selected: optionKey })
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <Select value={value?.selected ?? ''} onValueChange={handleSelect}>
        <SelectTrigger className="h-12 w-full text-base">
          <SelectValue placeholder={t('survey.common.selectPlaceholder')} />
        </SelectTrigger>
        <SelectContent>
          {question.options?.map((option) => (
            <SelectItem key={option.key} value={option.key} className="text-base">
              {t(option.labelKey)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {value?.selected === 'other' && question.hasOtherOption && (
        <Input
          placeholder={t('survey.common.otherPlaceholder')}
          value={value?.other || ''}
          onChange={(e) => onChange({ selected: 'other', other: e.target.value })}
          autoFocus
        />
      )}
    </div>
  )
}
