'use client';

import { useState } from 'react';

interface ImageCarouselProps {
  imagesByLang: Record<string, string[]>; // Dictionary: lang -> images
  altText?: string;
  lang?: string; // Optional current language
}

export default function ImageCarousel({
  imagesByLang,
  altText = 'Carousel image',
  lang = 'default', // fallback if not provided
}: ImageCarouselProps) {
  // Resolve images for the given language, fallback to 'default' or first key
  const images =
    imagesByLang[lang] ||
    imagesByLang['default'] ||
    Object.values(imagesByLang)[0] ||
    [];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    setCurrentIndex(isFirstSlide ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    setCurrentIndex(isLastSlide ? 0 : currentIndex + 1);
  };

  if (!images || images.length === 0) {
    return (
      <div className="text-center p-4 bg-gray-100 text-blue-300 rounded-md">
        No images to display.
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto rounded-lg overflow-hidden shadow-xl">
      {/* Current Image */}
      <img
        src={images[currentIndex]}
        alt={`${altText} ${currentIndex + 1}`}
        className="w-full h-80 object-cover"
      />

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-500 bg-opacity-70 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        aria-label="Previous image"
      >
        &#10094;
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-500 bg-opacity-70 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        aria-label="Next image"
      >
        &#10095;
      </button>

      {/* Dots navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-blue-500' : 'bg-blue-200'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}