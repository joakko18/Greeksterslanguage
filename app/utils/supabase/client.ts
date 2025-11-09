// app/utils/supabase/client.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 🔑 BEST PRACTICE: Use a simple function to get the client instead of a global export
// to ensure it's only called when needed, avoiding double initialization issues.

export const getSupabaseClient = (): SupabaseClient => {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        // We throw here because the client is useless without the keys
        throw new Error('Supabase URL or Key not found in environment variables.');
    }
    // Return a new client instance, or use a cached instance if you implement caching
    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
};

// If you must use a global export, use this corrected, safe initialization:
let supabaseClientInstance: SupabaseClient | undefined;

if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    supabaseClientInstance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

export const supabase = supabaseClientInstance as SupabaseClient; // Use this 