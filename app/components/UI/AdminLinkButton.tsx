// app/components/UI/AdminLinkButton.tsx
'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react'; 

interface AdminLinkButtonProps {
  lng: string;
  text: string;
}

export default function AdminLinkButton({ lng, text }: AdminLinkButtonProps) {
  return (
    <Link 
      href="/panel" 
      // === FIXES ===
      // 1. Reduced size: py-2 px-4 (smaller padding) and text-sm (smaller font).
      // 2. Added z-30: Ensures it is clickable over any hero section overlays.
      // 3. Added 'group': Enables the icon animation on hover.
      className="inline-flex items-center justify-center group z-30
                 bg-white text-gray-800 font-semibold text-sm 
                 py-2 px-4 rounded-full 
                 shadow-xl transition-all duration-300 
                 border-2 border-green-500 
                 hover:bg-green-500 hover:text-white hover:shadow-2xl 
                 transform hover:scale-105"
    >
      {text}
      {/* Icon animation now correctly uses group-hover due to 'group' class on the Link */}
      <ChevronRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}