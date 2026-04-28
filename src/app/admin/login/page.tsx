import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { loginAdmin } from './actions';

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const cookieStore = await cookies();
  if (cookieStore.get('sb-access-token')) redirect('/admin/dashboard');
  const params = await searchParams;
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <form action={loginAdmin} className="w-full max-w-md space-y-4 rounded-xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">MyShillong Admin Login</h1>
        {params.error ? <p className="text-sm text-rose-600">Invalid login. Please check credentials.</p> : null}
        <div><label className="text-sm">Email</label><input name="email" type="email" required className="mt-1 w-full rounded-md border px-3 py-2" /></div>
        <div><label className="text-sm">Password</label><input name="password" type="password" required className="mt-1 w-full rounded-md border px-3 py-2" /></div>
        <button className="w-full rounded-md bg-sky-600 py-2 text-white">Sign in</button>
      </form>
    </div>
  );
}
