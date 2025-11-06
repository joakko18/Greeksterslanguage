// app/[lng]/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';

import AdminLinkButton from '../components/UI/AdminLinkButton';

import ImageCarousel from '../components/UI/ImageCarousel';
import ScrollReveal from '../components/UI/ScrollReveal';
import ProjectCard from '../components/UI/ProjectCard';
import { useTranslation } from '../i18n';
import { defaultNS } from '../i18n/settings';

// Correct: Accept params as a Promise and await it
export default async function HomePage({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params;
  const { t } = await useTranslation(lng, defaultNS);

  <ImageCarousel
  lang={lng}
  imagesByLang={{
    it: [
      'https://example.com/italian1.jpg',
      'https://example.com/italian2.jpg',
    ],
    eng: [
      'https://example.com/english1.jpg',
      'https://example.com/english2.jpg',
    ],
    default: [
      'https://example.com/default1.jpg',
      'https://example.com/default2.jpg',
    ],
  }}
  altText={t('history_tours_alt')}
/>

  return (
    // Note: The main body background is often set in a global CSS file or the root layout.
    // We are changing the backgrounds of the specific <section> tags here.
    <>
      {/* Hero Section */}
      <section
        className="relative py-14 md:py-18 text-center bg-cover bg-center"
        style={{
          backgroundImage: 'url("/images/web-dev-hero.jpg")',
        }}
      >
        <div className="absolute top-5 right-5 z-40">
          <AdminLinkButton lng={lng} text={t('admin_panel_button_text')} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white-500 to-transparent opacity-60"></div>
        <div className="relative z-10 text-white container mx-auto px-4">
          
          {/* === HERO TITLE: REPLACED TEXT WITH IMAGE === */}
          <div className="mb-2 animate-fadeIn drop-shadow-lg flex justify-center">
            <Image
              src="https://res.cloudinary.com/desem7vhd/image/upload/v1759926339/greeksters/Evmaria-removebg-preview_nd9ivk.png"
              alt={t('hero_title')} // Use the translation key for the alt text
              width={450} // Adjust this width to control the size of the logo
              height={100} // Adjust this height for aspect ratio
              className="w-64 md:w-96 h-auto" // Optional: Tailwind classes for responsiveness
            />
          </div>
          {/* ========================================== */}

           {/* === TARGET DIV: Service list div with image added === */}
          <div className="bg-[#e4f1d4] bg-opacity-90 backdrop-filter backdrop-blur-sm text-white p-6 md:p-8 rounded-lg shadow-xl max-w-4xl mx-auto mb-8 opacity-0 animate-slideUp delay-200">
            
            {/* NEW IMAGE BLOCK: Centered, 80% width */}
            <div className="flex justify-center mb-4">
              <div className="relative w-4/5 h-auto"> {/* w-4/5 makes it 80% of its parent div width */}
                <Image
                  src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq6MQSva9N0roEa8sCPQRIFd7dkipKAmywM75S9wwMYSi2bj_GRJ3Kh0Hc0uKAfHuxRRyGooHYMSrACOhg_mXSX_a4A2GJqsXcEKfWhMeRlfGPKt4KqHss-khwquaHF40acB1k=s680-w680-h510"
                  alt={t('hero_title')} // Using a relevant alt text
                  width={500} // Set a large enough intrinsic width for better scaling
                  height={500} // Set a large enough intrinsic height
                  className="w-full h-auto rounded-lg" // Occupies 100% of the 80% wrapper
                  unoptimized={true} // Needed for external URL
                />
              </div>
            </div>
            
            {/* ... (Service list div content remains the same) ... */}
          </div>
          {/* ==================================================== */}
          <p className="text-xl text-black md:text-2xl max-w-3xl mx-auto mb-10 opacity-0 animate-slideUp drop-shadow delay-300">
            {t('hero_subtitle')}
          </p>

          
        </div>
      </section>
      <ScrollReveal delay={50} threshold={0.1}>
        <section className="py-12 bg-white-50 border-t border-b border-black/5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-extrabold text-black-900 mb-8 text-center">
              {t('lessons_section_title', 'Learn Greek with Us')}
            </h2>
            
            {/* 4-Column Grid for Lesson Info */}
            <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8 text-center">
              
              {/* Column 1: Languages */}
              <div className="p-4">
                <h3 className="text-xl font-bold text-black-800 mb-2">
                  {t('lesson_col_1_title', 'Different Languages')}
                </h3>
                <p className="text-gray-600">
                  {t('lesson_col_1_description', 'We Offer our lessons in different languages!')}
                </p>
              </div>

              {/* Column 2: Personal Lessons */}
              <div className="p-4">
                <h3 className="text-xl font-bold text-black-800 mb-2">
                  {t('lesson_col_2_title', 'Personal Lessons')}
                </h3>
                <p className="text-gray-600">
                  {t('lesson_col_2_description', 'Manage and track progress with personalized schedules and direct feedback.')}
                </p>
              </div>
              
              {/* Column 3: Group Lessons */}
              <div className="p-4">
                <h3 className="text-xl font-bold text-black-800 mb-2">
                  {t('lesson_col_3_title', 'Group Lessons')}
                </h3>
                <p className="text-gray-600">
                  {t('lesson_col_3_description', 'Adapt to diverse groups with localization for clear communication and enhanced learning.')}
                </p>
              </div>
              
              {/* Column 4: Courses */}
              <div className="p-4">
                <h3 className="text-xl font-bold text-black-800 mb-2">
                  {t('lesson_col_4_title', 'Structured Courses')}
                </h3>
                <p className="text-gray-600">
                  {t('lesson_col_4_description', 'Generate precise, visually compelling reports that illustrate your language progress.')}
                </p>
              </div>

            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Explore Our Services Section */}
<ScrollReveal delay={100} threshold={0.2}>
  <section id="about-section" className="py-16 bg-white border-t border-b border-black/5">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-back-300 mb-10 text-center">{t('explore_wonders_title')}</h2>
      
      {/* === CHANGE 1: Changed grid-cols-2 to grid-cols-3 for 3 narrower cards horizontally === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1 */}
        <ProjectCard
          lng={lng}
          imageSrc="/images/web-dev-1.jpg"
          frontTitle={t('beach_card_title')}
          frontDescription={t('beach_card_description')}
          imageAlt={t('beach_card_alt')}
          backContent={
            <>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">{t('Back_card_1_Title')}</h3>
              <p className="text-blue-800 mb-4">{t('Back_card_1_Description')}</p>
              <button className="bg-green-300 hover:bg-green-400 text-gray-800 font-bold py-2 px-4 rounded-full text-sm">
                {t('beach_card_button')}
              </button>
            </>
          }
        />
        
        {/* Card 2 */}
        <ProjectCard
          lng={lng}
          imageSrc="/images/web-dev-2.jpg"
          frontTitle={t('history_card_title')}
          frontDescription={t('history_card_description')}
          imageAlt={t('history_card_alt')}
          backContent={
            <>
              <h3 className="bg-[#e4f1d4] text-2xl font-bold text-blue-900 mb-2">{t('Back_card_2_Title')}</h3>
              <p className="text-blue-800 mb-4">{t('Back_card_2_Description')}</p>
              <button className="bg-green-300 hover:bg-green-400 text-gray-800 font-bold py-2 px-4 rounded-full text-sm">
                {t('history_card_button')}
              </button>
            </>
          }
        />
        
        {/* Card 3 */}
        <ProjectCard
          lng={lng}
          imageSrc="/images/web-dev-3.jpg"
          frontTitle={t('nature_card_title')}
          frontDescription={t('nature_card_description')}
          imageAlt={t('nature_card_alt')}
          backContent={
            <>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">{t('Back_card_3_Title')}</h3>
              <p className="text-blue-800 mb-4">{t('Back_card_3_Description')}</p>
              <button className="bg-green-300 hover:bg-green-400 text-gray-800 font-bold py-2 px-4 rounded-full text-sm">
                {t('nature_card_button')}
              </button>
            </>
          }
        />
        
        {/* Card 4 (The removed card) has been eliminated. */}
        
      </div>
    </div>
  </section>

      </ScrollReveal>

      {/* Project Recommendations Section */}
<ScrollReveal delay={200} threshold={0.2}>
  {/* === CHANGE: Changed section name/title from t('recommendations_title') to "Our Blog" === */}
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-black-900 mb-10 text-center">
        {/* Directly set the title text */}
        Our Blog
      </h2>
      <div className="grid grid-cols-1 gap-8">
        <div id="e-commerce-websites" className="p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-black-300 mb-3">{t('history_tours_title')}</h3>
          <p className="text-black-800 font-bold mb-8">
            {t('history_tours_description')}
          </p>
          <ImageCarousel
            lang={lng}
            imagesByLang={{
              
              en: [
                 // English countryside
              ],
              gr: [
               
              ],
            }}
            altText={t('Digital marketing_alt')}
          />
        </div>
        
      </div>
    </div>
  </section>
</ScrollReveal>
      

      {/* Why Choose Us Section */}
      <ScrollReveal delay={300} threshold={0.2}>
        {/* === CHANGE 3: Changed bg-gradient-to-b from-blue-50 to-blue-300 to bg-white === */}
        <section id="contact" className="py-16 bg-white text-black-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-10">
              {t('why_choose_us_title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-3 text-black-800 mb-3">
                  {t('why_choose_us_1_title')}
                </h3>
                <p className="font-semibold text-black-800">
                  {t('why_choose_us_1_description')}
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-3 text-black-800 mb-3">
                  {t('why_choose_us_2_title')}
                </h3>
                <p className="font-semibold text-black-800">
                  {t('why_choose_us_2_description')}
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-3 text-black-800 mb-3">
                  {t('why_choose_us_3_title')}
                </h3>
                <p className="font-semibold black-800">
                  {t('why_choose_us_3_description')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}


export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params;
  const { t } = await useTranslation(lng, defaultNS);

  // The language codes are now all consistent with the ISO standard
  const languages = ['en', 'it', 'gr'];
  const alternates: { [key: string]: string } = {};

  languages.forEach((lang) => {
    alternates[`${lang}`] = `https://www.aretedigital.eu/${lang}`;
  });

  alternates['x-default'] = `https://www.aretedigital.eu/en`;

  return {
    title: t('home_page_title'),
    description: t('home_page_description'),
    alternates: {
      canonical: `https://www.aretedigital.eu/${lng}`, // ✅ added canonical
      languages: alternates,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    openGraph: {
      title: t('home_page_title'),
      description: t('home_page_description'),
      url: `https://www.aretedigital.eu/${lng}`,
      siteName: 'Arete Digital',
      images: [
        {
          url: 'https://www.aretedigital.eu/og-image.jpg',
          width: 1200,
          height: 630,
          alt: t('og_image_alt_text'),
        },
      ],
      locale: lng,
      type: 'website',
    },
    manifest: '/site.webmanifest',
    icons: {
      icon: [
        { url: '/images/favicon.ico', type: 'image/x-icon' },
        { url: '/images/icon.png', type: 'image/png' },
      ],
    },
  };
}
