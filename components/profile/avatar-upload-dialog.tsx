'use client'

import { useState } from 'react'
import { Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ImageCropper } from './image-cropper'
import { uploadAvatar } from '@/app/profile/actions'

interface AvatarUploadDialogProps {
  userId: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onUploadSuccess?: () => void
}

export function AvatarUploadDialog({
  userId,
  open,
  onOpenChange,
  onUploadSuccess,
}: AvatarUploadDialogProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('File size must be less than 2MB')
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleCropComplete = async (croppedBlob: Blob) => {
    setIsUploading(true)
    setError(null)

    try {
      // Convert blob to File
      const file = new File([croppedBlob], 'avatar.jpg', {
        type: 'image/jpeg',
      })

      const result = await uploadAvatar(userId, file)

      if (result.success) {
        setSelectedImage(null)
        onOpenChange(false)
        onUploadSuccess?.()
      } else {
        setError(result.error || 'Upload failed')
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('Upload error:', err)
    } finally {
      setIsUploading(false)
    }
  }

  const handleCancel = () => {
    setSelectedImage(null)
    setError(null)
    onOpenChange(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-2xl mx-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Upload Avatar</CardTitle>
            <CardDescription>
              {selectedImage
                ? 'Crop your image to your liking'
                : 'Choose an image to upload as your profile picture'}
            </CardDescription>
          </div>
          <button
            onClick={handleCancel}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </CardHeader>
        <CardContent>
          {selectedImage ? (
            <ImageCropper
              imageSrc={selectedImage}
              onCropComplete={handleCropComplete}
              onCancel={handleCancel}
            />
          ) : (
            <div className="space-y-4">
              {/* File Input */}
              <input
                id="avatar-input"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Upload Area */}
              <label
                htmlFor="avatar-input"
                className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 p-8 cursor-pointer transition-colors hover:border-primary/50 hover:bg-primary/10"
              >
                <Upload className="h-12 w-12 text-primary/60" />
                <div className="text-center">
                  <p className="font-medium">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground">
                    PNG, JPG, GIF up to 2MB
                  </p>
                </div>
              </label>

              {/* Error Message */}
              {error && (
                <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              {/* Cancel Button */}
              <Button
                onClick={handleCancel}
                variant="outline"
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
