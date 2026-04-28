import { sbSelect } from '@/lib/supabase/server';
import {
  fallbackCategories,
  fallbackDeals,
  fallbackHeroSlides,
  fallbackNearbyBusinesses,
  fallbackVendors,
  type HomeCategoryItem,
  type HomeDealItem,
  type HomeHeroItem,
  type HomeNearbyItem,
  type HomeVendorItem,
} from './fallback-home-data';

type SponsoredPlacement = {
  id: string;
  placement_key: string;
  title?: string | null;
  subtitle?: string | null;
  image_path?: string | null;
  cta_label?: string | null;
};

type PublicVendor = {
  id: string;
  name: string;
  slug: string;
  cover_image_path?: string | null;
  locality_name?: string | null;
  tags?: string[] | null;
  is_featured?: boolean | null;
};

type PublicDeal = {
  id: string;
  title: string;
  vendor_name: string;
  discount_label?: string | null;
  ends_at?: string | null;
  cover_image_path?: string | null;
};

export type HomePageData = {
  heroSlides: HomeHeroItem[];
  categories: HomeCategoryItem[];
  featuredVendors: HomeVendorItem[];
  trendingDeals: HomeDealItem[];
  nearbyBusinesses: HomeNearbyItem[];
};

function formatEndDate(endDate?: string | null) {
  if (!endDate) return 'Limited time offer';
  const date = new Date(endDate);
  if (Number.isNaN(date.getTime())) return 'Limited time offer';

  return `Valid till ${date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
  })}`;
}

function mapSponsoredHero(placements: SponsoredPlacement[]): HomeHeroItem[] {
  return placements
    .filter((placement) => ['home_hero', 'app_home_carousel'].includes(placement.placement_key))
    .slice(0, 4)
    .map((placement) => ({
      id: placement.id,
      title: placement.title || fallbackHeroSlides[0].title,
      subtitle: placement.subtitle || fallbackHeroSlides[0].subtitle,
      ctaLabel: placement.cta_label || fallbackHeroSlides[0].ctaLabel,
      imagePath: placement.image_path,
      sponsored: true,
    }));
}

function mapSponsoredDeals(placements: SponsoredPlacement[]): HomeDealItem[] {
  return placements
    .filter((placement) => ['home_top_deals', 'app_deals_top'].includes(placement.placement_key))
    .slice(0, 3)
    .map((placement) => ({
      id: `sponsored-deal-${placement.id}`,
      title: placement.title || 'Featured local offer',
      vendorName: 'Sponsored Partner',
      discountLabel: 'Featured',
      validTill: 'Limited period',
      locality: 'Shillong',
      imagePath: placement.image_path,
      sponsored: true,
    }));
}

function mapSponsoredVendors(placements: SponsoredPlacement[]): HomeVendorItem[] {
  return placements
    .filter((placement) => ['home_featured_vendors', 'app_category_top'].includes(placement.placement_key))
    .slice(0, 3)
    .map((placement) => ({
      id: `sponsored-vendor-${placement.id}`,
      name: placement.title || 'Featured Business',
      slug: '#',
      locality: 'Shillong',
      category: 'Sponsored',
      rating: 4.7,
      reviews: 80,
      imagePath: placement.image_path,
      sponsored: true,
    }));
}

export async function getHomePageData(): Promise<HomePageData> {
  const [vendors, deals, placements] = await Promise.all([
    sbSelect('v_public_vendors', '*', { order: 'priority.desc,name.asc', limit: '8' }).catch(() => []),
    sbSelect('v_public_deals', '*', { order: 'priority.desc,view_count.desc', limit: '8' }).catch(() => []),
    sbSelect('v_active_sponsored_placements', '*', { order: 'priority.desc,weight.desc', limit: '12' }).catch(() => []),
  ]);

  const placementRows = (placements as SponsoredPlacement[]) || [];
  const vendorRows = (vendors as PublicVendor[]) || [];
  const dealRows = (deals as PublicDeal[]) || [];

  const sponsoredHeroSlides = mapSponsoredHero(placementRows);
  const heroSlides = sponsoredHeroSlides.length > 0 ? sponsoredHeroSlides : fallbackHeroSlides;

  const liveVendors: HomeVendorItem[] = vendorRows.slice(0, 6).map((vendor, index) => ({
    id: vendor.id,
    name: vendor.name,
    slug: vendor.slug,
    locality: vendor.locality_name || 'Shillong',
    category: vendor.tags?.[0] || 'Local Business',
    rating: 4.3 + ((index + 2) % 5) * 0.1,
    reviews: 52 + index * 18,
    imagePath: vendor.cover_image_path,
    sponsored: Boolean(vendor.is_featured),
  }));

  const liveDeals: HomeDealItem[] = dealRows.slice(0, 6).map((deal) => ({
    id: deal.id,
    title: deal.title,
    vendorName: deal.vendor_name,
    discountLabel: deal.discount_label || 'Special Offer',
    validTill: formatEndDate(deal.ends_at),
    locality: 'Shillong',
    imagePath: deal.cover_image_path,
  }));

  const nearbyBusinesses: HomeNearbyItem[] = (liveVendors.length > 0 ? liveVendors : fallbackVendors).slice(0, 6).map((vendor, index) => ({
    id: `nearby-${vendor.id}`,
    name: vendor.name,
    category: vendor.category,
    locality: vendor.locality,
    rating: vendor.rating,
    distance: `${(index * 0.4 + 0.3).toFixed(1)} km`,
    imagePath: vendor.imagePath,
  }));

  const sponsoredVendors = mapSponsoredVendors(placementRows);
  const sponsoredDeals = mapSponsoredDeals(placementRows);

  return {
    heroSlides,
    categories: fallbackCategories,
    featuredVendors: [...sponsoredVendors, ...liveVendors].slice(0, 8).length
      ? [...sponsoredVendors, ...liveVendors].slice(0, 8)
      : fallbackVendors,
    trendingDeals: [...sponsoredDeals, ...liveDeals].slice(0, 8).length ? [...sponsoredDeals, ...liveDeals].slice(0, 8) : fallbackDeals,
    nearbyBusinesses: nearbyBusinesses.length ? nearbyBusinesses : fallbackNearbyBusinesses,
  };
}
