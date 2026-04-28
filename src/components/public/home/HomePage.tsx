import type { HomePageData } from '@/lib/public/home-demo-data';
import { BottomNav } from './BottomNav';
import { CategoryGrid } from './CategoryGrid';
import { FeaturedMerchantCard } from './FeaturedMerchantCard';
import { HeroBanner } from './HeroBanner';
import { HomeHeader } from './HomeHeader';
import { HomeSearch } from './HomeSearch';
import { SupportLocalBanner } from './SupportLocalBanner';
import { TopBusinesses } from './TopBusinesses';
import { TrendingDeals } from './TrendingDeals';

export function HomePage({ data }: { data: HomePageData }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7ed] via-[#fff9f7] to-white pb-28 text-[#172033]">
      <HomeHeader />
      <main className="space-y-4 py-4">
        <HomeSearch />
        <HeroBanner hero={data.hero} />
        <CategoryGrid categories={data.categories} />
        <TrendingDeals deals={data.trendingDeals} />
        <TopBusinesses businesses={data.nearbyBusinesses} />
        <SupportLocalBanner banner={data.supportLocalBanner} />
        <FeaturedMerchantCard merchant={data.featuredMerchant} />
      </main>
      <BottomNav />
    </div>
  );
}
