import { LogoSection } from "./logo-section";
import { ColorPalette } from "./color-palette";
import { TypographySection } from "./typography-section";
import { DesignTokens } from "./design-tokens";

interface BrandGuidelinesProps {
  children?: React.ReactNode;
}

export function BrandGuidelines({ children }: BrandGuidelinesProps) {
  return (
    <div >
      {/* Hero */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Brand Guidelines
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Essential assets and standards for the hytale.GG brand identity
        </p>
      </section>

      <LogoSection />
      <ColorPalette />
      <TypographySection />
      <DesignTokens />
      
      {children}
    </div>
  );
}
