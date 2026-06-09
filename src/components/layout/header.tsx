import { Bell, Search, Command } from "lucide-react";

export function Header({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-stone-200/60 bg-cream/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-8 py-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-charcoal">{title}</h1>
          {subtitle && (
            <p className="mt-0.5 text-sm text-stone-500">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm text-stone-500 shadow-sm transition hover:border-sage-200 hover:text-charcoal md:flex"
          >
            <Search className="h-4 w-4" />
            <span>Search...</span>
            <kbd className="ml-6 flex items-center gap-0.5 rounded bg-stone-100 px-1.5 py-0.5 text-xs text-stone-400">
              <Command className="h-3 w-3" />K
            </kbd>
          </button>

          <button
            type="button"
            className="relative rounded-xl border border-stone-200 bg-white p-2.5 text-stone-500 shadow-sm transition hover:text-charcoal"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-coral-500 text-[10px] font-bold text-white">
              3
            </span>
          </button>

          <div className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white py-1.5 pl-1.5 pr-3 shadow-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sage-100 text-sm font-semibold text-sage-700">
              MR
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-charcoal">Marco Rossi</p>
              <p className="text-xs text-stone-500">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
