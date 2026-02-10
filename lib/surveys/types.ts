// ============================================================
// Survey System — Type Definitions
// Follows vercel-composition-patterns: state/actions/meta interface
// ============================================================

// -- Question Types --

export type QuestionType =
  | 'single_select'
  | 'dropdown_select'
  | 'multi_select'
  | 'csat_scale'
  | 'maxdiff'
  | 'point_allocation'
  | 'open_text'

export interface Option {
  key: string
  labelKey: string
  screenOut?: boolean
}

export interface QuestionConstraints {
  min?: number
  max?: number
  exact?: number
  sum?: number
}

export interface QuestionDependency {
  questionKey: string
  useSelectedAsOptions: boolean
}

export interface Question {
  key: string
  type: QuestionType
  titleKey: string
  subtitleKey?: string
  options?: Option[]
  constraints?: QuestionConstraints
  dependsOn?: QuestionDependency
  hasOtherOption?: boolean
  optional?: boolean
}

export interface Section {
  key: string
  titleKey: string
  descriptionKey?: string
  questions: Question[]
}

export interface ThankYouConfig {
  titleKey: string
  descriptionKey: string
  showDiscordInput?: boolean
}

export interface ScreenOutConfig {
  titleKey: string
  descriptionKey: string
}

export interface SurveyConfig {
  slug: string
  titleKey: string
  descriptionKey: string
  sections: Section[]
  thankYou: ThankYouConfig
  screenOut: ScreenOutConfig
}

// -- Answer Shapes (stored as JSONB) --

export interface SingleSelectAnswer {
  selected: string
  other?: string
}

export interface MultiSelectAnswer {
  selected: string[]
  other?: string
}

export interface CsatScaleAnswer {
  value: number
}

export interface MaxDiffAnswer {
  most: string
  least: string
}

export interface PointAllocationAnswer {
  points: Record<string, number>
}

export interface OpenTextAnswer {
  text: string
}

export type SurveyAnswer =
  | SingleSelectAnswer
  | MultiSelectAnswer
  | CsatScaleAnswer
  | MaxDiffAnswer
  | PointAllocationAnswer
  | OpenTextAnswer

// -- Survey State (useReducer) --

export interface SurveyState {
  responseId: number | null
  currentStep: number
  answers: Record<string, SurveyAnswer>
  isSubmitting: boolean
  isComplete: boolean
  isScreenedOut: boolean
  error: string | null
}

export type SurveyAction =
  | { type: 'SET_ANSWER'; questionKey: string; answer: SurveyAnswer }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SCREEN_OUT' }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR'; error: string }
  | { type: 'SET_RESPONSE_ID'; responseId: number }
  | { type: 'RESTORE_PROGRESS'; step: number; answers: Record<string, SurveyAnswer> }

// -- Survey Context (state / actions / meta) --

export interface SurveyContextState extends SurveyState {}

export interface SurveyContextActions {
  setAnswer: (questionKey: string, answer: SurveyAnswer) => void
  nextStep: () => Promise<void>
  prevStep: () => void
  submit: () => Promise<void>
}

export interface SurveyContextMeta {
  surveyConfig: SurveyConfig
  totalSteps: number
  progress: number
  canGoNext: boolean
  validationError: string | null
  canGoBack: boolean
  isMobile: boolean
  currentQuestions: Question[]
}

export interface SurveyContextValue {
  state: SurveyContextState
  actions: SurveyContextActions
  meta: SurveyContextMeta
  survey: SurveyConfig
}

// -- DB Row Types --

export interface SurveyRow {
  id: number
  slug: string
  title: string
  description: string | null
  status: 'draft' | 'active' | 'closed'
  created_at: string
  updated_at: string
}

export interface SurveyResponseRow {
  id: number
  survey_id: number
  respondent_id: string | null
  session_token: string
  locale: string
  current_step: number
  total_steps: number
  started_at: string
  completed_at: string | null
  screened_out: boolean
  metadata: Record<string, unknown>
  created_at: string
}

export interface SurveyAnswerRow {
  id: number
  response_id: number
  question_key: string
  answer: SurveyAnswer
  answered_at: string
}
