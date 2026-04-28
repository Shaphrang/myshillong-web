import { logoutAdminAction } from '@/app/admin/login/actions';

export function LogoutButton() {
  return (
    <form action={logoutAdminAction}>
      <button className="rounded-md border border-slate-300 px-3 py-1 text-sm">Logout</button>
    </form>
  );
}
