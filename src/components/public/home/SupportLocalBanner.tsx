import Link from 'next/link';
import type { SupportLocalBanner as SupportLocalBannerType } from '@/lib/public/home-demo-data';
import { SafeImage } from '@/components/public/SafeImage';

export function SupportLocalBanner({ banner }: { banner: SupportLocalBannerType }) {
  return (
    <section className="px-4">
      <div className="mx-auto grid max-w-lg grid-cols-[74px_1fr] gap-3 rounded-3xl border border-[#eee5dc] bg-gradient-to-r from-[#fff7ed] to-[#fff1f2] p-4">
        <div className="relative h-[74px] overflow-hidden rounded-full border border-white/80">
          <SafeImage src={banner.imagePath} alt={banner.title} fill className="object-cover" fallbackLabel="Culture" type="fashion" />
        </div>
        <div>
          <h3 className="text-2xl font-bold leading-tight text-[#172033]">{banner.title}</h3>
          <p className="mt-1 text-sm text-[#667085]">{banner.description}</p>
          <Link href={banner.href} className="mt-3 inline-flex rounded-xl bg-[#5f7f5f] px-4 py-2 text-sm font-semibold text-white">{banner.ctaLabel} →</Link>
        </div>
      </div>
    </section>
  );
}
