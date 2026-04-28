import type { HomeVendorItem } from '@/lib/public/fallback-home-data';
import { SectionHeader } from './SectionHeader';
import { VendorCard } from './VendorCard';

export function FeaturedVendors({ vendors }: { vendors: HomeVendorItem[] }) {
  return (
    <section>
      <SectionHeader title="Featured Vendors" viewAllHref="/vendors" />
      <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 xl:grid-cols-4">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="snap-start">
            <VendorCard vendor={vendor} />
          </div>
        ))}
      </div>
    </section>
  );
}
