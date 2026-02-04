'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import { MapPin, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { updateProfile } from '@/app/profile/actions'
import type { Database } from '@/lib/types/database.types'

type Profile = Database['public']['Tables']['profiles']['Row']

interface ProfileInformationCardProps {
  userId: string
  profile: Profile
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
  })

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const data = {
        display_name: formData.get('display_name') as string,
        bio: formData.get('bio') as string,
        location: formData.get('location') as string,
        discord_id: formData.get('discord_id') as string,
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
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          {isEditing ? 'Update your personal details' : 'Your personal details'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form action={formAction} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
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

          {/* Action buttons */}
          <div className="flex gap-2">
            {!isEditing ? (
              <Button
                type="button"
                onClick={() => setIsEditing(true)}
                variant="outline"
              >
                Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
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
                    })
                  }}
                  disabled={isPending}
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
