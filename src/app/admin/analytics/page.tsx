/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateRangeFilter } from '@/components/admin/DateRangeFilter';
import { sbSelect } from '@/lib/supabase/server';

export default async function AnalyticsPage() {
  const [vendors, deals, ads] = await Promise.all([sbSelect('v_admin_vendor_performance').catch(()=>[]), sbSelect('v_admin_deal_performance').catch(()=>[]), sbSelect('v_admin_ad_performance').catch(()=>[])]);
  return <div className="space-y-4"><h1 className="text-2xl font-semibold">Analytics</h1><DateRangeFilter/><div className="grid gap-4 md:grid-cols-3"><section className="rounded-lg border bg-white p-4"><h2 className="font-semibold">Top Vendors</h2><ul className="text-sm">{(vendors as any[]).slice(0,10).map((v:any)=><li key={v.vendor_id}>{v.vendor_name}: {v.vendor_views} views / {v.whatsapp_clicks} WA</li>)}</ul></section><section className="rounded-lg border bg-white p-4"><h2 className="font-semibold">Top Deals</h2><ul className="text-sm">{(deals as any[]).slice(0,10).map((d:any)=><li key={d.deal_id}>{d.deal_title}: {d.deal_views}</li>)}</ul></section><section className="rounded-lg border bg-white p-4"><h2 className="font-semibold">Top Ads</h2><ul className="text-sm">{(ads as any[]).slice(0,10).map((a:any)=><li key={a.placement_id}>{a.title}: {a.click_count} clicks</li>)}</ul></section></div></div>;
}
