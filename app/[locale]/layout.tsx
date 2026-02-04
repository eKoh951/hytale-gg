import React, { type ReactNode } from "react";
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

import { AuthProvider } from "@/components/auth/auth-provider";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import "@/app/globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
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

  // Load messages for the current locale
  const messages = await getMessages({ locale });

  return (
    <>
      <AuthProvider>
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </AuthProvider>
    </>
  );
}
