import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/proxy";

export async function middleware(request: NextRequest) {
  const { supabase, response } = await createClient(request);

  // Refresh user session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protected routes
  const protectedRoutes = ["/protected"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  // Redirect to login if trying to access protected route without auth
  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Redirect to home if logged in and trying to access auth pages
  const authRoutes = ["/auth/login", "/auth/sign-up"];
  const isAuthRoute = authRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL("/protected", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
