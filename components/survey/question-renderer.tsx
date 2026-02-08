'use client'

import { useSurvey } from './survey-provider'
import { SingleSelect } from './question-types/single-select'
import { MultiSelect } from './question-types/multi-select'
import { CsatScale } from './question-types/csat-scale'
import { Maxdiff } from './question-types/maxdiff'
import { PointAllocation } from './question-types/point-allocation'
import { OpenText } from './question-types/open-text'
import type { Question, SurveyAnswer } from '@/lib/surveys/types'

interface QuestionRendererProps {
  question: Question
}

export function QuestionRenderer({ question }: QuestionRendererProps) {
  const { state, actions } = useSurvey()

  const value = state.answers[question.key] || null

  const handleChange = (newValue: SurveyAnswer) => {
    actions.setAnswer(question.key, newValue)
  }

  switch (question.type) {
    case 'single_select':
      return (
        <SingleSelect
          question={question}
          value={value as { selected: string; other?: string } | null}
          onChange={handleChange}
        />
      )

    case 'multi_select':
      return (
        <MultiSelect
          question={question}
          value={value as { selected: string[]; other?: string } | null}
          onChange={handleChange}
        />
      )

    case 'csat_scale':
      return (
        <CsatScale
          value={(value as unknown as { value: number } | null)?.value ?? null}
          onChange={(v: number) => handleChange({ value: v })}
        />
      )

    case 'maxdiff':
      return (
        <Maxdiff
          question={question}
          value={
            value as { most: string | null; least: string | null } | null
          }
          onChange={handleChange}
        />
      )

    case 'point_allocation':
      return (
        <PointAllocation
          question={question}
          value={(value as unknown as { points: Record<string, number> } | null)?.points ?? null}
          onChange={(v: Record<string, number>) => handleChange({ points: v })}
        />
      )

    case 'open_text':
      return (
        <OpenText
          question={question}
          value={(value as unknown as { text: string } | null)?.text ?? null}
          onChange={(v: string) => handleChange({ text: v })}
        />
      )

    default:
      return (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-sm text-destructive">
          Unknown question type: {question.type}
        </div>
      )
  }
}
