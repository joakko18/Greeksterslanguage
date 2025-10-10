import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { dir } from 'i18next';
// We no longer need Image, DropdownMenu, LanguageSwitcher imports here
// because they are now wrapped inside StickyHeader.
// import Image from 'next/image'; 
// import DropdownMenu from '../components/UI/DropdownMenu';
import { languages } from '../i18n/settings';
import { I18nProvider } from '../i18n/client'; // Keep if used elsewhere
// import LanguageSwitcher from '../components/LanguageSwitcher';
import Footer from '../components/UI/footer';
import { useTranslation } from '../i18n';
import FloatingModalButton from '../components/UI/FloatingModalButton';
import Analytics from '../components/Analytics';
// Import the new sticky header component
import StickyHeader from '../components/UI/StickyHeader'; // <<< NEW IMPORT

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
          
          {/* === REMOVED THE OLD STATIC HEADER AND REPLACED WITH STICKYHEADER === */}
          <StickyHeader lng={lng} /> 

          {/* The main content needs padding-top (pt) equal to the height of your fixed header.
            Your original header used py-4, making it around 70px + (8px*2 padding) = ~86px high.
            We will use pt-24 (which is 96px in Tailwind) to ensure clearance, or you can use 
            a specific value like pt-[88px] if you measure the exact height.
          */}
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