import Image from 'next/image';
import Link from 'next/link';
import type { HomeVendorItem } from '@/lib/public/fallback-home-data';
import { resolveImagePath } from '@/lib/utils/image-path';

export function VendorCard({ vendor }: { vendor: HomeVendorItem }) {
  const imageUrl = resolveImagePath(vendor.imagePath);

  return (
    <article className="group relative min-w-[74vw] overflow-hidden rounded-[22px] border border-[#DDEDEA] bg-white shadow-[0_16px_36px_rgba(8,63,60,0.12)] md:min-w-0">
      <div className="relative h-56">
        {imageUrl ? (
          <Image src={imageUrl} alt={vendor.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 80vw, (max-width: 1280px) 25vw, 300px" />
        ) : (
          <div className="h-full w-full bg-[linear-gradient(135deg,#0D5C57_0%,#0F7A76_45%,#28B7B1_100%)]" />
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#041c1b]/95 via-[#041c1b]/60 to-transparent p-4 text-white">
          <h3 className="text-xl font-bold">{vendor.name}</h3>
          <p className="mt-1 text-sm text-white/90">
            {vendor.rating.toFixed(1)} ★ ({vendor.reviews}) · {vendor.locality}
          </p>
          <p className="text-sm text-white/80">{vendor.category}</p>
        </div>
        {vendor.sponsored ? (
          <span className="absolute left-3 top-3 rounded-full bg-[#ffedd9] px-2.5 py-1 text-xs font-semibold text-[#E66F13]">Sponsored</span>
        ) : null}
      </div>
      <div className="flex items-center justify-between p-4">
        <button className="grid h-11 w-11 place-items-center rounded-full border border-[#DDEDEA] text-[#0F7A76]">♡</button>
        <Link href={vendor.slug === '#' ? '#' : `/vendors/${vendor.slug}`} className="rounded-full bg-[#0F7A76] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0D5C57]">
          View Details
        </Link>
      </div>
    </article>
  );
}
