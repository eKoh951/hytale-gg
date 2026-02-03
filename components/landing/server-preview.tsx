import { Users, Signal, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const mockServers = [
  {
    id: 1,
    name: "HytaleCraft Official",
    description: "The original survival experience. Friendly community.",
    ip: "play.hytalecraft.gg",
    players: 847,
    maxPlayers: 1000,
    region: "US",
    categories: ["Survival", "PvE"],
    status: "online",
    ping: 23,
  },
  {
    id: 2,
    name: "Legends PvP",
    description: "Competitive PvP with ranked matchmaking and tournaments.",
    ip: "legends.hytale.io",
    players: 412,
    maxPlayers: 500,
    region: "EU",
    categories: ["PvP", "Competitive"],
    status: "online",
    ping: 45,
  },
  {
    id: 3,
    name: "Creative Realms",
    description: "Build anything you can imagine. Weekly showcases.",
    ip: "creative.realm.gg",
    players: 189,
    maxPlayers: 300,
    region: "US",
    categories: ["Creative", "Building"],
    status: "online",
    ping: 31,
  },
  {
    id: 4,
    name: "RP Universe",
    description: "Immersive roleplay with custom storylines and quests.",
    ip: "rp.universe.net",
    players: 256,
    maxPlayers: 400,
    region: "EU",
    categories: ["Roleplay", "Adventure"],
    status: "online",
    ping: 67,
  },
];

function getPingColor(ping: number) {
  if (ping < 50) return "text-grass";
  if (ping < 100) return "text-secondary";
  return "text-destructive";
}

function getPingLabel(ping: number) {
  if (ping < 50) return "Excellent";
  if (ping < 100) return "Good";
  return "Poor";
}

export function ServerPreview() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold text-primary">
            Live Server Directory
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Discover active servers
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Real-time player counts, instant ping testing, and all the info you
            need.
          </p>
        </div>

        {/* Server cards */}
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2">
          {mockServers.map((server) => (
            <ServerCard key={server.id} server={server} />
          ))}
        </div>

        {/* View all CTA */}
        <div className="mt-12 text-center">
          <Button size="lg" variant="outline">
            View All Servers
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

interface ServerCardProps {
  server: (typeof mockServers)[0];
}

function ServerCard({ server }: ServerCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground">{server.name}</h3>
            <Badge variant="outline" className="text-xs">
              {server.region}
            </Badge>
          </div>
          <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
            {server.description}
          </p>
        </div>

        {/* Status indicator */}
        <div
          className={cn(
            "flex h-2 w-2 rounded-full",
            server.status === "online" ? "bg-grass" : "bg-muted",
          )}
        />
      </div>

      {/* Categories */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {server.categories.map((category) => (
          <Badge
            key={category}
            variant="secondary"
            className="bg-muted text-xs text-muted-foreground"
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Stats row */}
      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        {/* Players */}
        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">
            {server.players.toLocaleString()}
          </span>
          <span className="text-muted-foreground">
            / {server.maxPlayers.toLocaleString()}
          </span>
        </div>

        {/* Ping */}
        <div className="flex items-center gap-2 text-sm">
          <Signal className={cn("h-4 w-4", getPingColor(server.ping))} />
          <span className={getPingColor(server.ping)}>{server.ping}ms</span>
          <span className="text-xs text-muted-foreground">
            ({getPingLabel(server.ping)})
          </span>
        </div>

        {/* Copy IP */}
        <button
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label={`Copy server IP: ${server.ip}`}
        >
          <Copy className="h-3.5 w-3.5" />
          <span className="font-mono text-xs">{server.ip}</span>
        </button>
      </div>
    </div>
  );
}
