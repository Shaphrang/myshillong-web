import { redirect } from 'next/navigation';
import { getAuthUser, sbSelect } from '@/lib/supabase/server';

export async function getCurrentAdmin() {
  const user = await getAuthUser();
  if (!user?.id) return null;

  const [profile] = await sbSelect('admin_profiles', `id,full_name,role,is_active&id=eq.${user.id}`).catch(() => []);
  if (!profile?.is_active) return null;

  return { user, profile };
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect('/admin/login');
  return admin;
}
