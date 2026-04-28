import { requireAdmin } from '@/lib/admin/auth';
import { logoutAdminAction } from '@/app/admin/login/actions';

export default async function AdminDashboardPage() {
  const admin = await requireAdmin();

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                MyShillong Admin
              </p>
              <h1 className="mt-1 text-2xl font-bold text-slate-900">
                Dashboard
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Welcome, {admin.profile.full_name || admin.user.email}
              </p>
            </div>

            <form action={logoutAdminAction}>
              <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">
                Logout
              </button>
            </form>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Vendors</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">0</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Deals</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">0</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Sponsored Ads</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">0</p>
          </div>
        </div>
      </div>
    </main>
  );
}
