import type {
  Question,
  SurveyAnswer,
  SingleSelectAnswer,
  MultiSelectAnswer,
  CsatScaleAnswer,
  MaxDiffAnswer,
  PointAllocationAnswer,
  OpenTextAnswer,
} from './types'

export interface ValidationResult {
  valid: boolean
  error?: string
}

export function validateAnswer(
  question: Question,
  answer: SurveyAnswer | undefined
): ValidationResult {
  if (!answer) {
    if (question.optional) return { valid: true }
    return { valid: false, error: 'survey.common.validation.required' }
  }

  switch (question.type) {
    case 'single_select':
      return validateSingleSelect(question, answer as SingleSelectAnswer)
    case 'multi_select':
      return validateMultiSelect(question, answer as MultiSelectAnswer)
    case 'csat_scale':
      return validateCsatScale(answer as CsatScaleAnswer)
    case 'maxdiff':
      return validateMaxDiff(answer as MaxDiffAnswer)
    case 'point_allocation':
      return validatePointAllocation(question, answer as PointAllocationAnswer)
    case 'open_text':
      return validateOpenText(answer as OpenTextAnswer)
    default:
      return { valid: false, error: 'survey.common.validation.unknownType' }
  }
}

function validateSingleSelect(
  question: Question,
  answer: SingleSelectAnswer
): ValidationResult {
  if (!answer.selected) {
    return { valid: false, error: 'survey.common.validation.required' }
  }

  if (question.hasOtherOption && answer.selected === 'other' && !answer.other?.trim()) {
    return { valid: false, error: 'survey.common.validation.otherRequired' }
  }

  return { valid: true }
}

function validateMultiSelect(
  question: Question,
  answer: MultiSelectAnswer
): ValidationResult {
  const count = answer.selected?.length ?? 0

  if (count === 0) {
    return { valid: false, error: 'survey.common.validation.required' }
  }

  const { min, max, exact } = question.constraints ?? {}

  if (exact !== undefined && count !== exact) {
    return { valid: false, error: 'survey.common.validation.exactN' }
  }

  if (min !== undefined && count < min) {
    return { valid: false, error: 'survey.common.validation.minN' }
  }

  if (max !== undefined && count > max) {
    return { valid: false, error: 'survey.common.validation.maxN' }
  }

  if (question.hasOtherOption && answer.selected.includes('other') && !answer.other?.trim()) {
    return { valid: false, error: 'survey.common.validation.otherRequired' }
  }

  return { valid: true }
}

function validateCsatScale(answer: CsatScaleAnswer): ValidationResult {
  if (answer.value === undefined || answer.value === null) {
    return { valid: false, error: 'survey.common.validation.required' }
  }

  if (answer.value < 1 || answer.value > 5) {
    return { valid: false, error: 'survey.common.validation.invalidScale' }
  }

  return { valid: true }
}

function validateMaxDiff(answer: MaxDiffAnswer): ValidationResult {
  if (!answer.most || !answer.least) {
    return { valid: false, error: 'survey.common.validation.maxdiffBoth' }
  }

  if (answer.most === answer.least) {
    return { valid: false, error: 'survey.common.validation.maxdiffSame' }
  }

  return { valid: true }
}

function validatePointAllocation(
  question: Question,
  answer: PointAllocationAnswer
): ValidationResult {
  if (!answer.points || Object.keys(answer.points).length === 0) {
    return { valid: false, error: 'survey.common.validation.required' }
  }

  const total = Math.round(Object.values(answer.points).reduce((sum, v) => sum + v, 0))
  const targetSum = question.constraints?.sum ?? 100

  if (total !== targetSum) {
    return { valid: false, error: 'survey.common.validation.pointsSum' }
  }

  const hasNegative = Object.values(answer.points).some((v) => v < 0)
  if (hasNegative) {
    return { valid: false, error: 'survey.common.validation.pointsNegative' }
  }

  return { valid: true }
}

function validateOpenText(answer: OpenTextAnswer): ValidationResult {
  if (!answer.text?.trim()) {
    return { valid: false, error: 'survey.common.validation.required' }
  }

  return { valid: true }
}

export function validateStep(
  questions: Question[],
  answers: Record<string, SurveyAnswer>
): ValidationResult {
  for (const question of questions) {
    const result = validateAnswer(question, answers[question.key])
    if (!result.valid) {
      return result
    }
  }
  return { valid: true }
}

export function isScreenedOut(
  question: Question,
  answer: SurveyAnswer | undefined
): boolean {
  if (!answer || question.type !== 'single_select') return false

  const selected = (answer as SingleSelectAnswer).selected
  const option = question.options?.find((o) => o.key === selected)

  return option?.screenOut === true
}
