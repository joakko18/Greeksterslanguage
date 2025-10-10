'use client'; // This component needs to run on the client-side

import { useRef, useEffect, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number; // Optional delay in milliseconds before animation starts
  threshold?: number; // How much of the item needs to be visible to trigger (0 to 1)
}

export default function ScrollReveal({ children, delay = 0, threshold = 0.1 }: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Set isVisible to true if the element is intersecting, otherwise set it to false
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: threshold, // Trigger when 10% of the element is visible
      }
    );

    const currentRef = domRef.current; // Capture currentRef for cleanup

    if (currentRef) {
      observer.observe(currentRef);
    }

    // Cleanup function
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]); // Only re-run effect if threshold changes

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}