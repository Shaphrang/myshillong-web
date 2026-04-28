/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSubcategory, deleteSubcategory } from './actions';
import { sbSelect } from '@/lib/supabase/server';
import { ConfirmDeleteButton } from '@/components/admin/ConfirmDeleteButton';

export default async function SubcategoriesPage() {
  const [rows, categories] = await Promise.all([sbSelect('subcategories').catch(()=>[]), sbSelect('categories','id,name').catch(()=>[])]);
  return <div className="space-y-4"><h1 className="text-2xl font-semibold">Subcategories</h1>
  <form action={createSubcategory} className="grid gap-2 rounded-lg border bg-white p-4 md:grid-cols-4"><input name="name" placeholder="Name" className="rounded border px-3 py-2"/><select name="category_id" className="rounded border px-3 py-2">{categories.map((c:any)=><option key={c.id} value={c.id}>{c.name}</option>)}</select><input name="sort_order" type="number" placeholder="Sort" className="rounded border px-3 py-2"/><label><input type="checkbox" name="is_active" defaultChecked /> Active</label><button className="rounded bg-sky-600 px-3 py-2 text-white">Create</button></form>
  <div className="rounded-lg border bg-white p-4"><table className="w-full text-sm"><thead><tr><th>Name</th><th>Category</th><th>Active</th><th/></tr></thead><tbody>{rows.map((r:any)=><tr key={r.id}><td>{r.name}</td><td>{categories.find((c:any)=>c.id===r.category_id)?.name ?? '-'}</td><td>{String(r.is_active)}</td><td><form action={deleteSubcategory}><input type="hidden" name="id" value={r.id}/><ConfirmDeleteButton/></form></td></tr>)}</tbody></table></div></div>;
}
