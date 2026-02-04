import { TerrainDivider } from '@/components/ui/hytale-decorations'
import {
  ProfileHeroSkeleton,
  ActivitySkeleton,
  StatsCardSkeleton,
  AchievementsSkeleton,
} from '@/components/profile/skeletons'

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <ProfileHeroSkeleton />

      <TerrainDivider />

      {/* Main Content */}
      <div className="container mx-auto pt-16 max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            <ActivitySkeleton />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <StatsCardSkeleton />
            <AchievementsSkeleton />
          </div>
        </div>
      </div>
    </div>
  )
}
