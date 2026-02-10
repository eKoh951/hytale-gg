'use client'

import { useMemo } from 'react'
import { useSurvey } from './survey-provider'
import { SingleSelect } from './question-types/single-select'
import { MultiSelect } from './question-types/multi-select'
import { CsatScale } from './question-types/csat-scale'
import { Maxdiff } from './question-types/maxdiff'
import { PointAllocation } from './question-types/point-allocation'
import { OpenText } from './question-types/open-text'
import type { Question, SurveyAnswer, Option } from '@/lib/surveys/types'

interface QuestionRendererProps {
  question: Question
  validationError?: string | null
}

function useResolvedQuestion(question: Question): Question {
  const { state, survey } = useSurvey()

  return useMemo(() => {
    if (!question.dependsOn?.useSelectedAsOptions) return question

    const depAnswer = state.answers[question.dependsOn.questionKey] as
      | { selected: string[]; other?: string }
      | null

    if (!depAnswer?.selected?.length) return question

    // Find the source question to get its option labels
    let sourceOptions: Option[] = []
    for (const section of survey.sections) {
      const found = section.questions.find(
        (q) => q.key === question.dependsOn!.questionKey
      )
      if (found?.options) {
        sourceOptions = found.options
        break
      }
    }

    // Build dynamic options from the selected keys
    const dynamicOptions: Option[] = depAnswer.selected
      .filter((key) => key !== 'other')
      .map((key) => {
        const source = sourceOptions.find((o) => o.key === key)
        return source ?? { key, labelKey: key }
      })

    return { ...question, options: dynamicOptions }
  }, [question, state.answers, survey.sections])
}

export function QuestionRenderer({ question, validationError }: QuestionRendererProps) {
  const { state, actions } = useSurvey()
  const resolvedQuestion = useResolvedQuestion(question)

  const value = state.answers[question.key] || null

  const handleChange = (newValue: SurveyAnswer) => {
    actions.setAnswer(question.key, newValue)
  }

  let content: React.ReactNode

  switch (question.type) {
    case 'single_select':
      content = (
        <SingleSelect
          question={resolvedQuestion}
          value={value as { selected: string; other?: string } | null}
          onChange={handleChange}
        />
      )
      break

    case 'multi_select':
      content = (
        <MultiSelect
          question={question}
          value={value as { selected: string[]; other?: string } | null}
          onChange={handleChange}
        />
      )
      break

    case 'csat_scale':
      content = (
        <CsatScale
          value={(value as unknown as { value: number } | null)?.value ?? null}
          onChange={(v: number) => handleChange({ value: v })}
        />
      )
      break

    case 'maxdiff':
      content = (
        <Maxdiff
          question={question}
          value={
            value as { most: string | null; least: string | null } | null
          }
          onChange={handleChange}
        />
      )
      break

    case 'point_allocation':
      content = (
        <PointAllocation
          question={question}
          value={(value as unknown as { points: Record<string, number> } | null)?.points ?? null}
          onChange={(v: Record<string, number>) => handleChange({ points: v })}
        />
      )
      break

    case 'open_text':
      content = (
        <OpenText
          question={question}
          value={(value as unknown as { text: string } | null)?.text ?? null}
          onChange={(v: string) => handleChange({ text: v })}
        />
      )
      break

    default:
      content = (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-sm text-destructive">
          Unknown question type: {question.type}
        </div>
      )
  }

  return (
    <div>
      {content}
      {validationError && (
        <p className="mt-2 text-sm text-destructive">{validationError}</p>
      )}
    </div>
  )
}
