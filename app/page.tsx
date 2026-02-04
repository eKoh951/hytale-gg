import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

// Root page - Middleware detects locale and sets x-locale header
// Priority: Cookie → Supabase → Browser → Default
export default async function RootPage() {
  // Get locale detected by middleware
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
 
  redirect(`/${locale}`);
}