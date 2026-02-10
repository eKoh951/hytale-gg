'use client'

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import * as m from 'motion/react-m'
import { Badge } from '@/components/ui/badge'
import type { Question } from '@/lib/surveys/types'

interface PointAllocationProps {
  question: Question
  value: Record<string, number> | null
  onChange: (value: Record<string, number>) => void
}

const TOKENS_TOTAL = 10
const POINTS_PER_TOKEN = 10

function sanitize(alloc: Record<string, number>): Record<string, number> {
  const needsSnap = Object.values(alloc).some((v) => v % POINTS_PER_TOKEN !== 0)
  if (!needsSnap) return alloc
  const snapped: Record<string, number> = {}
  for (const [k, v] of Object.entries(alloc)) {
    snapped[k] = Math.round(v / POINTS_PER_TOKEN) * POINTS_PER_TOKEN
  }
  return snapped
}

export function PointAllocation({
  question,
  value,
  onChange,
}: PointAllocationProps) {
  const t = useTranslations()
  const hasSanitized = useRef(false)

  const currentAllocation = value || {}

  // Auto-sanitize old non-round values on mount
  useEffect(() => {
    if (hasSanitized.current || !value) return
    const clean = sanitize(value)
    if (clean !== value) {
      hasSanitized.current = true
      onChange(clean)
    }
  }, [value, onChange])

  const getTokenCount = (key: string) =>
    Math.round((currentAllocation[key] || 0) / POINTS_PER_TOKEN)

  const totalTokensUsed = Math.round(
    Object.values(currentAllocation).reduce((sum, v) => sum + v, 0) / POINTS_PER_TOKEN
  )
  const tokensRemaining = TOKENS_TOTAL - totalTokensUsed

  const addToken = (key: string) => {
    if (tokensRemaining <= 0) return
    const clean = sanitize(currentAllocation)
    onChange({
      ...clean,
      [key]: (clean[key] || 0) + POINTS_PER_TOKEN,
    })
  }

  const removeToken = (key: string) => {
    const clean = sanitize(currentAllocation)
    const current = clean[key] || 0
    if (current <= 0) return
    onChange({
      ...clean,
      [key]: current - POINTS_PER_TOKEN,
    })
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Token pool — remaining budget */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {t('survey.common.pointAllocation.totalPoints', {
              total: TOKENS_TOTAL,
            })}
          </span>
          <Badge variant={tokensRemaining === 0 ? 'default' : 'secondary'}>
            {tokensRemaining === 0
              ? t('survey.common.pointAllocation.complete')
              : t('survey.common.pointAllocation.remaining', {
                  points: tokensRemaining,
                })}
          </Badge>
        </div>

        {/* Visual pool of remaining tokens */}
        <div className="flex items-center justify-center gap-1.5 rounded-lg border border-border/50 bg-muted/20 px-3 py-2.5">
          {Array.from({ length: TOKENS_TOTAL }).map((_, i) => (
            <div
              key={i}
              className={`h-4 w-4 rounded-full transition-all duration-300 ${
                i < tokensRemaining
                  ? 'bg-primary shadow-sm shadow-primary/40 scale-100'
                  : 'bg-muted/40 scale-90'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Option cards — 2-column grid, tap to allocate */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {question.options?.map((option) => {
          const tokens = getTokenCount(option.key)
          const canAdd = tokensRemaining > 0
          const hasTokens = tokens > 0

          // Split label: bold main text, normal parenthetical
          const rawLabel = t(option.labelKey)
          const parenIdx = rawLabel.indexOf('(')
          const mainText = parenIdx > 0 ? rawLabel.slice(0, parenIdx).trim() : rawLabel
          const subText = parenIdx > 0 ? rawLabel.slice(parenIdx) : null

          return (
            <m.div
              key={option.key}
              role="button"
              tabIndex={0}
              onClick={() => addToken(option.key)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  addToken(option.key)
                }
              }}
              className={`flex flex-col justify-between gap-3 rounded-lg border-2 p-3 sm:p-4 transition-colors select-none ${
                hasTokens
                  ? 'border-primary/40 bg-primary/5'
                  : 'border-border bg-card'
              } ${canAdd ? 'cursor-pointer' : 'cursor-default'}`}
              whileTap={canAdd ? { scale: 0.98 } : {}}
            >
              {/* Label + point count */}
              <div className="flex items-start justify-between gap-2">
                <span className="flex-1 text-sm leading-snug">
                  <span className="font-semibold">{mainText}</span>
                  {subText && (
                    <span className="block mt-0.5 text-xs text-muted-foreground leading-relaxed">
                      {subText}
                    </span>
                  )}
                </span>
                {hasTokens && (
                  <m.span
                    className="shrink-0 rounded-md bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground tabular-nums"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    {tokens * POINTS_PER_TOKEN}
                  </m.span>
                )}
              </div>

              {/* Token circles */}
              <div className="flex items-center gap-1">
                {Array.from({ length: TOKENS_TOTAL }).map((_, i) => {
                  const isFilled = i < tokens

                  return (
                    <m.button
                      key={i}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (isFilled) {
                          removeToken(option.key)
                        } else if (canAdd) {
                          addToken(option.key)
                        }
                      }}
                      className={`h-4 w-4 sm:h-5 sm:w-5 rounded-full border-2 transition-colors ${
                        isFilled
                          ? 'bg-primary border-primary hover:bg-primary/80'
                          : canAdd
                            ? 'border-border/60 bg-background hover:border-primary/40'
                            : 'border-border/20 bg-muted/10'
                      }`}
                      whileHover={isFilled || canAdd ? { scale: 1.2 } : {}}
                      whileTap={isFilled || canAdd ? { scale: 0.85 } : {}}
                      aria-label={
                        isFilled
                          ? t('survey.common.pointAllocation.removeToken')
                          : t('survey.common.pointAllocation.addToken')
                      }
                    />
                  )
                })}
              </div>
            </m.div>
          )
        })}
      </div>
    </div>
  )
}
