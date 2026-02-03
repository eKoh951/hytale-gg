"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Search,
  Users,
  Signal,
  Copy,
  Globe,
  Swords,
  Pickaxe,
  Paintbrush,
  Castle,
  Gamepad2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Server categories/game modes
const categories = [
  { id: "all", label: "All", icon: Globe },
  { id: "survival", label: "Survival", icon: Pickaxe },
  { id: "pvp", label: "PvP", icon: Swords },
  { id: "creative", label: "Creative", icon: Paintbrush },
  { id: "rpg", label: "RPG", icon: Castle },
  { id: "minigames", label: "Minigames", icon: Gamepad2 },
];

// Regions/languages
const regions = [
  { id: "all", label: "Any Region" },
  { id: "na", label: "North America" },
  { id: "eu", label: "Europe" },
  { id: "asia", label: "Asia" },
  { id: "latam", label: "Latin America" },
  { id: "oce", label: "Oceania" },
];

// Mock servers for demonstration
const mockServers = [
  {
    id: 1,
    name: "HytaleCraft Official",
    description: "The original survival experience with active community events every weekend.",
    ip: "play.hytalecraft.gg",
    players: 847,
    maxPlayers: 1000,
    region: "NA",
    categories: ["Survival", "PvE"],
    ping: 23,
    language: "English",
  },
  {
    id: 2,
    name: "Legends PvP",
    description: "Competitive PvP with ranked matchmaking and seasonal tournaments.",
    ip: "legends.hytale.io",
    players: 412,
    maxPlayers: 500,
    region: "EU",
    categories: ["PvP", "Competitive"],
    ping: 45,
    language: "Multi",
  },
  {
    id: 3,
    name: "Creative Realms",
    description: "Build anything you can imagine. Weekly showcases and build competitions.",
    ip: "creative.realm.gg",
    players: 189,
    maxPlayers: 300,
    region: "NA",
    categories: ["Creative", "Building"],
    ping: 31,
    language: "English",
  },
  {
    id: 4,
    name: "Aventura Latina",
    description: "El servidor de supervivencia mas grande de habla hispana.",
    ip: "aventura.hytale.lat",
    players: 523,
    maxPlayers: 800,
    region: "LATAM",
    categories: ["Survival", "RPG"],
    ping: 67,
    language: "Spanish",
  },
];

function getPingColor(ping: number) {
  if (ping < 50) return "text-grass";
  if (ping < 100) return "text-secondary";
  return "text-destructive";
}

function getPingBars(ping: number) {
  if (ping < 50) return 4;
  if (ping < 100) return 3;
  if (ping < 150) return 2;
  return 1;
}

// Floating particles - subtle version
function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            background: `radial-gradient(circle, ${
              ["#8B4FC1", "#FFB800", "#7CBD3E"][Math.floor(Math.random() * 3)]
            } 0%, transparent 70%)`,
            left: `${Math.random() * 100}%`,
          }}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.5, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// Server card component
function ServerCard({ server, index }: { server: typeof mockServers[0]; index: number }) {
  const [copied, setCopied] = useState(false);

  const copyIP = () => {
    navigator.clipboard.writeText(server.ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-lg border border-border bg-card/80 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card"
    >
      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-semibold text-foreground">{server.name}</h3>
              <span className="flex h-2 w-2 shrink-0 rounded-full bg-grass shadow-sm shadow-grass/50" />
            </div>
            <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
              {server.description}
            </p>
          </div>
          <Badge variant="outline" className="shrink-0 text-xs">
            {server.region}
          </Badge>
        </div>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {server.categories.map((cat) => (
            <Badge key={cat} variant="secondary" className="bg-muted/80 text-xs">
              {cat}
            </Badge>
          ))}
          <Badge variant="secondary" className="bg-muted/80 text-xs">
            {server.language}
          </Badge>
        </div>

        {/* Stats footer */}
        <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-3">
          <div className="flex items-center gap-4">
            {/* Players */}
            <div className="flex items-center gap-1.5 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{server.players}</span>
              <span className="text-muted-foreground">/ {server.maxPlayers}</span>
            </div>

            {/* Ping */}
            <div className="flex items-center gap-1.5 text-sm">
              <div className="flex items-end gap-0.5">
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={cn(
                      "w-1 rounded-sm transition-colors",
                      bar <= getPingBars(server.ping) ? getPingColor(server.ping).replace("text-", "bg-") : "bg-muted"
                    )}
                    style={{ height: `${bar * 3 + 4}px` }}
                  />
                ))}
              </div>
              <span className={getPingColor(server.ping)}>{server.ping}ms</span>
            </div>
          </div>

          {/* Copy IP */}
          <button
            onClick={copyIP}
            className="flex items-center gap-1.5 rounded px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-grass" />
                <span className="text-grass">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span className="hidden font-mono sm:inline">{server.ip}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hytale-assets/hero-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
      </div>

      <FloatingParticles />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        {/* Minimal header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Find your Hytale server
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Search by game mode, region, or language. Test your ping before you join.
          </p>
        </motion.div>

        {/* Search and filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 space-y-4"
        >
          {/* Search bar */}
          <div className="relative mx-auto max-w-2xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search servers by name, IP, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 w-full rounded-lg border border-border bg-card/80 pl-12 pr-4 text-foreground placeholder:text-muted-foreground backdrop-blur-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all",
                    selectedCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-card/80 text-muted-foreground hover:bg-card hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Region filter */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region.id)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                  selectedRegion === region.id
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {region.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Server results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {mockServers.map((server, index) => (
            <ServerCard key={server.id} server={server} index={index} />
          ))}
        </motion.div>

        {/* Browse all + submit server */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Button size="lg" className="bg-primary px-8 hover:bg-primary/90">
            Browse all servers
          </Button>
          <Button size="lg" variant="outline" className="border-border hover:bg-muted">
            List a server you know
          </Button>
        </motion.div>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Anyone can add servers to the directory. Help others discover great communities.
        </p>
      </div>
    </section>
  );
}
