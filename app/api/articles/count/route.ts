// app/api/articles/count/route.ts

import { supabaseServerClient } from '@/app/lib/supabase/server';
import { NextResponse } from 'next/server';

/**
 * GET handler for fetching the total count of articles in the database.
 * This is highly optimized by using the 'count' option directly in the query.
 */
export async function GET() {
    const supabase = supabaseServerClient;

    try {
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
        console.error("Unexpected error in article count API route:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}