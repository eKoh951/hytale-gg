"use client";

import { motion } from "framer-motion";
import { Users, Signal, Copy, ExternalLink, Play, Star, CheckCircle, Plus } from "lucide-react";
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
    ping: 23,
  },
  {
    id: 2,
    name: "Legends PvP",
    description: "Competitive PvP with ranked matchmaking.",
    ip: "legends.hytale.io",
    players: 412,
    maxPlayers: 500,
    region: "EU",
    categories: ["PvP", "Competitive"],
    ping: 45,
  },
  {
    id: 3,
    name: "Creative Realms",
    description: "Build anything you can imagine.",
    ip: "creative.realm.gg",
    players: 189,
    maxPlayers: 300,
    region: "US",
    categories: ["Creative", "Building"],
    ping: 31,
  },
];

const mockReviews = [
  {
    id: 1,
    creator: { name: "HytaleGamer", verified: true, platform: "YouTube" },
    server: "HytaleCraft Official",
    rating: 4.8,
    duration: "12:34",
    views: "24K",
  },
  {
    id: 2,
    creator: { name: "PixelQueen", verified: true, platform: "TikTok" },
    server: "Creative Realms",
    rating: 4.9,
    duration: "3:45",
    views: "156K",
  },
];

function getPingColor(ping: number) {
  if (ping < 50) return "text-grass";
  if (ping < 100) return "text-secondary";
  return "text-destructive";
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export function ServerShowcase() {
  return (
    <section className="border-t border-border bg-card py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-base font-semibold text-primary">Live Directory</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Popular servers right now
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Real-time player counts, instant ping testing, and creator reviews.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {/* Server cards - takes 2 columns */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4 lg:col-span-2"
          >
            {mockServers.map((server) => (
              <motion.div
                key={server.id}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-xl border border-border bg-background p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
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
                  <div className="flex h-2.5 w-2.5 rounded-full bg-grass shadow-sm shadow-grass/50" />
                </div>

                {/* Categories */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {server.categories.map((category) => (
                    <Badge key={category} variant="secondary" className="bg-muted text-xs text-muted-foreground">
                      {category}
                    </Badge>
                  ))}
                </div>

                {/* Stats row */}
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{server.players.toLocaleString()}</span>
                    <span className="text-muted-foreground">/ {server.maxPlayers.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Signal className={cn("h-4 w-4", getPingColor(server.ping))} />
                    <span className={getPingColor(server.ping)}>{server.ping}ms</span>
                  </div>
                  <button
                    className="flex items-center gap-1.5 rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label={`Copy server IP: ${server.ip}`}
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span className="hidden font-mono text-xs sm:inline">{server.ip}</span>
                  </button>
                </div>
              </motion.div>
            ))}

            {/* Add server prompt */}
            <motion.div
              variants={itemVariants}
              className="rounded-xl border border-dashed border-border bg-muted/30 p-5 text-center"
            >
              <Plus className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm font-medium text-foreground">Know a server not listed?</p>
              <p className="text-sm text-muted-foreground">Help the community by adding it.</p>
              <Button variant="outline" size="sm" className="mt-3">
                Add a Server
              </Button>
            </motion.div>
          </motion.div>

          {/* Creator reviews sidebar */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Latest Reviews
            </h3>
            {mockReviews.map((review) => (
              <motion.div
                key={review.id}
                variants={itemVariants}
                className="group overflow-hidden rounded-xl border border-border bg-background transition-all hover:border-secondary/50"
              >
                {/* Video thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background/90 transition-transform group-hover:scale-110">
                      <Play className="h-4 w-4 text-foreground" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 rounded bg-background/80 px-1.5 py-0.5 text-xs font-medium">
                    {review.duration}
                  </div>
                  <Badge className="absolute left-2 top-2 bg-secondary/90 text-secondary-foreground text-xs">
                    {review.creator.platform}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-secondary" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="truncate text-sm font-medium text-foreground">
                          {review.creator.name}
                        </span>
                        {review.creator.verified && <CheckCircle className="h-3 w-3 shrink-0 text-primary" />}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-secondary" fill="currentColor" />
                      <span className="text-xs font-medium text-secondary">{review.rating}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground truncate">{review.server}</p>
                </div>
              </motion.div>
            ))}

            <Button variant="outline" className="w-full">
              View All Reviews
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Button size="lg">
            Browse All Servers
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
