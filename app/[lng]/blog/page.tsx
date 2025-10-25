// app/[lng]/blog/page.tsx
import Image from 'next/image';

import ScrollReveal from '../../components/UI/ScrollReveal';
import { useTranslation } from '../../i18n';
import { defaultNS } from '../../i18n/settings';
import ArticleList from '@/app/components/blog/ArticleList'; // <-- Import the new component

// Correct: Accept params as a Promise and await it
export default async function BlogPage({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params;
  const { t } = await useTranslation(lng, defaultNS);

  return (
    <>
      {/* === Hero Section (Blog Header) === */}
      <section
        className="relative py-32 md:py-48 text-center bg-cover bg-center"
        style={{
          // Using a darker/more conceptual background image (you can update this path)
          backgroundImage: 'url("https://res.cloudinary.com/desem7vhd/image/upload/v1717325983/web-dev-team-1_n5y79x.jpg")',
        }}
      >
        {/* Dark overlay for better text contrast (Black/Green tonality) */}
        <div className="absolute inset-0 bg-black/70 opacity-80"></div>
        <div className="relative z-10 text-white container mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-extrabold mb-6 animate-fadeIn drop-shadow-lg text-[#e4f1d4]">
            {t('blog_hero_title', 'Our Blog')}
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 opacity-0 animate-slideUp drop-shadow delay-300">
            {t('blog_hero_subtitle', 'Insights and articles about language, culture, and travel.')}
          </p>
        </div>
      </section>

      {/* === Blog Article Grid Section (Now uses ArticleList) === */}
      <ScrollReveal delay={100} threshold={0.2}>
        <section className="py-16 bg-white text-gray-900">
          <div className="container mx-auto px-4">
            {/* Main Title: Black text for readability */}
            <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">{t('latest_articles_title', 'Latest Articles')}</h2>
            
            {/* RENDER DYNAMIC ARTICLES HERE */}
            <ArticleList lng={lng} /> 
            
          </div>
        </section>
      </ScrollReveal>

      {/* === Call to Action / Categories Section (Remains static) === */}
      <ScrollReveal delay={300} threshold={0.2}>
        {/* Reversed gradient direction and color for contrast (Green/White/Black) */}
        <section className="py-16 bg-gradient-to-r from-[#e4f1d4] to-white text-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-extrabold mb-10 text-gray-900">{t('blog_categories_title', 'Explore Our Categories')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Category 1 */}
              <div className="p-6 bg-white rounded-lg shadow-lg border border-green-300">
                <h3 className="text-2xl font-semibold mb-3 text-green-700">{t('blog_cat_1_title', 'Language')}</h3>
                <p className="text-gray-700">{t('blog_cat_1_description', 'Grammar tips, vocabulary, and learning techniques.')}</p>
              </div>
              {/* Category 2 */}
              <div className="p-6 bg-white rounded-lg shadow-lg border border-green-300">
                <h3 className="text-2xl font-semibold mb-3 text-green-700">{t('blog_cat_2_title', 'Culture')}</h3>
                <p className="text-gray-700">{t('blog_cat_2_description', 'Greek history, customs, traditions, and mythology.')}</p>
              </div>
              {/* Category 3 */}
              <div className="p-6 bg-white rounded-lg shadow-lg border border-green-300">
                <h3 className="text-2xl font-semibold mb-3 text-green-700">{t('blog_cat_3_title', 'Travel')}</h3>
                <p className="text-gray-700">{t('blog_cat_3_description', 'Destination guides, travel tips, and regional spotlights.')}</p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}