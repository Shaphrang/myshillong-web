import type { ReactNode } from 'react';
import { AdminShell } from '@/components/admin/AdminShell';
import { requireAdmin } from '@/lib/admin/auth';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const admin = await requireAdmin();

  return <AdminShell adminName={admin.profile.full_name} adminEmail={admin.user.email}>{children}</AdminShell>;
}
