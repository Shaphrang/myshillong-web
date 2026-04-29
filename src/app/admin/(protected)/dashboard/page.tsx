/* eslint-disable @typescript-eslint/no-explicit-any */
import { sbSelect } from '@/lib/supabase/server';

export default async function AdminDashboardPage() {
  const [foodVendors, clothingVendors, deals, districts, locations, categories] = await Promise.all([
    sbSelect('food_vendors', 'id,name,status,is_active,priority,sponsored_type,created_at&order=created_at.desc&limit=5').catch(() => []),
    sbSelect('clothing_vendors', 'id,name,status,is_active,priority,sponsored_type,created_at&order=created_at.desc&limit=5').catch(() => []),
    sbSelect('deals', 'id,title,status,priority,sponsored_type,vendor_type,food_vendor_id,clothing_vendor_id,ends_at&order=created_at.desc&limit=6').catch(() => []),
    sbSelect('districts', 'id').catch(() => []),
    sbSelect('locations', 'id').catch(() => []),
    sbSelect('categories', 'id').catch(() => []),
  ]);

  const combinedRecent = [
    ...(foodVendors as any[]).map((row) => ({ ...row, type: 'Food Vendor' })),
    ...(clothingVendors as any[]).map((row) => ({ ...row, type: 'Clothing Vendor' })),
  ]
    .sort((a, b) => new Date(String(b.created_at)).getTime() - new Date(String(a.created_at)).getTime())
    .slice(0, 8);

  const activeDeals = (deals as any[]).filter((deal) => deal.status === 'active').length;
  const draftDeals = (deals as any[]).filter((deal) => deal.status === 'draft').length;

  const stats = [
    { label: 'Total Food Vendors', value: (foodVendors as any[]).length },
    { label: 'Total Clothing Vendors', value: (clothingVendors as any[]).length },
    { label: 'Active Deals', value: activeDeals },
    { label: 'Draft Deals', value: draftDeals },
    { label: 'Total Districts', value: (districts as any[]).length },
    { label: 'Total Locations', value: (locations as any[]).length },
    { label: 'Categories', value: (categories as any[]).length },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-gradient-to-r from-rose-600 via-orange-500 to-amber-300 p-6 text-white shadow-sm">
        <h1 className="text-3xl font-bold">Marketplace Dashboard</h1>
        <p className="mt-2 text-sm text-white/90">Manage vendors, locations, categories, and deals</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-2xl border border-rose-100 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-slate-900">Recent Vendors</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead><tr className="text-left text-slate-500"><th>Name</th><th>Type</th><th>Status</th><th>Priority</th><th>Sponsored</th></tr></thead>
            <tbody>
              {combinedRecent.map((row) => (
                <tr key={`${row.type}-${row.id}`} className="border-t border-slate-100">
                  <td className="py-2">{row.name}</td>
                  <td>{row.type}</td>
                  <td>{row.status}</td>
                  <td>{row.priority}</td>
                  <td>{row.sponsored_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
