"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Cell } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import type { CsatChartData } from "@/lib/admin/survey-analytics"

interface CsatChartProps {
  data: CsatChartData
  showPercent?: boolean
}

const CSAT_COLORS = [
  "var(--chart-5)", // 1 - red-ish
  "var(--chart-4)", // 2 - orange-ish
  "var(--chart-3)", // 3 - yellow-ish
  "var(--chart-2)", // 4 - green-ish
  "var(--chart-1)", // 5 - strong green
]

const CSAT_LABELS = ["1 ★", "2 ★", "3 ★", "4 ★", "5 ★"]

const chartConfig = {
  count: {
    label: "Responses",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function CsatChart({ data, showPercent = false }: CsatChartProps) {
  if (data.totalRespondents === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No responses yet.
      </p>
    )
  }

  const chartData = data.distribution.map((d) => ({
    name: CSAT_LABELS[d.value - 1],
    value: showPercent
      ? Math.round((d.count / data.totalRespondents) * 100)
      : d.count,
    raw: d.count,
    pct: Math.round((d.count / data.totalRespondents) * 100),
  }))

  return (
    <div className="space-y-4">
      {/* Large average display */}
      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-bold tabular-nums">{data.mean}</span>
        <span className="text-lg text-muted-foreground">/ 5</span>
        <span className="ml-auto text-sm text-muted-foreground">
          Median: {data.median}
        </span>
      </div>

      {/* Distribution bar chart */}
      <ChartContainer config={chartConfig} className="h-[140px] w-full">
        <BarChart
          data={chartData}
          margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis
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
          <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={48}>
            {chartData.map((_, index) => (
              <Cell key={index} fill={CSAT_COLORS[index]} />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  )
}
