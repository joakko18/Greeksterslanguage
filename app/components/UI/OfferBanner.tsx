'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/app/i18n/client';
import Link from 'next/link';

interface Offer {
  title: string;
  link: string;
}

const offers: Offer[] = [
  // IMPORTANT: Use the full international number without symbols or spaces (e.g., 306940702320)
  { title: 'offer_banner_1', link: 'https://wa.me/306940702320' },
  { title: 'offer_banner_2', link: 'https://wa.me/306940702320' },
  { title: 'offer_banner_3', link: 'https://wa.me/306940702320' },
];

export default function OfferBanner({ lng }: { lng: string }) {
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const { t } = useTranslation(lng, 'translation');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentOfferIndex((prevIndex) => (prevIndex + 1) % offers.length);
    }, 5000); // Change offer every 5 seconds

    return () => clearInterval(timer); // Cleanup the timer
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white text-center py-6 px-8 shadow-lg overflow-hidden relative h-12">
      <div
        className="absolute inset-0 transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateY(-${currentOfferIndex * 100}%)` }}
      >
        {offers.map((offer, index) => (
          <div key={offer.title} className="w-full h-full flex items-center justify-center">
            <Link href={offer.link} className="text-sm font-semibold hover:underline px-4">
              {t(offer.title)}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}