// app/utils/supabase/client.ts

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables—must be present in .env.local and Vercel settings
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let client: SupabaseClient | undefined;

if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    // 🔑 FIX: Only create the client instance if the variables are explicitly present.
    // If they are undefined during build, the 'client' variable remains 'undefined',
    // which prevents the Supabase constructor from throwing the error.
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
    // Optional: Log a warning during build if keys are missing but required later.
    console.warn("Supabase client not initialized: Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.");
}

// Export the initialized client (or undefined if not initialized)
// You may need to handle the 'undefined' case where this is used,
// or ensure this file is only imported in client components where keys are guaranteed.
export const supabase = client as SupabaseClient;