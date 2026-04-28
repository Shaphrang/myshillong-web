import Link from 'next/link';
import type { HomeBusiness } from '@/lib/public/home-demo-data';
import { SafeImage } from '@/components/public/SafeImage';

export function TopBusinesses({ businesses }: { businesses: HomeBusiness[] }) {
  return (
    <section className="px-4">
      <div className="mx-auto max-w-lg">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-extrabold tracking-[0.16em] text-[#172033]">TOP BUSINESSES NEAR YOU</h2>
          <Link href="/vendors" className="text-sm font-semibold text-[#5f7f5f]">See All →</Link>
        </div>
        <div className="overflow-hidden rounded-2xl border border-[#eee5dc] bg-white">
          {businesses.map((business) => (
            <Link key={business.id} href={business.href} className="flex items-center gap-3 border-b border-[#f3ede6] p-3 last:border-b-0">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                <SafeImage src={business.imagePath} alt={business.name} fill className="object-cover" fallbackLabel="Business Image" type="business" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-bold text-[#172033]">{business.name} {business.isVerified ? '✅' : ''}</p>
                <p className="truncate text-xs text-[#667085]">⭐ {business.rating} • {business.category} • {business.locality}</p>
                <p className="mt-1 text-xs text-[#5f7f5f]">{business.statusLabel} • {business.closingText}</p>
              </div>
              <button className="rounded-lg p-2 text-[#667085]" aria-label="Save business">🔖</button>
              <span className="text-[#667085]">›</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
