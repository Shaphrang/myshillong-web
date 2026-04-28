/* eslint-disable @typescript-eslint/no-explicit-any */
import { sbSelect } from '@/lib/supabase/server';
import { createPlan } from './actions';

export default async function PlansPage() {
  const rows = await sbSelect('vendor_plans').catch(()=>[]);
  return <div className="space-y-4"><h1 className="text-2xl font-semibold">Plans</h1><form action={createPlan} className="grid gap-2 rounded-lg border bg-white p-4 md:grid-cols-3">{['name','slug','price_monthly','features','max_deals','sort_order'].map((f)=><input key={f} name={f} placeholder={f} className="rounded border px-3 py-2"/>)}<textarea name="description" placeholder="description" className="rounded border px-3 py-2 md:col-span-3"/><label><input type="checkbox" name="is_active" defaultChecked/> Active</label><button className="rounded bg-sky-600 px-3 py-2 text-white">Create</button></form><div className="rounded-lg border bg-white p-4"><table className="w-full text-sm"><thead><tr><th>Name</th><th>Price</th><th>Deals</th><th>Active</th></tr></thead><tbody>{rows.map((r:any)=><tr key={r.id}><td>{r.name}</td><td>{r.price_monthly}</td><td>{r.max_deals}</td><td>{String(r.is_active)}</td></tr>)}</tbody></table></div></div>;
}
