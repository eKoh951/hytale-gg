import {redirect} from 'next/navigation';
import {headers} from 'next/headers';

// This page handles the root path - the middleware will detect locale and redirect
// For users with Spanish browser settings, they'll be redirected to /es
// For users with English browser settings, they'll be redirected to /en
export default async function RootPage() {
  // Get the locale from the middleware's locale detection
  // The middleware will handle the redirect based on user's preferred locale
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
 
  redirect(`/${locale}`);
}