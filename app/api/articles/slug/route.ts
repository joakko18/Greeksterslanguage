// app/api/articles/[slug]/route.ts
import { NextResponse } from 'next/server';
import { supabaseServerClient } from '@/app/lib/supabase/server';

// NOTE: The custom 'Context' interface has been removed.

// Define the expected parameters directly in the function signature.
export async function GET(
    request: Request, 
    { params }: { params: { slug: string } } // <-- CORRECT TYPING for dynamic route segment
) {
    // Destructure the slug directly from the params object
    const { slug } = params; 

    // 1. Get the language query parameter from the URL (e.g., ?lang=en)
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang');

    if (!lang) {
        return NextResponse.json({ error: 'Missing language parameter (lang) in query.' }, { status: 400 });
    }

    if (!slug) {
        // NOTE: This check is technically redundant for a dynamic route, 
        // as the slug must exist for the route to be hit, but we keep it for safety.
        return NextResponse.json({ error: 'Missing article slug in path.' }, { status: 400 });
    }

    try {
        // 2. Query Supabase for the single article matching both slug AND language
        const { data: article, error } = await supabaseServerClient
            .from('articles')
            .select('*') // Select ALL fields, as this is the detail page
            .eq('slug', slug) // Filter by the unique slug from the path
            .eq('lang', lang) // Filter by the language from the query
            .limit(1) // Expect only one result
            .single(); // Return as a single object

        if (error) {
            console.error('Supabase Detail Fetch Error:', error);
            return NextResponse.json({ error: 'Failed to fetch article details.' }, { status: 500 });
        }
        
        if (!article) {
            return NextResponse.json({ error: 'Article not found.' }, { status: 404 });
        }

        // 3. Simple response with the full article data
        return NextResponse.json(article, { status: 200 });

    } catch (error) {
        console.error('General API Error:', error);
        return NextResponse.json({ error: 'Internal server error during article fetching.' }, { status: 500 });
    }
}