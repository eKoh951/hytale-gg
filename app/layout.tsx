import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import React, { type ReactNode } from "react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

import { cn } from "@/lib/utils";
import { AuthProvider } from "@/components/auth/auth-provider";
import { NextIntlClientProvider } from "next-intl";
import "@/app/globals.css";

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
        <Header />
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
