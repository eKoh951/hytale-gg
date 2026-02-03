"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Star, CheckCircle, ThumbsUp, MessageSquare, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconDivider, StoneCard, TorchGlow, PixelCorner } from "@/components/ui/hytale-decorations";
import { cn } from "@/lib/utils";

// Creator video reviews
const creatorReviews = [
  {
    id: 1,
    type: "creator" as const,
    creator: { name: "HytaleGamer", verified: true, avatar: null },
    platform: "YouTube",
    server: "HytaleCraft Official",
    rating: 4.8,
    duration: "12:34",
    views: "24K",
    title: "Is this the BEST survival server?",
    thumbnail: null,
  },
  {
    id: 2,
    type: "creator" as const,
    creator: { name: "PixelQueen", verified: true, avatar: null },
    platform: "TikTok",
    server: "Creative Realms",
    rating: 4.9,
    duration: "3:45",
    views: "156K",
    title: "Building tools are INSANE here",
    thumbnail: null,
  },
  {
    id: 3,
    type: "creator" as const,
    creator: { name: "PvPMaster", verified: true, avatar: null },
    platform: "YouTube",
    server: "Legends PvP",
    rating: 4.5,
    duration: "8:21",
    views: "45K",
    title: "Ranked PvP review - worth it?",
    thumbnail: null,
  },
];

// Player text reviews
const playerReviews = [
  {
    id: 1,
    type: "player" as const,
    player: { name: "BlockMaster99", verified: false },
    server: "HytaleCraft Official",
    rating: 5,
    text: "Been playing here for 3 months. The community is incredible and the admins are always active. Best survival experience I've had.",
    likes: 47,
    date: "2 days ago",
  },
  {
    id: 2,
    type: "player" as const,
    player: { name: "NightCrafter", verified: false },
    server: "Creative Realms",
    rating: 5,
    text: "If you love building, this is THE server. Weekly competitions and the tools available are amazing.",
    likes: 32,
    date: "5 days ago",
  },
  {
    id: 3,
    type: "player" as const,
    player: { name: "SwordLegend", verified: false },
    server: "Legends PvP",
    rating: 4,
    text: "Solid competitive scene. Matchmaking can be slow during off-hours but the fights are fair and rewarding.",
    likes: 28,
    date: "1 week ago",
  },
  {
    id: 4,
    type: "player" as const,
    player: { name: "Exploradora", verified: false },
    server: "Aventura Latina",
    rating: 5,
    text: "Finally a great Spanish-speaking server! The RPG elements add so much depth to survival gameplay.",
    likes: 51,
    date: "3 days ago",
  },
];

type ReviewTab = "creator" | "player";

function CreatorReviewCard({ review, index }: { review: typeof creatorReviews[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <StoneCard glowColor="secondary" className="group relative overflow-hidden">
      <PixelCorner type="torch" position="top-left" />
      <PixelCorner type="gem" position="top-right" />
      {/* Video thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-primary/20 via-card to-secondary/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background/90 shadow-lg transition-transform group-hover:scale-110">
            <Play className="h-5 w-5 text-foreground" fill="currentColor" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 rounded bg-background/90 px-1.5 py-0.5 text-xs font-medium">
          {review.duration}
        </div>
        <Badge className="absolute left-2 top-2 bg-secondary text-secondary-foreground text-xs">
          {review.platform}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="line-clamp-1 font-medium text-foreground">{review.title}</h4>
        <p className="mt-1 text-sm text-muted-foreground">{review.server}</p>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-secondary" />
            <span className="text-sm text-foreground">{review.creator.name}</span>
            {review.creator.verified && <CheckCircle className="h-3.5 w-3.5 text-primary" />}
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-secondary" fill="currentColor" />
            <span className="text-sm font-medium text-secondary">{review.rating}</span>
          </div>
        </div>

        <p className="mt-2 text-xs text-muted-foreground">{review.views} views</p>
      </div>
      </StoneCard>
    </motion.div>
  );
}

function PlayerReviewCard({ review, index }: { review: typeof playerReviews[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <StoneCard glowColor="primary" className="relative p-4">
      <PixelCorner type="crystal" position="top-left" />
      <PixelCorner type="crystal" position="bottom-right" />
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <User className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <span className="text-sm font-medium text-foreground">{review.player.name}</span>
            <p className="text-xs text-muted-foreground">{review.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={cn(
                "h-3.5 w-3.5",
                star <= review.rating ? "text-secondary" : "text-muted"
              )}
              fill={star <= review.rating ? "currentColor" : "none"}
            />
          ))}
        </div>
      </div>

      {/* Server badge */}
      <Badge variant="outline" className="mt-3 text-xs">
        {review.server}
      </Badge>

      {/* Review text */}
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {review.text}
      </p>

      {/* Footer */}
      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
        <button className="flex items-center gap-1 transition-colors hover:text-foreground">
          <ThumbsUp className="h-3.5 w-3.5" />
          <span>{review.likes} helpful</span>
        </button>
        <button className="flex items-center gap-1 transition-colors hover:text-foreground">
          <MessageSquare className="h-3.5 w-3.5" />
          <span>Reply</span>
        </button>
      </div>
      </StoneCard>
    </motion.div>
  );
}

export function Reviews() {
  const [activeTab, setActiveTab] = useState<ReviewTab>("creator");

  return (
    <section className="relative bg-[#6B5744] py-16 sm:py-24">
      {/* Subtle dirt texture overlay */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M0 10h10v10H0zM20 0h10v10H20zM10 20h10v10H10zM30 10h10v10H30zM20 30h10v10H20z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Torch glows on sides */}
      <TorchGlow position="left" className="top-1/3 opacity-30" />
      <TorchGlow position="right" className="top-2/3 opacity-30" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Icon divider at top */}
        <IconDivider icon="sword" className="mb-12" />
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            What players are saying
          </h2>
          <p className="mt-2 text-muted-foreground">
            Real reviews from creators and players in the community.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 flex justify-center"
        >
          <div className="inline-flex rounded-lg border border-border bg-card p-1">
            <button
              onClick={() => setActiveTab("creator")}
              className={cn(
                "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all",
                activeTab === "creator"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Play className="h-4 w-4" />
              Creator Reviews
            </button>
            <button
              onClick={() => setActiveTab("player")}
              className={cn(
                "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all",
                activeTab === "player"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <User className="h-4 w-4" />
              Player Reviews
            </button>
          </div>
        </motion.div>

        {/* Reviews grid */}
        <div className="mt-8">
          {activeTab === "creator" ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {creatorReviews.map((review, index) => (
                <CreatorReviewCard key={review.id} review={review} index={index} />
              ))}
            </div>
          ) : (
            <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
              {playerReviews.map((review, index) => (
                <PlayerReviewCard key={review.id} review={review} index={index} />
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Button variant="outline">
            View all reviews
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
