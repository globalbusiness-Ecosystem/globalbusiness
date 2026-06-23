'use client';

import { TopBar } from '@/components/top-bar';
import { HeroCarousel } from '@/components/hero-carousel';
import { FeaturedOffers } from '@/components/featured-offers';
import { StatsBar } from '@/components/stats-bar';
import { ActiveMarkets } from '@/components/active-markets';
import { BottomNav } from '@/components/bottom-nav';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white pb-32">
      <TopBar />
      <HeroCarousel />
      <FeaturedOffers />
      <StatsBar />
      <ActiveMarkets />
      <BottomNav />
    </div>
  );
}
