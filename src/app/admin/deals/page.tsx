/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import { sbSelect } from '@/lib/supabase/server';
import { deleteDeal } from './actions';
import { ConfirmDeleteButton } from '@/components/admin/ConfirmDeleteButton';

export default async function DealsPage() {
  const rows = await sbSelect('deals','id,title,status,ends_at,vendor_id').catch(()=>[]);
  const vendors = await sbSelect('vendors','id,name').catch(()=>[]);
  return <div className="space-y-4"><div className="flex items-center justify-between"><h1 className="text-2xl font-semibold">Deals</h1><Link href="/admin/deals/new" className="rounded bg-sky-600 px-3 py-2 text-white">Add Deal</Link></div><div className="rounded-lg border bg-white p-4"><table className="w-full text-sm"><thead><tr><th>Title</th><th>Vendor</th><th>Status</th><th>Ends</th><th/></tr></thead><tbody>{(rows as any[]).map((r:any)=><tr key={String(r.id)}><td><Link href={`/admin/deals/${String(r.id)}`}>{String(r.title ?? '')}</Link></td><td>{String((vendors as any[]).find((v:any)=>v.id===r.vendor_id)?.name ?? '-')}</td><td>{String(r.status ?? '')}</td><td>{String(r.ends_at||'')}</td><td><Link href={`/admin/deals/${String(r.id)}/edit`} className="text-sky-700">Edit</Link> <form action={deleteDeal} className="inline"><input type="hidden" name="id" value={String(r.id)}/><ConfirmDeleteButton/></form></td></tr>)}</tbody></table></div></div>;
}
