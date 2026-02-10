"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import type { OpenTextChartData } from "@/lib/admin/survey-analytics"

interface OpenTextListProps {
  data: OpenTextChartData
}

export function OpenTextList({ data }: OpenTextListProps) {
  const [search, setSearch] = useState("")

  if (data.responses.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No responses yet.
      </p>
    )
  }

  const filtered = search.trim()
    ? data.responses.filter((r) =>
        r.toLowerCase().includes(search.toLowerCase())
      )
    : data.responses

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          placeholder="Search responses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="max-h-[800px] space-y-2 overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="py-4 text-center text-sm text-muted-foreground">
            No matching responses.
          </p>
        ) : (
          filtered.map((text, i) => (
            <Card key={i} className="px-3 py-2">
              <p className="text-sm font-bold">{text}</p>
            </Card>
          ))
        )}
      </div>

      {search && filtered.length !== data.responses.length && (
        <p className="text-xs text-muted-foreground">
          Showing {filtered.length} of {data.responses.length} responses
        </p>
      )}
    </div>
  )
}
