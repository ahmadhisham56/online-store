export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-2xl font-black tracking-[0.35em]">AHMD</h3>
          <p className="mt-4 max-w-xs text-sm text-zinc-400">
            Premium, authentic sneakers curated and delivered worldwide. Step
            into the icons.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
            Shop
          </h4>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li className="hover:text-white">New Arrivals</li>
            <li className="hover:text-white">Lifestyle</li>
            <li className="hover:text-white">Best Sellers</li>
            <li className="hover:text-white">All Products</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
            Support
          </h4>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li className="hover:text-white">Shipping & Delivery</li>
            <li className="hover:text-white">Returns & Refunds</li>
            <li className="hover:text-white">Size Guide</li>
            <li className="hover:text-white">Contact Us</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
            Stay In The Loop
          </h4>
          <p className="mb-3 text-sm text-zinc-400">
            Subscribe for drops and exclusive offers.
          </p>
          <div className="flex overflow-hidden rounded-full border border-zinc-700">
            <input
              placeholder="Email address"
              className="flex-1 bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-zinc-500"
            />
            <button className="bg-white px-4 text-sm font-bold text-black">
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-zinc-500 sm:flex-row">
          <p>© {new Date().getFullYear()} AHMD. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="rounded bg-white px-2 py-1 text-[10px] font-black italic text-blue-700">
              VISA
            </span>
            <span className="rounded bg-white px-2 py-1 text-[10px] font-black text-orange-600">
              MC
            </span>
            <span className="rounded bg-white px-2 py-1 text-[10px] font-black text-blue-500">
              AMEX
            </span>
            <span className="rounded bg-white px-2 py-1 text-[10px] font-black text-black">
              Ｐay
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
