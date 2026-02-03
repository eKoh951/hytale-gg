"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Users,
  Signal,
  Play,
  Star,
  CheckCircle,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Combined carousel items - servers and creator reviews
const carouselItems = [
  {
    type: "server" as const,
    id: 1,
    name: "HytaleCraft Official",
    description: "The original survival experience with a friendly community and weekly events.",
    ip: "play.hytalecraft.gg",
    players: 847,
    maxPlayers: 1000,
    region: "US",
    categories: ["Survival", "PvE"],
    ping: 23,
  },
  {
    type: "review" as const,
    id: 2,
    creator: {
      name: "HytaleGamer",
      verified: true,
      platform: "YouTube",
    },
    server: "HytaleCraft Official",
    rating: 4.8,
    duration: "12:34",
    views: "24K",
    summary: "Best survival server I've found so far. Great community and active admins!",
  },
  {
    type: "server" as const,
    id: 3,
    name: "Legends PvP",
    description: "Competitive PvP with ranked matchmaking, tournaments, and rewards.",
    ip: "legends.hytale.io",
    players: 412,
    maxPlayers: 500,
    region: "EU",
    categories: ["PvP", "Competitive"],
    ping: 45,
  },
  {
    type: "review" as const,
    id: 4,
    creator: {
      name: "PixelQueen",
      verified: true,
      platform: "TikTok",
    },
    server: "Creative Realms",
    rating: 4.9,
    duration: "3:45",
    views: "156K",
    summary: "The building tools on this server are next level. Must try!",
  },
  {
    type: "server" as const,
    id: 5,
    name: "Creative Realms",
    description: "Build anything you can imagine. Weekly showcases and build competitions.",
    ip: "creative.realm.gg",
    players: 189,
    maxPlayers: 300,
    region: "US",
    categories: ["Creative", "Building"],
    ping: 31,
  },
];

function getPingColor(ping: number) {
  if (ping < 50) return "text-grass";
  if (ping < 100) return "text-secondary";
  return "text-destructive";
}

// Floating particles component
function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            background: `radial-gradient(circle, ${
              ["#8B4FC1", "#FFB800", "#7CBD3E", "#22d3ee"][Math.floor(Math.random() * 4)]
            } 0%, transparent 70%)`,
            left: `${Math.random() * 100}%`,
          }}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 12,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// Stone frame corner decorations
function CornerRune({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const positionClasses = {
    "top-left": "-top-2 -left-2",
    "top-right": "-top-2 -right-2",
    "bottom-left": "-bottom-2 -left-2",
    "bottom-right": "-bottom-2 -right-2",
  };

  return (
    <div className={cn("absolute z-20 h-6 w-6", positionClasses[position])}>
      <div className="h-full w-full rotate-45 rounded-sm bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/30" />
      <div className="absolute inset-1 rotate-45 rounded-sm bg-gradient-to-br from-amber-500 to-amber-700" />
    </div>
  );
}

// Server card for carousel
function ServerSlide({ item, isActive }: { item: typeof carouselItems[0]; isActive: boolean }) {
  if (item.type !== "server") return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.85 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden rounded-xl border bg-card/90 backdrop-blur-sm p-5 transition-all",
        isActive ? "border-primary/50 shadow-xl shadow-primary/20" : "border-border"
      )}
    >
      {/* Stone texture overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-stone-800/5 to-stone-900/10" />

      {/* Header */}
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground">{item.name}</h3>
            <Badge variant="outline" className="text-xs">
              {item.region}
            </Badge>
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {item.description}
          </p>
        </div>
        <div className="flex h-2.5 w-2.5 rounded-full bg-grass shadow-sm shadow-grass/50" />
      </div>

      {/* Categories */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {item.categories.map((category) => (
          <Badge
            key={category}
            variant="secondary"
            className="bg-muted/80 text-xs text-muted-foreground"
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Stats row */}
      <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">{item.players.toLocaleString()}</span>
          <span className="text-muted-foreground">/ {item.maxPlayers.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Signal className={cn("h-4 w-4", getPingColor(item.ping))} />
          <span className={getPingColor(item.ping)}>{item.ping}ms</span>
        </div>
      </div>
    </motion.div>
  );
}

// Review card for carousel
function ReviewSlide({ item, isActive }: { item: typeof carouselItems[0]; isActive: boolean }) {
  if (item.type !== "review") return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.85 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden rounded-xl border bg-card/90 backdrop-blur-sm transition-all",
        isActive ? "border-secondary/50 shadow-xl shadow-secondary/20" : "border-border"
      )}
    >
      {/* Video thumbnail area */}
      <div className="relative aspect-video bg-gradient-to-br from-primary/30 to-secondary/30">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-background/90 shadow-lg"
          >
            <Play className="h-6 w-6 text-foreground" fill="currentColor" />
          </motion.div>
        </div>
        <div className="absolute bottom-2 right-2 rounded bg-background/80 px-2 py-1 text-xs font-medium text-foreground">
          {item.duration}
        </div>
        <Badge className="absolute left-2 top-2 bg-secondary text-secondary-foreground">
          {item.creator.platform}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary" />
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-foreground">{item.creator.name}</span>
              {item.creator.verified && <CheckCircle className="h-3.5 w-3.5 text-primary" />}
            </div>
            <span className="text-xs text-muted-foreground">{item.views} views</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-secondary/10 px-2 py-1">
            <Star className="h-3.5 w-3.5 text-secondary" fill="currentColor" />
            <span className="text-sm font-medium text-secondary">{item.rating}</span>
          </div>
        </div>
        <p className="mt-3 text-sm font-medium text-foreground">{item.server}</p>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.summary}</p>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const currentItem = carouselItems[currentIndex];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hytale-assets/hero-bg.jpg"
          alt="Hytale fantasy landscape"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay with vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,5,0.7)_100%)]" />
      </div>

      {/* Floating particles */}
      <FloatingParticles />

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 pt-20 pb-12 sm:px-6 lg:px-8">
        {/* Header content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/80 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-grass opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-grass" />
            </span>
            <span>Discover servers & watch reviews</span>
          </motion.div>

          {/* Main headline */}
          <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Find your perfect{" "}
            <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
              Hytale server
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-muted-foreground">
            Real servers, real reviews, real-time stats. The community-driven directory built for Hytale players.
          </p>
        </motion.div>

        {/* Twitch-style carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative w-full max-w-3xl"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Stone frame border */}
          <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-b from-stone-500 via-stone-600 to-stone-800 opacity-60" />
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-stone-600 via-stone-700 to-stone-900" />

          {/* Corner decorations */}
          <CornerRune position="top-left" />
          <CornerRune position="top-right" />
          <CornerRune position="bottom-left" />
          <CornerRune position="bottom-right" />

          {/* Carousel container */}
          <div className="relative overflow-hidden rounded-xl bg-card/50 p-4 backdrop-blur-sm">
            {/* Navigation arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground shadow-lg transition-all hover:bg-background hover:scale-110"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground shadow-lg transition-all hover:bg-background hover:scale-110"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Slides */}
            <div className="relative mx-8">
              <AnimatePresence mode="wait">
                {currentItem.type === "server" ? (
                  <ServerSlide key={currentItem.id} item={currentItem} isActive={true} />
                ) : (
                  <ReviewSlide key={currentItem.id} item={currentItem} isActive={true} />
                )}
              </AnimatePresence>
            </div>

            {/* Slide indicators */}
            <div className="mt-4 flex items-center justify-center gap-2">
              {carouselItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    index === currentIndex
                      ? item.type === "server"
                        ? "w-6 bg-primary"
                        : "w-6 bg-secondary"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Content type indicator */}
            <div className="mt-3 flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Server
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-secondary" />
                Creator Review
              </span>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4"
        >
          <Button
            size="lg"
            className="bg-secondary px-8 text-secondary-foreground hover:bg-secondary/90"
          >
            Browse Servers
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="border-primary/30 px-8 hover:bg-primary/10">
            <Plus className="mr-2 h-4 w-4" />
            List a Server
          </Button>
        </motion.div>

        {/* Community message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-4 text-center text-sm text-muted-foreground"
        >
          Know a server? Anyone can add servers to our directory.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 grid grid-cols-2 gap-6 border-t border-border/30 pt-8 sm:grid-cols-4 sm:gap-12"
        >
          <Stat value="500+" label="Servers" />
          <Stat value="10K+" label="Players" />
          <Stat value="50+" label="Creator Reviews" />
          <Stat value="5ms" label="Avg. Ping Test" />
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-2xl font-bold text-foreground sm:text-3xl">{value}</span>
      <span className="mt-1 text-sm text-muted-foreground">{label}</span>
    </div>
  );
}
