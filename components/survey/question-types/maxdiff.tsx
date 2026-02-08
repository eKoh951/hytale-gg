'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
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
    if (optionKey === least) return // Can't be both
    onChange({ most: most === optionKey ? null : optionKey, least })
  }

  const handleLeastClick = (optionKey: string) => {
    if (optionKey === most) return // Can't be both
    onChange({ most, least: least === optionKey ? null : optionKey })
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Desktop: Table Layout */}
      <div className="hidden md:block overflow-x-auto">
        <div className="min-w-full">
          <div className="grid grid-cols-[1fr_2fr_1fr] gap-4 pb-3 border-b border-border">
            <div className="text-sm font-medium text-center text-muted-foreground">
              {t('survey.common.maxdiff.most')}
            </div>
            <div className="text-sm font-medium text-center text-muted-foreground">
              {t('survey.common.maxdiff.feature')}
            </div>
            <div className="text-sm font-medium text-center text-muted-foreground">
              {t('survey.common.maxdiff.least')}
            </div>
          </div>

          {question.options?.map((option) => {
            const isMost = most === option.key
            const isLeast = least === option.key
            const mostDisabled = least === option.key
            const leastDisabled = most === option.key

            return (
              <div
                key={option.key}
                className="grid grid-cols-[1fr_2fr_1fr] gap-4 py-3 items-center border-b border-border/50 last:border-0"
              >
                {/* Most Important */}
                <div className="flex justify-center">
                  <motion.button
                    onClick={() => handleMostClick(option.key)}
                    disabled={mostDisabled}
                    className={`h-6 w-6 rounded-full border-2 transition-all ${
                      mostDisabled
                        ? 'cursor-not-allowed opacity-30'
                        : 'hover:border-primary/60'
                    } ${
                      isMost
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground/40 bg-transparent'
                    }`}
                    whileHover={!mostDisabled ? { scale: 1.1 } : {}}
                    whileTap={!mostDisabled ? { scale: 0.9 } : {}}
                  >
                    {isMost && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="h-2 w-2 rounded-full bg-primary-foreground mx-auto"
                      />
                    )}
                  </motion.button>
                </div>

                {/* Feature Name */}
                <div className="text-center text-base">
                  {t(option.labelKey)}
                </div>

                {/* Least Important */}
                <div className="flex justify-center">
                  <motion.button
                    onClick={() => handleLeastClick(option.key)}
                    disabled={leastDisabled}
                    className={`h-6 w-6 rounded-full border-2 transition-all ${
                      leastDisabled
                        ? 'cursor-not-allowed opacity-30'
                        : 'hover:border-muted-foreground'
                    } ${
                      isLeast
                        ? 'border-muted-foreground bg-muted-foreground'
                        : 'border-muted-foreground/40 bg-transparent'
                    }`}
                    whileHover={!leastDisabled ? { scale: 1.1 } : {}}
                    whileTap={!leastDisabled ? { scale: 0.9 } : {}}
                  >
                    {isLeast && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="h-2 w-2 rounded-full bg-background mx-auto"
                      />
                    )}
                  </motion.button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile: Card Layout */}
      <div className="flex flex-col gap-3 md:hidden">
        {question.options?.map((option) => {
          const isMost = most === option.key
          const isLeast = least === option.key

          return (
            <div
              key={option.key}
              className="rounded-lg border border-border bg-card p-4"
            >
              <div className="mb-3 text-base font-medium">
                {t(option.labelKey)}
              </div>
              <div className="flex gap-2">
                <motion.button
                  onClick={() => handleMostClick(option.key)}
                  disabled={isLeast}
                  className={`flex-1 rounded-md border-2 py-2 text-sm font-medium transition-all ${
                    isLeast
                      ? 'cursor-not-allowed opacity-30'
                      : 'hover:border-primary/60'
                  } ${
                    isMost
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background'
                  }`}
                  whileTap={!isLeast ? { scale: 0.95 } : {}}
                >
                  {t('survey.common.maxdiff.most')}
                </motion.button>
                <motion.button
                  onClick={() => handleLeastClick(option.key)}
                  disabled={isMost}
                  className={`flex-1 rounded-md border-2 py-2 text-sm font-medium transition-all ${
                    isMost
                      ? 'cursor-not-allowed opacity-30'
                      : 'hover:border-muted-foreground'
                  } ${
                    isLeast
                      ? 'border-muted-foreground bg-muted text-muted-foreground'
                      : 'border-border bg-background'
                  }`}
                  whileTap={!isMost ? { scale: 0.95 } : {}}
                >
                  {t('survey.common.maxdiff.least')}
                </motion.button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
