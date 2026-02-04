import { Gamepad2, Clock, Trophy } from 'lucide-react'
import type { Database } from '@/lib/types/database.types'

type Profile = Database['public']['Tables']['profiles']['Row']
type UserStats = Database['public']['Tables']['user_stats']['Row']

interface ProfileInfoProps {
  profile: Profile
  stats: UserStats
}

export function ProfileInfo({ profile, stats }: ProfileInfoProps) {
  return (
    <div className="flex-1 text-center sm:text-left">
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
        {profile.display_name}
      </h1>
      {profile.bio && (
        <p className="mt-1 text-muted-foreground">{profile.bio}</p>
      )}

      {/* Quick Stats */}
      <div className="mt-4 flex flex-wrap justify-center gap-6 sm:justify-start">
        <div className="flex items-center gap-2">
          <Gamepad2 className="h-5 w-5 text-primary" />
          <span className="text-sm">
            <strong className="font-semibold text-foreground">
              {stats.servers_joined || 0}
            </strong>{' '}
            Servers
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <span className="text-sm">
            <strong className="font-semibold text-foreground">
              {stats.hours_played || 0}
            </strong>{' '}
            Hours
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-secondary" />
          <span className="text-sm">
            <strong className="font-semibold text-foreground">
              {stats.achievements_unlocked || 0}
            </strong>{' '}
            Achievements
          </span>
        </div>
      </div>
    </div>
  )
}
