import { logoutAdmin } from '@/app/admin/login/actions';

export function AdminTopbar() {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
      <div className="text-sm text-slate-500">Admin Panel</div>
      <form action={logoutAdmin}>
        <button className="rounded-md border border-slate-300 px-3 py-1 text-sm">Logout</button>
      </form>
    </header>
  );
}
