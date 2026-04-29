import type { ReactNode } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';

export function AdminShell({ children, adminName, adminEmail }: { children: ReactNode; adminName?: string | null; adminEmail?: string | null }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-orange-50 to-white md:flex">
      <AdminSidebar />
      <div className="flex-1">
        <AdminTopbar name={adminName} email={adminEmail} />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
