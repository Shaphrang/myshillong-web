import Link from 'next/link';

export function HomeHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#eee5dc] bg-white/95 px-4 pb-3 pt-4 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto flex max-w-lg items-center justify-between">
        <button className="grid h-10 w-10 place-items-center rounded-xl border border-[#eee5dc] text-[#172033]" aria-label="Open menu">
          ☰
        </button>
        <Link href="/" className="min-w-0 flex-1 px-3">
          <p className="text-3xl font-black leading-none text-[#172033]">My<span className="text-[#e94b35]">Shillong</span></p>
          <p className="mt-1 text-[10px] font-semibold tracking-[0.18em] text-[#667085]">SHOP LOCAL. SUPPORT SHILLONG.</p>
        </Link>
        <div className="flex items-center gap-2">
          <button className="rounded-full border border-[#eee5dc] px-3 py-2 text-sm font-semibold text-[#2f5133]">📍 Shillong ▾</button>
          <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-[#eee5dc]" aria-label="Notifications">
            🔔
            <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-[#e94b35]" />
          </button>
        </div>
      </div>
    </header>
  );
}
