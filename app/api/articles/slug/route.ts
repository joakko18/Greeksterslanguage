import { NextResponse } from 'next/server';
import { supabaseServerClient } from '@/app/lib/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } } // ✅ Inline type instead of Context interface
) {
  const { slug } = params;

  // 1. Get the language query parameter from the URL (e.g., ?lang=en)
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang');

  if (!lang) {
    return NextResponse.json({ error: 'Missing language parameter (lang) in query.' }, { status: 400 });
  }

  if (!slug) {
    return NextResponse.json({ error: 'Missing article slug in path.' }, { status: 400 });
  }

  try {
    // 2. Query Supabase for the single article matching both slug AND language
    const { data: article, error } = await supabaseServerClient
      .from('articles')
      .select('*') // Select ALL fields, as this is the detail page
      .eq('slug', slug)
      .eq('lang', lang)
      .limit(1)
      .single();

    if (error) {
      console.error('Supabase Detail Fetch Error:', error);
      return NextResponse.json({ error: 'Failed to fetch article details.' }, { status: 500 });
    }

    if (!article) {
      return NextResponse.json({ error: 'Article not found.' }, { status: 404 });
    }

    // 3. Return the article
    return NextResponse.json(article, { status: 200 });

  } catch (error) {
    console.error('General API Error:', error);
    return NextResponse.json({ error: 'Internal server error during article fetching.' }, { status: 500 });
  }
}