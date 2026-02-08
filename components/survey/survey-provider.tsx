'use client'

import { createContext, use, useReducer, useCallback, useMemo, useEffect, useState } from 'react'
import type {
  SurveyConfig,
  SurveyState,
  SurveyAction,
  SurveyAnswer,
  SurveyContextValue,
  Question,
} from '@/lib/surveys/types'
import { validateStep, isScreenedOut } from '@/lib/surveys/validation'
import { getQuestionsForStep, getTotalQuestions, getTotalSections } from '@/lib/surveys/get-survey'

// ── Reducer ──

const initialState: SurveyState = {
  responseId: null,
  currentStep: 0,
  answers: {},
  isSubmitting: false,
  isComplete: false,
  isScreenedOut: false,
  error: null,
}

function surveyReducer(state: SurveyState, action: SurveyAction): SurveyState {
  switch (action.type) {
    case 'SET_ANSWER':
      return {
        ...state,
        answers: { ...state.answers, [action.questionKey]: action.answer },
        error: null,
      }
    case 'NEXT_STEP':
      return { ...state, currentStep: state.currentStep + 1, error: null }
    case 'PREV_STEP':
      return { ...state, currentStep: Math.max(0, state.currentStep - 1), error: null }
    case 'SCREEN_OUT':
      return { ...state, isScreenedOut: true }
    case 'SUBMIT_START':
      return { ...state, isSubmitting: true, error: null }
    case 'SUBMIT_SUCCESS':
      return { ...state, isSubmitting: false, isComplete: true }
    case 'SUBMIT_ERROR':
      return { ...state, isSubmitting: false, error: action.error }
    case 'SET_RESPONSE_ID':
      return { ...state, responseId: action.responseId }
    case 'RESTORE_PROGRESS':
      return { ...state, currentStep: action.step, answers: action.answers }
    default:
      return state
  }
}

// ── Context ──

const SurveyContext = createContext<SurveyContextValue | null>(null)

// ── Hook ──

export function useSurvey(): SurveyContextValue {
  const context = use(SurveyContext)
  if (!context) {
    throw new Error('useSurvey must be used within a SurveyProvider')
  }
  return context
}

// ── useMediaQuery hook ──

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

// ── Provider Props ──

interface SurveyProviderProps {
  children: React.ReactNode
  config: SurveyConfig
  onSaveStep?: (responseId: number, step: number, answers: Record<string, SurveyAnswer>) => Promise<void>
  onSubmit?: (responseId: number, answers: Record<string, SurveyAnswer>) => Promise<void>
  onStart?: () => Promise<number>
  onScreenOut?: (responseId: number) => Promise<void>
  initialResponseId?: number
  initialStep?: number
  initialAnswers?: Record<string, SurveyAnswer>
}

// ── Provider ──

export function SurveyProvider({
  children,
  config,
  onSaveStep,
  onSubmit,
  onStart,
  onScreenOut,
  initialResponseId,
  initialStep,
  initialAnswers,
}: SurveyProviderProps) {
  const [state, dispatch] = useReducer(surveyReducer, {
    ...initialState,
    responseId: initialResponseId ?? null,
    currentStep: initialStep ?? 0,
    answers: initialAnswers ?? {},
  })

  const isMobile = useMediaQuery('(max-width: 767px)')

  const totalSteps = useMemo(
    () => (isMobile ? getTotalQuestions(config) : getTotalSections(config)),
    [config, isMobile]
  )

  const currentQuestions = useMemo(() => {
    const result = getQuestionsForStep(config, state.currentStep, isMobile)
    return result?.questions ?? []
  }, [config, state.currentStep, isMobile])

  const isLastStep = state.currentStep >= totalSteps - 1

  const canGoNext = useMemo(() => {
    const result = validateStep(currentQuestions, state.answers)
    return result.valid
  }, [currentQuestions, state.answers])

  const canGoBack = state.currentStep > 0

  const progress = useMemo(() => {
    if (totalSteps === 0) return 0
    return Math.round(((state.currentStep + 1) / totalSteps) * 100)
  }, [state.currentStep, totalSteps])

  // ── Actions ──

  const setAnswer = useCallback((questionKey: string, answer: SurveyAnswer) => {
    dispatch({ type: 'SET_ANSWER', questionKey, answer })
  }, [])

  const nextStep = useCallback(async () => {
    // Check for screen-out
    for (const question of currentQuestions) {
      if (isScreenedOut(question, state.answers[question.key])) {
        dispatch({ type: 'SCREEN_OUT' })
        if (state.responseId && onScreenOut) {
          await onScreenOut(state.responseId)
        }
        return
      }
    }

    // Start survey on first nextStep if no responseId yet
    if (!state.responseId && onStart) {
      const id = await onStart()
      dispatch({ type: 'SET_RESPONSE_ID', responseId: id })

      // Save first step
      if (onSaveStep) {
        await onSaveStep(id, state.currentStep, state.answers)
      }
    } else if (state.responseId && onSaveStep) {
      await onSaveStep(state.responseId, state.currentStep, state.answers)
    }

    if (!isLastStep) {
      dispatch({ type: 'NEXT_STEP' })
    }
  }, [currentQuestions, state.answers, state.responseId, state.currentStep, isLastStep, onStart, onSaveStep, onScreenOut])

  const prevStep = useCallback(() => {
    dispatch({ type: 'PREV_STEP' })
  }, [])

  const submit = useCallback(async () => {
    if (!state.responseId) return

    dispatch({ type: 'SUBMIT_START' })
    try {
      // Save final step answers
      if (onSaveStep) {
        await onSaveStep(state.responseId, state.currentStep, state.answers)
      }
      if (onSubmit) {
        await onSubmit(state.responseId, state.answers)
      }
      dispatch({ type: 'SUBMIT_SUCCESS' })
    } catch (err) {
      dispatch({
        type: 'SUBMIT_ERROR',
        error: err instanceof Error ? err.message : 'An error occurred',
      })
    }
  }, [state.responseId, state.currentStep, state.answers, onSaveStep, onSubmit])

  // ── Context Value (state / actions / meta) ──

  const value = useMemo<SurveyContextValue>(
    () => ({
      state,
      actions: { setAnswer, nextStep, prevStep, submit },
      meta: {
        surveyConfig: config,
        totalSteps,
        progress,
        canGoNext,
        canGoBack,
        isMobile,
        currentQuestions,
      },
      survey: config,
    }),
    [state, setAnswer, nextStep, prevStep, submit, config, totalSteps, progress, canGoNext, canGoBack, isMobile, currentQuestions]
  )

  return <SurveyContext value={value}>{children}</SurveyContext>
}
