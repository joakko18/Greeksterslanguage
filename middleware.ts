// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 🎯 CHANGE 1: Update supported locales to English and Spanish
const locales = ['en', 'es']; 
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        return NextResponse.next();
    }

    // Redirect to default locale if no locale is found
    request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    // This matcher should cover all paths that are not static files or API routes
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|locales).*)'],
    
    
};