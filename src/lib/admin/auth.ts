import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function getCurrentAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: adminProfile } = await supabase
    .from('admin_profiles')
    .select('id, full_name, role, is_active')
    .eq('id', user.id)
    .eq('is_active', true)
    .maybeSingle();

  if (!adminProfile) {
    return null;
  }

  return {
    user,
    profile: adminProfile,
  };
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect('/admin/login');
  }

  return admin;
}
