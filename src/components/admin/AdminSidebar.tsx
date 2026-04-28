'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ADMIN_NAV } from '@/lib/utils/constants';

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-full border-r border-slate-200 bg-white md:w-64">
      <div className="border-b border-slate-200 p-4 text-lg font-semibold">MyShillong Admin</div>
      <nav className="space-y-1 p-3">
        {ADMIN_NAV.map((item) => (
          <Link key={item.href} href={item.href} className={`block rounded-md px-3 py-2 text-sm ${pathname.startsWith(item.href) ? 'bg-sky-100 text-sky-700' : 'text-slate-700 hover:bg-slate-100'}`}>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
