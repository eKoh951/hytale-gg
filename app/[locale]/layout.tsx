import React, { type ReactNode } from "react";
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';

import { AuthProvider } from "@/components/auth/auth-provider";
import { MotionProvider } from "@/components/motion-provider";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import "@/app/globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://hytale.gg'),
};

export default async function LocaleLayout({
  children,
  params
}: Readonly<Props>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <AuthProvider>
      <MotionProvider>
        <NextIntlClientProvider messages={null}>
          {children}
        </NextIntlClientProvider>
      </MotionProvider>
    </AuthProvider>
  );
}
