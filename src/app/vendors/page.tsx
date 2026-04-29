import Link from 'next/link';
import { sbSelect } from '@/lib/supabase/server';

export default async function VendorsPage() {
  const [foodVendors, clothingVendors] = await Promise.all([
    sbSelect('food_vendors', 'id,slug,name,short_description,status,is_active,priority', {
      status: 'eq.active',
      is_active: 'eq.true',
      order: 'priority.desc,created_at.desc',
      limit: '24',
    }).catch(() => []),
    sbSelect('clothing_vendors', 'id,slug,name,short_description,status,is_active,priority', {
      status: 'eq.active',
      is_active: 'eq.true',
      order: 'priority.desc,created_at.desc',
      limit: '24',
    }).catch(() => []),
  ]);

  const vendors = [...foodVendors, ...clothingVendors];

  return <div className="mx-auto max-w-6xl space-y-4 p-6"><h1 className="text-3xl font-semibold">Shillong Vendors</h1><div className="grid gap-4 md:grid-cols-3">{vendors.map((v: { id?: string; slug?: string; name?: string; short_description?: string })=><Link key={v.slug||v.id} href={`/vendors/${v.slug}`} className="rounded-xl border bg-white p-4 hover:shadow"><h2 className="font-semibold">{v.name}</h2><p className="text-sm text-slate-600">{v.short_description || 'Local marketplace listing'}</p></Link>)}</div></div>;
}
