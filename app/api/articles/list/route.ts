import { supabaseServerClient } from '@/app/lib/supabase/server';// app/api/articles/list/route.ts


import { NextResponse } from 'next/server';

// Interface for the data you are fetching
interface MinimalArticle {
    id: string;
    title: string;
    lang: string | null;
}

/**
 * GET handler for fetching a minimal list of articles for the ArticleDeleter component.
 * This route is highly optimized to only return id, title, and lang.
 */
export async function GET(request: Request) {
    // 🎯 Use your specific server client import
    // 'supabaseServerClient' is a SupabaseClient instance — do not call it as a function.
    const supabase = supabaseServerClient;

    try {
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
        console.error("Unexpected error in minimal API route:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}