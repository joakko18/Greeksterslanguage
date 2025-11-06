// app/[lng]/panel/layout.tsx
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import React from 'react';

export default async function PanelLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lng: string }; 
}) {
  
  // 🔑 FIX 1: AWAIT cookies(). This satisfies the specific error in your environment
  // and resolves the Promise type, allowing you to use the .get() method.
  const cookieStore = await cookies();
  
  // FIX 2: Keep the params workaround to avoid the "sync dynamic APIs" runtime error.
  const getParams = async () => params;
  const { lng: currentLocale } = await getParams();

  // 🔑 CRITICAL FIX: Read the simple, client-set token flag
  const accessToken = cookieStore.get('supabase-temp-token')?.value;

  // 3. Protection Check
  if (!accessToken) { 
    console.log(`[FUNCTIONAL CHECK] No 'supabase-temp-token' found. Redirecting to /${currentLocale}`);
    const loginPath = `/${currentLocale}`;
    return redirect(loginPath); 
  }

  // If the functional token flag is present, access is granted.
  return <div className="admin-layout">{children}</div>;
}