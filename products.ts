type Props = {
  onShop: () => void;
};

export default function Hero({ onShop }: Props) {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_30%_30%,#3f3f46,transparent_60%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-20 text-center md:py-28">
        <img
          src="/images/logo.png"
          alt="AHMD"
          className="h-20 w-auto md:h-28"
        />
        <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
          Iconic Silhouettes.
          <br />
          <span className="text-zinc-400">Curated For You.</span>
        </h1>
        <p className="max-w-xl text-sm text-zinc-300 md:text-base">
          AHMD brings you a hand-picked collection of premium, 100% authentic
          sneakers. Timeless design, delivered worldwide.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onShop}
            className="rounded-full bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-black transition hover:bg-zinc-200"
          >
            Shop The Collection
          </button>
          <a
            href="#products"
            className="rounded-full border border-white/30 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-white/10"
          >
            New Arrivals
          </a>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[11px] uppercase tracking-widest text-zinc-400">
          <span>✓ Authentic Guaranteed</span>
          <span>✓ Free Worldwide Shipping</span>
          <span>✓ Easy Returns</span>
        </div>
      </div>
    </section>
  );
}
