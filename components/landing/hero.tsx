import { ArrowRight, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        {/* Badge */}
        <div className="mb-8 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
          <Gamepad2 className="h-4 w-4 text-primary" />
          <span>The Hytale community hub</span>
        </div>

        {/* Main headline */}
        <h1 className="max-w-4xl text-balance text-center text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Find your perfect{" "}
          <span className="text-primary">Hytale server</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 max-w-2xl text-balance text-center text-lg text-muted-foreground sm:text-xl">
          Discover servers, test your connection, and watch authentic creator
          reviews. The mobile-first server directory built for the Hytale
          community.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-4">
          <Button
            size="lg"
            className="bg-secondary px-8 text-secondary-foreground hover:bg-secondary/90"
          >
            Browse Servers
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="px-8">
            List Your Server
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-8 sm:mt-20 sm:grid-cols-4 sm:gap-16 sm:pt-12">
          <Stat value="500+" label="Servers" />
          <Stat value="10K+" label="Players" />
          <Stat value="50+" label="Creator Reviews" />
          <Stat value="5ms" label="Avg. Ping Test" />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-2xl font-bold text-foreground sm:text-3xl">
        {value}
      </span>
      <span className="mt-1 text-sm text-muted-foreground">{label}</span>
    </div>
  );
}
