'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import * as m from 'motion/react-m'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { SurveyConfig } from '@/lib/surveys/types'

interface SurveyThankYouProps {
  survey: SurveyConfig
  onSaveDiscord?: (username: string) => Promise<void>
}

export function SurveyThankYou({
  survey,
  onSaveDiscord,
}: SurveyThankYouProps) {
  const t = useTranslations()
  const [discordUsername, setDiscordUsername] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    if (!discordUsername.trim() || !onSaveDiscord) return

    setSaving(true)
    try {
      await onSaveDiscord(discordUsername)
      setSaved(true)
    } catch (error) {
      console.error('[v0] Failed to save Discord username:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col items-center gap-6 text-center"
      >
        <m.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <CheckCircle2 className="h-20 w-20 text-primary" />
        </m.div>

        <div className="flex flex-col gap-3">
          <h1 className="text-balance text-3xl font-bold">
            {survey.thankYou?.titleKey
              ? t(survey.thankYou.titleKey)
              : t('survey.common.thankYou.title')}
          </h1>
          <p className="text-pretty text-lg text-muted-foreground">
            {survey.thankYou?.descriptionKey
              ? t(survey.thankYou.descriptionKey)
              : t('survey.common.thankYou.description')}
          </p>
        </div>

        {survey.thankYou?.showDiscordInput && !saved && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex w-full max-w-md flex-col gap-3"
          >
            <p className="text-sm text-muted-foreground">
              {t('survey.common.thankYou.discordPrompt')}
            </p>
            <div className="flex gap-2">
              <Input
                placeholder={t('survey.common.thankYou.discordPlaceholder')}
                value={discordUsername}
                onChange={(e) => setDiscordUsername(e.target.value)}
                disabled={saving}
              />
              <Button
                onClick={handleSave}
                disabled={!discordUsername.trim() || saving}
              >
                {saving
                  ? t('survey.common.thankYou.saving')
                  : t('survey.common.thankYou.save')}
              </Button>
            </div>
          </m.div>
        )}

        {saved && (
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-primary"
          >
            {t('survey.common.thankYou.saved')}
          </m.p>
        )}
      </m.div>
    </div>
  )
}
