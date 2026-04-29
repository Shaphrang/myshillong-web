export const PLACEMENT_KEYS = [
  'hero_banner',
  'banner',
  'horizontal',
  'vertical',
  'card',
  'list',
] as const;

export const ADMIN_NAV = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Districts', href: '/admin/districts' },
  { label: 'Locations', href: '/admin/locations' },
  { label: 'Categories', href: '/admin/categories' },
  { label: 'Subcategories', href: '/admin/subcategories' },
  { label: 'Food Vendors', href: '/admin/food-vendors' },
  { label: 'Clothing Vendors', href: '/admin/clothing-vendors' },
  { label: 'Deals', href: '/admin/deals' },
] as const;
