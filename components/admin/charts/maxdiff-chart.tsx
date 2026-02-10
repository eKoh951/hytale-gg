"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Cell, ReferenceLine } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import type { MaxDiffChartData } from "@/lib/admin/survey-analytics"

interface MaxDiffChartProps {
  data: MaxDiffChartData
}

const chartConfig = {
  netScore: {
    label: "Net Score",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function MaxDiffChart({ data }: MaxDiffChartProps) {
  if (data.options.length === 0 || data.totalRespondents === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No responses yet.
      </p>
    )
  }

  const chartData = data.options.map((opt) => ({
    name: opt.label,
    netScore: opt.netScore,
    mostCount: opt.mostCount,
    leastCount: opt.leastCount,
  }))

  const maxBarHeight = Math.min(data.options.length * 36, 1200)

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="inline-block size-2.5 rounded-sm bg-chart-5" />
          Least Important
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block size-2.5 rounded-sm bg-chart-1" />
          Most Important
        </span>
      </div>

      <ChartContainer config={chartConfig} className="w-full" style={{ height: maxBarHeight }}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ left: 0, right: 60, top: 0, bottom: 0 }}
        >
          <CartesianGrid horizontal={false} strokeDasharray="3 3" />
          <YAxis
            dataKey="name"
            type="category"
            width={250}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fontWeight: 900 }}
          />
          <XAxis
            type="number"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 10 }}
            tickFormatter={(v) => `${v > 0 ? "+" : ""}${v}%`}
          />
          <ReferenceLine x={0} stroke="var(--border)" strokeWidth={1} />
          <ChartTooltip
            cursor={{ fill: "var(--accent)", opacity: 0.1 }}
            content={
              <ChartTooltipContent
                formatter={(value, name, item) => (
                  <span>
                    Most: {item.payload.mostCount} · Least: {item.payload.leastCount} · Net: {item.payload.netScore > 0 ? "+" : ""}{item.payload.netScore}%
                  </span>
                )}
              />
            }
          />
          <Bar dataKey="netScore" radius={[0, 4, 4, 0]} barSize={20}>
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.netScore >= 0 ? "var(--chart-1)" : "var(--chart-5)"}
              />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  )
}
