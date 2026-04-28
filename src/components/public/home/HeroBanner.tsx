import Link from 'next/link';
import type { HomeHero } from '@/lib/public/home-demo-data';
import { SafeImage } from '@/components/public/SafeImage';

export function HeroBanner({ hero }: { hero: HomeHero }) {
  return (
    <section className="px-4">
      <div className="mx-auto grid max-w-lg gap-4 overflow-hidden rounded-3xl border border-[#eee5dc] bg-gradient-to-br from-white via-[#fff7ed] to-[#fff1f2] p-4 shadow-[0_12px_30px_rgba(233,75,53,0.12)] sm:grid-cols-[1.15fr_.85fr]">
        <div>
          <p className="text-xs font-extrabold tracking-[0.2em] text-[#5f7f5f]">{hero.pretitle}</p>
          <h1 className="mt-2 text-3xl font-black leading-tight text-[#172033] whitespace-pre-line">{hero.title}</h1>
          <p className="mt-2 text-sm text-[#667085]">{hero.subtitle}</p>
          <Link href={hero.href} className="mt-4 inline-flex rounded-xl bg-gradient-to-r from-[#e94b35] to-[#f97316] px-4 py-2.5 text-sm font-semibold text-white">
            {hero.ctaLabel} →
          </Link>
        </div>
        <div className="relative min-h-44 overflow-hidden rounded-2xl border border-white/70">
          <SafeImage src={hero.imagePath} alt="Shillong marketplace hero" fill className="object-cover" fallbackLabel="MyShillong Local Marketplace" type="hero" />
        </div>
      </div>
    </section>
  );
}
