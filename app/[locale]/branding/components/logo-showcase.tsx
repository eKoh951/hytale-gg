import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface LogoVariant {
  name: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
  useCase: string;
  filePath: string;
}

interface LogoShowcaseProps {
  variants: LogoVariant[];
}

export function LogoShowcase({ variants }: LogoShowcaseProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {variants.map((variant) => (
        <Card key={variant.name} className="relative overflow-hidden border-2 border-border bg-card p-8">
          <div className="mb-4 flex items-center justify-between">
            <Badge variant="secondary" className="font-mono text-xs">
              {variant.name}
            </Badge>
          </div>
          <div className="flex min-h-[200px] items-center justify-center rounded-lg bg-background p-8">
            <Image
              src={variant.src}
              alt={variant.alt}
              width={variant.width}
              height={variant.height}
              className={variant.className}
            />
          </div>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Use for:</strong> {variant.useCase}
            </p>
            <p className="font-mono text-xs">{variant.filePath}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
