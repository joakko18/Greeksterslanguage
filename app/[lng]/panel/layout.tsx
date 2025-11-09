import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import React from 'react';
import type { ReactNode } from 'react';

// 🔑 REMOVED: import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/cookies';

interface PanelLayoutProps {
  children: ReactNode;
  params: { lng: string };
}

export default async function PanelLayout({
  children,
  params,
}: PanelLayoutProps) {
  
  // 1. AWAIT the cookies() function. 
  // We use 'await' to satisfy the VSC TypeScript check that the returned Promise is resolved.
  // We let TypeScript infer the correct type instead of manually importing an internal type.
  const cookieStore = await cookies(); 
  
  // 2. Await params before destructuring 'lng'.
  // This satisfies the Next.js runtime check for using dynamic APIs synchronously.
  const resolvedParams = await Promise.resolve(params);
  const { lng: currentLocale } = resolvedParams;

  // 3. Read the token flag using the resolved cookie object.
  const accessToken = cookieStore.get('supabase-temp-token')?.value;

  // 4. Protection Check
  if (!accessToken) { 
    console.log(`[FUNCTIONAL CHECK] No 'supabase-temp-token' found. Redirecting to /${currentLocale}`);
    const loginPath = `/${currentLocale}`;
    return redirect(loginPath); 
  }

  // If the functional token flag is present, access is granted.
  return <div className="admin-layout">{children}</div>;
}