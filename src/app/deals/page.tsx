import Link from 'next/link';
import { sbSelect } from '@/lib/supabase/server';

export default async function DealsPage() {
  const deals = await sbSelect('v_public_deals').catch(() => []);
  return <div className="mx-auto max-w-6xl space-y-4 p-6"><h1 className="text-3xl font-semibold">Latest Deals</h1><div className="grid gap-4 md:grid-cols-3">{deals.map((d: { id?: string; slug?: string; title?: string; discount_label?: string })=><Link key={d.slug||d.id} href={`/deals/${d.slug}`} className="rounded-xl border bg-white p-4 hover:shadow"><h2 className="font-semibold">{d.title}</h2><p className="text-sm text-slate-600">{d.discount_label || 'Special offer'}</p></Link>)}</div></div>;
}
