'use server'

import { createClient } from '@/lib/supabase/server'
import type { SurveyAnswer } from '@/lib/surveys/types'

export async function startSurveyResponse(
  surveySlug: string,
  sessionToken: string,
  locale: string,
  totalSteps: number
): Promise<{ responseId: number } | { error: string }> {
  const supabase = await createClient()

  // Look up survey by slug
  const { data: survey, error: surveyError } = await supabase
    .from('surveys')
    .select('id')
    .eq('slug', surveySlug)
    .eq('status', 'active')
    .single()

  if (surveyError || !survey) {
    return { error: 'Survey not found or inactive.' }
  }

  // Check if session already has a response for this survey
  const { data: existing } = await supabase
    .from('survey_responses')
    .select('id, completed_at')
    .eq('survey_id', survey.id)
    .eq('session_token', sessionToken)
    .single()

  if (existing?.completed_at) {
    return { error: 'already_completed' }
  }

  if (existing) {
    return { responseId: existing.id }
  }

  // Try to get current user for optional linking
  const { data: { user } } = await supabase.auth.getUser()

  const { data: response, error: insertError } = await supabase
    .from('survey_responses')
    .insert({
      survey_id: survey.id,
      session_token: sessionToken,
      locale,
      total_steps: totalSteps,
      current_step: 0,
      respondent_id: user?.id ?? null,
    })
    .select('id')
    .single()

  if (insertError || !response) {
    return { error: 'Failed to start survey.' }
  }

  return { responseId: response.id }
}

export async function saveSurveyStep(
  responseId: number,
  step: number,
  answers: Record<string, SurveyAnswer>
): Promise<{ success: boolean } | { error: string }> {
  const supabase = await createClient()

  // Update current_step on the response
  const { error: updateError } = await supabase
    .from('survey_responses')
    .update({ current_step: step })
    .eq('id', responseId)

  if (updateError) {
    return { error: 'Failed to update progress.' }
  }

  // Upsert answers for this step
  const upserts = Object.entries(answers).map(([questionKey, answer]) => ({
    response_id: responseId,
    question_key: questionKey,
    answer: answer as unknown as Record<string, unknown>,
    answered_at: new Date().toISOString(),
  }))

  if (upserts.length > 0) {
    const { error: answerError } = await supabase
      .from('survey_answers')
      .upsert(upserts, { onConflict: 'response_id,question_key' })

    if (answerError) {
      return { error: 'Failed to save answers.' }
    }
  }

  return { success: true }
}

export async function submitSurvey(
  responseId: number
): Promise<{ success: boolean } | { error: string }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('survey_responses')
    .update({ completed_at: new Date().toISOString() })
    .eq('id', responseId)

  if (error) {
    return { error: 'Failed to submit survey.' }
  }

  return { success: true }
}

export async function screenOutSurvey(
  responseId: number
): Promise<{ success: boolean } | { error: string }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('survey_responses')
    .update({ screened_out: true })
    .eq('id', responseId)

  if (error) {
    return { error: 'Failed to record screen-out.' }
  }

  return { success: true }
}

export async function getExistingResponse(
  surveySlug: string,
  sessionToken: string
): Promise<{
  responseId: number
  currentStep: number
  answers: Record<string, SurveyAnswer>
  completed: boolean
} | null> {
  const supabase = await createClient()

  const { data: survey } = await supabase
    .from('surveys')
    .select('id')
    .eq('slug', surveySlug)
    .single()

  if (!survey) return null

  const { data: response } = await supabase
    .from('survey_responses')
    .select('id, current_step, completed_at')
    .eq('survey_id', survey.id)
    .eq('session_token', sessionToken)
    .single()

  if (!response) return null

  // Fetch existing answers
  const { data: answerRows } = await supabase
    .from('survey_answers')
    .select('question_key, answer')
    .eq('response_id', response.id)

  const answers: Record<string, SurveyAnswer> = {}
  if (answerRows) {
    for (const row of answerRows) {
      answers[row.question_key] = row.answer as SurveyAnswer
    }
  }

  return {
    responseId: response.id,
    currentStep: response.current_step,
    answers,
    completed: !!response.completed_at,
  }
}
