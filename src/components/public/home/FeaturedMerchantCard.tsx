import Link from 'next/link';
import type { FeaturedMerchant } from '@/lib/public/home-demo-data';
import { SafeImage } from '@/components/public/SafeImage';

export function FeaturedMerchantCard({ merchant }: { merchant: FeaturedMerchant }) {
  return (
    <section className="px-4">
      <div className="mx-auto grid max-w-lg grid-cols-[110px_1fr] gap-3 rounded-3xl border border-[#f4d9d0] bg-gradient-to-r from-[#fff1f2] to-[#fff7ed] p-4 shadow-sm">
        <div className="relative h-[120px] overflow-hidden rounded-2xl">
          <SafeImage src={merchant.imagePath} alt={merchant.name} fill className="object-cover" fallbackLabel="Food Image" type="food" />
        </div>
        <div>
          <p className="text-xs font-extrabold tracking-[0.14em] text-[#e94b35]">{merchant.title}</p>
          <h3 className="mt-1 text-xl font-bold text-[#172033]">{merchant.name}</h3>
          <p className="mt-1 text-sm text-[#667085]">{merchant.description}</p>
          <p className="mt-1 text-sm font-medium text-[#172033]">{merchant.meta}</p>
          <Link href={merchant.href} className="mt-2 inline-flex rounded-xl bg-gradient-to-r from-[#e94b35] to-[#f97316] px-4 py-2 text-sm font-semibold text-white">{merchant.ctaLabel} →</Link>
        </div>
      </div>
    </section>
  );
}
