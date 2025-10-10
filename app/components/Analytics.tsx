'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const Analytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Check if the current path is the homepage in any language
    if (pathname === '/' || pathname === '/en' || pathname === '/ita' || pathname === '/gr') {
      // Check if the script has already been loaded
      if (!window.gtag) {
        // Load the Google Analytics script
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=G-K8F0S73QM5`; // Replace G-XXXXXXXXXX with your Measurement ID
        script.async = true;
        document.head.appendChild(script);

        // Initialize the data layer and send a page view
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() {
          window.dataLayer.push(arguments);
        };
        window.gtag('js', new Date());
        window.gtag('config', 'G-K8F0S73QM5'); // Replace with your Measurement ID
      }
    }
  }, [pathname]);

  return null;
};

export default Analytics;