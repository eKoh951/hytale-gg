import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Reviews } from "@/components/landing/reviews";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
