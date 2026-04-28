import { sbSelect } from '@/lib/supabase/server';

export async function getDashboardStats() {
  const [stats] = await sbSelect('v_admin_dashboard_stats');
  return (stats as Record<string, string | number>) || {};
}
