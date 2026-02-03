import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeroBackgroundProps {
  children: React.ReactNode;
  className?: string;
  backgroundImage?: string;
  showParticles?: boolean;
}

export function HeroBackground({ 
  children, 
  className,
  backgroundImage,
  showParticles = true
}: HeroBackgroundProps) {
  return (
    <section className={cn("relative w-full overflow-x-hidden", className)}>
      {/* Background image if provided */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover object-top"
            priority
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-background/80 via-background/60 to-background" />
        </div>
      )}

      {/* Fallback gradient if no image provided */}
      {!backgroundImage && (
        <div className="absolute inset-0 z-0 bg-linear-to-br from-[#1a3a52] via-[#2d5a3d] to-[#4a6b2c]" />
      )}

      {/* Animated particles */}
      {showParticles && (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[10%] top-[20%] h-1 w-1 animate-pulse rounded-full bg-primary/30" />
          <div className="absolute left-[70%] top-[40%] h-1 w-1 animate-pulse rounded-full bg-secondary/30 delay-300" />
          <div className="absolute left-[30%] top-[60%] h-1 w-1 animate-pulse rounded-full bg-primary/30 delay-700" />
          <div className="absolute left-[85%] top-[75%] h-1 w-1 animate-pulse rounded-full bg-secondary/30 delay-1000" />
        </div>
      )}

      {/* Subtle noise texture */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      />

      {children}
    </section>
  );
}

interface DirtBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function DirtBackground({ children, className }: DirtBackgroundProps) {
  return (
    <section className={cn("relative w-full overflow-x-hidden bg-[#6B5744]", className)}>
      {/* Subtle dirt texture overlay */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M0 10h10v10H0zM20 0h10v10H20zM10 20h10v10H10zM30 10h10v10H30zM20 30h10v10H20z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }}
      />

      {children}
    </section>
  );
}
