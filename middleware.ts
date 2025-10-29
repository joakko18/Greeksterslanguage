// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'es']; // Add 'gr' for Greek language support
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already includes a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Already localized — continue as normal
    return NextResponse.next();
  }

  // Clone the URL (avoid mutating request.nextUrl directly)
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;

  // Perform the redirect
  return NextResponse.redirect(url);
}

export const config = {
  // Matcher excludes API routes, Next static files, and common assets
  matcher: ['/((?!api|_next|favicon.ico|images|locales).*)'],
  
};