"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { HeaderClient } from "./header-client";
import { createClient } from "@/lib/supabase/server";

function AnimatedLogo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/"
      className="flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "relative h-8 transition-all duration-500 ease-out",
          isHovered ? "w-[180px]" : "w-[66px]"
        )}
      >
        {/* Short logo - h.gg - fades out first with slight scale */}
        <Image
          src="/h-gg.png"
          alt="hytale.GG"
          width={80}
          height={32}
          className={cn(
            "h-8 w-auto absolute left-0 transition-all duration-300 ease-in",
            isHovered ? "opacity-0 scale-95" : "opacity-100 scale-100"
          )}
          priority
        />

        {/* Full logo - hytale.GG - reveals from left to right after fade */}
        <div
          className={cn(
            "absolute left-0 top-0 h-8 overflow-hidden transition-all ease-out",
            isHovered
              ? "w-[180px] opacity-100 delay-150 duration-500"
              : "w-0 opacity-0 duration-200"
          )}
        >
          <Image
            src="/hytale-gg.png"
            alt="hytale.GG"
            width={180}
            height={32}
            className={cn(
              "h-8 w-auto transition-transform duration-500 ease-out",
              isHovered ? "translate-x-0" : "-translate-x-4"
            )}
            priority
          />
        </div>
      </div>
    </Link>
  );
}

export async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b-2 border-border">
      {/* Full-width background */}
      <div className="absolute inset-0 bg-background/95 backdrop-blur-md">
        {/* Subtle pixelated block pattern background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-3"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='20' height='20' stroke='%23000000' stroke-width='1' fill='none'/%3E%3Crect x='20' y='20' width='20' height='20' stroke='%23000000' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Content container - CONSTRAINED WIDTH */}
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <AnimatedLogo />

        {/* Client-side components with user state */}
        <HeaderClient user={user} />
      </div>
    </header>
  );
}
