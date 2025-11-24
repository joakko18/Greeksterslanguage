// app/api/articles/count/route.ts (Corrected)

// 🔑 IMPORT THE SAFE GETTER FUNCTION
import { getSupabaseServerClient } from '@/app/lib/supabase/server';
import { NextResponse } from 'next/server';

// 💡 Recommended for API routes that fetch fresh data
export const dynamic = 'force-dynamic';

/**
 * GET handler for fetching the total count of articles in the database.
 */
export async function GET() {
    
    try {
        // 🔑 Initialize the Supabase client safely inside the function
        const supabase = getSupabaseServerClient(); 
        
        // Use select with a count option to ONLY get the count, not the data rows.
        const { count, error } = await supabase
            .from('articles')
            .select('*', { count: 'exact', head: true }); // 'head: true' returns no data, only the count

        if (error) {
            console.error("Article count fetch error (Supabase):", error);
            return NextResponse.json({ error: 'Database count query failed.' }, { status: 500 });
        }

        // Return the count as a simple JSON object
        return NextResponse.json({ count: count ?? 0 });

    } catch (error) {
        // This catch block now also safely handles the error if environment variables 
        // are missing when getSupabaseServerClient() is called at runtime.
        console.error("Unexpected error in article count API route:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}