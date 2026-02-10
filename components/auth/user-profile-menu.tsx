'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { LogOut, Settings, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from './auth-provider'
import { getDisplayName, getInitials } from '@/lib/utils/user'
import { createClient } from '@/lib/supabase/client'
export interface UserProfileMenuLabels {
  userMenu: string;
  profile: string;
  signOut: string;
}

export function UserProfileMenu({ labels }: { labels?: UserProfileMenuLabels }) {
  const { state: { user }, actions: { signOut } } = useAuth()
  const [profileAvatarUrl, setProfileAvatarUrl] = useState<string | null>(null)
  const [profileDisplayName, setProfileDisplayName] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return

    const fetchProfileData = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('profiles')
          .select('avatar_url, display_name')
          .eq('id', user.id)
          .single()

        if (!error && data) {
          if (data.avatar_url) {
            setProfileAvatarUrl(data.avatar_url)
          }
          if (data.display_name) {
            setProfileDisplayName(data.display_name)
          }
        }
      } catch (err) {
        console.error('Error fetching profile data:', err)
      }
    }

    fetchProfileData()
  }, [user])

  if (!user) {
    return null
  }

  // Use display_name from profiles table, fallback to Google metadata, then email
  const displayName = profileDisplayName || getDisplayName(user)
  const initials = getInitials(displayName)
  // Use profile avatar from database, fallback to user metadata, then initials
  const avatarUrl = profileAvatarUrl || user.user_metadata?.avatar_url

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full focus-visible:ring-2 focus-visible:ring-offset-2"
          aria-label={labels?.userMenu ?? 'User menu'}
        >
          <Avatar className="h-8 w-8">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt={displayName} />
            ) : null}
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col gap-1">
          <div className="font-semibold text-foreground">{displayName}</div>
          <div className="text-xs text-muted-foreground">{user.email}</div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
            <User className="h-4 w-4" />
            <span>{labels?.profile ?? 'Profile'}</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onClick={signOut}
          className="flex items-center gap-2 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span>{labels?.signOut ?? 'Sign Out'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
