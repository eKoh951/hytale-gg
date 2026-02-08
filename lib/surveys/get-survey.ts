import type { SurveyConfig } from './types'
import { playerDiscoverySurvey } from './player-discovery'
import { serverOwnerSurvey } from './server-owner'

const SURVEYS: Record<string, SurveyConfig> = {
  'player-discovery': playerDiscoverySurvey,
  'server-owner': serverOwnerSurvey,
}

export function getSurveyConfig(slug: string): SurveyConfig | null {
  return SURVEYS[slug] ?? null
}

export function getSurveySlugs(): string[] {
  return Object.keys(SURVEYS)
}

export function getTotalQuestions(config: SurveyConfig): number {
  return config.sections.reduce((sum, section) => sum + section.questions.length, 0)
}

export function getTotalSections(config: SurveyConfig): number {
  return config.sections.length
}

export function getQuestionsForStep(
  config: SurveyConfig,
  step: number,
  isMobile: boolean
): { questions: typeof config.sections[number]['questions']; sectionKey: string } | null {
  if (isMobile) {
    let questionIndex = 0
    for (const section of config.sections) {
      for (const question of section.questions) {
        if (questionIndex === step) {
          return { questions: [question], sectionKey: section.key }
        }
        questionIndex++
      }
    }
    return null
  }

  const section = config.sections[step]
  if (!section) return null
  return { questions: section.questions, sectionKey: section.key }
}
