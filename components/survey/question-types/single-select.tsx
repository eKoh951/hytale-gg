'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import type { Question } from '@/lib/surveys/types'

interface SingleSelectProps {
  question: Question
  value: { selected: string; other?: string } | null
  onChange: (value: { selected: string; other?: string }) => void
}

export function SingleSelect({ question, value, onChange }: SingleSelectProps) {
  const t = useTranslations()
  const [showOther, setShowOther] = useState(
    value?.selected === 'other' || false
  )

  const handleSelect = (optionKey: string) => {
    if (optionKey === 'other') {
      setShowOther(true)
      onChange({ selected: 'other', other: value?.other || '' })
    } else {
      setShowOther(false)
      onChange({ selected: optionKey })
    }
  }

  const handleOtherChange = (otherText: string) => {
    onChange({ selected: 'other', other: otherText })
  }

  return (
    <div className="flex flex-col gap-3">
      {question.options?.map((option) => {
        const isSelected = value?.selected === option.key
        return (
          <motion.button
            key={option.key}
            onClick={() => handleSelect(option.key)}
            className={`relative flex items-center gap-3 rounded-lg border-2 p-4 text-left transition-all hover:border-primary/60 ${
              isSelected
                ? 'border-primary bg-primary/5'
                : 'border-border bg-card'
            }`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                isSelected
                  ? 'border-primary bg-primary'
                  : 'border-muted-foreground/40'
              }`}
            >
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="h-2 w-2 rounded-full bg-primary-foreground"
                />
              )}
            </div>
            <span
              className={`flex-1 text-base ${
                isSelected ? 'font-medium text-foreground' : 'text-foreground'
              }`}
            >
              {t(option.labelKey)}
            </span>
          </motion.button>
        )
      })}

      {showOther && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-2"
        >
          <Input
            placeholder={t('survey.common.otherPlaceholder')}
            value={value?.other || ''}
            onChange={(e) => handleOtherChange(e.target.value)}
            autoFocus
          />
        </motion.div>
      )}
    </div>
  )
}
