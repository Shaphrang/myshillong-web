export type HomeCategory = {
  id: string;
  title: string;
  subtitle: string;
  icon: 'shopping' | 'food' | 'home' | 'beauty' | 'services' | 'events';
  href: string;
};

export type HomeDeal = {
  id: string;
  title: string;
  businessName: string;
  locality: string;
  discountLabel: string;
  imagePath?: string | null;
  href: string;
};

export type HomeBusiness = {
  id: string;
  name: string;
  category: string;
  locality: string;
  rating: number;
  statusLabel: string;
  closingText: string;
  imagePath?: string | null;
  href: string;
  isVerified?: boolean;
};

export type HomeHero = {
  pretitle: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  href: string;
  imagePath?: string | null;
};

export type SupportLocalBanner = {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  imagePath?: string | null;
};

export type FeaturedMerchant = {
  title: string;
  name: string;
  description: string;
  meta: string;
  ctaLabel: string;
  href: string;
  imagePath?: string | null;
};

export type HomePageData = {
  categories: HomeCategory[];
  trendingDeals: HomeDeal[];
  nearbyBusinesses: HomeBusiness[];
  hero: HomeHero;
  supportLocalBanner: SupportLocalBanner;
  featuredMerchant: FeaturedMerchant;
};

export const homeDemoData: HomePageData = {
  hero: {
    pretitle: 'DISCOVER. SHOP. SUPPORT.',
    title: 'Everything Shillong,\nIn One Place',
    subtitle: 'Local businesses. Great products. Stronger community.',
    ctaLabel: 'Shop Local Now',
    href: '/vendors',
    imagePath: null,
  },
  categories: [
    {
      id: 'shopping',
      title: 'Shopping',
      subtitle: 'Fashion, Accessories, Electronics & more',
      icon: 'shopping',
      href: '/categories?type=shopping',
    },
    {
      id: 'food-drinks',
      title: 'Food & Drinks',
      subtitle: 'Restaurants, Cafes, Bakeries & more',
      icon: 'food',
      href: '/categories?type=food-drinks',
    },
    {
      id: 'home-living',
      title: 'Home & Living',
      subtitle: 'Decor, Furniture, Plants & more',
      icon: 'home',
      href: '/categories?type=home-living',
    },
    {
      id: 'beauty-wellness',
      title: 'Beauty & Wellness',
      subtitle: 'Salons, Spas, Wellness & more',
      icon: 'beauty',
      href: '/categories?type=beauty-wellness',
    },
    {
      id: 'services',
      title: 'Services',
      subtitle: 'Home Services, Repairs, Consultations & more',
      icon: 'services',
      href: '/categories?type=services',
    },
    {
      id: 'events-activities',
      title: 'Events & Activities',
      subtitle: 'Local Events, Tickets, Experiences & more',
      icon: 'events',
      href: '/categories?type=events-activities',
    },
  ],
  trendingDeals: [
    {
      id: 'deal-cafe-shillong',
      title: 'Cafe Shillong',
      businessName: 'Cafe Shillong',
      locality: 'Laitumkhrah',
      discountLabel: '10% OFF',
      href: '/deals/cafe-shillong-offer',
    },
    {
      id: 'deal-bakehouse',
      title: 'The Shillong Bakehouse',
      businessName: 'The Shillong Bakehouse',
      locality: 'Police Bazaar',
      discountLabel: '20% OFF',
      href: '/deals/the-shillong-bakehouse-20-off',
    },
    {
      id: 'deal-herbals',
      title: 'Meghalaya Herbals',
      businessName: 'Meghalaya Herbals',
      locality: 'Laitumkhrah',
      discountLabel: '15% OFF',
      href: '/deals/meghalaya-herbals-15-off',
    },
    {
      id: 'deal-rynjah',
      title: 'Ki Rynjah Handicrafts',
      businessName: 'Ki Rynjah Handicrafts',
      locality: 'Lewduh',
      discountLabel: 'Flat 10% OFF',
      href: '/deals/ki-rynjah-handicrafts-offer',
    },
  ],
  nearbyBusinesses: [
    {
      id: 'biz-cafe-shillong',
      name: 'Cafe Shillong',
      category: 'Cafe',
      locality: 'Laitumkhrah',
      rating: 4.6,
      statusLabel: 'Open Now',
      closingText: 'Closes 10:00 PM',
      href: '/vendors/cafe-shillong',
      isVerified: true,
    },
    {
      id: 'biz-ka-shai',
      name: 'Ka Shai Clothing',
      category: 'Clothing Store',
      locality: 'Police Bazaar',
      rating: 4.7,
      statusLabel: 'Open Now',
      closingText: 'Closes 9:00 PM',
      href: '/vendors/ka-shai-clothing',
      isVerified: true,
    },
    {
      id: 'biz-aroma-spa',
      name: 'The Aroma Spa',
      category: 'Spa',
      locality: 'Laitumkhrah',
      rating: 4.8,
      statusLabel: 'Open Now',
      closingText: 'Closes 8:00 PM',
      href: '/vendors/the-aroma-spa',
      isVerified: true,
    },
  ],
  supportLocalBanner: {
    title: 'Support Local. Preserve Our Culture.',
    description:
      'Explore unique handicrafts, handlooms and local treasures made with love in Meghalaya.',
    ctaLabel: 'Explore Handicrafts',
    href: '/vendors?category=handicrafts',
  },
  featuredMerchant: {
    title: 'FEATURED MERCHANT',
    name: 'Jadoh – Taste of Meghalaya',
    description: 'Authentic Khasi cuisine made with love and local ingredients.',
    meta: '4.8 • Restaurant • Mawprem',
    ctaLabel: 'View Menu & Order',
    href: '/vendors/jadoh-taste-of-meghalaya',
  },
};
