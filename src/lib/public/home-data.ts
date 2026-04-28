import { sbSelect } from '@/lib/supabase/server';
import { getPublicStorageUrl } from '@/lib/utils/image';
import { homeDemoData, type HomeBusiness, type HomeDeal, type HomePageData } from './home-demo-data';

type PublicVendorRow = {
  id?: string;
  name?: string;
  slug?: string;
  cover_image_path?: string | null;
  locality_name?: string | null;
  tags?: string[] | null;
  is_verified?: boolean | null;
};

type PublicDealRow = {
  id?: string;
  title?: string;
  vendor_name?: string | null;
  locality_name?: string | null;
  discount_label?: string | null;
  image_path?: string | null;
  cover_image_path?: string | null;
};

type SponsoredPlacementRow = {
  placement_key?: string;
  title?: string | null;
  subtitle?: string | null;
  image_path?: string | null;
  cta_label?: string | null;
};

function safeSlug(slug?: string) {
  if (!slug) return '#';
  return slug.startsWith('/') ? slug : `/vendors/${slug}`;
}

function mapDealRows(rows: PublicDealRow[]): HomeDeal[] {
  return rows.slice(0, 8).map((row, index) => ({
    id: row.id ?? `deal-${index}`,
    title: row.title ?? row.vendor_name ?? 'Local Deal',
    businessName: row.vendor_name ?? 'Local Business',
    locality: row.locality_name ?? 'Shillong',
    discountLabel: row.discount_label ?? 'Special Offer',
    imagePath: getPublicStorageUrl(row.cover_image_path ?? row.image_path),
    href: row.id ? `/deals/${row.id}` : '/deals',
  }));
}

function mapBusinessRows(rows: PublicVendorRow[]): HomeBusiness[] {
  return rows.slice(0, 6).map((row, index) => ({
    id: row.id ?? `business-${index}`,
    name: row.name ?? `Local Business ${index + 1}`,
    category: row.tags?.[0] ?? homeDemoData.nearbyBusinesses[index % homeDemoData.nearbyBusinesses.length].category,
    locality: row.locality_name ?? 'Shillong',
    rating: Number((4.5 + (index % 4) * 0.1).toFixed(1)),
    statusLabel: 'Open Now',
    closingText: `Closes ${index % 2 === 0 ? '10:00 PM' : '9:00 PM'}`,
    imagePath: getPublicStorageUrl(row.cover_image_path),
    href: safeSlug(row.slug),
    isVerified: row.is_verified ?? true,
  }));
}

export async function getHomePageData(): Promise<HomePageData> {
  const [vendorsRaw, dealsRaw, sponsoredRaw] = await Promise.all([
    sbSelect('v_public_vendors', '*', { order: 'priority.desc,name.asc', limit: '8' }).catch(() => []),
    sbSelect('v_public_deals', '*', { order: 'priority.desc,view_count.desc', limit: '8' }).catch(() => []),
    sbSelect('v_active_sponsored_placements', '*', { order: 'priority.desc,weight.desc', limit: '8' }).catch(() => []),
  ]);

  const vendors = mapBusinessRows((vendorsRaw as PublicVendorRow[]) ?? []);
  const deals = mapDealRows((dealsRaw as PublicDealRow[]) ?? []);
  const sponsored = (sponsoredRaw as SponsoredPlacementRow[]) ?? [];

  const heroPlacement = sponsored.find((item) => item.placement_key === 'home_hero' || item.placement_key === 'app_home_carousel');
  const featuredPlacement = sponsored.find((item) => item.placement_key === 'home_featured_vendors');

  return {
    ...homeDemoData,
    trendingDeals: deals.length > 0 ? deals : homeDemoData.trendingDeals,
    nearbyBusinesses: vendors.length > 0 ? vendors.slice(0, 3) : homeDemoData.nearbyBusinesses,
    hero: {
      ...homeDemoData.hero,
      title: heroPlacement?.title || homeDemoData.hero.title,
      subtitle: heroPlacement?.subtitle || homeDemoData.hero.subtitle,
      ctaLabel: heroPlacement?.cta_label || homeDemoData.hero.ctaLabel,
      imagePath: getPublicStorageUrl(heroPlacement?.image_path) || homeDemoData.hero.imagePath,
    },
    featuredMerchant: {
      ...homeDemoData.featuredMerchant,
      name: featuredPlacement?.title || homeDemoData.featuredMerchant.name,
      description: featuredPlacement?.subtitle || homeDemoData.featuredMerchant.description,
      ctaLabel: featuredPlacement?.cta_label || homeDemoData.featuredMerchant.ctaLabel,
      imagePath: getPublicStorageUrl(featuredPlacement?.image_path) || homeDemoData.featuredMerchant.imagePath,
    },
  };
}
