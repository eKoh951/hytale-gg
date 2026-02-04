import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Palette } from "lucide-react";

export function ComponentRegistry() {
  return (
    <section className="mb-20">
      <h2 className="mb-6 font-serif text-3xl font-bold text-foreground">Component Registry</h2>
      <Card className="border-2 border-border bg-card p-8 text-center">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <Palette className="h-8 w-8 text-primary" />
            </div>
          </div>
          
          <h3 className="mb-4 text-xl font-semibold text-foreground">
            Hytale.GG Component Registry
          </h3>
          
          <p className="mb-6 text-muted-foreground">
            Explore our complete component library with interactive examples, 
            live previews, and customizable design system components built 
            specifically for Hytale.GG.
          </p>

          <div className="space-y-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a 
                href="https://hytale-gg-registry.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Open Registry
              </a>
            </Button>
            
            <div className="text-sm text-muted-foreground">
              <p>✨ 43+ components available</p>
              <p>🎨 Gaming-themed design system</p>
              <p>⚡ Built with shadcn/ui & Next.js 16</p>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
