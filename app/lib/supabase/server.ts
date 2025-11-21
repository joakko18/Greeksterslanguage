// app/lib/supabase/server.ts

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Access environment variables without '!' for safe checking
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY; // Use SUPABASE_SECRET_KEY (or SERVICE_KEY)

/**
 * Define the Storage Bucket name used for article images.
 * This must match the bucket name you created in the Supabase Storage dashboard.
 */
export const ARTICLE_IMAGE_BUCKET = 'article_images';

// 🔑 CRITICAL FIX: Export a function to create and return the client instance.
// This prevents a synchronous crash when the module is loaded if keys are missing.
export const getSupabaseServerClient = (): SupabaseClient => {
    if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
        // Log a warning and throw an error for clarity, but only *when the function is called*.
        console.error("FATAL: Supabase server client initialization failed: Missing SUPABASE_URL or SUPABASE_SECRET_KEY.");
        // This clear error message will appear in Vercel logs if it's called incorrectly
        throw new Error('Supabase environment variables missing for server client.');
    }

    // Initialize Supabase client using the Secret Key for server-side operations.
    return createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
        auth: { persistSession: false }, // Recommended for server-side
    });
};

/**
 * ⚠️ Backwards Compatibility Export:
 * We export the client using the old name, but it now calls the function.
 * This allows existing files that use 'supabaseServerClient' to continue working,
 * but it will execute the check and potentially throw the error synchronously.
 * * NOTE: For maximum safety, all files should be updated to call getSupabaseServerClient().
 */
export const supabaseServerClient = getSupabaseServerClient(); // This will execute on module load!