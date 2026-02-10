"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import type { PointAllocationChartData } from "@/lib/admin/survey-analytics"

interface PointAllocationChartProps {
  data: PointAllocationChartData
}

const chartConfig = {
  avgPoints: {
    label: "Avg Points",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function PointAllocationChart({ data }: PointAllocationChartProps) {
  if (data.options.length === 0 || data.totalRespondents === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No responses yet.
      </p>
    )
  }

  const chartData = data.options.map((opt) => ({
    name: opt.label.split(".").pop() ?? opt.key,
    avgPoints: opt.avgPoints,
  }))

  const maxBarHeight = Math.min(data.options.length * 44, 400)

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        Respondents distributed 100 points across categories. Showing averages.
      </p>

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
            tickFormatter={(v) => `${v} pts`}
          />
          <ChartTooltip
            cursor={{ fill: "var(--accent)", opacity: 0.1 }}
            content={
              <ChartTooltipContent
                formatter={(value) => <span>{value} avg points</span>}
              />
            }
          />
          <Bar
            dataKey="avgPoints"
            fill="var(--chart-2)"
            radius={[0, 4, 4, 0]}
            barSize={28}
          />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
