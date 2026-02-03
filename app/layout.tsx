import { Inter, JetBrains_Mono, Press_Start_2P } from "next/font/google";
import React, { type ReactNode } from "react";

import { cn } from "@/lib/utils";

import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

export const metadata = {
  title: "hytale.GG - Find Your Perfect Hytale Server",
  description:
    "The premier mobile-first server directory for Hytale. Discover servers, test your ping, watch creator reviews, and find your perfect community.",
  keywords: ["hytale", "server", "directory", "gaming", "minecraft", "servers"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        inter.variable,
        jetbrainsMono.variable,
        pressStart.variable,
        "bg-background text-foreground antialiased",
      )}
    >
      <body className="min-h-screen bg-background">{children}</body>
    </html>
  );
}
