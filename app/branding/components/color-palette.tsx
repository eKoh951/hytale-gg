import { ColorCard } from "./color-card";

const colors = [
  {
    name: "Purple",
    hex: "var(--primary)",
    usage: "hytale text, brand primary",
    bgColor: "bg-primary",
  },
  {
    name: "Yellow",
    hex: "var(--secondary)",
    usage: "GG text, accents, CTAs",
    bgColor: "bg-secondary",
  },
  {
    name: "Dark Gray",
    hex: "var(--border)",
    usage: "Outlines, borders",
    bgColor: "bg-border",
  },
  {
    name: "Grass",
    hex: "var(--grass)",
    usage: "Block top",
    bgColor: "bg-[var(--grass)]",
  },
  {
    name: "Grass Dark",
    hex: "var(--grass-dark)",
    usage: "Block sides",
    bgColor: "bg-[var(--grass-dark)]",
  },
  {
    name: "Dirt",
    hex: "var(--dirt)",
    usage: "Block bottom",
    bgColor: "bg-[var(--dirt)]",
  },
];

export function ColorPalette() {
  return (
    <section className="mb-20">
      <h2 className="mb-6 font-serif text-3xl font-bold text-foreground">Color Palette</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {colors.map((color) => (
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
