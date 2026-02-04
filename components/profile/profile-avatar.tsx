'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/lib/utils/user'
import { AvatarUploadDialog } from './avatar-upload-dialog'
import type { Database } from '@/lib/types/database.types'

type Profile = Database['public']['Tables']['profiles']['Row']

interface ProfileAvatarProps {
  profile: Profile
  level: number
  userId: string
  isOwnProfile?: boolean
  onAvatarUpdate?: () => void
}

export function ProfileAvatar({
  profile,
  level,
  userId,
  isOwnProfile = false,
  onAvatarUpdate,
}: ProfileAvatarProps) {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url)
  const initials = getInitials(profile.display_name)

  const handleAvatarClick = () => {
    if (isOwnProfile) {
      setUploadDialogOpen(true)
    }
  }

  const handleUploadSuccess = () => {
    // Refresh avatar by updating the URL with a cache-bust parameter
    if (profile.avatar_url) {
      setAvatarUrl(`${profile.avatar_url}?t=${Date.now()}`)
    }
    onAvatarUpdate?.()
  }

  return (
    <>
      <div
        className={`relative group ${isOwnProfile ? 'cursor-pointer' : ''}`}
        onClick={handleAvatarClick}
      >
        <div className="relative">
          <Avatar className="h-32 w-32 border-4 border-border shadow-xl ring-4 ring-primary/20">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt={profile.display_name} />
            ) : null}
            <AvatarFallback className="bg-linear-to-br from-primary via-purple-600 to-secondary text-4xl font-bold text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>

          {/* Hover Overlay - Only show when editing own profile */}
          {isOwnProfile && (
            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-sm font-medium">Upload</span>
            </div>
          )}

          {/* Level Badge */}
          <div className="absolute -bottom-2 -right-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-linear-to-br from-secondary to-yellow-600 shadow-lg">
            <span className="text-sm font-bold text-secondary-foreground">{level}</span>
          </div>
        </div>
      </div>

      {/* Upload Dialog */}
      <AvatarUploadDialog
        userId={userId}
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        onUploadSuccess={handleUploadSuccess}
      />
    </>
  )
}
