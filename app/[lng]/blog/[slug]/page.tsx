// app/[lng]/blog/[slug]/page.tsx

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useTranslation } from '@/app/i18n';
import { defaultNS } from '@/app/i18n/settings';
// IMPORT THE SECURE SERVER CLIENT HERE:
import { supabaseServerClient } from '@/app/lib/supabase/server'; 

// ----------------------------------------
// 1. DEFINE TYPES
// ----------------------------------------
interface FullArticle {
    id: string; 
    slug: string;
    title: string;
    image_url: string;
    created_at: string;
    content: string; // The full content
    lang: string;
}

// Define the expected route parameters
interface ArticlePageProps {
    params: {
        lng: string;
        slug: string;
    };
}

// ----------------------------------------
// 2. HELPER FUNCTIONS
// ----------------------------------------

// Helper to format the date
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

// ----------------------------------------
// 3. SERVER COMPONENT LOGIC (Simplified)
// ----------------------------------------

// Server Component to fetch and display the article
export default async function ArticleDetailPage({ params }: ArticlePageProps) {
    const { lng, slug } = params;
    
    // Fetch translation data
    const { t } = await useTranslation(lng, defaultNS);

    // --- 1. DIRECT Supabase Query (Simplified!) ---
    // Query Supabase for the single article matching both slug AND language
    const { data, error } = await supabaseServerClient
        .from('articles')
        .select('*') // Select ALL fields
        .eq('slug', slug) // Filter by the unique slug from the path
        .eq('lang', lng) // Filter by the language from the path
        .limit(1)
        .single();
        
    if (error || !data) {
        console.error("Supabase Article Fetch Error:", error);
        // If article not found or a query error occurs, show 404
        notFound(); 
    }

    const article: FullArticle = data;
    // ----------------------------------------

    return (
        <article className="py-16 md:py-24 bg-white text-gray-900">
            <div className="container mx-auto px-4 max-w-4xl">
                
                {/* Article Header */}
                <header className="mb-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
                        {article.title}
                    </h1>
                    <p className="text-lg text-gray-500">
                        {t('published_on', 'Published on')} {formatDate(article.created_at)}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                        {t('language', 'Language')}: {article.lang.toUpperCase()}
                    </p>
                </header>

               {/* Featured Image */}
{/* Use a fixed height (h-96 or h-[500px]) for a large, visible image container */}
<div className="relative w-full h-96 md:h-[500px] mb-12 rounded-xl overflow-hidden shadow-2xl bg-gray-100"> 
    <Image
        src={article.image_url}
        alt={article.title}
        fill
        // -----------------------------------------------------------------
        // KEY CHANGE: Use 'contain' to show the whole image, no cropping
        // -----------------------------------------------------------------
        style={{ objectFit: 'contain' }}
        sizes="100vw"
        priority
    />
</div>

                {/* Article Content (Full Display) */}
                <section className="article-content prose prose-lg max-w-none text-gray-800">
                    <div className="leading-relaxed whitespace-pre-wrap">
                        {article.content}
                    </div>
                </section>
                
                {/* Simple Back Button */}
                <div className="mt-16 text-center">
                    <a href={`/${lng}/blog`} className="inline-flex items-center text-green-700 hover:text-green-900 font-semibold transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        {t('back_to_blog', 'Back to Blog')}
                    </a>
                </div>

            </div>
        </article>
    );
}