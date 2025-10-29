// app/components/LanguageSwitcher.tsx (Assuming this path)
'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';

interface LanguageSwitcherProps {
    lng: string;
}

export default function LanguageSwitcher({ lng }: LanguageSwitcherProps) {
    const { t } = useTranslation(lng);
    const pathname = usePathname();

    const getPathname = (targetLng: string) => {
        const parts = pathname.split('/');
        if (parts.length > 1 && parts[1] === lng) {
            parts[1] = targetLng;
            return parts.join('/');
        }
        return `/${targetLng}${pathname}`;
    };

    return (
        <div className="flex space-x-2 bg-white/30 backdrop-blur-sm rounded-full p-1 shadow-lg 
                      sm:p-1 md:p-2"> 
            
            {/* Link for English (EN) */}
            <Link
                href={getPathname('en')}
                className={`px-2 py-0.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 
                          bg-center bg-cover bg-[url('https://res.cloudinary.com/desem7vhd/image/upload/v1756573067/Dise%C3%B1o_sin_t%C3%ADtulo_2_co6lyu.png')] ${
                              lng === 'en' ? 'bg-green-300 text-white' : 'text-gray-950 font-bold hover:bg-gray-100'
                          }`}
            >
                EN
            </Link>
            
            {/* 🎯 CHANGE 3: Link for Spanish (ES) */}
            <Link
                href={getPathname('es')} // Changed from 'gr'
                className={`px-2 py-0.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 
                          bg-center bg-cover bg-[url('https://res.cloudinary.com/desem7vhd/image/upload/v1756573051/Bandiera_italiana_dhlq6k.png')] ${ // Placeholder for Spanish flag
                              lng === 'es' ? 'bg-green-300 text-white' : 'text-gray-950 font-bold hover:bg-gray-100' // Changed from 'gr'
                          }`}
            >
                ES {/* Changed from GR */}
            </Link>
        </div>
    );
}