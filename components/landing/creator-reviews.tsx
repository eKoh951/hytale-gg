import { Play, Star, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mockReviews = [
  {
    id: 1,
    creator: {
      name: "HytaleGamer",
      avatar: "/avatars/creator1.jpg",
      verified: true,
      platform: "YouTube",
    },
    server: "HytaleCraft Official",
    rating: 4.8,
    thumbnail: "/thumbnails/review1.jpg",
    duration: "12:34",
    views: "24K",
    summary: "Best survival server I've found so far. Great community!",
  },
  {
    id: 2,
    creator: {
      name: "PixelQueen",
      avatar: "/avatars/creator2.jpg",
      verified: true,
      platform: "TikTok",
    },
    server: "Creative Realms",
    rating: 4.9,
    thumbnail: "/thumbnails/review2.jpg",
    duration: "3:45",
    views: "156K",
    summary: "The building tools on this server are next level.",
  },
  {
    id: 3,
    creator: {
      name: "ProPvPer",
      avatar: "/avatars/creator3.jpg",
      verified: true,
      platform: "Twitch",
    },
    server: "Legends PvP",
    rating: 4.6,
    thumbnail: "/thumbnails/review3.jpg",
    duration: "8:21",
    views: "45K",
    summary: "Competitive PvP at its finest. Ranked system is solid.",
  },
];

export function CreatorReviews() {
  return (
    <section className="border-t border-border bg-card py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <h2 className="text-base font-semibold text-primary">
              Creator Reviews
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Authentic video reviews
            </p>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Watch trusted creators review servers before you join. Real
              opinions from real players.
            </p>
          </div>
          <Button variant="outline">View All Reviews</Button>
        </div>

        {/* Reviews grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Become creator CTA */}
        <div className="mt-16 rounded-xl border border-border bg-background p-8 text-center">
          <h3 className="text-xl font-semibold text-foreground">
            Are you a content creator?
          </h3>
          <p className="mt-2 text-muted-foreground">
            Join our creator program and share your server reviews with the
            community.
          </p>
          <Button className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
            Apply as Creator
          </Button>
        </div>
      </div>
    </section>
  );
}

interface ReviewCardProps {
  review: (typeof mockReviews)[0];
}

function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-background transition-all hover:border-primary/50">
      {/* Video thumbnail */}
      <div className="relative aspect-video bg-muted">
        {/* Placeholder for video thumbnail */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background/90 transition-transform group-hover:scale-110">
            <Play className="h-5 w-5 text-foreground" fill="currentColor" />
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 rounded bg-background/80 px-1.5 py-0.5 text-xs font-medium text-foreground">
          {review.duration}
        </div>

        {/* Platform badge */}
        <Badge className="absolute top-2 left-2 bg-background/80 text-foreground">
          {review.creator.platform}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Creator info */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary" />
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-foreground">
                {review.creator.name}
              </span>
              {review.creator.verified && (
                <CheckCircle className="h-3.5 w-3.5 text-primary" />
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              {review.views} views
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 rounded-full bg-secondary/10 px-2 py-1">
            <Star className="h-3.5 w-3.5 text-secondary" fill="currentColor" />
            <span className="text-sm font-medium text-secondary">
              {review.rating}
            </span>
          </div>
        </div>

        {/* Server name */}
        <p className="mt-3 text-sm font-medium text-foreground">
          {review.server}
        </p>

        {/* Summary */}
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {review.summary}
        </p>
      </div>
    </div>
  );
}
