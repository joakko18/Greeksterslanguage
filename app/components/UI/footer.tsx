// components/UI/footer.tsx

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/app/i18n';
import { defaultNS } from '@/app/i18n/settings';

interface FooterProps {
  lng: string;
  id?: string; // Add the optional id prop to the interface
}

const Footer = async ({ lng, id }: FooterProps) => {
  const { t } = await useTranslation(lng, defaultNS);

  return (
    // Assign the ID to the footer element
    <footer id={id} className="bg-[#e4f1d4] text-black-500 py-12 md:py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center md:text-left">

        {/* Column 1: Brand Info & Description */}
        <div>
          <h3 className="text-2xl font-bold text-blue-900 mb-3">Arete Digital</h3>
          <p className="text-sm leading-relaxed mb-4">
            {t('footer_brand_description')}
          </p>
          <p className="text-xs md:text-sm opacity-75">
            &copy; {new Date().getFullYear()} {t('footer_copyright')}
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-blue-900 mb-4">{t('footer_links_heading')}</h3>
          <ul className="text-sm space-y-2">
            <li>
              <Link href={`/${lng}`} className="hover:text-blue-700 transition-colors duration-200">{t('footer_home_link')}</Link>
            </li>
            <li>
              <Link href={`/${lng}/about`} className="hover:text-blue-700 transition-colors duration-200">{t('about_hero_title')}</Link>
            </li>
            
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-blue-900 mb-4">{t('footer_connect_heading')}</h3>
          <div className="text-sm space-y-2">
            <p>
              <span className="font-medium">{t('email_prefix')}:</span> <a href={`mailto:${t('footer_email_address')}`} className="hover:text-blue-700 transition-colors duration-200">{t('footer_email_address')}</a>
            </p>
            <p>
              <span className="font-medium">{t('phone_prefix')}:</span> <a href={`tel:${t('footer_phone_number')}`} className="hover:text-blue-700 transition-colors duration-200">{t('footer_phone_number')}</a>
            </p>
            <p className="mt-4 font-medium">{t('footer_address_heading')}:</p>
            <p>{t('footer_address_line1')}</p>
            <p>{t('footer_address_line2')}</p>
          </div>
        </div>

       {/* Column 4: Social Media */}
<div>
  <h3 className="text-xl font-semibold text-blue-900 mb-3">{t('footer_social_media')}</h3>
  <div className="flex flex-wrap justify-center md:justify-start gap-4">
    <a href="https://www.facebook.com/" className="w-10 h-10" aria-label="Facebook">
      <img src="https://res.cloudinary.com/desem7vhd/image/upload/v1741073760/Facebook_Logo_Primary_uidern.png" alt="Facebook" />
    </a>
    <a href="https://www.instagram.com/" className="w-10 h-10" aria-label="Instagram">
      <img src="https://res.cloudinary.com/desem7vhd/image/upload/v1741074251/Instagram_Glyph_Gradient_md0zct.png" alt="Instagram" />
    </a>
    <a href="https://www.whatsapp.com/" className="w-10 h-10" aria-label="Whatsapp">
      <img src="https://res.cloudinary.com/desem7vhd/image/upload/v1741074023/Digital_Glyph_Green_kn0fud.png" alt="Whatsapp" />
    </a>
  </div>
</div>
      </div>
    </footer>
  );
};

export default Footer;