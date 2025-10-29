// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'es']; // Add 'gr' for Greek language support
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- ADD THESE LOGS ---
  console.log(`[Middleware] Incoming request for path: ${pathname}`);
  // --- END LOGS ---

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    console.log(`[Middleware] Path "${pathname}" already has a locale. Proceeding.`); // Added for debugging
    return NextResponse.next();
  }

  // --- ADD THESE LOGS ---
  console.log(`[Middleware] No locale found in path "${pathname}". Redirecting to /${defaultLocale}${pathname}`);
  // --- END LOGS ---

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // This matcher should cover all paths that are not static files or API routes
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|locales).*)'],
};