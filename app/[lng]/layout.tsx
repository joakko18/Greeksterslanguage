import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { dir } from 'i18next';
// Removed unused imports
import { languages } from '../i18n/settings';
import { I18nProvider } from '../i18n/client'; // Keep if used elsewhere
import Footer from '../components/UI/footer';
import { useTranslation } from '../i18n';
import FloatingModalButton from '../components/UI/FloatingModalButton';
import Analytics from '../components/Analytics';
import StickyHeader from '../components/UI/StickyHeader'; // <<< NEW IMPORT
// 🎯 NEW IMPORT: Import the LanguageSwitcher component
import LanguageSwitcher from '../components/LanguageSwitcher'; 

const inter = Inter({ subsets: ['latin'] });

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { lng } = await params;

  return (
    <html lang={lng} dir={dir(lng)} key={lng}>
      {/* === CHANGE: Added bg-white class to the body tag === */}
      <body className={`${inter.className} bg-white`}>
        <FloatingModalButton lng={lng} />
        <div className="flex flex-col min-h-screen">
          
          {/* === STICKY HEADER === */}
          <StickyHeader lng={lng} /> 

          {/* 🎯 PLACEMENT: Add the LanguageSwitcher here. 
             If you want it visible only when scrolling, place it inside StickyHeader.
             I'll place it at the top level for demonstration, wrapped in a fixed position div
             to keep it accessible, but this may overlap with the header. 
             The best practice is to put it inside the <StickyHeader /> component.
          */}
          <div className="fixed top-24 right-4 z-50 md:top-6 md:right-6">
              <LanguageSwitcher lng={lng} />
          </div>


          <main className="flex-grow pt-[88px]"> {/* <<< ADDED PADDING-TOP HERE */}
            {children}
          </main>

          {/* Pass the id to the Footer component */}
          <Footer lng={lng} id="footer-contact" />
          
        </div>
        <Analytics /> {/* Add the Analytics component here */}
      </body>
    </html>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params;
  const { t } = await useTranslation(lng);
  return {
    title: t('home_page_title'),
    description: t('home_page_description'),
     icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' }, // For browser tab
      { url: '/icon.png', type: 'image/png' },       // For Google search results
    ],
  },
  };
}