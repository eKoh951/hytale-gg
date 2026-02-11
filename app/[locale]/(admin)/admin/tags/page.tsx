import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getPendingTagSuggestions } from '@/lib/data/tags'
import { getTags } from '@/lib/data/servers'
import { TagModerationQueue } from '@/components/admin/tag-moderation-queue'

export default async function AdminTagsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const [suggestions, existingTags] = await Promise.all([
    getPendingTagSuggestions(),
    getTags(),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tag Moderation</h1>
        <p className="text-muted-foreground">Review and manage tag suggestions.</p>
      </div>

      <TagModerationQueue
        suggestions={suggestions}
        existingTags={existingTags.map((t) => ({ id: t.id, name: t.name }))}
      />
    </div>
  )
}
