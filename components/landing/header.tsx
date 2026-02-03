"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Servers", href: "/servers" },
  { label: "Creators", href: "/creators" },
  { label: "List a Server", href: "/submit" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-emerald-900/50 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 backdrop-blur-md shadow-lg">
      {/* Horizontal stripe pattern for blocky game aesthetic */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.2) 0px,
            rgba(0, 0, 0, 0.2) 2px,
            transparent 2px,
            transparent 8px
          )`,
        }}
      />

      {/* Vertical column pattern for depth */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            rgba(90, 200, 60, 0.3) 0px,
            rgba(90, 200, 60, 0.3) 1px,
            transparent 1px,
            transparent 10px
          )`,
        }}
      />

      {/* Left deep shadow for 3D effect */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-black/30 via-black/10 to-transparent" />
      
      {/* Right deep shadow for 3D effect */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-l from-black/30 via-black/10 to-transparent" />

      {/* Bottom glow/shadow for layered effect */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-b from-transparent via-black/20 to-black/40" />

      {/* Top highlight for magical feel */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-emerald-300/30 to-transparent" />

      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/h-gg.png"
            alt="hytale.GG"
            width={80}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-secondary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            className="group relative px-4 py-2 text-sm font-medium text-foreground transition-all duration-150 active:translate-y-1"
            style={{
              border: "3px solid hsl(var(--border))",
              background: "transparent",
              boxShadow: "0 4px 0 hsl(var(--border))",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.boxShadow = "0 1px 0 hsl(var(--border))";
              e.currentTarget.style.transform = "translateY(3px)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 0 hsl(var(--border))";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 0 hsl(var(--border))";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Sign In
          </button>
          <button
            className="group relative px-6 py-2 text-sm font-bold text-secondary-foreground transition-all duration-150 active:translate-y-1"
            style={{
              background: "hsl(var(--secondary))",
              border: "3px solid hsl(var(--secondary))",
              boxShadow: "0 6px 0 rgba(0, 0, 0, 0.2), 0 4px 0 hsl(var(--secondary))",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.boxShadow = "0 1px 0 rgba(0, 0, 0, 0.2), 0 1px 0 hsl(var(--secondary))";
              e.currentTarget.style.transform = "translateY(5px)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.boxShadow = "0 6px 0 rgba(0, 0, 0, 0.2), 0 4px 0 hsl(var(--secondary))";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 6px 0 rgba(0, 0, 0, 0.2), 0 4px 0 hsl(var(--secondary))";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-foreground md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "border-b border-border bg-background md:hidden",
          mobileMenuOpen ? "block" : "hidden",
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
            <button
              className="px-4 py-2 text-sm font-medium text-foreground transition-all"
              style={{
                border: "3px solid hsl(var(--border))",
                background: "transparent",
                boxShadow: "0 4px 0 hsl(var(--border))",
              }}
            >
              Sign In
            </button>
            <button
              className="px-6 py-2 text-sm font-bold text-secondary-foreground transition-all"
              style={{
                background: "hsl(var(--secondary))",
                border: "3px solid hsl(var(--secondary))",
                boxShadow: "0 6px 0 rgba(0, 0, 0, 0.2), 0 4px 0 hsl(var(--secondary))",
              }}
            >
              Get Started
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
