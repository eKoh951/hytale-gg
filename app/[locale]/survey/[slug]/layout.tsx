import { pick } from 'es-toolkit';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';

export default async function SurveySlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={pick(messages as Record<string, unknown>, ['survey'])}>
      {children}
    </NextIntlClientProvider>
  );
}
