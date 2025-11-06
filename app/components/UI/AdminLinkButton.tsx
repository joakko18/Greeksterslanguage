'use client';

import { useRouter } from 'next/navigation'; 
import { ChevronRight } from 'lucide-react'; 
// 🔑 IMPORT CONTEXT
import { useAuth } from '@/app/context/AuthContext'; 

interface AdminLinkButtonProps {
    lng: string;
    text: string;
}

export default function AdminLinkButton({ lng, text }: AdminLinkButtonProps) {
    const router = useRouter(); 
    
    // 🔑 READ GLOBAL LOGIN STATUS
    const { isLoggedIn } = useAuth(); 

    const handleNavigation = (e: React.MouseEvent) => {
        e.preventDefault();
        router.push(`/${lng}/panel`); 
    };

    // 🔑 HIDE BY DEFAULT: If not logged in, return null (the desired behavior)
    if (!isLoggedIn) {
        return null; 
    }

    // RENDER ONLY IF LOGGED IN
    return (
        <button 
            onClick={handleNavigation}
            className="inline-flex items-center justify-center group z-30
                      bg-white text-gray-800 font-semibold text-sm 
                      py-2 px-4 rounded-full 
                      shadow-xl transition-all duration-300 
                      border-2 border-green-500 
                      hover:bg-green-500 hover:text-white hover:shadow-2xl 
                      transform hover:scale-105"
        >
            {text}
            <ChevronRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
    );
}