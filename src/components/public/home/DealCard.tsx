import Image from 'next/image';
import type { HomeDealItem } from '@/lib/public/fallback-home-data';
import { resolveImagePath } from '@/lib/utils/image-path';

export function DealCard({ deal }: { deal: HomeDealItem }) {
  const imageUrl = resolveImagePath(deal.imagePath);

  return (
    <article className="group relative min-w-[70vw] overflow-hidden rounded-[20px] border border-[#DDEDEA] bg-white shadow-[0_16px_36px_rgba(8,63,60,0.10)] md:min-w-0">
      <div className="relative h-48">
        {imageUrl ? (
          <Image src={imageUrl} alt={deal.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 70vw, 360px" />
        ) : (
          <div className="h-full w-full bg-[linear-gradient(135deg,#FF5B6B,#FF8A2A)]" />
        )}
        <span className="absolute left-3 top-3 rounded-xl bg-[linear-gradient(135deg,#FF5B6B,#FF8A2A)] px-2.5 py-1 text-sm font-bold text-white">{deal.discountLabel}</span>
        {deal.sponsored ? (
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-[#0D5C57]">Featured</span>
        ) : null}
      </div>
      <div className="space-y-1 p-4">
        <h3 className="line-clamp-2 text-lg font-bold text-[#062F2C]">{deal.title}</h3>
        <p className="text-sm font-medium text-[#0F7A76]">{deal.vendorName}</p>
        <p className="text-sm text-[#6B7C7A]">{deal.validTill}</p>
        <p className="text-sm text-[#6B7C7A]">📍 {deal.locality}</p>
      </div>
    </article>
  );
}
