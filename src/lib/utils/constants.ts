export const PLACEMENT_KEYS = [
  'home_hero','home_featured_vendors','home_top_deals','food_top','food_listing_inline','fashion_top','fashion_listing_inline',
  'deals_top','search_top','vendor_detail_related','app_home_carousel','app_category_top','app_deals_top',
];

export const ADMIN_NAV = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Vendors', href: '/admin/vendors' },
  { label: 'Deals', href: '/admin/deals' },
  { label: 'Ads / Featured', href: '/admin/ads' },
  { label: 'Categories', href: '/admin/categories' },
  { label: 'Subcategories', href: '/admin/subcategories' },
  { label: 'Localities', href: '/admin/localities' },
  { label: 'Plans', href: '/admin/plans' },
  { label: 'Subscriptions', href: '/admin/subscriptions' },
  { label: 'Analytics', href: '/admin/analytics' },
  { label: 'Settings', href: '/admin/settings' },
] as const;
