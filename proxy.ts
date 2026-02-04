import { type NextRequest } from "next/server"
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { updateSession } from "./lib/supabase/proxy"

// Create next-intl middleware
const handleI18nRouting = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  // First, handle i18n routing (locale detection and redirects)
  const i18nResponse = handleI18nRouting(request);
  
  // Then, handle Supabase session management
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api, _next/static, _next/image, favicon.ico, static files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|trpc|_next|_vercel|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}