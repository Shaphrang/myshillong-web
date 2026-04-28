export type HomeHeroItem = {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  imagePath?: string | null;
  sponsored?: boolean;
};

export type HomeCategoryItem = {
  id: string;
  title: string;
  subtitle: string;
  icon: 'food' | 'fashion' | 'deals' | 'services';
  href: string;
  accent: string;
};

export type HomeVendorItem = {
  id: string;
  name: string;
  slug: string;
  locality: string;
  category: string;
  rating: number;
  reviews: number;
  imagePath?: string | null;
  sponsored?: boolean;
};

export type HomeDealItem = {
  id: string;
  title: string;
  vendorName: string;
  discountLabel: string;
  validTill: string;
  locality: string;
  imagePath?: string | null;
  sponsored?: boolean;
};

export type HomeNearbyItem = {
  id: string;
  name: string;
  category: string;
  locality: string;
  rating: number;
  distance: string;
  imagePath?: string | null;
};

export const fallbackCategories: HomeCategoryItem[] = [
  {
    id: 'food-cafes',
    title: 'Food & Cafes',
    subtitle: 'Local bites, cafes & restaurants',
    icon: 'food',
    href: '/vendors?category=food-cafes',
    accent: 'from-[#FFB347] to-[#FF8A2A]',
  },
  {
    id: 'fashion-shopping',
    title: 'Fashion & Shopping',
    subtitle: 'Boutiques, apparel & accessories',
    icon: 'fashion',
    href: '/vendors?category=fashion-shopping',
    accent: 'from-[#5ED5C4] to-[#23B49F]',
  },
  {
    id: 'deals-offers',
    title: 'Deals & Offers',
    subtitle: 'Best discounts & limited time offers',
    icon: 'deals',
    href: '/deals',
    accent: 'from-[#FF8A9B] to-[#FF5B6B]',
  },
  {
    id: 'local-services',
    title: 'Local Services',
    subtitle: 'Home, beauty, repair & more',
    icon: 'services',
    href: '/vendors?category=local-services',
    accent: 'from-[#6EBAFF] to-[#3C8EF4]',
  },
];

export const fallbackHeroSlides: HomeHeroItem[] = [
  {
    id: 'hero-default',
    title: 'Support Local. Shop Local. Love Shillong.',
    subtitle: 'Discover amazing local businesses and exclusive offers near you.',
    ctaLabel: 'Explore Now',
    imagePath: 'ads/home-hero.jpg',
  },
  {
    id: 'hero-featured',
    title: 'Shillong\'s best local finds in one place.',
    subtitle: 'From cafe favorites to fashion picks, explore trusted city businesses.',
    ctaLabel: 'Explore Now',
    imagePath: 'ads/home-hero-2.jpg',
  },
];

export const fallbackVendors: HomeVendorItem[] = [
  {
    id: 'vendor-cafe-shillong-heritage',
    name: 'Cafe Shillong Heritage',
    slug: 'cafe-shillong-heritage',
    locality: 'Police Bazaar',
    category: 'Cafe',
    rating: 4.6,
    reviews: 128,
    imagePath: 'vendors/cafe-shillong-heritage/cover.jpg',
  },
  {
    id: 'vendor-kaari-boutique',
    name: 'Kaari Boutique',
    slug: 'kaari-boutique',
    locality: 'Laitumkhrah',
    category: 'Fashion',
    rating: 4.7,
    reviews: 96,
    imagePath: 'vendors/kaari-boutique/cover.jpg',
  },
  {
    id: 'vendor-organic-treat',
    name: 'The Organic Treat',
    slug: 'the-organic-treat',
    locality: 'Mawprem',
    category: 'Healthy Food',
    rating: 4.5,
    reviews: 82,
    imagePath: 'vendors/the-organic-treat/cover.jpg',
  },
  {
    id: 'vendor-ws-blossom',
    name: 'WS Blossom',
    slug: 'ws-blossom',
    locality: 'Nongrim Hills',
    category: 'Florist',
    rating: 4.6,
    reviews: 74,
    imagePath: 'vendors/ws-blossom/cover.jpg',
  },
];

export const fallbackDeals: HomeDealItem[] = [
  {
    id: 'deal-pizza-offer',
    title: '20% Off on All Pizzas',
    vendorName: 'Cafe Shillong Heritage',
    discountLabel: '20% OFF',
    validTill: 'Valid till 25 May',
    locality: 'Police Bazaar',
    imagePath: 'deals/pizza-offer/cover.jpg',
  },
  {
    id: 'deal-fashion-flat',
    title: '15% Off on All Outfits',
    vendorName: 'Kaari Boutique',
    discountLabel: 'Flat 15% OFF',
    validTill: 'Valid till 20 May',
    locality: 'Laitumkhrah',
    imagePath: 'deals/fashion-flat/cover.jpg',
  },
  {
    id: 'deal-juice-bogo',
    title: 'Buy 1 Get 1 Free on Cold Press Juices',
    vendorName: 'The Organic Treat',
    discountLabel: 'Buy 1 Get 1 FREE',
    validTill: 'Valid till 18 May',
    locality: 'Mawprem',
    imagePath: 'deals/juice-bogo/cover.jpg',
  },
];

export const fallbackNearbyBusinesses: HomeNearbyItem[] = [
  {
    id: 'nearby-jiva-cafe',
    name: 'Jiva Cafe',
    category: 'Cafe',
    locality: 'Police Bazaar',
    rating: 4.6,
    distance: '0.3 km',
    imagePath: 'vendors/jiva-cafe/thumb.jpg',
  },
  {
    id: 'nearby-polo-dry-cleaners',
    name: 'Polo Dry Cleaners',
    category: 'Laundry',
    locality: 'Laitumkhrah',
    rating: 4.5,
    distance: '0.6 km',
    imagePath: 'vendors/polo-dry-cleaners/thumb.jpg',
  },
  {
    id: 'nearby-glow-go-salon',
    name: 'Glow & Go Salon',
    category: 'Beauty',
    locality: 'Nongrim Hills',
    rating: 4.7,
    distance: '1.2 km',
    imagePath: 'vendors/glow-go-salon/thumb.jpg',
  },
  {
    id: 'nearby-hilltop-bakery',
    name: 'Hilltop Bakery',
    category: 'Bakery',
    locality: 'Laban',
    rating: 4.4,
    distance: '1.8 km',
    imagePath: 'vendors/hilltop-bakery/thumb.jpg',
  },
];
