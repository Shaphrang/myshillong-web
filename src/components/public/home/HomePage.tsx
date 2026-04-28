import type { HomePageData } from '@/lib/public/home';
import { CategoryShortcuts } from './CategoryShortcuts';
import { FeaturedVendors } from './FeaturedVendors';
import { HeroCarousel } from './HeroCarousel';
import { MobileBottomNav } from './MobileBottomNav';
import { NearbyBusinesses } from './NearbyBusinesses';
import { PublicHeader } from './PublicHeader';
import { TrendingDeals } from './TrendingDeals';

export function HomePage({ data }: { data: HomePageData }) {
  return (
    <div className="min-h-screen bg-[#F8FBFB] text-[#20302F]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#DDF6F3_0%,transparent_33%),radial-gradient(circle_at_bottom_right,#CDEEEA_0%,transparent_38%)]" />
      <PublicHeader />
      <main className="mx-auto max-w-[1280px] space-y-8 px-4 py-5 pb-28 md:px-6 md:pb-10">
        <HeroCarousel slides={data.heroSlides} />
        <CategoryShortcuts categories={data.categories} />
        <FeaturedVendors vendors={data.featuredVendors} />
        <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <TrendingDeals deals={data.trendingDeals} />
          <NearbyBusinesses businesses={data.nearbyBusinesses} />
        </section>
      </main>
      <MobileBottomNav />
    </div>
  );
}
