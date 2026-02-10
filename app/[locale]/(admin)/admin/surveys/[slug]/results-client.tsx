"use client"

import { useState } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Hash, Percent, Globe, MapPin } from "lucide-react"
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

const COUNTRY_LABELS: Record<string, string> = {
  US: "United States",
  CA: "Canada",
  MX: "Mexico",
  BR: "Brazil",
  AR: "Argentina",
  CO: "Colombia",
  CL: "Chile",
  GB: "United Kingdom",
  DE: "Germany",
  FR: "France",
  ES: "Spain",
  PT: "Portugal",
  NL: "Netherlands",
  PL: "Poland",
  SE: "Sweden",
  IT: "Italy",
  AU: "Australia",
  JP: "Japan",
  KR: "South Korea",
  PH: "Philippines",
  IN: "India",
  RU: "Russia",
  TR: "Turkey",
}

interface SurveyResultsClientProps {
  questions: QuestionResult[]
  availableLocales: string[]
  activeLocale: string | null
  availableCountries: string[]
  activeCountry: string | null
}

export function SurveyResultsClient({
  questions,
  availableLocales,
  activeLocale,
  availableCountries,
  activeCountry,
}: SurveyResultsClientProps) {
  const [showPercent, setShowPercent] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleFilterChange = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
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
                onClick={() => handleFilterChange("lang", null)}
              >
                All
              </Button>
              {availableLocales.map((loc) => (
                <Button
                  key={loc}
                  variant={activeLocale === loc ? "secondary" : "ghost"}
                  size="sm"
                  className="h-8 px-3"
                  onClick={() => handleFilterChange("lang", loc)}
                >
                  {LOCALE_LABELS[loc] ?? loc.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
        )}

        {availableCountries.length > 0 && (
          <div className="flex items-center gap-2">
            <MapPin className="size-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Country:</span>
            <div className="flex flex-wrap rounded-md border">
              <Button
                variant={!activeCountry ? "secondary" : "ghost"}
                size="sm"
                className="h-8 px-3"
                onClick={() => handleFilterChange("country", null)}
              >
                All
              </Button>
              {availableCountries.map((code) => (
                <Button
                  key={code}
                  variant={activeCountry === code ? "secondary" : "ghost"}
                  size="sm"
                  className="h-8 px-3"
                  onClick={() => handleFilterChange("country", code)}
                >
                  {COUNTRY_LABELS[code] ?? code}
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
