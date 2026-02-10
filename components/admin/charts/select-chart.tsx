"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { Badge } from "@/components/ui/badge"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import type { SelectChartData } from "@/lib/admin/survey-analytics"

interface SelectChartProps {
  data: SelectChartData
  showPercent?: boolean
}

const chartConfig = {
  count: {
    label: "Responses",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function SelectChart({ data, showPercent = false }: SelectChartProps) {
  if (data.options.length === 0 || data.totalRespondents === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No responses yet.
      </p>
    )
  }

  const chartData = data.options.map((opt) => ({
    name: opt.label.split(".").pop() ?? opt.key,
    value: showPercent
      ? Math.round((opt.count / data.totalRespondents) * 100)
      : opt.count,
    raw: opt.count,
    pct: Math.round((opt.count / data.totalRespondents) * 100),
  }))

  const maxBarHeight = Math.min(data.options.length * 44, 500)

  return (
    <div className="space-y-3">
      {data.type === "multi_select" && (
        <p className="text-xs text-muted-foreground">
          Respondents could select multiple options.
          {showPercent && " Percentages may exceed 100%."}
        </p>
      )}

      <ChartContainer config={chartConfig} className="w-full" style={{ height: maxBarHeight }}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ left: 0, right: 40, top: 0, bottom: 0 }}
        >
          <CartesianGrid horizontal={false} strokeDasharray="3 3" />
          <YAxis
            dataKey="name"
            type="category"
            width={160}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
          />
          <XAxis
            type="number"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11 }}
            tickFormatter={(v) => (showPercent ? `${v}%` : String(v))}
          />
          <ChartTooltip
            cursor={{ fill: "var(--accent)", opacity: 0.1 }}
            content={
              <ChartTooltipContent
                formatter={(value, name, item) => (
                  <span>
                    {item.payload.raw} responses ({item.payload.pct}%)
                  </span>
                )}
              />
            }
          />
          <Bar
            dataKey="value"
            fill="var(--chart-1)"
            radius={[0, 4, 4, 0]}
            barSize={28}
          />
        </BarChart>
      </ChartContainer>

      {data.otherTexts.length > 0 && (
        <div className="space-y-2 border-t pt-3">
          <p className="text-xs font-medium text-muted-foreground">
            &quot;Other&quot; responses ({data.otherTexts.length})
          </p>
          <div className="flex flex-wrap gap-1.5">
            {data.otherTexts.map((text, i) => (
              <Badge key={i} variant="outline" className="text-xs font-normal">
                {text}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
