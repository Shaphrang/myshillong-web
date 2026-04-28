import { notFound } from 'next/navigation';
import { sbSelect } from '@/lib/supabase/server';

export default async function VendorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [vendor] = await sbSelect('v_public_vendors', `*&slug=eq.${slug}`).catch(() => []);
  if (!vendor) notFound();
  return <div className="mx-auto max-w-4xl space-y-4 p-6"><h1 className="text-3xl font-semibold">{vendor.name}</h1><p>{vendor.full_description || vendor.short_description || 'No description yet.'}</p></div>;
}
