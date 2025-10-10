import Image from 'next/image';

import ScrollReveal from '../../components/UI/ScrollReveal';
import { useTranslation } from '../../i18n';
import { defaultNS } from '../../i18n/settings';

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
            {t('blog_hero_title', 'Our Blog')} {/* Updated title key */}
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 opacity-0 animate-slideUp drop-shadow delay-300">
            {t('blog_hero_subtitle', 'Insights and articles about language, culture, and travel.')} {/* Updated subtitle key */}
          </p>
        </div>
      </section>

      {/* === Blog Article Grid Section === */}
      <ScrollReveal delay={100} threshold={0.2}>
        <section className="py-16 bg-white text-gray-900">
          <div className="container mx-auto px-4">
            {/* Main Title: Black text for readability */}
            <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">{t('latest_articles_title', 'Latest Articles')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {/* Card 1: Article Preview */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden transition-transform duration-300 hover:shadow-2xl hover:-translate-y-1">
                <Image src="/images/web-dev-1.jpg" alt={t('blog_article1_alt')} width={500} height={300} className="w-full h-56 object-cover" />
                <div className="p-6">
                  {/* Title: Green accent for a pop of color */}
                  <h3 className="text-2xl font-bold text-green-700 mb-2">{t('blog_article1_title', 'The History of the Greek Alphabet')}</h3>
                  <p className="text-gray-600 mb-4">{t('blog_article1_description', 'A look into the ancient origins and modern usage of the Hellenic letters...')}</p>
                  
                </div>
              </div>
              {/* Card 2: Article Preview */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden transition-transform duration-300 hover:shadow-2xl hover:-translate-y-1">
                <Image src="/images/web-dev-2.jpg" alt={t('blog_article2_alt')} width={500} height={300} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-green-700 mb-2">{t('blog_article2_title', '7 Must-Visit Hidden Gems of the Peloponnese')}</h3>
                  <p className="text-gray-600 mb-4">{t('blog_article2_description', 'Go beyond the main tourist attractions and discover authentic Greek experiences...')}</p>
                  
                </div>
              </div>
              {/* Card 3: Article Preview */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden transition-transform duration-300 hover:shadow-2xl hover:-translate-y-1">
                <Image src="/images/web-dev-3.jpg" alt={t('blog_article3_alt')} width={500} height={300} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-green-700 mb-2">{t('blog_article3_title', 'Learning Greek Slang: What the Textbooks Miss')}</h3>
                  <p className="text-gray-600 mb-4">{t('blog_article3_description', 'Mastering the common phrases that will make you sound like a local...')}</p>
                  
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* === Call to Action / Categories Section === */}
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