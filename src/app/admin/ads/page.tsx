/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import { sbSelect } from '@/lib/supabase/server';
import { deleteAd } from './actions';
import { ConfirmDeleteButton } from '@/components/admin/ConfirmDeleteButton';

export default async function AdsPage() {
  const rows = await sbSelect('sponsored_placements','id,placement_key,title,status,billing_status,click_count,impression_count').catch(()=>[]);
  return <div className="space-y-4"><div className="flex items-center justify-between"><h1 className="text-2xl font-semibold">Sponsored Ads</h1><Link href="/admin/ads/new" className="rounded bg-sky-600 px-3 py-2 text-white">New Placement</Link></div><div className="rounded-lg border bg-white p-4"><table className="w-full text-sm"><thead><tr><th>Placement</th><th>Title</th><th>Status</th><th>Billing</th><th>Perf</th><th/></tr></thead><tbody>{rows.map((r:any)=><tr key={r.id}><td>{r.placement_key}</td><td><Link href={`/admin/ads/${r.id}`}>{r.title}</Link></td><td>{r.status}</td><td>{r.billing_status}</td><td>{r.impression_count} / {r.click_count}</td><td><Link href={`/admin/ads/${r.id}/edit`} className="text-sky-700">Edit</Link> <form action={deleteAd} className="inline"><input type="hidden" name="id" value={r.id}/><ConfirmDeleteButton/></form></td></tr>)}</tbody></table></div></div>;
}
