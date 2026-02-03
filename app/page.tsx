import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { ServerPreview } from "@/components/landing/server-preview";
import { CreatorReviews } from "@/components/landing/creator-reviews";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <ServerPreview />
        <CreatorReviews />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
