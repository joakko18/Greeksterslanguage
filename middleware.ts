// middleware.ts (TEMPORARILY NEUTRALIZED)

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // 🛑 TEMPORARILY BYPASS ALL LOGIC 🛑
    return NextResponse.next();
}

export const config = {
    // Keep the matcher active, but the function above does nothing.
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|locales).*)'],
    
    // KEEP THIS LINE to ensure we've covered the runtime issue
    runtime: 'nodejs', 
};