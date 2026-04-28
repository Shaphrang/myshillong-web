import Link from 'next/link';

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#DDEDEA]/70 bg-white/85 backdrop-blur">
      <div className="mx-auto max-w-[1280px] px-4 py-3 md:px-6">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="text-3xl font-black tracking-tight text-[#0F7A76]">
            My<span className="text-[#083F3C]">Shillong</span>
          </Link>
          <div className="flex items-center gap-2 md:flex-1 md:justify-end">
            <button className="rounded-full border border-[#DDEDEA] bg-white px-3 py-2 text-sm font-medium text-[#20302F]">📍 Shillong ▾</button>
            <button className="relative grid h-11 w-11 place-items-center rounded-full border border-[#DDEDEA] bg-white text-xl">
              🔔
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[#FF5B6B]" />
            </button>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-full border border-[#DDEDEA] bg-white/90 p-1 shadow-sm">
          <span className="pl-3 text-[#6B7C7A]">🔎</span>
          <input
            aria-label="Search"
            placeholder="Search food, fashion, deals..."
            className="h-11 w-full bg-transparent text-[15px] text-[#20302F] outline-none"
          />
          <button className="grid h-11 w-11 place-items-center rounded-full bg-[#0F7A76] text-white">↗</button>
        </div>
        <nav className="mt-3 hidden items-center justify-end gap-7 text-[15px] font-medium text-[#20302F] md:flex">
          <Link href="/vendors">Explore</Link>
          <Link href="/deals">Deals</Link>
          <Link href="#">Saved</Link>
          <button className="rounded-full border border-[#DDEDEA] px-3 py-1.5">👤</button>
        </nav>
      </div>
    </header>
  );
}
