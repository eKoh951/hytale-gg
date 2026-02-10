'use client'

import { useTranslations } from 'next-intl'
import * as m from 'motion/react-m'

interface CsatScaleProps {
  value: number | null
  onChange: (value: number) => void
}

const SCALE_VALUES = [1, 2, 3, 4, 5]

export function CsatScale({ value, onChange }: CsatScaleProps) {
  const t = useTranslations()

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-5 gap-2 md:gap-3">
        {SCALE_VALUES.map((num) => {
          const isSelected = value === num
          const labelKey = `survey.common.csat.${num}` as const

          return (
            <m.button
              key={num}
              onClick={() => onChange(num)}
              className={`flex flex-col items-center gap-2 rounded-lg border-2 p-3 md:p-4 transition-all hover:border-primary/60 ${
                isSelected
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-card'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span
                className={`text-2xl md:text-3xl font-bold ${
                  isSelected ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {num}
              </span>
              <span
                className={`text-xs md:text-sm text-center leading-tight ${
                  isSelected ? 'text-foreground font-medium' : 'text-muted-foreground'
                }`}
              >
                {t(labelKey)}
              </span>
            </m.button>
          )
        })}
      </div>

      <div className="flex justify-between text-xs text-muted-foreground px-1">
        <span>{t('survey.common.csat.lowLabel')}</span>
        <span>{t('survey.common.csat.highLabel')}</span>
      </div>
    </div>
  )
}
