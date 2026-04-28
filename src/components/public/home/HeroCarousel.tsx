'use client';

import { useMemo, useState } from 'react';
import type { HomeHeroItem } from '@/lib/public/fallback-home-data';
import { resolveImagePath } from '@/lib/utils/image-path';

export function HeroCarousel({ slides }: { slides: HomeHeroItem[] }) {
  const safeSlides = useMemo(() => (slides.length ? slides : []), [slides]);
  const [index, setIndex] = useState(0);

  if (safeSlides.length === 0) return null;

  const activeSlide = safeSlides[index % safeSlides.length];
  const imageUrl = resolveImagePath(activeSlide.imagePath);

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-[#CFE8E5] bg-[#0D5C57] text-white shadow-[0_28px_70px_rgba(8,63,60,0.18)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(40,183,177,0.18),transparent_35%)]" />
      {imageUrl ? (
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }} />
      ) : null}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(8,63,60,0.95),rgba(15,122,118,0.82),rgba(40,183,177,0.55))]" />
      <div className="relative z-10 flex min-h-[260px] flex-col justify-between p-6 md:min-h-[320px] md:p-10">
        <div className="max-w-xl">
          {activeSlide.sponsored ? <span className="mb-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">Sponsored</span> : null}
          <h1 className="text-3xl font-bold leading-tight md:text-5xl">{activeSlide.title}</h1>
          <p className="mt-3 max-w-lg text-base text-white/90 md:text-2xl/8">{activeSlide.subtitle}</p>
          <button className="mt-6 rounded-full bg-[linear-gradient(135deg,#FF8A2A,#FF6B35)] px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:brightness-105">
            {activeSlide.ctaLabel} →
          </button>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="hidden gap-2 md:flex">
            <button onClick={() => setIndex((index - 1 + safeSlides.length) % safeSlides.length)} className="grid h-11 w-11 place-items-center rounded-full bg-white/85 text-[#0D5C57]">
              ←
            </button>
            <button onClick={() => setIndex((index + 1) % safeSlides.length)} className="grid h-11 w-11 place-items-center rounded-full bg-white/85 text-[#0D5C57]">
              →
            </button>
          </div>
          <div className="mx-auto flex gap-2 md:mx-0">
            {safeSlides.map((slide, dotIndex) => (
              <button key={slide.id} aria-label={`Go to slide ${dotIndex + 1}`} onClick={() => setIndex(dotIndex)} className={`h-2.5 rounded-full transition ${dotIndex === index ? 'w-8 bg-white' : 'w-2.5 bg-white/45'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
