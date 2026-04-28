//src\app\admin\login\actions.ts
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSupabaseEnv } from '@/lib/supabase/client';

function toError(message: string) {
  return `/admin/login?error=${encodeURIComponent(message)}`;
}

export async function loginAdminAction(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');

  if (!email || !password) {
    redirect(toError('Email and password are required.'));
  }

  const env = getSupabaseEnv();

  if (!env) {
    redirect(toError('Supabase environment variables are not configured.'));
  }

  const { key, url } = env;

  const response = await fetch(`${url}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: key,
    },
    body: JSON.stringify({ email, password }),
    cache: 'no-store',
  });

  const data = await response.json();

  if (!response.ok || !data?.access_token || !data?.user?.id) {
    redirect(toError('Invalid email or password.'));
  }

  const adminUrl = new URL(`${url}/rest/v1/admin_profiles`);
  adminUrl.searchParams.set('select', 'id,full_name,role,is_active');
  adminUrl.searchParams.set('id', `eq.${data.user.id}`);
  adminUrl.searchParams.set('is_active', 'eq.true');
  adminUrl.searchParams.set('limit', '1');

  const adminResponse = await fetch(adminUrl.toString(), {
    headers: {
      apikey: key,
      Authorization: `Bearer ${data.access_token}`,
    },
    cache: 'no-store',
  });

  if (!adminResponse.ok) {
    redirect(toError('Unable to verify admin access. Please check admin profile and RLS policies.'));
  }

  const adminProfiles = await adminResponse.json();
  const adminProfile = adminProfiles?.[0];

  if (!adminProfile?.is_active) {
    redirect(toError('Your account is not authorized for admin access.'));
  }

  const cookieStore = await cookies();

  cookieStore.set('sb-access-token', data.access_token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  });

  cookieStore.set('sb-refresh-token', data.refresh_token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  });

  redirect('/admin/dashboard');
}

export async function logoutAdminAction() {
  const cookieStore = await cookies();

  cookieStore.delete('sb-access-token');
  cookieStore.delete('sb-refresh-token');

  redirect('/admin/login');
}

export const loginAdmin = loginAdminAction;
export const logoutAdmin = logoutAdminAction;