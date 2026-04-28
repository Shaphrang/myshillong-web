import Link from 'next/link';
import { sbSelect } from '@/lib/supabase/server';

export default async function VendorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [vendor] = await sbSelect('vendors', '*&id=eq.' + id).catch(()=>[]);
  return <div className="space-y-3"><h1 className="text-2xl font-semibold">Vendor Detail</h1><pre className="rounded-lg border bg-white p-4 text-xs overflow-auto">{JSON.stringify(vendor,null,2)}</pre><Link href={`/admin/vendors/${id}/edit`} className="text-sky-700">Edit</Link></div>;
}
