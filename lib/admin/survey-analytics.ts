import { createClient } from '@/lib/supabase/server'
import { getSurveyConfig, getAllSurveyConfigs } from '@/lib/surveys/get-survey'
import type { Question, QuestionType, SurveyConfig, Option } from '@/lib/surveys/types'

export type TranslationFn = (key: string) => string

// ── Aggregated Data Types ──

export interface SurveyListItem {
  id: number
  slug: string
  title: string
  status: string
  total: number
  completed: number
  screenedOut: number
  inProgress: number
}

export interface SelectOptionData {
  key: string
  label: string
  count: number
}

export interface SelectChartData {
  type: 'single_select' | 'dropdown_select' | 'multi_select'
  options: SelectOptionData[]
  totalRespondents: number
  otherTexts: string[]
}

export interface CsatChartData {
  type: 'csat_scale'
  distribution: { value: number; count: number }[]
  mean: number
  median: number
  totalRespondents: number
}

export interface MaxDiffChartData {
  type: 'maxdiff'
  options: { key: string; label: string; mostCount: number; leastCount: number; netScore: number }[]
  totalRespondents: number
}

export interface PointAllocationChartData {
  type: 'point_allocation'
  options: { key: string; label: string; avgPoints: number }[]
  totalRespondents: number
}

export interface OpenTextChartData {
  type: 'open_text'
  responses: string[]
}

export type QuestionChartData =
  | SelectChartData
  | CsatChartData
  | MaxDiffChartData
  | PointAllocationChartData
  | OpenTextChartData

export interface QuestionResult {
  questionKey: string
  title: string
  subtitle?: string
  sectionKey: string
  sectionTitle: string
  chartData: QuestionChartData
}

export interface SurveyResultsData {
  meta: {
    surveyTitle: string
    surveySlug: string
    totalStarted: number
    totalCompleted: number
    screenedOut: number
    availableLocales: string[]
    activeLocale: string | null
    availableCountries: string[]
    activeCountry: string | null
  }
  questions: QuestionResult[]
}

// ── Survey List Stats ──

export async function getSurveyListStats(): Promise<SurveyListItem[]> {
  const supabase = await createClient()

  const { data: surveys } = await supabase
    .from('surveys')
    .select('id, slug, title, status')
    .order('id')

  if (!surveys || surveys.length === 0) return []

  // Single query for all response counts grouped by survey_id
  const { data: responses } = await supabase
    .from('survey_responses')
    .select('survey_id, completed_at, screened_out')

  const statsMap = new Map<number, { total: number; completed: number; screenedOut: number }>()

  for (const r of responses ?? []) {
    const entry = statsMap.get(r.survey_id) ?? { total: 0, completed: 0, screenedOut: 0 }
    entry.total++
    if (r.completed_at) entry.completed++
    if (r.screened_out) entry.screenedOut++
    statsMap.set(r.survey_id, entry)
  }

  return surveys.map((s) => {
    const stats = statsMap.get(s.id) ?? { total: 0, completed: 0, screenedOut: 0 }
    return {
      id: s.id,
      slug: s.slug,
      title: s.title,
      status: s.status,
      total: stats.total,
      completed: stats.completed,
      screenedOut: stats.screenedOut,
      inProgress: stats.total - stats.completed - stats.screenedOut,
    }
  })
}

// ── Per-Survey Results ──

export async function getSurveyResults(
  slug: string,
  t: TranslationFn,
  localeFilter?: string | null,
  countryFilter?: string | null
): Promise<SurveyResultsData | null> {
  const config = getSurveyConfig(slug)
  if (!config) return null

  const supabase = await createClient()

  // Get the survey row
  const { data: survey } = await supabase
    .from('surveys')
    .select('id, title')
    .eq('slug', slug)
    .single()

  if (!survey) return null

  // Get response-level stats in one query (include locale + metadata for filtering)
  const { data: responses } = await supabase
    .from('survey_responses')
    .select('id, completed_at, screened_out, locale, metadata')
    .eq('survey_id', survey.id)

  const allResponses = responses ?? []

  // Compute available locales from all completed responses
  const availableLocales = [...new Set(
    allResponses.filter((r) => r.completed_at).map((r) => r.locale)
  )].sort()

  // Compute available countries from geo_country metadata
  const availableCountries = [...new Set(
    allResponses
      .filter((r) => r.completed_at)
      .map((r) => (r.metadata as Record<string, unknown>)?.geo_country as string)
      .filter(Boolean)
  )].sort()

  // Apply locale filter if specified
  let filteredResponses = localeFilter
    ? allResponses.filter((r) => r.locale === localeFilter)
    : allResponses

  // Apply country filter if specified
  if (countryFilter) {
    filteredResponses = filteredResponses.filter((r) => {
      const meta = r.metadata as Record<string, unknown> | null
      return meta?.geo_country === countryFilter
    })
  }

  const completedIds = filteredResponses.filter((r) => r.completed_at).map((r) => r.id)
  const totalStarted = filteredResponses.length
  const totalCompleted = completedIds.length
  const screenedOut = filteredResponses.filter((r) => r.screened_out).length

  if (completedIds.length === 0) {
    return {
      meta: {
        surveyTitle: survey.title,
        surveySlug: slug,
        totalStarted,
        totalCompleted: 0,
        screenedOut,
        availableLocales,
        activeLocale: localeFilter ?? null,
        availableCountries,
        activeCountry: countryFilter ?? null,
      },
      questions: buildEmptyResults(config, t),
    }
  }

  // Fetch ALL answers for completed responses in one batch query
  // (avoids N+1 — one query per question)
  const { data: answers } = await supabase
    .from('survey_answers')
    .select('question_key, answer, response_id')
    .in('response_id', completedIds)

  // Group answers by question_key
  const answersByQuestion = new Map<string, { answer: unknown; response_id: number }[]>()
  for (const a of answers ?? []) {
    const list = answersByQuestion.get(a.question_key) ?? []
    list.push({ answer: a.answer, response_id: a.response_id })
    answersByQuestion.set(a.question_key, list)
  }

  // Build a flat map of all questions for dependsOn lookups
  const allQuestions = new Map<string, Question>()
  for (const section of config.sections) {
    for (const q of section.questions) {
      allQuestions.set(q.key, q)
    }
  }

  // Aggregate per question using config
  const questions: QuestionResult[] = []
  for (const section of config.sections) {
    for (const question of section.questions) {
      // Resolve dynamic options for dependsOn questions
      let resolvedQuestion = question
      if (question.dependsOn?.useSelectedAsOptions && (!question.options || question.options.length === 0)) {
        const parentQuestion = allQuestions.get(question.dependsOn.questionKey)
        const parentAnswers = answersByQuestion.get(question.dependsOn.questionKey) ?? []
        // Collect all unique selected keys from parent answers
        const selectedKeys = new Set<string>()
        for (const { answer } of parentAnswers) {
          const a = answer as { selected?: string | string[] }
          if (Array.isArray(a?.selected)) {
            for (const key of a.selected) if (key !== 'other') selectedKeys.add(key)
          } else if (typeof a?.selected === 'string' && a.selected !== 'other') {
            selectedKeys.add(a.selected)
          }
        }
        // Build options from parent question's option labels
        const parentOptions = parentQuestion?.options ?? []
        const dynamicOptions: Option[] = [...selectedKeys].map((key) => {
          const source = parentOptions.find((o) => o.key === key)
          return source ?? { key, labelKey: key }
        })
        resolvedQuestion = { ...question, options: dynamicOptions }
      }

      const rawAnswers = answersByQuestion.get(question.key) ?? []
      const chartData = aggregateQuestion(resolvedQuestion, rawAnswers, totalCompleted, t)
      questions.push({
        questionKey: question.key,
        title: t(question.titleKey),
        subtitle: question.subtitleKey ? t(question.subtitleKey) : undefined,
        sectionKey: section.key,
        sectionTitle: t(section.titleKey),
        chartData,
      })
    }
  }

  return {
    meta: {
      surveyTitle: survey.title,
      surveySlug: slug,
      totalStarted,
      totalCompleted,
      screenedOut,
      availableLocales,
      activeLocale: localeFilter ?? null,
      availableCountries,
      activeCountry: countryFilter ?? null,
    },
    questions,
  }
}

// ── Aggregation Functions ──

function aggregateQuestion(
  question: Question,
  rawAnswers: { answer: unknown }[],
  totalCompleted: number,
  t: TranslationFn
): QuestionChartData {
  switch (question.type) {
    case 'single_select':
    case 'dropdown_select':
      return aggregateSingleSelect(question, rawAnswers, t)
    case 'multi_select':
      return aggregateMultiSelect(question, rawAnswers, t)
    case 'csat_scale':
      return aggregateCsat(rawAnswers)
    case 'maxdiff':
      return aggregateMaxDiff(question, rawAnswers, t)
    case 'point_allocation':
      return aggregatePointAllocation(question, rawAnswers, t)
    case 'open_text':
      return aggregateOpenText(rawAnswers)
    default:
      return { type: 'open_text', responses: [] }
  }
}

function aggregateSingleSelect(
  question: Question,
  rawAnswers: { answer: unknown }[],
  t: TranslationFn
): SelectChartData {
  const counts = new Map<string, number>()
  const otherTexts: string[] = []

  for (const { answer } of rawAnswers) {
    const a = answer as { selected?: string; other?: string }
    if (!a?.selected) continue
    counts.set(a.selected, (counts.get(a.selected) ?? 0) + 1)
    if (a.selected === 'other' && a.other?.trim()) {
      otherTexts.push(a.other.trim())
    }
  }

  const options: SelectOptionData[] = (question.options ?? []).map((opt) => ({
    key: opt.key,
    label: t(opt.labelKey),
    count: counts.get(opt.key) ?? 0,
  }))

  // Sort by count descending
  options.sort((a, b) => b.count - a.count)

  return {
    type: 'single_select',
    options,
    totalRespondents: rawAnswers.length,
    otherTexts,
  }
}

function aggregateMultiSelect(
  question: Question,
  rawAnswers: { answer: unknown }[],
  t: TranslationFn
): SelectChartData {
  const counts = new Map<string, number>()
  const otherTexts: string[] = []

  for (const { answer } of rawAnswers) {
    const a = answer as { selected?: string[]; other?: string }
    if (!a?.selected) continue
    for (const key of a.selected) {
      counts.set(key, (counts.get(key) ?? 0) + 1)
    }
    if (a.selected.includes('other') && a.other?.trim()) {
      otherTexts.push(a.other.trim())
    }
  }

  const options: SelectOptionData[] = (question.options ?? []).map((opt) => ({
    key: opt.key,
    label: t(opt.labelKey),
    count: counts.get(opt.key) ?? 0,
  }))

  options.sort((a, b) => b.count - a.count)

  return {
    type: 'multi_select',
    options,
    totalRespondents: rawAnswers.length,
    otherTexts,
  }
}

function aggregateCsat(rawAnswers: { answer: unknown }[]): CsatChartData {
  const distribution = [1, 2, 3, 4, 5].map((v) => ({ value: v, count: 0 }))
  const values: number[] = []

  for (const { answer } of rawAnswers) {
    const a = answer as { value?: number }
    if (a?.value != null && a.value >= 1 && a.value <= 5) {
      distribution[a.value - 1].count++
      values.push(a.value)
    }
  }

  values.sort((a, b) => a - b)
  const mean = values.length > 0 ? values.reduce((s, v) => s + v, 0) / values.length : 0
  const median = values.length > 0 ? values[Math.floor(values.length / 2)] : 0

  return {
    type: 'csat_scale',
    distribution,
    mean: Math.round(mean * 10) / 10,
    median,
    totalRespondents: values.length,
  }
}

function aggregateMaxDiff(
  question: Question,
  rawAnswers: { answer: unknown }[],
  t: TranslationFn
): MaxDiffChartData {
  const mostCounts = new Map<string, number>()
  const leastCounts = new Map<string, number>()

  for (const { answer } of rawAnswers) {
    const a = answer as { most?: string; least?: string }
    if (a?.most) mostCounts.set(a.most, (mostCounts.get(a.most) ?? 0) + 1)
    if (a?.least) leastCounts.set(a.least, (leastCounts.get(a.least) ?? 0) + 1)
  }

  const total = rawAnswers.length || 1
  const options = (question.options ?? []).map((opt) => {
    const mostCount = mostCounts.get(opt.key) ?? 0
    const leastCount = leastCounts.get(opt.key) ?? 0
    return {
      key: opt.key,
      label: t(opt.labelKey),
      mostCount,
      leastCount,
      netScore: Math.round(((mostCount - leastCount) / total) * 100),
    }
  })

  // Sort by netScore descending
  options.sort((a, b) => b.netScore - a.netScore)

  return {
    type: 'maxdiff',
    options,
    totalRespondents: rawAnswers.length,
  }
}

function aggregatePointAllocation(
  question: Question,
  rawAnswers: { answer: unknown }[],
  t: TranslationFn
): PointAllocationChartData {
  const totals = new Map<string, number>()

  for (const { answer } of rawAnswers) {
    const a = answer as { points?: Record<string, number> }
    if (!a?.points) continue
    for (const [key, val] of Object.entries(a.points)) {
      totals.set(key, (totals.get(key) ?? 0) + val)
    }
  }

  const count = rawAnswers.length || 1
  const options = (question.options ?? []).map((opt) => ({
    key: opt.key,
    label: t(opt.labelKey),
    avgPoints: Math.round((totals.get(opt.key) ?? 0) / count),
  }))

  options.sort((a, b) => b.avgPoints - a.avgPoints)

  return {
    type: 'point_allocation',
    options,
    totalRespondents: rawAnswers.length,
  }
}

function aggregateOpenText(rawAnswers: { answer: unknown }[]): OpenTextChartData {
  const responses: string[] = []

  for (const { answer } of rawAnswers) {
    const a = answer as { text?: string }
    if (a?.text?.trim()) {
      responses.push(a.text.trim())
    }
  }

  return { type: 'open_text', responses }
}

// ── Helper: Empty results when no completed responses ──

function buildEmptyResults(config: SurveyConfig, t: TranslationFn): QuestionResult[] {
  const questions: QuestionResult[] = []
  for (const section of config.sections) {
    for (const question of section.questions) {
      questions.push({
        questionKey: question.key,
        title: t(question.titleKey),
        subtitle: question.subtitleKey ? t(question.subtitleKey) : undefined,
        sectionKey: section.key,
        sectionTitle: t(section.titleKey),
        chartData: getEmptyChartData(question.type),
      })
    }
  }
  return questions
}

function getEmptyChartData(type: QuestionType): QuestionChartData {
  switch (type) {
    case 'single_select':
    case 'dropdown_select':
    case 'multi_select':
      return { type, options: [], totalRespondents: 0, otherTexts: [] }
    case 'csat_scale':
      return {
        type: 'csat_scale',
        distribution: [1, 2, 3, 4, 5].map((v) => ({ value: v, count: 0 })),
        mean: 0,
        median: 0,
        totalRespondents: 0,
      }
    case 'maxdiff':
      return { type: 'maxdiff', options: [], totalRespondents: 0 }
    case 'point_allocation':
      return { type: 'point_allocation', options: [], totalRespondents: 0 }
    case 'open_text':
      return { type: 'open_text', responses: [] }
    default:
      return { type: 'open_text', responses: [] }
  }
}
