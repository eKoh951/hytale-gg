"use client"

import { useState } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Hash, Percent, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { QuestionCard } from "@/components/admin/charts/question-card"
import { ChartRenderer } from "@/components/admin/charts/chart-renderer"
import type { QuestionResult } from "@/lib/admin/survey-analytics"

const LOCALE_LABELS: Record<string, string> = {
  en: "English",
  es: "Español",
  pt: "Português",
  fr: "Français",
  de: "Deutsch",
}

interface SurveyResultsClientProps {
  questions: QuestionResult[]
  availableLocales: string[]
  activeLocale: string | null
}

export function SurveyResultsClient({
  questions,
  availableLocales,
  activeLocale,
}: SurveyResultsClientProps) {
  const [showPercent, setShowPercent] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleLocaleChange = (locale: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (locale) {
      params.set("lang", locale)
    } else {
      params.delete("lang")
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  // Group questions by section
  const sections: { key: string; title: string; questions: QuestionResult[] }[] = []
  for (const q of questions) {
    const existing = sections.find((s) => s.key === q.sectionKey)
    if (existing) {
      existing.questions.push(q)
    } else {
      sections.push({ key: q.sectionKey, title: q.sectionTitle, questions: [q] })
    }
  }

  return (
    <div className="space-y-6">
      {/* Toolbar: Display toggle + Locale filter */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Display:</span>
          <div className="flex rounded-md border">
            <Button
              variant={!showPercent ? "secondary" : "ghost"}
              size="sm"
              className="h-8 rounded-r-none px-3"
              onClick={() => setShowPercent(false)}
            >
              <Hash className="mr-1 size-3.5" />
              Count
            </Button>
            <Button
              variant={showPercent ? "secondary" : "ghost"}
              size="sm"
              className="h-8 rounded-l-none px-3"
              onClick={() => setShowPercent(true)}
            >
              <Percent className="mr-1 size-3.5" />
              Percent
            </Button>
          </div>
        </div>

        {availableLocales.length > 0 && (
          <div className="flex items-center gap-2">
            <Globe className="size-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Language:</span>
            <div className="flex rounded-md border">
              <Button
                variant={!activeLocale ? "secondary" : "ghost"}
                size="sm"
                className="h-8 px-3"
                onClick={() => handleLocaleChange(null)}
              >
                All
              </Button>
              {availableLocales.map((loc) => (
                <Button
                  key={loc}
                  variant={activeLocale === loc ? "secondary" : "ghost"}
                  size="sm"
                  className="h-8 px-3"
                  onClick={() => handleLocaleChange(loc)}
                >
                  {LOCALE_LABELS[loc] ?? loc.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sections + Questions */}
      {sections.map((section, sectionIdx) => (
        <div key={section.key} className="space-y-4">
          {sectionIdx > 0 && <Separator />}

          <h2 className="text-lg font-semibold tracking-tight">
            {section.title}
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {section.questions.map((q) => {
              const responseCount =
                q.chartData.type === "open_text"
                  ? q.chartData.responses.length
                  : "totalRespondents" in q.chartData
                    ? q.chartData.totalRespondents
                    : 0

              return (
                <QuestionCard
                  key={q.questionKey}
                  title={q.title}
                  subtitle={q.subtitle}
                  responseCount={responseCount}
                >
                  <ChartRenderer data={q.chartData} showPercent={showPercent} />
                </QuestionCard>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
