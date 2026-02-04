'use client'

import { useState } from 'react'
import Cropper from 'react-easy-crop'
import { Button } from '@/components/ui/button'

interface ImageCropperProps {
  imageSrc: string
  onCropComplete: (croppedImage: Blob) => void
  onCancel: () => void
}

export function ImageCropper({
  imageSrc,
  onCropComplete,
  onCancel,
}: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCropAreaChange = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const handleCropImage = async () => {
    if (!croppedAreaPixels) return

    setIsProcessing(true)

    try {
      const image = new Image()
      image.src = imageSrc

      image.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) return

        // Set canvas size to cropped area
        canvas.width = croppedAreaPixels.width
        canvas.height = croppedAreaPixels.height

        // Draw cropped image
        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        )

        // Convert to blob and return
        canvas.toBlob((blob) => {
          if (blob) {
            onCropComplete(blob)
          }
          setIsProcessing(false)
        }, 'image/jpeg', 0.9)
      }
    } catch (error) {
      console.error('Error cropping image:', error)
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Cropper */}
      <div className="relative h-96 w-full bg-black">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          showGrid={false}
          onCropChange={setCrop}
          onCropAreaChange={handleCropAreaChange}
          onZoomChange={setZoom}
        />
      </div>

      {/* Zoom Slider */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Zoom</label>
        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          onClick={handleCropImage}
          disabled={isProcessing}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isProcessing ? 'Processing...' : 'Upload'}
        </Button>
        <Button
          onClick={onCancel}
          variant="outline"
          disabled={isProcessing}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}
