import { Card } from "@/components/ui/card";
import { LogoShowcase } from "./logo-showcase";

const logoVariants = [
  {
    name: "hytale.GG",
    src: "/hytale-gg.png",
    alt: "hytale.GG Full Logo",
    width: 240,
    height: 48,
    className: "h-12 w-auto",
    useCase: "Headers, marketing materials, large displays",
    filePath: "public/hytale-gg.png",
  },
  {
    name: "h.GG",
    src: "/h-gg.png",
    alt: "h.GG Short Logo",
    width: 80,
    height: 32,
    className: "h-8 w-auto",
    useCase: "Favicon, social profiles, compact spaces",
    filePath: "public/h-gg.png",
  },
];

export function LogoSection() {
  return (
    <section className="mb-20">
      <h2 className="mb-6 font-serif text-3xl font-bold text-foreground">Logo</h2>
      <LogoShowcase variants={logoVariants} />

      {/* Logo Usage Guidelines */}
      <Card className="mt-6 border-2 border-border bg-card p-6">
        <h3 className="mb-4 font-serif text-xl font-bold text-foreground">Usage Guidelines</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="mb-2 font-semibold text-foreground">Do&apos;s</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>✓ Use on dark backgrounds (#1F2937 or darker)</li>
              <li>✓ Maintain aspect ratio when scaling</li>
              <li>✓ Keep clear space around logo</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-semibold text-foreground">Don&apos;ts</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>✗ Don&apos;t rotate or distort</li>
              <li>✗ Don&apos;t change colors</li>
              <li>✗ Don&apos;t add effects (shadows, glows)</li>
            </ul>
          </div>
        </div>
      </Card>
    </section>
  );
}
