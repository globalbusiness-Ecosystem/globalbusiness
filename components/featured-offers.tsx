'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FEATURED_OFFERS = [
  {
    id: 1,
    platform: 'Real Estate',
    title: 'Premium Properties Await',
    description: 'Invest in Global Real Estate Markets',
    url: 'https://re-global-main.vercel.app',
    bgColor: 'from-orange-600 to-orange-900',
    bgImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=600&fit=crop',
  },
  {
    id: 2,
    platform: 'Gold',
    title: 'Pure Gold Investments',
    description: 'Secure Your Wealth with Bullion',
    url: 'https://finegold.vercel.app',
    bgColor: 'from-yellow-500 to-yellow-700',
    bgImage: 'https://images.unsplash.com/photo-1610375885868-89a6b0200e71?w=1200&h=600&fit=crop',
  },
  {
    id: 3,
    platform: 'Motor',
    title: 'Exclusive Vehicle Deals',
    description: 'Browse Global Automotive Market',
    url: 'https://global-motor.vercel.app',
    bgColor: 'from-blue-600 to-blue-900',
    bgImage: 'https://images.unsplash.com/photo-1553882900-d5160ca3fc10?w=1200&h=600&fit=crop',
  },
  {
    id: 4,
    platform: 'Aladdin AI',
    title: 'AI-Powered Solutions',
    description: 'Experience Intelligent Automation',
    url: 'https://aladdin-ai-rho.vercel.app',
    bgColor: 'from-purple-600 to-purple-900',
    bgImage: 'https://images.unsplash.com/photo-1677442d019cecf8916543dcf5d3c36dae1f5be0?w=1200&h=600&fit=crop',
  },
  {
    id: 5,
    platform: 'Weavers',
    title: 'Premium Textiles Collection',
    description: 'Discover Quality Fabrics & Clothing',
    url: 'https://global-weavers.vercel.app',
    bgColor: 'from-pink-600 to-pink-900',
    bgImage: 'https://images.unsplash.com/photo-1552860547-97e03d6cfc26?w=1200&h=600&fit=crop',
  },
  {
    id: 6,
    platform: 'Dhualqarnayn',
    title: 'Heritage & Legacy',
    description: 'Explore Islamic Heritage Collections',
    url: 'https://dhualqarnayn.vercel.app',
    bgColor: 'from-yellow-800 to-yellow-950',
    bgImage: 'https://images.unsplash.com/photo-1564500580646-2ad0fbf82ad3?w=1200&h=600&fit=crop',
  },
  {
    id: 7,
    platform: 'PNC',
    title: 'Community & News Hub',
    description: 'Stay Connected with Global Community',
    url: 'https://pnc-vszr.vercel.app',
    bgColor: 'from-green-600 to-green-900',
    bgImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
  },
  {
    id: 8,
    platform: 'FourHands',
    title: 'Handcrafted Furniture',
    description: 'Artisan-Made Pieces for Your Home',
    url: 'https://fourhands.vercel.app',
    bgColor: 'from-orange-500 to-orange-800',
    bgImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=600&fit=crop',
  },
  {
    id: 9,
    platform: 'em.pi',
    title: 'Global Shopping Marketplace',
    description: 'Shop Everything, Anywhere, Anytime',
    url: 'https://em-peach.vercel.app',
    bgColor: 'from-teal-600 to-teal-900',
    bgImage: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1200&h=600&fit=crop',
  },
];

export function FeaturedOffers() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % FEATURED_OFFERS.length);
    }, 5000); // Auto-rotate every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % FEATURED_OFFERS.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + FEATURED_OFFERS.length) % FEATURED_OFFERS.length);
  };

  const offer = FEATURED_OFFERS[currentSlide];

  return (
    <div className="bg-black text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Featured Offer Card */}
        <div className="relative h-96 rounded-lg overflow-hidden group">
          {/* Background */}
          <div
            className={`absolute inset-0 bg-gradient-to-r ${offer.bgColor}`}
            style={{
              backgroundImage: `url(${offer.bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/40" />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center items-start p-8">
            <div className="max-w-lg">
              <p className="text-yellow-400 text-sm font-semibold mb-2 tracking-wider">
                {offer.platform.toUpperCase()}
              </p>
              <h2 className="text-4xl font-bold text-white mb-3">
                {offer.title}
              </h2>
              <p className="text-gray-200 text-lg mb-6">
                {offer.description}
              </p>

              {/* Get Offer Button */}
              <a
                href={offer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors duration-200 hover:shadow-lg hover:shadow-yellow-500/50"
              >
                Get Offer
              </a>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-yellow-500 rounded-full hover:bg-black/70 transition z-10 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-yellow-500 rounded-full hover:bg-black/70 transition z-10 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {FEATURED_OFFERS.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-yellow-500 w-8'
                  : 'bg-gray-600 w-3 hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
