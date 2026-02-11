import { Badge } from '@/components/ui/badge'
import type { ServerTagWithCount } from '@/lib/data/tags'

export function VibeTagBadge({ tag }: { tag: ServerTagWithCount }) {
  return (
    <Badge variant="secondary" className="gap-1 text-xs">
      {tag.tag_name}
      {tag.count > 1 && (
        <span className="text-[10px] text-muted-foreground">×{tag.count}</span>
      )}
    </Badge>
  )
}
