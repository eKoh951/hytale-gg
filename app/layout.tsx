import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import React, { type ReactNode } from "react";
import type { Metadata, Viewport } from "next";

import { cn } from "@/lib/utils";
import { AuthProvider } from "@/components/auth/auth-provider";
import "@/app/globals.css";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: 'hytale.GG',
  description: 'Discover and join the best Hytale servers. Find gaming communities, creators, and server guides.',
  applicationName: 'hytale.GG',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'hytale.GG',
  },
  formatDetection: {
    telephone: false,
  },
};

const GeistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const GeistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const MontserratSerif = Montserrat({
  subsets: ["latin"],
  variable: "--font-serif",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
        MontserratSerif.variable,
        "bg-background text-foreground",
      )}
    >
      <body className="min-h-screen bg-background">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
