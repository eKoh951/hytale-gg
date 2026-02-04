import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/lib/utils/user'
import type { Database } from '@/lib/types/database.types'

type Profile = Database['public']['Tables']['profiles']['Row']

interface ProfileAvatarProps {
  profile: Profile
  level: number
}

export function ProfileAvatar({ profile, level }: ProfileAvatarProps) {
  const initials = getInitials(profile.display_name)

  return (
    <div className="relative group">
      <div className="relative">
        <Avatar className="h-32 w-32 border-4 border-border shadow-xl ring-4 ring-primary/20">
          {profile.avatar_url ? (
            <AvatarImage src={profile.avatar_url} alt={profile.display_name} />
          ) : null}
          <AvatarFallback className="bg-gradient-to-br from-primary via-purple-600 to-secondary text-4xl font-bold text-primary-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>

        {/* Level Badge */}
        <div className="absolute -bottom-2 -right-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-gradient-to-br from-secondary to-yellow-600 shadow-lg">
          <span className="text-sm font-bold text-secondary-foreground">{level}</span>
        </div>
      </div>
    </div>
  )
}
