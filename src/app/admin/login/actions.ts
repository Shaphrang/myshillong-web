'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

function loginError(message: string) {
  return `/admin/login?error=${encodeURIComponent(message)}`;
}

export async function loginAdminAction(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');

  if (!email || !password) {
    redirect(loginError('Email and password are required.'));
  }

  const supabase = await createClient();

  const { error: loginErrorResult } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (loginErrorResult) {
    redirect(loginError('Invalid email or password.'));
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(loginError('Login failed. Please try again.'));
  }

  const { data: adminProfile } = await supabase
    .from('admin_profiles')
    .select('id, is_active')
    .eq('id', user.id)
    .eq('is_active', true)
    .maybeSingle();

  if (!adminProfile) {
    await supabase.auth.signOut();
    redirect(loginError('Your account is not authorized for admin access.'));
  }

  redirect('/admin/dashboard');
}

export async function logoutAdminAction() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect('/admin/login');
}

export const loginAdmin = loginAdminAction;
export const logoutAdmin = logoutAdminAction;
