// app/components/UI/StickyHeader.tsx
'use client'; // MUST be a client component

import { useState, useEffect } from 'react';
import Link from 'next/link';

// 🚀 DISCRETE IMPORT: Import the Admin Auth component
import AdminAuthButton from './adminpage/AdminAuthButton';

interface StickyHeaderProps {
  lng: string;
}

export default function StickyHeader({ lng }: StickyHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navItems = [
    { name: 'Home', href: `/${lng}` },
    { name: 'About Us', href: `/${lng}/#about-section` },
    { name: 'Blog', href: `/${lng}/blog` },
    { name: 'Contact Us', href: `/${lng}/#contact` },
  ];

  // Adjusted navPillClasses to accommodate the new button by adjusting space-x
  const navPillClasses = `
    flex items-center 
     space-x-4 md:space-x-6 lg:space-x-8  {/* Reduced space slightly to fit the button */}
    px-8 py-3 rounded-full transition-all duration-300 ease-in-out
    
    font-bold text-sm md:text-base whitespace-nowrap
    
    ${scrolled
      // SCROLLED STATE
      ? 'border border-white border-opacity-50 backdrop-blur-xl shadow-lg text-gray-700 bg-white/50' // Added bg-white/50 for contrast
      // UNSCROLLED STATE
      : 'bg-transparent shadow-none border-transparent text-gray-900' 
    }
  `;
  
  const headerContainerClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
    flex justify-center items-center py-5
    ${scrolled ? '' : 'py-7'}
  `;

  return (
    <header className={headerContainerClasses}>
      <nav className={navPillClasses}>
        {/* 1. Render Navigation Links */}
        {navItems.map((item) => (
          <Link 
            key={item.name} 
            href={item.href} 
            className="hover:text-green-700 transition-colors duration-300" 
          >
            {item.name}
          </Link>
        ))}
        
        {/* Separator for better visual grouping */}
        <div className="w-px h-6 bg-gray-300 opacity-50 mx-2"></div> 

        {/* 2. Render the Admin/Auth Button */}
        <AdminAuthButton />
      </nav>
    </header>
  );
}