'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ADMIN_NAV } from '@/lib/utils/constants';

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-full border-r border-rose-100 bg-white/95 backdrop-blur md:w-72">
      <div className="border-b border-rose-100 bg-gradient-to-r from-rose-500 via-orange-500 to-pink-500 p-4 text-lg font-semibold text-white">MyShillong Admin</div>
      <nav className="space-y-1 p-3">
        {ADMIN_NAV.map((item) => (
          <Link key={item.href} href={item.href} className={`block rounded-xl px-3 py-2.5 text-sm font-medium transition ${pathname.startsWith(item.href) ? 'bg-gradient-to-r from-rose-50 to-orange-50 text-rose-700 shadow-sm' : 'text-slate-700 hover:bg-slate-100'}`}>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
