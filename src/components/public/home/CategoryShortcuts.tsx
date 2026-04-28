import type { HomeCategoryItem } from '@/lib/public/fallback-home-data';
import { CategoryCard } from './CategoryCard';

export function CategoryShortcuts({ categories }: { categories: HomeCategoryItem[] }) {
  return (
    <section aria-label="Explore Categories">
      <h2 className="mb-4 text-2xl font-bold text-[#062F2C]">Explore Categories</h2>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
