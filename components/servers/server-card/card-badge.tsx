import { Badge } from '@/components/ui/badge'
import { useTranslations } from 'next-intl'
import { Sparkles, Gem, Clock } from 'lucide-react'

type BadgeType = 'featured' | 'hidden_gem' | 'new' | 'verified'

const badgeConfig: Record<BadgeType, { icon: typeof Sparkles; className: string; key: string }> = {
  featured: {
    icon: Sparkles,
    className: 'bg-yellow-500/15 text-yellow-600 border-yellow-500/30 dark:text-yellow-400',
    key: 'featured',
  },
  hidden_gem: {
    icon: Gem,
    className: 'bg-purple-500/15 text-purple-600 border-purple-500/30 dark:text-purple-400',
    key: 'hiddenGem',
  },
  new: {
    icon: Clock,
    className: 'bg-blue-500/15 text-blue-600 border-blue-500/30 dark:text-blue-400',
    key: 'new',
  },
  verified: {
    icon: Sparkles,
    className: 'bg-green-500/15 text-green-600 border-green-500/30 dark:text-green-400',
    key: 'verified',
  },
}

export function CardBadge({ type }: { type: BadgeType }) {
  const t = useTranslations('server')
  const config = badgeConfig[type]
  const Icon = config.icon

  return (
    <Badge variant="outline" className={config.className}>
      <Icon className="mr-1 size-3" />
      {t(config.key)}
    </Badge>
  )
}
