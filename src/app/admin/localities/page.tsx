/* eslint-disable @typescript-eslint/no-explicit-any */
import { createLocality, deleteLocality } from './actions';
import { sbSelect } from '@/lib/supabase/server';
import { ConfirmDeleteButton } from '@/components/admin/ConfirmDeleteButton';

export default async function LocalitiesPage() {
  const rows = await sbSelect('localities').catch(() => []);
  return <div className="space-y-4"><h1 className="text-2xl font-semibold">Localities</h1>
  <form action={createLocality} className="grid gap-2 rounded-lg border bg-white p-4 md:grid-cols-4">{['name','district','state','country'].map((f)=><input key={f} name={f} placeholder={f} className="rounded border px-3 py-2" />)}<input name="sort_order" type="number" placeholder="sort" className="rounded border px-3 py-2" /><label className="text-sm"><input type="checkbox" name="is_active" defaultChecked /> Active</label><button className="rounded bg-sky-600 px-3 py-2 text-white">Create</button></form>
  <div className="rounded-lg border bg-white p-4"><table className="w-full text-sm"><thead><tr><th>Name</th><th>District</th><th>Active</th><th/></tr></thead><tbody>{rows.map((r:any)=><tr key={r.id}><td>{r.name}</td><td>{r.district}</td><td>{String(r.is_active)}</td><td><form action={deleteLocality}><input type="hidden" name="id" value={r.id}/><ConfirmDeleteButton/></form></td></tr>)}</tbody></table></div></div>;
}
