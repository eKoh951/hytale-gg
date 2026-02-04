"use client";

import { Copy } from "lucide-react";

export function CopyButton({ text }: { text: string }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(text)}
      className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      aria-label="Copy to clipboard"
    >
      <Copy className="h-3 w-3" />
    </button>
  );
}
