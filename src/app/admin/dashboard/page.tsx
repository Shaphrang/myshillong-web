/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatCard } from '@/components/admin/StatCard';
import { sbSelect } from '@/lib/supabase/server';

export default async function DashboardPage() {
  const [stats] = await sbSelect('v_admin_dashboard_stats').catch(() => [{} as Record<string, number>]);
  const recentVendors = await sbSelect('vendors', 'id,name,status,created_at').catch(() => []);
  const recentDeals = await sbSelect('deals', 'id,title,status,created_at').catch(() => []);

  const items = [
    ['Total Vendors', stats.total_vendors ?? 0], ['Active Vendors', stats.active_vendors ?? 0], ['Pending Vendors', stats.pending_vendors ?? 0],
    ['Active Deals', stats.active_deals ?? 0], ['Active Ads', stats.active_ads ?? 0], ['Vendor Views', stats.vendor_views ?? 0],
    ['WhatsApp Clicks', stats.whatsapp_clicks ?? 0], ['Phone Clicks', stats.phone_clicks ?? 0], ['Ad Impressions', stats.ad_impressions ?? 0],
    ['Ad Clicks', stats.ad_clicks ?? 0], ['Estimated Revenue', stats.estimated_revenue ?? 0],
  ];

  return <div className="space-y-6"><h1 className="text-2xl font-semibold">Dashboard</h1><div className="grid gap-4 md:grid-cols-3">{items.map(([label,value]) => <StatCard key={String(label)} label={String(label)} value={value as number} />)}</div>
  <div className="grid gap-4 md:grid-cols-2"><section className="rounded-xl border bg-white p-4"><h2 className="font-semibold">Recent Vendors</h2><ul className="mt-2 space-y-2 text-sm">{recentVendors.slice(0,8).map((row: any)=><li key={row.id}>{row.name} • {row.status}</li>)}</ul></section>
  <section className="rounded-xl border bg-white p-4"><h2 className="font-semibold">Recent Deals</h2><ul className="mt-2 space-y-2 text-sm">{recentDeals.slice(0,8).map((row: any)=><li key={row.id}>{row.title} • {row.status}</li>)}</ul></section></div></div>;
}
