import { Suspense } from 'react'
import { TerrainDivider } from '@/components/ui/hytale-decorations'
import { ProfileHero } from '@/components/profile/profile-hero'
import { RecentActivityCard } from '@/components/profile/recent-activity-card'
import { GamingStatsCard } from '@/components/profile/gaming-stats-card'
import { AchievementsCard } from '@/components/profile/achievements-card'
import { ProfileInformationCard } from '@/components/profile/profile-information-card'
import { getProfile, getUserIdByUsername } from '@/lib/data/profile'
import { createClient } from '@/lib/supabase/server'
import {
  ProfileHeroSkeleton,
  ActivitySkeleton,
  StatsCardSkeleton,
  AchievementsSkeleton,
} from '@/components/profile/skeletons'

interface ProfilePageProps {
  params: Promise<{
    username: string
  }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params
  
  // Look up user ID by username
  const userId = await getUserIdByUsername(username)
  
  // Get profile data for ProfileInformationCard
  const profile = await getProfile(userId)

  // Get current user from auth to determine if viewing own profile
  const supabase = await createClient()
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser()

  const isOwnProfile = currentUser?.id === userId

  return (
    <div className="min-h-screen pt-16 bg-background">
      {/* Hero Section - Cached */}
      <Suspense fallback={<ProfileHeroSkeleton />}>
        <ProfileHero userId={userId} isOwnProfile={isOwnProfile} />
      </Suspense>

      <TerrainDivider />

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Profile Info */}
          <div className="space-y-6 lg:col-span-2">
            {/* Profile Information Card */}
            {isOwnProfile && (
              <ProfileInformationCard userId={userId} profile={profile} />
            )}

            {/* Recent Activity - Dynamic (Suspense) */}
            <Suspense fallback={<ActivitySkeleton />}>
              <RecentActivityCard userId={userId} />
            </Suspense>
          </div>

          {/* Right Column - Stats & Achievements */}
          <div className="space-y-6">
            {/* Gaming Stats - Cached */}
            <Suspense fallback={<StatsCardSkeleton />}>
              <GamingStatsCard userId={userId} />
            </Suspense>

            {/* Achievements - Cached */}
            <Suspense fallback={<AchievementsSkeleton />}>
              <AchievementsCard userId={userId} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
