import Link from 'next/link';

type SectionHeaderProps = {
  title: string;
  viewAllHref?: string;
};

export function SectionHeader({ title, viewAllHref = '#' }: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="text-2xl font-bold tracking-tight text-[#062F2C]">{title}</h2>
      <Link
        href={viewAllHref}
        className="rounded-full border border-[#CFE6E3] bg-[#F1FAF8] px-4 py-1.5 text-sm font-semibold text-[#0F7A76] transition hover:bg-[#DDF6F3]"
      >
        View all
      </Link>
    </div>
  );
}
