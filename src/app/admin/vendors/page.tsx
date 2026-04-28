/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import { sbSelect } from '@/lib/supabase/server';
import { deleteVendor } from './actions';
import { ConfirmDeleteButton } from '@/components/admin/ConfirmDeleteButton';

export default async function VendorsPage() {
  const rows = await sbSelect('vendors','id,name,status,is_verified,is_featured,owner_phone,created_at').catch(()=>[]);
  return <div className="space-y-4"><div className="flex items-center justify-between"><h1 className="text-2xl font-semibold">Vendors</h1><Link className="rounded bg-sky-600 px-3 py-2 text-white" href="/admin/vendors/new">Add Vendor</Link></div>
  <div className="rounded-lg border bg-white p-4"><table className="w-full text-sm"><thead><tr><th>Name</th><th>Status</th><th>Verified</th><th>Featured</th><th/></tr></thead><tbody>{rows.map((r:any)=><tr key={r.id}><td><Link href={`/admin/vendors/${r.id}`}>{r.name}</Link></td><td>{r.status}</td><td>{String(r.is_verified)}</td><td>{String(r.is_featured)}</td><td className="space-x-2"><Link href={`/admin/vendors/${r.id}/edit`} className="text-sky-700">Edit</Link><form action={deleteVendor} className="inline"><input type="hidden" name="id" value={r.id}/><ConfirmDeleteButton/></form></td></tr>)}</tbody></table></div></div>;
}
