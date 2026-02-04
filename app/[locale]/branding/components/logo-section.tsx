import { Card } from "@/components/ui/card";
import { LogoShowcase } from "./logo-showcase";
import { useTranslations } from 'next-intl';

const logoVariants = [
  {
    nameKey: "hytaleGG",
    src: "/hytale-gg.png",
    altKey: "hytaleGG.alt",
    width: 240,
    height: 48,
    className: "h-12 w-auto",
    useCaseKey: "hytaleGG.useCase",
    filePath: "public/hytale-gg.png",
  },
  {
    nameKey: "hGG",
    src: "/h-gg.png",
    altKey: "hGG.alt",
    width: 80,
    height: 32,
    className: "h-8 w-auto",
    useCaseKey: "hGG.useCase",
    filePath: "public/h-gg.png",
  },
];

export function LogoSection() {
  const t = useTranslations('branding.logo');
  
  const logoVariantsWithTranslations = logoVariants.map(variant => ({
    ...variant,
    name: t(`variants.${variant.nameKey}.name`),
    alt: t(`variants.${variant.altKey}`),
    useCase: t(`variants.${variant.useCaseKey}`),
  }));
  
  return (
    <section className="mb-20">
      <h2 className="mb-6 font-serif text-3xl font-bold text-foreground">{t('title')}</h2>
      <LogoShowcase variants={logoVariantsWithTranslations} />

      {/* Logo Usage Guidelines */}
      <Card className="mt-6 border-2 border-border bg-card p-6">
        <h3 className="mb-4 font-serif text-xl font-bold text-foreground">{t('guidelines.title')}</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="mb-2 font-semibold text-foreground">{t('guidelines.dos.title')}</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>✓ {t('guidelines.dos.darkBackground')}</li>
              <li>✓ {t('guidelines.dos.aspectRatio')}</li>
              <li>✓ {t('guidelines.dos.clearSpace')}</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-semibold text-foreground">{t('guidelines.donts.title')}</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>✗ {t('guidelines.donts.rotate')}</li>
              <li>✗ {t('guidelines.donts.colors')}</li>
              <li>✗ {t('guidelines.donts.effects')}</li>
            </ul>
          </div>
        </div>
      </Card>
    </section>
  );
}
