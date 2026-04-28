import type { Metadata } from 'next';
import { HomePage } from '@/components/public/home/HomePage';
import { getHomePageData } from '@/lib/public/home-data';

export const metadata: Metadata = {
  title: 'MyShillong | Shop Local, Discover Local',
  description: 'Discover food, fashion, deals and local businesses in Shillong.',
};

export default async function Home() {
  const data = await getHomePageData();
  return <HomePage data={data} />;
}
