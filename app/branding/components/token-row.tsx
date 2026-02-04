import { CopyButton } from "./copy-button";

interface TokenRowProps {
  name: string;
  value: string;
}

export function TokenRow({ name, value }: TokenRowProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2">
      <span className="text-muted-foreground font-mono text-xs">{name}</span>
      <div className="flex items-center gap-2">
        <span className="text-foreground font-mono text-xs">{value}</span>
        <CopyButton text={value} />
      </div>
    </div>
  );
}
