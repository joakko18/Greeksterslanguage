import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import React from 'react';
import type { ReactNode } from 'react';

// 🔑 CRITICAL FIX: Define the required type for 'params' as a Promise
// This satisfies the Vercel/Next.js compiler for async layout components.
interface PanelLayoutProps {
  children: ReactNode;
  params: Promise<{ lng: string }>; // ⬅️ TYPED AS A PROMISE
}

export default async function PanelLayout({
  children,
  params,
}: PanelLayoutProps) {
  
  // 1. AWAIT the params property BEFORE using it.
  // This satisfies both the type check and the runtime "sync-dynamic-apis" error.
  const resolvedParams = await params; 
  const { lng: currentLocale } = resolvedParams;

  // 2. AWAIT the cookies() function. 
  // This satisfies the VSC TypeScript check that the returned object is resolved.
  const cookieStore = await cookies(); 
  
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