import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { ColorCard } from "@/components/branding/color-card";
import { TokenRow } from "@/components/branding/token-row";

export default function BrandingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <section className="mb-16 text-center">
            <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Brand Guidelines
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Essential assets and standards for the hytale.GG brand identity
            </p>
          </section>

          {/* Logo Section */}
          <section className="mb-20">
            <h2 className="mb-6 font-serif text-3xl font-bold text-foreground">Logo</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Full Logo */}
              <Card className="relative overflow-hidden border-2 border-border bg-card p-8">
                <div className="mb-4 flex items-center justify-between">
                  <Badge variant="secondary" className="font-mono text-xs">
                    hytale.GG
                  </Badge>
                </div>
                <div className="flex min-h-[200px] items-center justify-center rounded-lg bg-background p-8">
                  <Image
                    src="/hytale-gg.png"
                    alt="hytale.GG Full Logo"
                    width={240}
                    height={48}
                    className="h-12 w-auto"
                  />
                </div>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Use for:</strong> Headers, marketing materials,
                    large displays
                  </p>
                  <p className="font-mono text-xs">public/hytale-gg.png</p>
                </div>
              </Card>

              {/* Short Logo */}
              <Card className="relative overflow-hidden border-2 border-border bg-card p-8">
                <div className="mb-4 flex items-center justify-between">
                  <Badge variant="secondary" className="font-mono text-xs">
                    h.GG
                  </Badge>
                </div>
                <div className="flex min-h-[200px] items-center justify-center rounded-lg bg-background p-8">
                  <Image
                    src="/h-gg.png"
                    alt="h.GG Short Logo"
                    width={80}
                    height={32}
                    className="h-8 w-auto"
                  />
                </div>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Use for:</strong> Favicon, social profiles, compact
                    spaces
                  </p>
                  <p className="font-mono text-xs">public/h-gg.png</p>
                </div>
              </Card>
            </div>

            {/* Logo Usage */}
            <Card className="mt-6 border-2 border-border bg-card p-6">
              <h3 className="mb-4 font-serif text-xl font-bold text-foreground">Usage Guidelines</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-semibold text-foreground">Do&apos;s</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>✓ Use on dark backgrounds (#1F2937 or darker)</li>
                    <li>✓ Maintain aspect ratio when scaling</li>
                    <li>✓ Keep clear space around logo</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-foreground">Don&apos;ts</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>✗ Don&apos;t rotate or distort</li>
                    <li>✗ Don&apos;t change colors</li>
                    <li>✗ Don&apos;t add effects (shadows, glows)</li>
                  </ul>
                </div>
              </div>
            </Card>
          </section>

          {/* Color Palette */}
          <section className="mb-20">
            <h2 className="mb-6 font-serif text-3xl font-bold text-foreground">Color Palette</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <ColorCard
                name="Purple"
                hex="#8B4FC1"
                usage="hytale text, brand primary"
                bgColor="bg-[#8B4FC1]"
              />
              <ColorCard
                name="Yellow"
                hex="#FFB800"
                usage="GG text, accents, CTAs"
                bgColor="bg-[#FFB800]"
              />
              <ColorCard
                name="Dark Gray"
                hex="#3D3D3D"
                usage="Outlines, borders"
                bgColor="bg-[#3D3D3D]"
              />
              <ColorCard name="Grass" hex="#7CBD3E" usage="Block top" bgColor="bg-[#7CBD3E]" />
              <ColorCard
                name="Grass Dark"
                hex="#5A9C27"
                usage="Block sides"
                bgColor="bg-[#5A9C27]"
              />
              <ColorCard name="Dirt" hex="#8B6F47" usage="Block bottom" bgColor="bg-[#8B6F47]" />
            </div>
          </section>

          {/* Typography */}
          <section className="mb-20">
            <h2 className="mb-6 font-serif text-3xl font-bold text-foreground">Typography</h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Logo Fonts */}
              <Card className="border-2 border-border bg-card p-6">
                <h3 className="mb-4 font-serif text-xl font-bold text-foreground">Logo Fonts</h3>
                <div className="space-y-6">
                  <div>
                    <div className="mb-2 text-sm text-muted-foreground">
                      Press Start 2P (hytale)
                    </div>
                    <div className="rounded-lg bg-background p-4">
                      <div
                        className="text-2xl font-bold"
                        style={{
                          fontFamily: '"Press Start 2P", monospace',
                          color: "#8B4FC1",
                          textShadow: "2px 2px 0 #3D3D3D",
                        }}
                      >
                        hytale
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 text-sm text-muted-foreground">
                      Minecraft/Minecrafter (GG)
                    </div>
                    <div className="rounded-lg bg-background p-4">
                      <div
                        className="font-bold"
                        style={{
                          fontFamily: "monospace",
                          fontSize: "2rem",
                          color: "#FFB800",
                          textShadow: "2px 2px 0 #3D3D3D",
                          letterSpacing: "0.1em",
                        }}
                      >
                        GG
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Website Fonts */}
              <Card className="border-2 border-border bg-card p-6">
                <h3 className="mb-4 font-serif text-xl font-bold text-foreground">Website Fonts</h3>
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 text-sm text-muted-foreground">Geist Sans (Body)</div>
                    <div className="font-sans text-lg text-foreground">
                      The quick brown fox jumps over the lazy dog
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 text-sm text-muted-foreground">Montserrat (Headings)</div>
                    <div className="font-serif text-2xl font-bold text-foreground">
                      Heading Example
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 text-sm text-muted-foreground">Geist Mono (Code)</div>
                    <div className="font-mono text-sm text-foreground">play.hytale.gg:25565</div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Component Registry */}
          <section className="mb-20">
            <h2 className="mb-6 font-serif text-3xl font-bold text-foreground">Component Registry</h2>
            <div className="grid gap-6">
              {/* Buttons */}
              <Card className="border-2 border-border bg-card p-6">
                <h3 className="mb-4 font-serif text-lg font-bold text-foreground">Buttons</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small Button</Button>
                  <Button>Default Button</Button>
                  <Button size="lg">Large Button</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </Card>

              {/* Badges */}
              <Card className="border-2 border-border bg-card p-6">
                <h3 className="mb-4 font-serif text-lg font-bold text-foreground">Badges</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              </Card>

              {/* Cards */}
              <Card className="border-2 border-border bg-card p-6">
                <h3 className="mb-4 font-serif text-lg font-bold text-foreground">Cards</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="p-4">
                    <h4 className="mb-2 font-semibold text-foreground">Card Title</h4>
                    <p className="text-sm text-muted-foreground">
                      Card content with standard styling
                    </p>
                  </Card>
                  <Card className="border-2 border-primary p-4">
                    <h4 className="mb-2 font-semibold text-foreground">Featured Card</h4>
                    <p className="text-sm text-muted-foreground">With primary border accent</p>
                  </Card>
                  <Card className="bg-muted p-4">
                    <h4 className="mb-2 font-semibold text-foreground">Muted Card</h4>
                    <p className="text-sm text-muted-foreground">Alternative background</p>
                  </Card>
                </div>
              </Card>
            </div>
          </section>

          {/* Design Tokens */}
          <section className="mb-20">
            <h2 className="mb-6 font-serif text-3xl font-bold text-foreground">Design Tokens</h2>
            <Card className="border-2 border-border bg-card p-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <h3 className="mb-4 font-mono text-sm font-bold text-foreground">Core Tokens</h3>
                  <div className="space-y-2 font-mono text-xs">
                    <TokenRow name="--background" value="#050505" />
                    <TokenRow name="--foreground" value="#F9FAFB" />
                    <TokenRow name="--primary" value="#8B4FC1" />
                    <TokenRow name="--secondary" value="#FFB800" />
                    <TokenRow name="--border" value="#262626" />
                    <TokenRow name="--radius" value="0.625rem" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 font-mono text-sm font-bold text-foreground">
                    Brand-Specific Tokens
                  </h3>
                  <div className="space-y-2 font-mono text-xs">
                    <TokenRow name="--grass" value="#7CBD3E" />
                    <TokenRow name="--grass-dark" value="#5A9C27" />
                    <TokenRow name="--dirt" value="#8B6F47" />
                    <TokenRow name="--highlight" value="#FFB800" />
                  </div>
                </div>
              </div>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

