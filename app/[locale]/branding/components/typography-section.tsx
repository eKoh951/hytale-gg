import { Card } from "@/components/ui/card";
import { useTranslations } from 'next-intl';

export function TypographySection() {
  const t = useTranslations('branding.typography');
  
  return (
    <section className="mb-20">
      <h2 className="mb-6 font-serif text-3xl font-bold text-foreground">{t('title')}</h2>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Logo Fonts */}
        <Card className="border-2 border-border bg-card p-6">
          <h3 className="mb-4 font-serif text-xl font-bold text-foreground">{t('logoFonts.title')}</h3>
          <div className="space-y-6">
            <div>
              <div className="mb-2 text-sm text-muted-foreground">
                {t('logoFonts.hytaleFont')}
              </div>
              <div className="rounded-lg bg-background p-4">
                <div
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: '"Press Start 2P", monospace',
                    color: 'var(--primary)',
                    textShadow: '2px 2px 0 var(--border)',
                  }}
                >
                  hytale
                </div>
              </div>
            </div>
            <div>
              <div className="mb-2 text-sm text-muted-foreground">
                {t('logoFonts.ggFont')}
              </div>
              <div className="rounded-lg bg-background p-4">
                <div
                  className="font-bold"
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '2rem',
                    color: 'var(--secondary)',
                    textShadow: '2px 2px 0 var(--border)',
                    letterSpacing: '0.1em',
                  }}
                >
                  GG
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Website Fonts */}
        <Card className="border-2 border-border bg-card p-6">
          <h3 className="mb-4 font-serif text-xl font-bold text-foreground">{t('websiteFonts.title')}</h3>
          <div className="space-y-4">
            <div>
              <div className="mb-2 text-sm text-muted-foreground">{t('websiteFonts.bodyFont')}</div>
              <div className="font-sans text-lg text-foreground">
                {t('sampleText.body')}
              </div>
            </div>
            <div>
              <div className="mb-2 text-sm text-muted-foreground">{t('websiteFonts.headingFont')}</div>
              <div className="font-serif text-2xl font-bold text-foreground">
                {t('sampleText.heading')}
              </div>
            </div>
            <div>
              <div className="mb-2 text-sm text-muted-foreground">{t('websiteFonts.codeFont')}</div>
              <div className="font-mono text-sm text-foreground">{t('sampleText.code')}</div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
