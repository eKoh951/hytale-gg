'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { SurveyConfig } from '@/lib/surveys/types'

interface SurveyScreenOutProps {
  survey: SurveyConfig
}

export function SurveyScreenOut({ survey }: SurveyScreenOutProps) {
  const t = useTranslations()

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col items-center gap-6 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <XCircle className="h-20 w-20 text-muted-foreground" />
        </motion.div>

        <div className="flex flex-col gap-3">
          <h1 className="text-balance text-3xl font-bold">
            {survey.screenOut?.titleKey
              ? t(survey.screenOut.titleKey)
              : t('survey.common.screenOut.title')}
          </h1>
          <p className="text-pretty text-lg text-muted-foreground">
            {survey.screenOut?.descriptionKey
              ? t(survey.screenOut.descriptionKey)
              : t('survey.common.screenOut.description')}
          </p>
        </div>

        <Button asChild>
          <Link href="/">{t('survey.common.screenOut.returnHome')}</Link>
        </Button>
      </motion.div>
    </div>
  )
}
