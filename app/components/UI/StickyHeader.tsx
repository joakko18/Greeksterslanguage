// app/components/UI/StickyHeader.tsx
'use client'; // MUST be a client component

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
    // === ADJUSTMENT: Link "About Us" to the anchor ID on the home page. ===
    // This tells Next.js to go to the home page (/[lng]) and then scroll to the anchor (#about-section).
    { name: 'About Us', href: `/${lng}/#about-section` },
    { name: 'Blog', href: `/${lng}/blog` },
    { name: 'Contact Us', href: `/${lng}/#contact` },
  ];

  // Tailwind classes for the main navigation pill
  const navPillClasses = `
    flex items-center space-x-6 md:space-x-8 lg:space-x-10
    px-8 py-3 rounded-full transition-all duration-300 ease-in-out
    
    {/* === ADJUSTMENT: Reduced font size from text-base/md:text-lg to text-sm/md:text-base === */}
    font-bold text-sm md:text-base whitespace-nowrap
    
    ${scrolled
      // SCROLLED STATE
      ? 'border border-white border-opacity-50 backdrop-blur-xl shadow-lg text-gray-700' 
      // UNSCROLLED STATE
      : 'bg-transparent shadow-none border-transparent text-gray-900' 
    }
  `;
  
  // Adjusted header container classes (no change needed here for this request)
  const headerContainerClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
    flex justify-center items-center py-5
    ${scrolled ? '' : 'py-7'}
  `;

  return (
    <header className={headerContainerClasses}>
      <nav className={navPillClasses}>
        {navItems.map((item) => (
          <Link 
            key={item.name} 
            href={item.href} 
            // === CHANGE: Added duration-300 to control the speed of the transition.
            className="hover:text-gray-200 transition-colors duration-700" 
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}