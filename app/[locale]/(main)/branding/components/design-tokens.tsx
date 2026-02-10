import { Card } from "@/components/ui/card";
import { TokenRow } from "./token-row";
import { useTranslations } from 'next-intl';

const coreTokens = [
  { name: "--background", value: "var(--background)" },
  { name: "--foreground", value: "var(--foreground)" },
  { name: "--primary", value: "var(--primary)" },
  { name: "--secondary", value: "var(--secondary)" },
  { name: "--border", value: "var(--border)" },
  { name: "--radius", value: "var(--radius)" },
];

const brandTokens = [
  { name: "--grass", value: "var(--grass)" },
  { name: "--grass-dark", value: "var(--grass-dark)" },
  { name: "--dirt", value: "var(--dirt)" },
  { name: "--highlight", value: "var(--highlight)" },
];

export function DesignTokens() {
  const t = useTranslations('branding.tokens');
  
  return (
    <section className="mb-20">
      <h2 className="mb-6 font-serif text-3xl font-bold text-foreground">{t('title')}</h2>
      <Card className="border-2 border-border bg-card p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="mb-4 font-mono text-sm font-bold text-foreground">{t('core')}</h3>
            <div className="space-y-2">
              {coreTokens.map((token) => (
                <TokenRow key={token.name} name={token.name} value={token.value} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 font-mono text-sm font-bold text-foreground">
              {t('brand')}
            </h3>
            <div className="space-y-2">
              {brandTokens.map((token) => (
                <TokenRow key={token.name} name={token.name} value={token.value} />
              ))}
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
