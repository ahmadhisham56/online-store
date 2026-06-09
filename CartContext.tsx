import { useCart } from "../context/CartContext";

type Props = {
  onHome: () => void;
  onNavigate: (cat: string) => void;
  query: string;
  setQuery: (v: string) => void;
};

export default function Header({ onHome, onNavigate, query, setQuery }: Props) {
  const { count, setOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/90 backdrop-blur">
      {/* Top announcement bar */}
      <div className="bg-black text-white">
        <p className="mx-auto max-w-7xl px-4 py-2 text-center text-[11px] font-medium tracking-[0.2em] uppercase">
          Free Express Shipping Worldwide · 100% Authentic Guaranteed
        </p>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
        <button
          onClick={onHome}
          className="shrink-0 select-none text-2xl font-black tracking-[0.35em] text-black"
          aria-label="AHMD home"
        >
          AHMD
        </button>

        <nav className="ml-6 hidden items-center gap-7 text-sm font-medium text-zinc-700 lg:flex">
          <button onClick={onHome} className="hover:text-black">
            Home
          </button>
          <button onClick={() => onNavigate("all")} className="hover:text-black">
            Shop All
          </button>
          <button
            onClick={() => onNavigate("Lifestyle")}
            className="hover:text-black"
          >
            Lifestyle
          </button>
          <button onClick={() => onNavigate("all")} className="hover:text-black">
            New Arrivals
          </button>
        </nav>

        <div className="ml-auto flex flex-1 items-center justify-end gap-3">
          <div className="relative hidden w-full max-w-xs items-center md:flex">
            <svg
              className="pointer-events-none absolute left-3 h-4 w-4 text-zinc-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sneakers..."
              className="w-full rounded-full border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-4 text-sm outline-none transition focus:border-black focus:bg-white"
            />
          </div>

          <button
            onClick={() => setOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition hover:bg-zinc-800"
            aria-label="Open cart"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow-400 px-1 text-[11px] font-bold text-black">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="border-t border-zinc-100 px-4 py-2 md:hidden">
        <div className="relative flex items-center">
          <svg
            className="pointer-events-none absolute left-3 h-4 w-4 text-zinc-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sneakers..."
            className="w-full rounded-full border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-black focus:bg-white"
          />
        </div>
      </div>
    </header>
  );
}
