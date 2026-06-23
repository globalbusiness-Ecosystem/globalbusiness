'use client';

import { Menu, Search, X } from 'lucide-react';
import { useState } from 'react';
import { findExactMatch, findMatchingPlatforms, SEARCH_KEYWORDS } from '@/lib/search-utils';

export function TopBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [matchedPlatforms, setMatchedPlatforms] = useState<string[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Notify other components about search state
    sessionStorage.setItem('gb-search-query', query);
    window.dispatchEvent(new Event('gb-search-update'));

    if (!query.trim()) {
      setMatchedPlatforms([]);
    } else {
      setMatchedPlatforms(findMatchingPlatforms(query));
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    const exactMatch = findExactMatch(searchQuery);
    
    if (exactMatch) {
      const platformUrl = Object.entries(SEARCH_KEYWORDS).find(([name]) => name === exactMatch);
      if (platformUrl) {
        const platformData = SEARCH_KEYWORDS[exactMatch as keyof typeof SEARCH_KEYWORDS];
        const platformEntry = Object.entries(SEARCH_KEYWORDS).find(
          ([name]) => name === exactMatch
        );
        
        // Open the platform directly based on exact match
        const urls: Record<string, string> = {
          'Real Estate': 'https://re-global-main.vercel.app',
          'Gold': 'https://finegold.vercel.app',
          'Motor': 'https://global-motor.vercel.app',
          'Aladdin AI': 'https://aladdin-ai-rho.vercel.app',
          'Weavers': 'https://global-weavers.vercel.app',
          'Dhualqarnayn': 'https://dhualqarnayn.vercel.app',
          'PNC': 'https://pnc-vszr.vercel.app',
          'FourHands': 'https://fourhands.vercel.app',
          'em.pi': 'https://em-peach.vercel.app',
        };
        
        window.open(urls[exactMatch], '_blank');
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      closeSearch();
    }
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setMatchedPlatforms([]);
    sessionStorage.removeItem('gb-search-query');
    window.dispatchEvent(new Event('gb-search-update'));
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-16 bg-black border-b border-yellow-600 z-50">
        <div className="flex items-center justify-between h-full px-4">
          {/* Hamburger Icon */}
          <button className="p-2 hover:bg-yellow-600/20 rounded-lg transition">
            <Menu className="w-6 h-6 text-yellow-500" />
          </button>

          {/* Logo Text */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <span className="text-yellow-500 font-bold text-lg tracking-wider">
              GLOBAL BUSINESS
            </span>
          </div>

          {/* Search Icon */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 hover:bg-yellow-600/20 rounded-lg transition"
          >
            <Search className="w-6 h-6 text-yellow-500" />
          </button>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/80 z-40 flex items-start justify-center pt-20">
          <div className="w-full max-w-2xl mx-4">
            <div className="bg-black border-2 border-yellow-500 rounded-lg overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-2 p-4 border-b border-yellow-500/50">
                <Search className="w-5 h-5 text-yellow-500" />
                <input
                  type="text"
                  placeholder="Search platforms... (e.g., real estate, gold, ai)"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
                />
                <button
                  onClick={closeSearch}
                  className="p-1 hover:bg-yellow-500/20 rounded transition"
                >
                  <X className="w-5 h-5 text-yellow-500" />
                </button>
              </div>

              {/* Search Results */}
              {matchedPlatforms.length > 0 && (
                <div className="max-h-96 overflow-y-auto">
                  {matchedPlatforms.map((platformName) => {
                    const urls: Record<string, string> = {
                      'Real Estate': 'https://re-global-main.vercel.app',
                      'Gold': 'https://finegold.vercel.app',
                      'Motor': 'https://global-motor.vercel.app',
                      'Aladdin AI': 'https://aladdin-ai-rho.vercel.app',
                      'Weavers': 'https://global-weavers.vercel.app',
                      'Dhualqarnayn': 'https://dhualqarnayn.vercel.app',
                      'PNC': 'https://pnc-vszr.vercel.app',
                      'FourHands': 'https://fourhands.vercel.app',
                      'em.pi': 'https://em-peach.vercel.app',
                    };

                    return (
                      <a
                        key={platformName}
                        href={urls[platformName]}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeSearch}
                        className="block px-4 py-3 border-b border-yellow-500/20 hover:bg-yellow-500/10 transition text-yellow-500 font-medium"
                      >
                        {platformName}
                      </a>
                    );
                  })}
                </div>
              )}

              {/* Empty State */}
              {searchQuery.trim() && matchedPlatforms.length === 0 && (
                <div className="p-8 text-center text-gray-400">
                  No platforms found matching "{searchQuery}"
                </div>
              )}

              {/* Hint */}
              {!searchQuery && (
                <div className="p-4 text-xs text-gray-500 text-center">
                  Type a platform name or keyword to search
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
