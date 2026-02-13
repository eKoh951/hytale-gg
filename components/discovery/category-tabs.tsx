'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

type CategoryTabsLabels = {
  categories: Record<string, string>
}

export function CategoryTabs({
  labels,
  activeCategory,
  onCategoryChange,
}: {
  labels: CategoryTabsLabels
  activeCategory: string
  onCategoryChange: (category: string) => void
}) {
  return (
    <div className="flex gap-1 overflow-x-auto rounded-lg bg-muted p-1">
      {Object.entries(labels.categories).map(([key, label]) => (
        <button
          key={key}
          type="button"
          className={cn(
            'whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
            activeCategory === key
              ? 'bg-background shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
          onClick={() => onCategoryChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
