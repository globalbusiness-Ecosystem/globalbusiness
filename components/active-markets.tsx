'use client';

import { useState, useEffect } from 'react';
import {
  Building2,
  Coins,
  Car,
  Lightbulb,
  Shirt,
  Pyramid,
  Store,
  Sofa,
  ShoppingCart,
} from 'lucide-react';
import { findMatchingPlatforms } from '@/lib/search-utils';

const PLATFORMS = [
  {
    id: 1,
    name: 'Real Estate',
    url: 'https://re-global-main.vercel.app',
    icon: Building2,
    badgeClass: 'bg-gradient-to-br from-orange-500 to-yellow-600',
    iconClass: 'text-orange-100',
  },
  {
    id: 2,
    name: 'Gold',
    url: 'https://finegold.vercel.app',
    icon: Coins,
    badgeClass: 'bg-gradient-to-br from-yellow-300 to-yellow-600',
    iconClass: 'text-yellow-100',
  },
  {
    id: 3,
    name: 'Motor',
    url: 'https://global-motor.vercel.app',
    icon: Car,
    badgeClass: 'bg-gradient-to-br from-blue-500 to-blue-700',
    iconClass: 'text-blue-100',
  },
  {
    id: 4,
    name: 'Aladdin AI',
    url: 'https://aladdin-ai-rho.vercel.app',
    icon: Lightbulb,
    badgeClass: 'bg-gradient-to-br from-purple-500 to-purple-700',
    iconClass: 'text-purple-100',
  },
  {
    id: 5,
    name: 'Weavers',
    url: 'https://global-weavers.vercel.app',
    icon: Shirt,
    badgeClass: 'bg-gradient-to-br from-pink-500 to-pink-700',
    iconClass: 'text-pink-100',
  },
  {
    id: 6,
    name: 'Dhualqarnayn',
    url: 'https://dhualqarnayn.vercel.app',
    icon: Pyramid,
    badgeClass: 'bg-gradient-to-br from-yellow-700 to-yellow-900',
    iconClass: 'text-yellow-100',
  },
  {
    id: 7,
    name: 'PNC',
    url: 'https://pnc-vszr.vercel.app',
    icon: Store,
    badgeClass: 'bg-gradient-to-br from-green-500 to-green-700',
    iconClass: 'text-green-100',
  },
  {
    id: 8,
    name: 'FourHands',
    url: 'https://fourhands.vercel.app',
    icon: Sofa,
    badgeClass: 'bg-gradient-to-br from-orange-500 to-orange-700',
    iconClass: 'text-orange-100',
  },
  {
    id: 9,
    name: 'em.pi',
    url: 'https://em-peach.vercel.app',
    icon: ShoppingCart,
    badgeClass: 'bg-gradient-to-br from-teal-500 to-teal-700',
    iconClass: 'text-teal-100',
  },
];

export function ActiveMarkets() {
  const [filteredPlatforms, setFilteredPlatforms] = useState(PLATFORMS);

  useEffect(() => {
    // Listen for search state changes via sessionStorage or create a custom event system
    const handleSearchUpdate = () => {
      const searchQuery = sessionStorage.getItem('gb-search-query') || '';
      
      if (!searchQuery.trim()) {
        setFilteredPlatforms(PLATFORMS);
      } else {
        const matchedNames = findMatchingPlatforms(searchQuery);
        const filtered = PLATFORMS.filter(p => matchedNames.includes(p.name));
        setFilteredPlatforms(filtered.length > 0 ? filtered : PLATFORMS);
      }
    };

    window.addEventListener('storage', handleSearchUpdate);
    window.addEventListener('gb-search-update', handleSearchUpdate);

    return () => {
      window.removeEventListener('storage', handleSearchUpdate);
      window.removeEventListener('gb-search-update', handleSearchUpdate);
    };
  }, []);

  return (
    <div className="bg-black text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl font-bold text-yellow-500 mb-12 text-center">
          ACTIVE MARKETS - 9 PLATFORMS
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-6">
          {filteredPlatforms.map((platform) => {
            const IconComponent = platform.icon;
            return (
              <a
                key={platform.id}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center p-6 bg-black border-2 border-yellow-500 rounded-lg hover:bg-yellow-500 hover:bg-opacity-10 transition-all duration-300 cursor-pointer"
              >
                <div className={`${platform.badgeClass} p-4 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-12 h-12 ${platform.iconClass}`} />
                </div>
                <h3 className="text-base font-semibold text-yellow-500 text-center">
                  {platform.name}
                </h3>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
