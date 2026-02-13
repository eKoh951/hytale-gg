import { Badge } from '@/components/ui/badge'
import type { ServerWithTags } from '@/lib/data/servers'

export function CardVibeTags({ serverTags }: { serverTags: ServerWithTags['server_tags'] }) {
  const vibes = serverTags
    .filter((st) => st.tags?.type === 'vibe')
    .slice(0, 3)

  if (vibes.length === 0) return null

  return (
    <div className="flex flex-wrap gap-1">
      {vibes.map((st) => (
        <Badge
          key={st.tag_id}
          variant="secondary"
          className="text-[10px] px-1.5 py-0"
        >
          {st.tags?.name}
        </Badge>
      ))}
    </div>
  )
}
