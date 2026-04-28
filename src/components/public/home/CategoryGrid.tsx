import Link from 'next/link';
import type { HomeCategory } from '@/lib/public/home-demo-data';

const iconMap: Record<HomeCategory['icon'], string> = {
  shopping: '🛍️',
  food: '🍽️',
  home: '🏡',
  beauty: '🪷',
  services: '🧰',
  events: '🎟️',
};

export function CategoryGrid({ categories }: { categories: HomeCategory[] }) {
  return (
    <section className="px-4">
      <div className="mx-auto grid max-w-lg grid-cols-1 gap-3 sm:grid-cols-2">
        {categories.map((category) => (
          <Link key={category.id} href={category.href} className="rounded-2xl border border-[#eee5dc] bg-white p-4 shadow-sm transition hover:-translate-y-0.5">
            <div className="flex items-start justify-between gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#fff1f2] text-xl">{iconMap[category.icon]}</span>
              <span className="text-[#667085]">›</span>
            </div>
            <h3 className="mt-3 text-lg font-bold text-[#172033]">{category.title}</h3>
            <p className="mt-1 text-sm text-[#667085]">{category.subtitle}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
