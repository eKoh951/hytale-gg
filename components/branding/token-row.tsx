"use client";

import { CopyButton } from "./copy-button";

export function TokenRow({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2">
      <span className="text-muted-foreground">{name}</span>
      <div className="flex items-center gap-2">
        <span className="text-foreground">{value}</span>
        <CopyButton text={value} />
      </div>
    </div>
  );
}
