'use client'

import { useTranslations } from 'next-intl'
import * as m from 'motion/react-m'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import type { Question } from '@/lib/surveys/types'

interface MaxdiffProps {
  question: Question
  value: { most: string | null; least: string | null } | null
  onChange: (value: { most: string | null; least: string | null }) => void
}

export function Maxdiff({ question, value, onChange }: MaxdiffProps) {
  const t = useTranslations()

  const most = value?.most || null
  const least = value?.least || null

  const handleMostClick = (optionKey: string) => {
    if (optionKey === least) return
    onChange({ most: most === optionKey ? null : optionKey, least })
  }

  const handleLeastClick = (optionKey: string) => {
    if (optionKey === most) return
    onChange({ most, least: least === optionKey ? null : optionKey })
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Column legend */}
      <div className="flex items-center justify-end gap-2 pb-1 text-xs font-medium text-muted-foreground">
        <span className="flex items-center gap-1 text-emerald-400">
          <ThumbsUp className="h-3 w-3" />
          {t('survey.common.maxdiff.most')}
        </span>
        <span className="mx-1 text-border">|</span>
        <span className="flex items-center gap-1 text-rose-400">
          <ThumbsDown className="h-3 w-3" />
          {t('survey.common.maxdiff.least')}
        </span>
      </div>

      {/* Feature rows */}
      {question.options?.map((option) => {
        const isMost = most === option.key
        const isLeast = least === option.key
        const mostDisabled = least === option.key
        const leastDisabled = most === option.key

        return (
          <m.div
            key={option.key}
            className={`flex items-center gap-3 rounded-lg border-2 p-3 sm:p-4 transition-colors ${
              isMost
                ? 'border-emerald-500/50 bg-emerald-500/5'
                : isLeast
                  ? 'border-rose-500/50 bg-rose-500/5'
                  : 'border-border bg-card'
            }`}
          >
            {/* Feature label — left side, takes remaining space */}
            <span className="flex-1 text-sm sm:text-base leading-snug">
              {t(option.labelKey)}
            </span>

            {/* Action buttons — right side */}
            <div className="flex shrink-0 items-center gap-2">
              {/* Most Important */}
              <m.button
                type="button"
                onClick={() => handleMostClick(option.key)}
                disabled={mostDisabled}
                aria-label={`${t('survey.common.maxdiff.most')}: ${t(option.labelKey)}`}
                className={`flex h-9 w-9 items-center justify-center rounded-md border-2 transition-all ${
                  mostDisabled
                    ? 'cursor-not-allowed opacity-20'
                    : 'hover:border-emerald-500/60 hover:bg-emerald-500/10'
                } ${
                  isMost
                    ? 'border-emerald-500 bg-emerald-500 text-white'
                    : 'border-border bg-background text-muted-foreground'
                }`}
                whileHover={!mostDisabled ? { scale: 1.05 } : {}}
                whileTap={!mostDisabled ? { scale: 0.92 } : {}}
              >
                <ThumbsUp className="h-4 w-4" />
              </m.button>

              {/* Least Important */}
              <m.button
                type="button"
                onClick={() => handleLeastClick(option.key)}
                disabled={leastDisabled}
                aria-label={`${t('survey.common.maxdiff.least')}: ${t(option.labelKey)}`}
                className={`flex h-9 w-9 items-center justify-center rounded-md border-2 transition-all ${
                  leastDisabled
                    ? 'cursor-not-allowed opacity-20'
                    : 'hover:border-rose-500/60 hover:bg-rose-500/10'
                } ${
                  isLeast
                    ? 'border-rose-500 bg-rose-500 text-white'
                    : 'border-border bg-background text-muted-foreground'
                }`}
                whileHover={!leastDisabled ? { scale: 1.05 } : {}}
                whileTap={!leastDisabled ? { scale: 0.92 } : {}}
              >
                <ThumbsDown className="h-4 w-4" />
              </m.button>
            </div>
          </m.div>
        )
      })}
    </div>
  )
}
