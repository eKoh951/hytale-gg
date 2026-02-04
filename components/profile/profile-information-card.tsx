'use client'

import { useState, useEffect } from 'react'
import { useActionState } from 'react'
import { MapPin, MessageSquare, Check, X, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { updateProfile, checkUsernameAvailability, updateUsername } from '@/app/profile/actions'
import type { Database } from '@/lib/types/database.types'

type Profile = Database['public']['Tables']['profiles']['Row']

interface ProfileInformationCardProps {
  userId: string
  profile: Profile
}

interface UsernameValidation {
  available: boolean | null
  error: string | null
  checking: boolean
}

export function ProfileInformationCard({
  userId,
  profile,
}: ProfileInformationCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    display_name: profile.display_name,
    bio: profile.bio || '',
    location: profile.location || '',
    discord_id: profile.discord_id || '',
    username: profile.username || '',
  })

  const [usernameValidation, setUsernameValidation] = useState<UsernameValidation>({
    available: null,
    error: null,
    checking: false,
  })

  // Debounced username availability check
  useEffect(() => {
    if (!isEditing || !formData.username || formData.username === profile.username) {
      setUsernameValidation({ available: null, error: null, checking: false })
      return
    }

    const timer = setTimeout(async () => {
      setUsernameValidation((prev) => ({ ...prev, checking: true }))
      const result = await checkUsernameAvailability(formData.username, userId)
      setUsernameValidation({
        available: result.available,
        error: result.error || null,
        checking: false,
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [formData.username, isEditing, profile.username, userId])

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formDataObj: FormData) => {
      const newUsername = formDataObj.get('username') as string
      const usernameChanged = newUsername !== profile.username

      // Update username if changed
      if (usernameChanged && newUsername) {
        const usernameResult = await updateUsername(userId, newUsername)
        if (!usernameResult.success) {
          return usernameResult
        }
      }

      // Update other profile fields
      const data = {
        display_name: formDataObj.get('display_name') as string,
        bio: formDataObj.get('bio') as string,
        location: formDataObj.get('location') as string,
        discord_id: formDataObj.get('discord_id') as string,
      }
      const result = await updateProfile(userId, data)
      if (result.success) {
        setIsEditing(false)
      }
      return result
    },
    null
  )

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <Card className="border-2 border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            {isEditing ? 'Update your personal details' : 'Your personal details'}
          </CardDescription>
        </div>
        {!isEditing && (
          <Button
            type="button"
            onClick={() => setIsEditing(true)}
            variant="outline"
            size="sm"
            className="border-primary text-primary hover:bg-primary/10"
          >
            <Pencil className="h-4 w-4 mr-1" />
            Edit
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <form action={formAction} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={!isEditing || isPending}
                  className="disabled:opacity-100 pr-10"
                />
                {isEditing && formData.username !== profile.username && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {usernameValidation.checking && (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    )}
                    {!usernameValidation.checking && usernameValidation.available && (
                      <Check className="h-5 w-5 text-green-500" />
                    )}
                    {!usernameValidation.checking && !usernameValidation.available && (
                      <X className="h-5 w-5 text-destructive" />
                    )}
                  </div>
                )}
              </div>
              {isEditing && formData.username !== profile.username && usernameValidation.error && (
                <p className="text-xs text-destructive">{usernameValidation.error}</p>
              )}
              {!isEditing && (
                <p className="text-xs text-muted-foreground">Username can be changed in edit mode</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="display_name">Display Name</Label>
              <Input
                id="display_name"
                name="display_name"
                value={formData.display_name}
                onChange={handleInputChange}
                disabled={!isEditing || isPending}
                className="disabled:opacity-100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              disabled={!isEditing || isPending}
              className="disabled:opacity-100"
              rows={3}
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                disabled={!isEditing || isPending}
                className="disabled:opacity-100"
                placeholder="Where are you from?"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="discord_id" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Discord ID
              </Label>
              <Input
                id="discord_id"
                name="discord_id"
                value={formData.discord_id}
                onChange={handleInputChange}
                disabled={!isEditing || isPending}
                className="disabled:opacity-100"
                placeholder="username#0000"
              />
            </div>
          </div>

          {/* Error message */}
          {state && !state.success && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {state.error}
            </div>
          )}

          {/* Success message */}
          {state && state.success && (
            <div className="rounded-lg bg-green-500/10 p-3 text-sm text-green-600">
              {state.message}
            </div>
          )}

          {/* Action buttons - only show when editing */}
          {isEditing && (
            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={isPending}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isPending ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(false)
                  setFormData({
                    display_name: profile.display_name,
                    bio: profile.bio || '',
                    location: profile.location || '',
                    discord_id: profile.discord_id || '',
                    username: profile.username || '',
                  })
                  setUsernameValidation({ available: null, error: null, checking: false })
                }}
                disabled={isPending}
              >
                Cancel
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
