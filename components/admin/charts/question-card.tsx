"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface QuestionCardProps {
  title: string
  subtitle?: string
  responseCount: number
  children: React.ReactNode
}

export function QuestionCard({ title, subtitle, responseCount, children }: QuestionCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-base font-medium leading-snug">
              {title}
            </CardTitle>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <Badge variant="secondary" className="shrink-0 tabular-nums">
            {responseCount} responses
          </Badge>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
