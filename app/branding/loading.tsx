import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BrandingLoading() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Skeleton */}
          <section className="mb-16 text-center">
            <Skeleton className="mb-4 h-16 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
          </section>

          {/* Logo Section Skeleton */}
          <section className="mb-20">
            <Skeleton className="mb-6 h-10 w-32" />
            <div className="grid gap-6 md:grid-cols-2">
              {[1, 2].map((i) => (
                <Card key={i} className="border-2 border-border bg-card p-8">
                  <Skeleton className="mb-4 h-6 w-20" />
                  <Skeleton className="mb-4 h-32 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-3/4 mt-2" />
                </Card>
              ))}
            </div>
          </section>

          {/* Color Palette Skeleton */}
          <section className="mb-20">
            <Skeleton className="mb-6 h-10 w-32" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden border-2 border-border bg-card">
                  <Skeleton className="h-32 w-full" />
                  <div className="p-4">
                    <Skeleton className="mb-2 h-5 w-20" />
                    <Skeleton className="mb-2 h-4 w-24" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Typography Skeleton */}
          <section className="mb-20">
            <Skeleton className="mb-6 h-10 w-32" />
            <div className="grid gap-6 lg:grid-cols-2">
              {[1, 2].map((i) => (
                <Card key={i} className="border-2 border-border bg-card p-6">
                  <Skeleton className="mb-4 h-8 w-32" />
                  <div className="space-y-4">
                    {[1, 2, 3].map((j) => (
                      <div key={j}>
                        <Skeleton className="mb-2 h-4 w-32" />
                        <Skeleton className="h-6 w-full" />
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
