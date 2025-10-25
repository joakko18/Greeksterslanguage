// app/lib/supabase/server.ts
import { createClient } from '@supabase/supabase-js';

// Get credentials from environment variables set in .env.local
// The '!' tells TypeScript that these variables are definitely defined at runtime (on the server).
const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY!; // Your sb_secret_... key

if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
    // This check is important for throwing a clear error if the .env.local file is missing keys
    throw new Error('Missing Supabase environment variables for server client. Please check .env.local for SUPABASE_URL and SUPABASE_SECRET_KEY.');
}

/**
 * Initialize Supabase client using the Secret Key for server-side operations.
 * This client has ADMIN privileges and is used for secure API Routes.
 */
export const supabaseServerClient = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);

/**
 * Define the Storage Bucket name used for article images.
 * This must match the bucket name you created in the Supabase Storage dashboard.
 */
export const ARTICLE_IMAGE_BUCKET = 'article_images';