'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import type { Question } from '@/lib/surveys/types'

interface MultiSelectProps {
  question: Question
  value: { selected: string[]; other?: string } | null
  onChange: (value: { selected: string[]; other?: string }) => void
}

export function MultiSelect({ question, value, onChange }: MultiSelectProps) {
  const t = useTranslations()
  const [otherText, setOtherText] = useState(value?.other || '')

  const selected = value?.selected || []
  const hasOther = selected.includes('other')

  const constraints = question.constraints
  const maxSelections = constraints?.max || constraints?.exact || Infinity
  const minSelections = constraints?.min || 0

  const handleToggle = (optionKey: string) => {
    const isCurrentlySelected = selected.includes(optionKey)

    if (isCurrentlySelected) {
      // Deselect
      const newSelected = selected.filter((v) => v !== optionKey)
      onChange({
        selected: newSelected,
        other: optionKey === 'other' ? undefined : value?.other,
      })
    } else {
      // Select
      if (selected.length >= maxSelections) {
        return // Already at max
      }
      const newSelected = [...selected, optionKey]
      onChange({ selected: newSelected, other: value?.other })
    }
  }

  const handleOtherChange = (text: string) => {
    setOtherText(text)
    onChange({ selected, other: text })
  }

  const isLimitReached = selected.length >= maxSelections

  const selectionCountText = useMemo(() => {
    if (constraints?.exact) {
      return t('survey.common.selectExact', { count: constraints.exact })
    }
    if (constraints?.max) {
      return t('survey.common.selectUpTo', {
        current: selected.length,
        max: constraints.max,
      })
    }
    if (minSelections > 0) {
      return t('survey.common.selectAtLeast', { count: minSelections })
    }
    return null
  }, [constraints, selected.length, minSelections, t])

  return (
    <div className="flex flex-col gap-3">
      {selectionCountText && (
        <Badge variant="secondary" className="w-fit">
          {selectionCountText}
        </Badge>
      )}

      {question.options?.map((option) => {
        const isSelected = selected.includes(option.key)
        const isDisabled = !isSelected && isLimitReached

        return (
          <motion.button
            key={option.key}
            onClick={() => handleToggle(option.key)}
            disabled={isDisabled}
            className={`relative flex items-center gap-3 rounded-lg border-2 p-4 text-left transition-all ${
              isDisabled
                ? 'cursor-not-allowed opacity-40'
                : 'hover:border-primary/60'
            } ${
              isSelected
                ? 'border-primary bg-primary/5'
                : 'border-border bg-card'
            }`}
            whileHover={!isDisabled ? { scale: 1.01 } : {}}
            whileTap={!isDisabled ? { scale: 0.99 } : {}}
          >
            <div
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-all ${
                isSelected
                  ? 'border-primary bg-primary'
                  : 'border-muted-foreground/40'
              }`}
            >
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Check className="h-3 w-3 text-primary-foreground" />
                </motion.div>
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

      {hasOther && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-2"
        >
          <Input
            placeholder={t('survey.common.otherPlaceholder')}
            value={otherText}
            onChange={(e) => handleOtherChange(e.target.value)}
            autoFocus
          />
        </motion.div>
      )}
    </div>
  )
}
