import type { HomeDealItem } from '@/lib/public/fallback-home-data';
import { DealCard } from './DealCard';
import { SectionHeader } from './SectionHeader';

export function TrendingDeals({ deals }: { deals: HomeDealItem[] }) {
  return (
    <section>
      <SectionHeader title="Trending Deals 🔥" viewAllHref="/deals" />
      <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 xl:grid-cols-3">
        {deals.map((deal) => (
          <div key={deal.id} className="snap-start">
            <DealCard deal={deal} />
          </div>
        ))}
      </div>
    </section>
  );
}
