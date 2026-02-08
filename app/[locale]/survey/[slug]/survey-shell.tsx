'use client'

import { useEffect, useState, useCallback } from 'react'
import { getSurveyConfig, getTotalQuestions, getTotalSections } from '@/lib/surveys/get-survey'
import { SurveyProvider } from '@/components/survey/survey-provider'
import {
  startSurveyResponse,
  saveSurveyStep,
  submitSurvey,
  screenOutSurvey,
  getExistingResponse,
} from '../actions'
import type { SurveyAnswer } from '@/lib/surveys/types'

interface SurveyShellProps {
  slug: string
  locale: string
}

function getSessionToken(): string {
  if (typeof window === 'undefined') return ''
  const key = 'survey_session_token'
  let token = localStorage.getItem(key)
  if (!token) {
    token = crypto.randomUUID()
    localStorage.setItem(key, token)
  }
  return token
}

export function SurveyShell({ slug, locale }: SurveyShellProps) {
  const config = getSurveyConfig(slug)
  const [sessionToken, setSessionToken] = useState<string>('')
  const [initialData, setInitialData] = useState<{
    responseId?: number
    step?: number
    answers?: Record<string, SurveyAnswer>
    completed?: boolean
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getSessionToken()
    setSessionToken(token)

    async function loadExisting() {
      const existing = await getExistingResponse(slug, token)
      if (existing) {
        setInitialData({
          responseId: existing.responseId,
          step: existing.currentStep,
          answers: existing.answers,
          completed: existing.completed,
        })
      }
      setLoading(false)
    }

    loadExisting()
  }, [slug])

  const handleStart = useCallback(async (): Promise<number> => {
    if (!config) throw new Error('Survey config not found')

    const isMobile = window.matchMedia('(max-width: 767px)').matches
    const totalSteps = isMobile ? getTotalQuestions(config) : getTotalSections(config)

    const result = await startSurveyResponse(slug, sessionToken, locale, totalSteps)
    if ('error' in result) throw new Error(result.error)
    return result.responseId
  }, [slug, sessionToken, locale, config])

  const handleSaveStep = useCallback(
    async (responseId: number, step: number, answers: Record<string, SurveyAnswer>) => {
      const result = await saveSurveyStep(responseId, step, answers)
      if ('error' in result) throw new Error(result.error)
    },
    []
  )

  const handleSubmit = useCallback(async (responseId: number) => {
    const result = await submitSurvey(responseId)
    if ('error' in result) throw new Error(result.error)
  }, [])

  const handleScreenOut = useCallback(async (responseId: number) => {
    const result = await screenOutSurvey(responseId)
    if ('error' in result) throw new Error(result.error)
  }, [])

  if (!config) return null
  if (loading) return null // v0: replace with skeleton/loading state

  if (initialData?.completed) {
    return null // v0: replace with "already completed" screen
  }

  return (
    <SurveyProvider
      config={config}
      onStart={handleStart}
      onSaveStep={handleSaveStep}
      onSubmit={handleSubmit}
      onScreenOut={handleScreenOut}
      initialResponseId={initialData?.responseId}
      initialStep={initialData?.step}
      initialAnswers={initialData?.answers}
    >
      {/* v0 will replace this with the full survey UI */}
      <div data-survey-slug={slug} data-survey-locale={locale} />
    </SurveyProvider>
  )
}
