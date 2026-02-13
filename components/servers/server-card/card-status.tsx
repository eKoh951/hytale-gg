import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

export function CardStatus({ status }: { status: string | null }) {
  const t = useTranslations('server.status')
  const isOnline = status === 'online'

  return (
    <div className="flex items-center gap-1.5">
      <span
        className={cn(
          'size-2 rounded-full',
          isOnline ? 'bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]' : 'bg-muted-foreground/50'
        )}
      />
      <span className="text-xs text-muted-foreground">
        {isOnline ? t('online') : t('offline')}
      </span>
    </div>
  )
}
