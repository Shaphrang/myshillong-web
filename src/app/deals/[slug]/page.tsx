import { notFound } from 'next/navigation';
import { sbSelect } from '@/lib/supabase/server';

export default async function DealDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [deal] = await sbSelect('v_public_deals', `*&slug=eq.${slug}`).catch(() => []);
  if (!deal) notFound();
  return <div className="mx-auto max-w-4xl space-y-4 p-6"><h1 className="text-3xl font-semibold">{deal.title}</h1><p>{deal.full_description || deal.short_description || 'No details yet.'}</p></div>;
}
