import Link from 'next/link';

const navItems = [
  { label: 'Home', href: '/', icon: '🏠', active: true },
  { label: 'Explore', href: '/vendors', icon: '🔎' },
  { label: 'Deals', href: '/deals', icon: '🏷️' },
  { label: 'Saved', href: '#', icon: '♡' },
  { label: 'Profile', href: '#', icon: '👤' },
];

export function MobileBottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[#DDEDEA] bg-white/95 px-2 pb-[calc(env(safe-area-inset-bottom)+8px)] pt-2 shadow-[0_-10px_30px_rgba(8,63,60,0.12)] md:hidden">
      <ul className="mx-auto flex max-w-lg items-center justify-between">
        {navItems.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className={`flex min-w-[62px] flex-col items-center gap-1 rounded-2xl px-2 py-1 text-xs font-semibold ${item.active ? 'text-[#0F7A76]' : 'text-[#6B7C7A]'}`}>
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
