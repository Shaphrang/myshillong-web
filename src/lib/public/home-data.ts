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
  const [foodVendorsRaw, clothingVendorsRaw, dealsRaw] = await Promise.all([
    sbSelect('food_vendors', '*', { status: 'eq.active', is_active: 'eq.true', selected_pages: 'cs.{homepage}', order: 'priority.desc,created_at.desc', limit: '4' }).catch(() => []),
    sbSelect('clothing_vendors', '*', { status: 'eq.active', is_active: 'eq.true', selected_pages: 'cs.{homepage}', order: 'priority.desc,created_at.desc', limit: '4' }).catch(() => []),
    sbSelect('deals', '*', { status: 'eq.active', is_active: 'eq.true', selected_pages: 'cs.{homepage}', order: 'priority.desc,created_at.desc', limit: '8' }).catch(() => []),
  ]);

  const vendors = mapBusinessRows([...(foodVendorsRaw as PublicVendorRow[]), ...(clothingVendorsRaw as PublicVendorRow[])]);
  const deals = mapDealRows((dealsRaw as PublicDealRow[]) ?? []);

  return {
    ...homeDemoData,
    trendingDeals: deals.length > 0 ? deals : homeDemoData.trendingDeals,
    nearbyBusinesses: vendors.length > 0 ? vendors.slice(0, 3) : homeDemoData.nearbyBusinesses,
    hero: {
      ...homeDemoData.hero,
      title: homeDemoData.hero.title,
      subtitle: homeDemoData.hero.subtitle,
      ctaLabel: homeDemoData.hero.ctaLabel,
      imagePath: homeDemoData.hero.imagePath,
    },
    featuredMerchant: {
      ...homeDemoData.featuredMerchant,
      name: homeDemoData.featuredMerchant.name,
      description: homeDemoData.featuredMerchant.description,
      ctaLabel: homeDemoData.featuredMerchant.ctaLabel,
      imagePath: homeDemoData.featuredMerchant.imagePath,
    },
  };
}
