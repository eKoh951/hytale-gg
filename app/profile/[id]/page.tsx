import { Suspense } from 'react'
import { TerrainDivider } from '@/components/ui/hytale-decorations'
import { ProfileHero } from '@/components/profile/profile-hero'
import { RecentActivityCard } from '@/components/profile/recent-activity-card'
import { GamingStatsCard } from '@/components/profile/gaming-stats-card'
import { AchievementsCard } from '@/components/profile/achievements-card'
import {
  ProfileHeroSkeleton,
  ActivitySkeleton,
  StatsCardSkeleton,
  AchievementsSkeleton,
} from '@/components/profile/skeletons'

interface ProfilePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params

  // TODO: Get current user from auth to determine if viewing own profile
  const isOwnProfile = false

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Cached */}
      <Suspense fallback={<ProfileHeroSkeleton />}>
        <ProfileHero userId={id} isOwnProfile={isOwnProfile} />
      </Suspense>

      <TerrainDivider />

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Profile Info */}
          <div className="space-y-6 lg:col-span-2">
            {/* Recent Activity - Dynamic (Suspense) */}
            <Suspense fallback={<ActivitySkeleton />}>
              <RecentActivityCard userId={id} />
            </Suspense>
          </div>

          {/* Right Column - Stats & Achievements */}
          <div className="space-y-6">
            {/* Gaming Stats - Cached */}
            <Suspense fallback={<StatsCardSkeleton />}>
              <GamingStatsCard userId={id} />
            </Suspense>

            {/* Achievements - Cached */}
            <Suspense fallback={<AchievementsSkeleton />}>
              <AchievementsCard userId={id} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
