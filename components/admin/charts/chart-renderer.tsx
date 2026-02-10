"use client"

import type { QuestionChartData } from "@/lib/admin/survey-analytics"
import { SelectChart } from "./select-chart"
import { CsatChart } from "./csat-chart"
import { MaxDiffChart } from "./maxdiff-chart"
import { PointAllocationChart } from "./point-allocation-chart"
import { OpenTextList } from "./open-text-list"

interface ChartRendererProps {
  data: QuestionChartData
  showPercent?: boolean
}

export function ChartRenderer({ data, showPercent = false }: ChartRendererProps) {
  switch (data.type) {
    case "single_select":
    case "multi_select":
      return <SelectChart data={data} showPercent={showPercent} />
    case "csat_scale":
      return <CsatChart data={data} showPercent={showPercent} />
    case "maxdiff":
      return <MaxDiffChart data={data} />
    case "point_allocation":
      return <PointAllocationChart data={data} />
    case "open_text":
      return <OpenTextList data={data} />
    default:
      return null
  }
}
