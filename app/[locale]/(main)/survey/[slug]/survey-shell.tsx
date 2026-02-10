'use client'

import { useEffect, useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import * as m from 'motion/react-m'
import { AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getSurveyConfig, getTotalQuestions, getTotalSections } from '@/lib/surveys/get-survey'
import { validateAnswer } from '@/lib/surveys/validation'
import { SurveyProvider, useSurvey } from '@/components/survey/survey-provider'
import { QuestionRenderer } from '@/components/survey/question-renderer'
import { SurveyThankYou } from '@/components/survey/survey-thank-you'
import { SurveyScreenOut } from '@/components/survey/survey-screen-out'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import {
  startSurveyResponse,
  saveSurveyStep,
  submitSurvey,
  screenOutSurvey,
  getExistingResponse,
} from '../actions'
import { saveDiscordUsername } from '@/app/actions/survey-actions'
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

function SurveyContent() {
  const { state, meta, actions, survey } = useSurvey()
  const t = useTranslations()
  const [direction, setDirection] = useState(0)
  const [showError, setShowError] = useState(false)

  // Clear error when answers change (user is fixing the issue)
  useEffect(() => {
    if (showError && meta.canGoNext) {
      setShowError(false)
    }
  }, [meta.canGoNext, showError])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleNext()
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [meta.canGoNext])

  const scrollToFirstError = () => {
    for (const question of meta.currentQuestions) {
      const result = validateAnswer(question, state.answers[question.key])
      if (!result.valid) {
        const el = document.querySelector(`[data-question-key="${question.key}"]`)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
        break
      }
    }
  }

  const handleNext = async () => {
    if (!meta.canGoNext) {
      setShowError(true)
      requestAnimationFrame(scrollToFirstError)
      return
    }
    setShowError(false)
    setDirection(1)
    if (state.currentStep === meta.totalSteps - 1) {
      await actions.submit()
    } else {
      await actions.nextStep()
    }
  }

  const handleBack = () => {
    setDirection(-1)
    actions.prevStep()
  }

  if (state.isComplete) {
    const handleSaveDiscord = async (username: string) => {
      if (!state.responseId) return
      await saveDiscordUsername(state.responseId, username)
    }
    return <SurveyThankYou survey={survey} onSaveDiscord={handleSaveDiscord} />
  }

  if (state.isScreenedOut) {
    return <SurveyScreenOut survey={survey} />
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
    }),
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <m.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Progress value={meta.progress} className="h-2" />
          <p className="mt-2 text-right text-xs text-muted-foreground">
            {Math.round(meta.progress)}% {t('survey.common.complete')}
          </p>
        </m.div>

        {/* Question Card */}
        <Card className="border-2">
          <CardContent className="p-6 md:p-8">
            <AnimatePresence mode="wait" custom={direction}>
              <m.div
                key={state.currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
              >
                {meta.currentQuestions.map((question) => {
                  const qError = showError
                    ? validateAnswer(question, state.answers[question.key])
                    : null
                  const errorMsg = qError && !qError.valid ? t(qError.error!) : null

                  return (
                    <div key={question.key} data-question-key={question.key} className="flex flex-col gap-6">
                      {/* Question Number */}
                      {meta.totalSteps > 1 && (
                        <div className="text-sm font-medium text-muted-foreground">
                          {t('survey.common.questionNumber', {
                            current: state.currentStep + 1,
                            total: meta.totalSteps,
                          })}
                        </div>
                      )}

                      {/* Question Title */}
                      <div className="flex flex-col gap-2">
                        <h2 className="text-balance text-2xl font-bold leading-tight md:text-3xl">
                          {t(question.titleKey)}
                        </h2>
                        {question.subtitleKey && (
                          <p className="text-pretty text-muted-foreground">
                            {t(question.subtitleKey)}
                          </p>
                        )}
                      </div>

                      {/* Question Input */}
                      <div className="mt-2">
                        <QuestionRenderer question={question} validationError={errorMsg} />
                      </div>
                    </div>
                  )
                })}
              </m.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Navigation Footer */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex items-center justify-between"
        >
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={state.currentStep === 0}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            {t('survey.common.back')}
          </Button>

          <Button
            onClick={handleNext}
            disabled={state.isSubmitting}
            className="gap-2"
          >
            {state.currentStep === meta.totalSteps - 1
              ? t('survey.common.submit')
              : t('survey.common.next')}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </m.div>
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl">
        <Skeleton className="mb-6 h-2 w-full" />
        <Card className="border-2">
          <CardContent className="p-6 md:p-8">
            <Skeleton className="mb-6 h-8 w-3/4" />
            <Skeleton className="mb-4 h-4 w-full" />
            <Skeleton className="mb-4 h-4 w-5/6" />
            <div className="mt-8 flex flex-col gap-3">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function AlreadyCompletedScreen() {
  const t = useTranslations()
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="max-w-md">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <h2 className="text-2xl font-bold">
            {t('survey.common.alreadyCompleted.title')}
          </h2>
          <p className="text-muted-foreground">
            {t('survey.common.alreadyCompleted.description')}
          </p>
          <Button asChild>
            <a href="/">{t('survey.common.alreadyCompleted.returnHome')}</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
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
  if (loading) return <LoadingSkeleton />

  if (initialData?.completed) {
    return <AlreadyCompletedScreen />
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
      <SurveyContent />
    </SurveyProvider>
  )
}
