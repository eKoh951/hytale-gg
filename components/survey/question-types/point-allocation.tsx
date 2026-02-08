'use client'

import { useTranslations } from 'next-intl'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import type { Question } from '@/lib/surveys/types'

interface PointAllocationProps {
  question: Question
  value: Record<string, number> | null
  onChange: (value: Record<string, number>) => void
}

export function PointAllocation({
  question,
  value,
  onChange,
}: PointAllocationProps) {
  const t = useTranslations()

  const totalPoints = question.constraints?.sum || 100
  const currentAllocation = value || {}

  const allocatedPoints = Object.values(currentAllocation).reduce(
    (sum, val) => sum + val,
    0
  )
  const remainingPoints = totalPoints - allocatedPoints

  const handleSliderChange = (optionKey: string, newValue: number[]) => {
    onChange({
      ...currentAllocation,
      [optionKey]: newValue[0],
    })
  }

  const handleInputChange = (optionKey: string, newValue: string) => {
    const numValue = parseInt(newValue, 10)
    if (isNaN(numValue)) {
      onChange({
        ...currentAllocation,
        [optionKey]: 0,
      })
    } else {
      onChange({
        ...currentAllocation,
        [optionKey]: Math.max(0, Math.min(totalPoints, numValue)),
      })
    }
  }

  const getBadgeVariant = () => {
    if (remainingPoints < 0) return 'destructive'
    if (remainingPoints === 0) return 'default'
    return 'secondary'
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {t('survey.common.pointAllocation.totalPoints', {
            total: totalPoints,
          })}
        </span>
        <Badge variant={getBadgeVariant()}>
          {remainingPoints === 0
            ? t('survey.common.pointAllocation.complete')
            : remainingPoints > 0
              ? t('survey.common.pointAllocation.remaining', {
                  points: remainingPoints,
                })
              : t('survey.common.pointAllocation.exceeded', {
                  points: Math.abs(remainingPoints),
                })}
        </Badge>
      </div>

      <div className="flex flex-col gap-5">
        {question.options?.map((option) => {
          const currentValue = currentAllocation[option.key] || 0

          return (
            <div key={option.key} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  {t(option.labelKey)}
                </label>
                <Input
                  type="number"
                  min={0}
                  max={totalPoints}
                  value={currentValue}
                  onChange={(e) =>
                    handleInputChange(option.key, e.target.value)
                  }
                  className="w-20 text-center"
                />
              </div>
              <Slider
                value={[currentValue]}
                onValueChange={(newValue) =>
                  handleSliderChange(option.key, newValue)
                }
                max={totalPoints}
                step={1}
                className="w-full"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
