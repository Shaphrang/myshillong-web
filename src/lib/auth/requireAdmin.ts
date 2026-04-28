import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { sbSelect } from '@/lib/supabase/server';

export async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('sb-access-token')?.value;
  if (!token) redirect('/admin/login');

  const admins = await sbSelect('admin_profiles', 'id,is_active').catch(() => []);
  if (!admins.length) redirect('/admin/login?error=admin_required');
}
