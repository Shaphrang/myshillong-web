export function HomeSearch() {
  return (
    <section className="px-4">
      <div className="mx-auto flex max-w-lg items-center gap-2 rounded-2xl border border-[#eee5dc] bg-white p-2 shadow-sm">
        <span className="pl-2 text-lg">🔍</span>
        <input
          placeholder="Search for products, services & more..."
          className="h-11 flex-1 bg-transparent text-[15px] text-[#172033] outline-none placeholder:text-[#98a2b3]"
          aria-label="Search products and services"
        />
        <button aria-label="Search filters" className="grid h-11 w-11 place-items-center rounded-xl bg-[#fff1f2] text-[#e94b35]">
          ⚙️
        </button>
      </div>
    </section>
  );
}
