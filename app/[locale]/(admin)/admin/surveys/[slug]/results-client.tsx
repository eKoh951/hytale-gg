"use client"

import { useState } from "react"
import { Hash, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { QuestionCard } from "@/components/admin/charts/question-card"
import { ChartRenderer } from "@/components/admin/charts/chart-renderer"
import type { QuestionResult } from "@/lib/admin/survey-analytics"

interface SurveyResultsClientProps {
  questions: QuestionResult[]
}

export function SurveyResultsClient({ questions }: SurveyResultsClientProps) {
  const [showPercent, setShowPercent] = useState(false)

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
      {/* Toggle */}
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
