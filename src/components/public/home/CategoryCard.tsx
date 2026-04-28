import Link from 'next/link';
import type { HomeCategoryItem } from '@/lib/public/fallback-home-data';

const iconMap: Record<HomeCategoryItem['icon'], string> = {
  food: '☕',
  fashion: '🛍️',
  deals: '🏷️',
  services: '🛠️',
};

export function CategoryCard({ category }: { category: HomeCategoryItem }) {
  return (
    <Link
      href={category.href}
      className="group rounded-[22px] border border-[#DDEDEA] bg-white p-4 shadow-[0_12px_28px_rgba(8,63,60,0.08)] transition hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-3">
        <div className={`grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br text-2xl ${category.accent}`}>
          <span>{iconMap[category.icon]}</span>
        </div>
        <span className="grid h-9 w-9 place-items-center rounded-full border border-[#CFE8E5] text-[#0F7A76] transition group-hover:translate-x-0.5">
          →
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-[#062F2C]">{category.title}</h3>
      <p className="mt-1 text-sm leading-6 text-[#6B7C7A]">{category.subtitle}</p>
    </Link>
  );
}
