// app/api/articles/route.ts

import { NextResponse } from 'next/server';
import { getSupabaseServerClient, ARTICLE_IMAGE_BUCKET } from '@/app/lib/supabase/server'; 
import slugify from 'slugify'; 

// Configuration to handle file uploads (disables Next.js default body parser)
export const config = {
    api: {
        bodyParser: false,
    },
};

// 💡 NOTE: These are kept because handling FormData streaming often requires the 'nodejs' runtime, 
// and dynamic routing is used to prevent aggressive caching of the API response.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        // 🔑 1. INITIALIZE CLIENT SAFELY INSIDE THE FUNCTION
        const supabase = getSupabaseServerClient(); 
        // --------------------------------------------------
        
        // 2. Get FormData from the request
        const formData = await request.formData();
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const lang = formData.get('lang') as string;
        let slug = formData.get('slug') as string; 
        const imageFile = formData.get('image') as File | null;
        
        // Basic Validation
        if (!title || !content || !lang || !slug) {
            return NextResponse.json({ error: 'Missing required text fields.' }, { status: 400 });
        }
        if (!imageFile || imageFile.size === 0) {
            return NextResponse.json({ error: 'Featured image file is required.' }, { status: 400 });
        }

        // 3. Normalize Slug
        slug = slugify(slug, { lower: true, strict: true });
        
        // 4. Image Upload to Supabase Storage
        const fileExtension = imageFile.name.split('.').pop();
        // Create a unique file path: lang/slug-timestamp.ext
        const filePath = `${lang}/${slug}-${Date.now()}.${fileExtension}`;
        
        // Convert File to Buffer for Supabase upload
        const imageBuffer = Buffer.from(await imageFile.arrayBuffer());

        const { error: uploadError } = await supabase.storage // 🔑 USE LOCAL INSTANCE
            .from(ARTICLE_IMAGE_BUCKET)
            .upload(filePath, imageBuffer, {
                contentType: imageFile.type,
                cacheControl: '3600',
                upsert: false,
            });

        if (uploadError) {
            console.error('Supabase Upload Error:', uploadError);
            return NextResponse.json({ error: 'Failed to upload image. Check bucket name/permissions.' }, { status: 500 });
        }

        // 5. Get the public URL for the uploaded image
        const { data: { publicUrl } } = supabase.storage // 🔑 USE LOCAL INSTANCE
            .from(ARTICLE_IMAGE_BUCKET)
            .getPublicUrl(filePath);

        // 6. Insert new article record into the 'articles' table
        const { data, error: dbError } = await supabase // 🔑 USE LOCAL INSTANCE
            .from('articles')
            .insert({
                title,
                content,
                lang,
                slug,
                image_url: publicUrl, // Save the URL, not the file itself
            })
            .select('slug, id')
            .single();

        if (dbError) {
             // Rollback: If DB insert fails (e.g., due to slug/lang conflict), delete the uploaded image
             await supabase.storage.from(ARTICLE_IMAGE_BUCKET).remove([filePath]); // 🔑 USE LOCAL INSTANCE
             console.error('Supabase DB Insert Error:', dbError);
             return NextResponse.json({ error: 'Failed to save article data. Possible slug/language conflict.' }, { status: 500 });
        }

        // 7. Success
        return NextResponse.json({ 
            message: 'Article published successfully!', 
            slug: data.slug 
        }, { status: 201 });

    } catch (error) {
        console.error('General API Error:', error);
        return NextResponse.json({ error: 'Internal server error during article processing.' }, { status: 500 });
    }
}

// ------------------------------------------------------------------
// --- GET ALL ARTICLES FOR BLOG LIST PAGE ---
// ------------------------------------------------------------------

export async function GET(request: Request) {
    // 🔑 1. INITIALIZE CLIENT SAFELY INSIDE THE FUNCTION
    const supabase = getSupabaseServerClient(); 
    // --------------------------------------------------

    // 2. Get the language query parameter from the URL (e.g., ?lang=en)
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang');

    if (!lang) {
        return NextResponse.json({ error: 'Missing language parameter (lang).' }, { status: 400 });
    }

    try {
        // 3. Query Supabase for articles matching the language
        const { data: articles, error } = await supabase // 🔑 USE LOCAL INSTANCE
            .from('articles')
            .select('slug, title, image_url, created_at, content') // Select all necessary fields
            .eq('lang', lang) // Filter by language
            .order('created_at', { ascending: false }); // Sort by newest first

        if (error) {
            console.error('Supabase Fetch Error:', error);
            return NextResponse.json({ error: 'Failed to fetch articles from database.' }, { status: 500 });
        }
        
        // 4. Simple response with article data
        return NextResponse.json(articles, { status: 200 });

    } catch (error) {
        console.error('General API Error:', error);
        return NextResponse.json({ error: 'Internal server error during article fetching.' }, { status: 500 });
    }
}

// ------------------------------------------------------------------
// --- DELETE ARTICLE ---
// ------------------------------------------------------------------

export async function DELETE(request: Request) {
    // 🔑 1. INITIALIZE CLIENT SAFELY INSIDE THE FUNCTION
    const supabase = getSupabaseServerClient(); 
    // --------------------------------------------------
    
    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get('id');

    if (!articleId) {
        return NextResponse.json({ error: 'Missing article ID for deletion.' }, { status: 400 });
    }

    try {
        // 2. First, fetch the article data to get the image_url and slug
        const { data: article, error: fetchError } = await supabase // 🔑 USE LOCAL INSTANCE
            .from('articles')
            .select('slug, lang, image_url')
            .eq('id', articleId)
            .single();

        if (fetchError || !article) {
             // If we can't find it, it might already be deleted or the ID is invalid
             return NextResponse.json({ error: 'Article not found or fetch error during pre-deletion check.' }, { status: 404 });
        }
        
        // Extract the file path (this assumes the path structure: lang/slug-timestamp.ext)
        // We need to parse the image_url to get the path in storage
        const filePathSegment = article.image_url.split(`${ARTICLE_IMAGE_BUCKET}/`)[1];
        
        // 3. Delete the article record from the database
        const { error: dbError } = await supabase // 🔑 USE LOCAL INSTANCE
            .from('articles')
            .delete()
            .eq('id', articleId);

        if (dbError) {
            console.error('Supabase DB Delete Error:', dbError);
            return NextResponse.json({ error: 'Failed to delete article data.' }, { status: 500 });
        }

        // 4. Delete the associated image from storage (Crucial cleanup step!)
        if (filePathSegment) {
             const { error: storageError } = await supabase.storage // 🔑 USE LOCAL INSTANCE
                 .from(ARTICLE_IMAGE_BUCKET)
                 .remove([filePathSegment]);

             if (storageError) {
                 // Log storage error but still return success for DB deletion
                 console.warn('Storage Cleanup Warning: Failed to delete image file:', storageError);
             }
        }
        
        // 5. Success
        return NextResponse.json({ message: 'Article and associated image deleted successfully.' }, { status: 200 });

    } catch (error) {
        console.error('General API Error during deletion:', error);
        return NextResponse.json({ error: 'Internal server error during deletion process.' }, { status: 500 });
    }
}