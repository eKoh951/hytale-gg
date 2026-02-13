'use client'

import { useActionState } from 'react'
import { createServer, type ServerActionState } from '@/app/actions/server-actions'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type SubmitFormLabels = {
  nameLabel: string
  namePlaceholder: string
  slugLabel: string
  slugPlaceholder: string
  slugHint: string
  descriptionLabel: string
  descriptionPlaceholder: string
  ipLabel: string
  ipPlaceholder: string
  portLabel: string
  categoryLabel: string
  categoryPlaceholder: string
  regionLabel: string
  regionPlaceholder: string
  languageLabel: string
  discordLabel: string
  discordPlaceholder: string
  websiteLabel: string
  websitePlaceholder: string
  hostingLabel: string
  hostingPlaceholder: string
  submitButton: string
  submitting: string
  categories: Record<string, string>
  regions: Record<string, string>
}

const initialState: ServerActionState = { success: false }

export function SubmitServerForm({ labels }: { labels: SubmitFormLabels }) {
  const [state, formAction, isPending] = useActionState(createServer, initialState)

  return (
    <form action={formAction} className="space-y-6 max-w-2xl">
      {state.message && !state.success && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {state.message}
        </div>
      )}

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">{labels.nameLabel}</Label>
        <Input id="name" name="name" placeholder={labels.namePlaceholder} required />
        <FieldError errors={state.errors?.name} />
      </div>

      {/* Slug */}
      <div className="space-y-2">
        <Label htmlFor="slug">{labels.slugLabel}</Label>
        <Input id="slug" name="slug" placeholder={labels.slugPlaceholder} required />
        <p className="text-xs text-muted-foreground">{labels.slugHint}</p>
        <FieldError errors={state.errors?.slug} />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">{labels.descriptionLabel}</Label>
        <Textarea
          id="description"
          name="description"
          placeholder={labels.descriptionPlaceholder}
          rows={4}
          required
        />
        <FieldError errors={state.errors?.description} />
      </div>

      {/* IP + Port */}
      <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
        <div className="space-y-2">
          <Label htmlFor="ip_address">{labels.ipLabel}</Label>
          <Input id="ip_address" name="ip_address" placeholder={labels.ipPlaceholder} required />
          <FieldError errors={state.errors?.ip_address} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="port">{labels.portLabel}</Label>
          <Input id="port" name="port" type="number" defaultValue={24454} />
          <FieldError errors={state.errors?.port} />
        </div>
      </div>

      {/* Category + Region */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>{labels.categoryLabel}</Label>
          <Select name="category" required>
            <SelectTrigger>
              <SelectValue placeholder={labels.categoryPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(labels.categories).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError errors={state.errors?.category} />
        </div>
        <div className="space-y-2">
          <Label>{labels.regionLabel}</Label>
          <Select name="region" required>
            <SelectTrigger>
              <SelectValue placeholder={labels.regionPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(labels.regions).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError errors={state.errors?.region} />
        </div>
      </div>

      {/* Language */}
      <div className="space-y-2">
        <Label htmlFor="language">{labels.languageLabel}</Label>
        <Input id="language" name="language" defaultValue="English" />
      </div>

      {/* Discord + Website */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="discord_url">{labels.discordLabel}</Label>
          <Input id="discord_url" name="discord_url" placeholder={labels.discordPlaceholder} />
          <FieldError errors={state.errors?.discord_url} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website_url">{labels.websiteLabel}</Label>
          <Input id="website_url" name="website_url" placeholder={labels.websitePlaceholder} />
          <FieldError errors={state.errors?.website_url} />
        </div>
      </div>

      {/* Hosting Provider */}
      <div className="space-y-2">
        <Label htmlFor="hosting_provider">{labels.hostingLabel}</Label>
        <Input id="hosting_provider" name="hosting_provider" placeholder={labels.hostingPlaceholder} />
      </div>

      <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? labels.submitting : labels.submitButton}
      </Button>
    </form>
  )
}

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null
  return (
    <div className="text-xs text-destructive">
      {errors.map((e, i) => (
        <p key={i}>{e}</p>
      ))}
    </div>
  )
}
