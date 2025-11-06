// app/utils/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

// Environment variables—must be present in .env.local
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a single client instance that gets reused
// This is the CRITICAL fix for the "Multiple GoTrueClient instances" error.
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);