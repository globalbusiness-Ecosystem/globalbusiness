'use client';

import { useEffect, useState } from 'react';
import { PaymentButton } from './payment-button';

const CAROUSEL_IMAGES = [
  { 
    id: 1, 
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop'
  },
  { 
    id: 2, 
    image: 'https://images.unsplash.com/photo-1617638924702-92f37fcb18ad?w=1200&h=600&fit=crop'
  },
  { 
    id: 3, 
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=1200&h=600&fit=crop'
  },
  { 
    id: 4, 
    image: 'https://images.unsplash.com/photo-1677442d019cecf4d4a92c293ffc61ff0f726bb13?w=1200&h=600&fit=crop'
  },
  { 
    id: 5, 
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&h=600&fit=crop'
  },
  { 
    id: 6, 
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=600&fit=crop'
  },
  { 
    id: 7, 
    image: 'https://images.unsplash.com/photo-1556821552-5a0e0e0e0b0a?w=1200&h=600&fit=crop'
  },
  { 
    id: 8, 
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=600&fit=crop'
  },
  { 
    id: 9, 
    image: 'https://images.unsplash.com/photo-1460925895917-adf4e565db8b?w=1200&h=600&fit=crop'
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full pt-16">
      {/* Carousel Container */}
      <div className="relative w-full h-96 overflow-hidden">
        {/* Slides */}
        {CAROUSEL_IMAGES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <img 
              src={slide.image} 
              alt={`Carousel slide ${index + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        ))}

        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <h1 className="text-4xl font-bold text-white mb-2 text-center px-4">
            GlobalBusiness Ecosystem
          </h1>
          <p className="text-lg text-yellow-300 text-center px-4">
            Invest, trade, and explore 9 platforms across 195 countries
          </p>
          {/* CTA Section with Payment Button */}
          <div className="mt-8 flex gap-4 items-center justify-center px-4 flex-wrap">
            <button className="px-6 py-3 bg-transparent border-2 border-yellow-500 text-yellow-500 font-bold rounded-lg hover:bg-yellow-500 hover:text-black transition-all duration-200">
              Learn More
            </button>
            <PaymentButton />
          </div>
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center items-center gap-2 py-6 bg-black">
        {CAROUSEL_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'w-8 bg-yellow-500'
                : 'w-3 bg-gray-600 hover:bg-gray-500'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
