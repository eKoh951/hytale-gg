import { Button } from '@/components/ui/button'
import { ProfileAvatar } from './profile-avatar'
import { ProfileInfo } from './profile-info'
import { getProfile, getUserStats } from '@/lib/data/profile'

interface ProfileHeroProps {
  userId: string
  isOwnProfile: boolean
  onEditClick?: () => void
}

export async function ProfileHero({
  userId,
  isOwnProfile,
  onEditClick,
}: ProfileHeroProps) {
  const profile = await getProfile(userId)
  const stats = await getUserStats(userId)

  return (
    <div className="relative h-64 overflow-hidden border-b-2 border-border bg-linear-to-b from-primary/20 to-background">
      {/* Subtle terrain texture background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%237CBD3E' fill-opacity='1'%3E%3Crect x='0' y='0' width='30' height='30'/%3E%3Crect x='30' y='30' width='30' height='30'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Avatar Section */}
      <div className="container relative mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end">
          {/* Avatar with Level Badge */}
          <ProfileAvatar profile={profile} level={profile.level || 1} />

          {/* User Info */}
          <ProfileInfo profile={profile} stats={stats} />

          {/* Edit Button */}
          {isOwnProfile && (
            <Button
              onClick={onEditClick}
              variant="outline"
              className="hover:bg-secondary hover:text-secondary-foreground"
            >
              Edit Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
