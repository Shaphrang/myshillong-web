import type { Metadata } from 'next';
import { HomePage } from '@/components/public/home/HomePage';
import { getHomePageData } from '@/lib/public/home';

export const metadata: Metadata = {
  title: 'MyShillong | Discover Local Businesses, Food, Fashion & Deals',
  description:
    'Discover food, cafes, fashion stores, deals, offers, and local businesses in Shillong with MyShillong.',
  openGraph: {
    title: 'MyShillong | Discover Local Businesses, Food, Fashion & Deals',
    description:
      'Discover food, cafes, fashion stores, deals, offers, and local businesses in Shillong with MyShillong.',
    type: 'website',
  },
};

export default async function Home() {
  const data = await getHomePageData();

  return <HomePage data={data} />;
}
