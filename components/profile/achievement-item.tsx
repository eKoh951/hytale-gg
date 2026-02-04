'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import * as Icons from 'lucide-react'
import type { Database } from '@/lib/types/database.types'

type Achievement = Database['public']['Tables']['achievements']['Row']

interface AchievementItemProps {
  achievement: Achievement
}

export function AchievementItem({ achievement }: AchievementItemProps) {
  // Map icon names to actual icon components
  const getIcon = (iconName: string) => {
    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
      Trophy: Icons.Trophy,
      Shield: Icons.Shield,
      Zap: Icons.Zap,
      Star: Icons.Star,
    }
    return iconMap[iconName] || Icons.Award
  }

  const Icon = getIcon(achievement.icon)

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 text-center"
    >
      <div
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-primary/20 to-secondary/20'
        )}
      >
        <Icon className={cn('h-6 w-6', achievement.color)} />
      </div>
      <span className="text-xs font-medium">{achievement.name}</span>
    </motion.div>
  )
}
