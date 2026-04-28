import { LogoutButton } from './LogoutButton';

export function AdminTopbar({ name, email }: { name?: string | null; email?: string | null }) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
      <div>
        <p className="text-sm font-medium text-slate-900">Admin Panel</p>
        <p className="text-xs text-slate-500">{name || email || 'MyShillong Admin'}</p>
      </div>
      <LogoutButton />
    </header>
  );
}
