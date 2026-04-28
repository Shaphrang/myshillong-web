'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/lib/supabase/client';

export async function loginAdmin(formData: FormData) {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');

  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', apikey: SUPABASE_ANON_KEY },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok || !data.access_token) redirect('/admin/login?error=invalid_credentials');

  const cookieStore = await cookies();
  cookieStore.set('sb-access-token', data.access_token, { httpOnly: true, sameSite: 'lax', path: '/' });
  cookieStore.set('sb-refresh-token', data.refresh_token, { httpOnly: true, sameSite: 'lax', path: '/' });

  redirect('/admin/dashboard');
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('sb-access-token');
  cookieStore.delete('sb-refresh-token');
  redirect('/admin/login');
}
