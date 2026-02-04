import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { BrandGuidelines } from "./components/brand-guidelines";
import { Suspense } from "react";
import { ComponentRegistry } from "./components/component-registry";

// Static metadata for the branding page
export const metadata = {
  title: "Brand Guidelines | hytale.GG",
  description: "Essential assets and standards for the hytale.GG brand identity",
  openGraph: {
    title: "Brand Guidelines | hytale.GG",
    description: "Essential assets and standards for the hytale.GG brand identity",
    type: "website",
  },
  keywords: ["brand guidelines", "hytale", "gaming", "design system", "logo", "colors"],
  authors: [{ name: "hytale.GG" }],
};

// Force static generation for this page with revalidation
export const dynamic = "force-static";
export const revalidate = 86400; // Revalidate once per day

export default function BrandingPage() {
  return (
      <main className="min-h-screen bg-background pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense 
          fallback={
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="animate-pulse text-center mb-16">
                <div className="h-12 bg-muted rounded-lg w-3/4 mx-auto mb-4" />
                <div className="h-6 bg-muted rounded-lg w-1/2 mx-auto" />
              </div>
            </div>
          }
        >
          <BrandGuidelines />
          <ComponentRegistry />
        </Suspense>
      </main>
  );
}
