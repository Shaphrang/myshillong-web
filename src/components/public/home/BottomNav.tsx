import Link from 'next/link';

const links = [
  { label: 'Home', href: '/', icon: '🏠' },
  { label: 'Categories', href: '/categories', icon: '▦' },
  { label: 'Saved', href: '/saved', icon: '♡' },
  { label: 'Profile', href: '/profile', icon: '👤' },
];

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[#eee5dc] bg-white pb-[calc(env(safe-area-inset-bottom)+8px)] pt-2 md:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-5 items-end px-2">
        <Link href={links[0].href} className="grid place-items-center text-xs font-medium text-[#e94b35]"><span>{links[0].icon}</span>Home</Link>
        <Link href={links[1].href} className="grid place-items-center text-xs text-[#667085]"><span>{links[1].icon}</span>Categories</Link>
        <Link href="/add-listing" className="grid place-items-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-r from-[#e94b35] to-[#f97316] text-3xl text-white">+</span>
          <span className="mt-1 text-xs text-[#667085]">Add Listing</span>
        </Link>
        <Link href={links[2].href} className="grid place-items-center text-xs text-[#667085]"><span>{links[2].icon}</span>Saved</Link>
        <Link href={links[3].href} className="grid place-items-center text-xs text-[#667085]"><span>{links[3].icon}</span>Profile</Link>
      </div>
    </nav>
  );
}
