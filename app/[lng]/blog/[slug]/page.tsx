// app/[lng]/blog/[slug]/page.tsx
// ...existing code...
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useTranslation } from '@/app/i18n';
import { defaultNS } from '@/app/i18n/settings';
import { supabaseServerClient } from '@/app/lib/supabase/server';

// ----------------------------------------
// 0. GENERATE STATIC PARAMS
// ----------------------------------------
export async function generateStaticParams(): Promise<Array<{ lng: string; slug: string }>> {
  const supabase = supabaseServerClient;

  const { data: articles, error } = await supabase.from('articles').select('lng, slug');

  if (error || !articles) {
    console.error('Failed to fetch articles for static generation:', error);
    return [];
  }

  return articles.map((article: any) => ({
    lng: article.lng,
    slug: article.slug,
  }));
}

// ----------------------------------------
// 1. DATA SHAPES
// ----------------------------------------
interface ArticleData {
  id: string;
  slug: string;
  title: string;
  image_url: string;
  created_at: string;
  content: string;
  lang: string;
}

// ----------------------------------------
// 2. HELPERS
// ----------------------------------------
const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

// ----------------------------------------
// 3. PAGE COMPONENT
// Use inline props type to avoid conflicts with Next's PageProps constraint.
// Next may pass params as a Promise, so accept both and await params.
// ----------------------------------------
export default async function ArticleDetailPage({
  params,
}: {
  params: { lng: string; slug: string } | Promise<{ lng: string; slug: string }>;
}) {
  // Await params in case Next provides a Promise
  const { lng, slug } = await params;

  // Translation (server-side)
  const { t } = await useTranslation(lng, defaultNS);

  // Fetch the article from Supabase
  const { data, error } = await supabaseServerClient
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('lang', lng)
    .limit(1)
    .single();

  if (error || !data) {
    console.error('Supabase Article Fetch Error:', error);
    notFound();
  }

  const article: ArticleData = data as ArticleData;

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
        <div className="relative w-full h-96 md:h-[500px] mb-12 rounded-xl overflow-hidden shadow-2xl bg-gray-100">
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            style={{ objectFit: 'contain' }}
            sizes="100vw"
            priority
          />
        </div>

        {/* Article Content */}
        <section className="article-content prose prose-lg max-w-none text-gray-800">
          <div className="leading-relaxed whitespace-pre-wrap">{article.content}</div>
        </section>

        {/* Back Button */}
        <div className="mt-16 text-center">
          <a
            href={`/${lng}/blog`}
            className="inline-flex items-center text-green-700 hover:text-green-900 font-semibold transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            {t('back_to_blog', 'Back to Blog')}
          </a>
        </div>
      </div>
    </article>
  );
}
// ...existing code...