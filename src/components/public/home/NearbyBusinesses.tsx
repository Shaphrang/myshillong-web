import Image from 'next/image';
import type { HomeNearbyItem } from '@/lib/public/fallback-home-data';
import { resolveImagePath } from '@/lib/utils/image-path';
import { SectionHeader } from './SectionHeader';

export function NearbyBusinesses({ businesses }: { businesses: HomeNearbyItem[] }) {
  return (
    <section className="rounded-[24px] border border-[#DDEDEA] bg-white p-4 shadow-[0_18px_50px_rgba(8,63,60,0.08)] md:p-6">
      <SectionHeader title="Nearby Popular Businesses" viewAllHref="/vendors" />
      <div className="space-y-3">
        {businesses.map((business) => {
          const imageUrl = resolveImagePath(business.imagePath);

          return (
            <article key={business.id} className="flex items-center gap-3 rounded-2xl border border-[#E7F2F0] p-2.5 transition hover:border-[#BFDCD7]">
              <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-[#E7F5F4]">
                {imageUrl ? <Image src={imageUrl} alt={business.name} fill className="object-cover" sizes="64px" /> : null}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-base font-semibold text-[#062F2C]">{business.name}</h3>
                <p className="text-sm text-[#6B7C7A]">
                  {business.rating.toFixed(1)} ★ · {business.category} · {business.locality}
                </p>
                <p className="text-sm text-[#6B7C7A]">{business.distance}</p>
              </div>
              <button className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#DDEDEA] text-[#0F7A76]">🔖</button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
