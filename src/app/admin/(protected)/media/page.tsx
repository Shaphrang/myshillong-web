/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import { sbSelect } from '@/lib/supabase/server';
import { createMedia, deleteMedia } from './actions';
import { ConfirmDeleteButton } from '@/components/admin/ConfirmDeleteButton';

export default async function MediaPage() {
  const rows = await sbSelect('media_assets').catch(() => []);
  return <div className="space-y-4"><div className="flex items-center justify-between"><h1 className="text-2xl font-semibold">Media Assets</h1><Link href="/admin/media/new" className="rounded bg-sky-600 px-3 py-2 text-white">Add Media</Link></div><form action={createMedia} className="grid gap-2 rounded border bg-white p-4 md:grid-cols-3"><input name="path" required placeholder="Path or URL" className="rounded border px-3 py-2"/><input name="media_type" placeholder="image" className="rounded border px-3 py-2"/><button className="rounded bg-sky-600 px-3 py-2 text-white">Create</button></form><div className="rounded border bg-white p-4"><table className="w-full text-sm"><thead><tr><th>Path</th><th>Type</th><th/></tr></thead><tbody>{rows.map((r:any)=><tr key={r.id}><td>{r.path}</td><td>{r.media_type}</td><td><Link className="text-sky-700" href={`/admin/media/${r.id}/edit`}>Edit</Link> <form action={deleteMedia} className="inline"><input type="hidden" name="id" value={r.id}/><ConfirmDeleteButton/></form></td></tr>)}</tbody></table></div></div>;
}
