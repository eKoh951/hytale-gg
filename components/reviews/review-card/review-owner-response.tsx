import { useTranslations } from 'next-intl'
import { Shield } from 'lucide-react'
import type { Database } from '@/lib/types/database.types'

type OwnerResponse = Database['public']['Tables']['owner_responses']['Row']

export function ReviewOwnerResponse({ response }: { response: OwnerResponse }) {
  const t = useTranslations('reviews.card')

  return (
    <div className="ml-6 mt-2 rounded-lg border-l-2 border-primary/30 bg-muted/50 p-3 space-y-1">
      <div className="flex items-center gap-1.5 text-xs font-medium text-primary">
        <Shield className="size-3" />
        {t('ownerResponse')}
      </div>
      <p className="text-sm">{response.response_text}</p>
      {response.created_at && (
        <p className="text-xs text-muted-foreground">
          {new Date(response.created_at).toLocaleDateString()}
        </p>
      )}
    </div>
  )
}
