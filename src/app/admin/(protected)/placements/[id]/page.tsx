import Link from 'next/link';
import { sbSelect } from '@/lib/supabase/server';

export default async function AdDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [ad] = await sbSelect('sponsored_placements','*&id=eq.'+id).catch(()=>[]);
  return <div className="space-y-3"><h1 className="text-2xl font-semibold">Ad Detail</h1><pre className="rounded border bg-white p-4 text-xs">{JSON.stringify(ad,null,2)}</pre><Link href={`/admin/placements/${id}/edit`} className="text-sky-700">Edit</Link></div>;
}
