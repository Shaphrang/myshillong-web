import Link from 'next/link';
import type { HomeDeal } from '@/lib/public/home-demo-data';
import { SafeImage } from '@/components/public/SafeImage';

export function TrendingDeals({ deals }: { deals: HomeDeal[] }) {
  return (
    <section className="px-4">
      <div className="mx-auto max-w-lg rounded-2xl border border-[#eee5dc] bg-[#fffdf8] p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-extrabold tracking-[0.16em] text-[#2f5133]">TRENDING DEALS</h2>
          <Link href="/deals" className="text-sm font-semibold text-[#2f5133]">View All Deals →</Link>
        </div>
        <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
          {deals.map((deal) => (
            <Link href={deal.href} key={deal.id} className="min-w-48 rounded-2xl border border-[#eee5dc] bg-white p-2.5 shadow-sm">
              <div className="relative h-20 overflow-hidden rounded-xl">
                <SafeImage src={deal.imagePath} alt={deal.title} fill className="object-cover" fallbackLabel="Deal Image" type="deal" />
              </div>
              <p className="mt-2 text-sm font-bold text-[#e94b35]">{deal.discountLabel}</p>
              <p className="line-clamp-1 text-sm font-semibold text-[#172033]">{deal.businessName}</p>
              <p className="text-xs text-[#667085]">{deal.locality}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
