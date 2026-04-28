import { redirect } from 'next/navigation';
import { loginAdminAction } from './actions';
import { getCurrentAdmin } from '@/lib/admin/auth';
import { SubmitButton } from '@/components/admin/SubmitButton';

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const admin = await getCurrentAdmin();
  if (admin) redirect('/admin/dashboard');

  const params = await searchParams;
  const error = typeof params.error === 'string' ? params.error : undefined;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-orange-50 p-6">
      <form action={loginAdminAction} className="w-full max-w-md space-y-4 rounded-2xl border border-emerald-100 bg-white p-6 shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">MyShillong</p>
        <h1 className="text-2xl font-semibold text-slate-900">Admin Sign In</h1>
        {error ? <p className="rounded-lg bg-rose-50 p-2 text-sm text-rose-700">{error}</p> : null}
        <div>
          <label className="text-sm">Email</label>
          <input name="email" type="email" required className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="text-sm">Password</label>
          <input name="password" type="password" required className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <SubmitButton pendingText="Signing in...">Sign in to Dashboard</SubmitButton>
      </form>
    </div>
  );
}
