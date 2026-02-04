"use client";

import { Card } from "@/components/ui/card";
import { CopyButton } from "./copy-button";
import { cn } from "@/lib/utils";

export function ColorCard({
  name,
  hex,
  usage,
  bgColor,
}: {
  name: string;
  hex: string;
  usage: string;
  bgColor: string;
}) {
  return (
    <Card className="overflow-hidden border-2 border-border bg-card">
      <div className={cn("h-32 w-full", bgColor)} />
      <div className="p-4">
        <h3 className="mb-1 font-semibold text-foreground">{name}</h3>
        <div className="mb-2 flex items-center gap-2">
          <code className="rounded bg-muted px-2 py-1 font-mono text-xs text-foreground">{hex}</code>
          <CopyButton text={hex} />
        </div>
        <p className="text-xs text-muted-foreground">{usage}</p>
      </div>
    </Card>
  );
}
