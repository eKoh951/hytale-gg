import { pick } from 'es-toolkit';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function SurveySlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={pick(messages as Record<string, unknown>, ['survey'])}>
      {children}
    </NextIntlClientProvider>
  );
}
