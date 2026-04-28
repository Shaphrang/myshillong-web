import Link from 'next/link';
import { sbSelect } from '@/lib/supabase/server';

export default async function Home() {
  const [vendors, deals, placements] = await Promise.all([
    sbSelect('v_public_vendors').catch(() => []),
    sbSelect('v_public_deals').catch(() => []),
    sbSelect('v_active_sponsored_placements').catch(() => []),
  ]);

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6">
      <section className="rounded-2xl bg-gradient-to-r from-emerald-700 to-orange-500 p-8 text-white">
        <h1 className="text-4xl font-bold">MyShillong Marketplace</h1>
        <p className="mt-2">Food, cafes, fashion, shopping, deals and local services across Shillong.</p>
        <div className="mt-4 flex gap-3"><Link href="/vendors" className="rounded bg-white px-4 py-2 text-emerald-700">Browse Vendors</Link><Link href="/deals" className="rounded border border-white px-4 py-2">Explore Deals</Link></div>
      </section>
      <section><h2 className="mb-3 text-xl font-semibold">Featured Vendors</h2><div className="grid gap-3 md:grid-cols-3">{vendors.slice(0,6).map((v: { id?: string; name?: string })=><div key={v.id} className="rounded border bg-white p-4">{v.name}</div>)}</div></section>
      <section><h2 className="mb-3 text-xl font-semibold">Active Deals</h2><div className="grid gap-3 md:grid-cols-3">{deals.slice(0,6).map((d: { id?: string; title?: string })=><div key={d.id} className="rounded border bg-white p-4">{d.title}</div>)}</div></section>
      <section><h2 className="mb-3 text-xl font-semibold">Sponsored</h2><div className="grid gap-3 md:grid-cols-3">{placements.slice(0,3).map((p: { id?: string; title?: string; placement_name?: string })=><div key={p.id} className="rounded border bg-white p-4">{p.title || p.placement_name}</div>)}</div></section>
    </div>
  );
}
