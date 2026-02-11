'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

type FilterLabels = {
  search: string
  category: string
  region: string
  sort: string
  status: string
  clearFilters: string
  categories: Record<string, string>
  regions: Record<string, string>
  sortOptions: Record<string, string>
  statusOptions: Record<string, string>
}

export function ServerFilters({ labels }: { labels: FilterLabels }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (!value || value === 'all') {
        params.delete(key)
      } else {
        params.set(key, value)
      }
      params.delete('page')
      router.push(`?${params.toString()}`, { scroll: false })
    },
    [router, searchParams]
  )

  const clearAll = useCallback(() => {
    router.push('?', { scroll: false })
  }, [router])

  const hasFilters =
    searchParams.has('category') ||
    searchParams.has('region') ||
    searchParams.has('status') ||
    searchParams.has('search') ||
    searchParams.has('sort')

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={labels.search}
          defaultValue={searchParams.get('search') ?? ''}
          className="pl-9"
          onChange={(e) => {
            const timeout = setTimeout(() => updateParam('search', e.target.value), 300)
            return () => clearTimeout(timeout)
          }}
        />
      </div>

      {/* Category */}
      <Select
        defaultValue={searchParams.get('category') ?? 'all'}
        onValueChange={(v) => updateParam('category', v)}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder={labels.category} />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(labels.categories).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Region */}
      <Select
        defaultValue={searchParams.get('region') ?? 'all'}
        onValueChange={(v) => updateParam('region', v)}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder={labels.region} />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(labels.regions).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Status */}
      <Select
        defaultValue={searchParams.get('status') ?? 'all'}
        onValueChange={(v) => updateParam('status', v)}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder={labels.status} />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(labels.statusOptions).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Sort */}
      <Select
        defaultValue={searchParams.get('sort') ?? 'quality'}
        onValueChange={(v) => updateParam('sort', v)}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder={labels.sort} />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(labels.sortOptions).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Clear */}
      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clearAll} className="gap-1">
          <X className="size-3" />
          {labels.clearFilters}
        </Button>
      )}
    </div>
  )
}
