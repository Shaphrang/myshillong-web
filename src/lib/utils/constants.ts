export const PLACEMENT_KEYS = [
  'home_hero',
  'home_featured',
  'category_top',
  'deals_top',
  'vendor_detail',
  'search_results',
] as const;

export const ADMIN_NAV = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Vendors', href: '/admin/vendors' },
  { label: 'Categories', href: '/admin/categories' },
  { label: 'Subcategories', href: '/admin/subcategories' },
  { label: 'Localities', href: '/admin/localities' },
  { label: 'Deals', href: '/admin/deals' },
  { label: 'Sponsored Ads', href: '/admin/placements' },
  { label: 'Plans', href: '/admin/plans' },
  { label: 'Subscriptions', href: '/admin/subscriptions' },
  { label: 'Media', href: '/admin/media' },
] as const;
