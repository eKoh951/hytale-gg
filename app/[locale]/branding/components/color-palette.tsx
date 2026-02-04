import { ColorCard } from "./color-card";
import { useTranslations } from 'next-intl';

const colors = [
  {
    nameKey: "purple",
    hex: "var(--primary)",
    usageKey: "purple.usage",
    bgColor: "bg-primary",
  },
  {
    nameKey: "yellow",
    hex: "var(--secondary)",
    usageKey: "yellow.usage",
    bgColor: "bg-secondary",
  },
  {
    nameKey: "darkGray",
    hex: "var(--border)",
    usageKey: "darkGray.usage",
    bgColor: "bg-border",
  },
  {
    nameKey: "grass",
    hex: "var(--grass)",
    usageKey: "grass.usage",
    bgColor: "bg-[var(--grass)]",
  },
  {
    nameKey: "grassDark",
    hex: "var(--grass-dark)",
    usageKey: "grassDark.usage",
    bgColor: "bg-[var(--grass-dark)]",
  },
  {
    nameKey: "dirt",
    hex: "var(--dirt)",
    usageKey: "dirt.usage",
    bgColor: "bg-[var(--dirt)]",
  },
];

export function ColorPalette() {
  const t = useTranslations('branding.colors');
  
  const colorsWithTranslations = colors.map(color => ({
    ...color,
    name: t(`${color.nameKey}.name`),
    usage: t(`${color.usageKey}`),
  }));
  
  return (
    <section className="mb-20">
      <h2 className="mb-6 font-serif text-3xl font-bold text-foreground">{t('title')}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {colorsWithTranslations.map((color) => (
          <ColorCard
            key={color.name}
            name={color.name}
            hex={color.hex}
            usage={color.usage}
            bgColor={color.bgColor}
          />
        ))}
      </div>
    </section>
  );
}
