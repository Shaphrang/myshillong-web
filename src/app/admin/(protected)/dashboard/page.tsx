/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import { sbSelect } from '@/lib/supabase/server';

export default async function AdminDashboardPage() {
  const [vendors, deals, categories] = await Promise.all([
    sbSelect('vendors', 'id,name,status,created_at&order=created_at.desc&limit=5').catch(() => []),
    sbSelect('deals', 'id,title,status,created_at&order=created_at.desc&limit=5').catch(() => []),
    sbSelect('categories', 'id').catch(() => []),
  ]);

  const vendorRows = vendors as any[];
  const dealRows = deals as any[];

  const stats = [
    { label: 'Total Vendors', value: vendorRows.length, accent: 'from-rose-500 to-orange-500' },
    { label: 'Total Deals', value: dealRows.length, accent: 'from-fuchsia-500 to-rose-500' },
    { label: 'Total Categories', value: (categories as any[]).length, accent: 'from-amber-500 to-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">Overview of recent marketplace updates and admin activity.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((item) => (
          <div key={item.label} className={`rounded-2xl bg-gradient-to-r ${item.accent} p-[1px] shadow-sm`}>
            <div className="rounded-2xl bg-white p-5">
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{item.value}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Vendors</h2>
            <Link href="/admin/vendors" className="text-sm text-rose-600">View all</Link>
          </div>
          <ul className="space-y-2 text-sm">
            {vendorRows.length ? vendorRows.map((vendor) => <li key={String(vendor.id)} className="rounded-lg border border-slate-100 px-3 py-2">{String(vendor.name ?? 'Untitled')}</li>) : <li className="text-slate-500">No vendors added yet.</li>}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Deals</h2>
            <Link href="/admin/deals" className="text-sm text-rose-600">View all</Link>
          </div>
          <ul className="space-y-2 text-sm">
            {dealRows.length ? dealRows.map((deal) => <li key={String(deal.id)} className="rounded-lg border border-slate-100 px-3 py-2">{String(deal.title ?? 'Untitled')}</li>) : <li className="text-slate-500">No deals added yet.</li>}
          </ul>
        </div>
      </section>
    </div>
  );
}
