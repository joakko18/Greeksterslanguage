// app/api/articles/list/route.ts (Corrected)

import { getSupabaseServerClient } from '@/app/lib/supabase/server'; // 🔑 SAFE IMPORT
import { NextResponse } from 'next/server';

// Interface for the data you are fetching
interface MinimalArticle {
    id: string;
    title: string;
    lang: string | null;
}

// 💡 Recommended for API routes that fetch fresh data
export const dynamic = 'force-dynamic';

/**
 * GET handler for fetching a minimal list of articles for the ArticleDeleter component.
 */
export async function GET(request: Request) {
    
    try {
        // 🔑 Initialize the Supabase client safely inside the function
        const supabase = getSupabaseServerClient();
        // --------------------------------------------------

        // Fetch ONLY the columns required: id, title, lang
        const { data, error } = await supabase
            .from('articles')
            .select('id, title, lang')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Minimal article list fetch error (Supabase):", error);
            return NextResponse.json({ error: 'Database query failed to retrieve minimal list.' }, { status: 500 });
        }

        // Ensure data is treated as the correct minimal type
        const minimalArticles: MinimalArticle[] = (data || []) as MinimalArticle[];

        return NextResponse.json(minimalArticles);

    } catch (error) {
        // This catch block will now safely handle the environment variable crash on Vercel
        console.error("Unexpected error in minimal API route:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}