import { LogoutButton } from './LogoutButton';

export function AdminTopbar({ name, email }: { name?: string | null; email?: string | null }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-rose-100 bg-white/90 px-4 py-3 backdrop-blur">
      <div>
        <p className="text-sm font-semibold text-slate-900">Admin Panel</p>
        <p className="text-xs text-slate-500">{name || email || 'MyShillong Admin'}</p>
      </div>
      <LogoutButton />
    </header>
  );
}
