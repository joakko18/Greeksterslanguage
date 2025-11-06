// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';

// Note: You can remove 'createMiddlewareClient' and 'jwtVerify' imports 
// if they are only used for authentication, which we are removing.

const locales = ['en', 'es']; 
const defaultLocale = 'en';

// --- No Authentication Variables or Logic Here ---

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // Diagnostic log is helpful to see the flow, but keep it simple
    console.log(`[MIDDLEWARE] Checking path for locale: ${pathname}`);
    
    // --- 1. Localization Logic ---
    
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (!pathnameHasLocale) {
        // Redirect to default locale if none is present
        const url = request.nextUrl.clone();
        url.pathname = `/${defaultLocale}${pathname}`;
        return NextResponse.redirect(url);
    }
    
    // We are no longer checking for a session or redirecting unauthorized users here.
    return NextResponse.next();
}

export const config = {
    // Keep the matcher to ensure localization runs on all routes
    matcher: ['/((?!api|_next|favicon.ico|images|locales|static|assets).*)'],
};