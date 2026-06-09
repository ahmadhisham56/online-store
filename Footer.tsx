import { useMemo, useState } from "react";
import { CartProvider } from "./context/CartContext";
import { products, type Product } from "./data/products";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail";
import CartDrawer from "./components/CartDrawer";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";

type View =
  | { name: "home" }
  | { name: "product"; product: Product }
  | { name: "checkout" };

function StoreFront() {
  const [view, setView] = useState<View>({ name: "home" });
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");

  const goHome = () => {
    setView({ name: "home" });
    window.scrollTo({ top: 0 });
  };

  const openProduct = (product: Product) => {
    setView({ name: "product", product });
    window.scrollTo({ top: 0 });
  };

  const navigate = (cat: string) => {
    setCategory(cat);
    setView({ name: "home" });
    setTimeout(() => {
      document
        .getElementById("products")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "all")
      list = list.filter((p) => p.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.colorway.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    return list;
  }, [category, query, sort]);

  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-900">
      <Header
        onHome={goHome}
        onNavigate={navigate}
        query={query}
        setQuery={setQuery}
      />

      <main className="flex-1">
        {view.name === "home" && (
          <>
            <Hero onShop={() => navigate("all")} />

            {/* Category chips */}
            <section
              id="products"
              className="mx-auto max-w-7xl px-4 py-12"
            >
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-black tracking-tight md:text-3xl">
                    The Collection
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    {filtered.length} authentic{" "}
                    {filtered.length === 1 ? "pair" : "pairs"} available
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    {["all", "Lifestyle"].map((c) => (
                      <button
                        key={c}
                        onClick={() => setCategory(c)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                          category === c
                            ? "bg-black text-white"
                            : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                        }`}
                      >
                        {c === "all" ? "All" : c}
                      </button>
                    ))}
                  </div>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold outline-none focus:border-black"
                  >
                    <option value="featured">Featured</option>
                    <option value="low">Price: Low to High</option>
                    <option value="high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="py-20 text-center text-zinc-500">
                  No products match your search.
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {filtered.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onClick={() => openProduct(p)}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Trust band */}
            <section className="border-y border-zinc-200 bg-zinc-50">
              <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:grid-cols-3">
                {[
                  {
                    t: "100% Authentic",
                    d: "Every pair is verified for authenticity before it ships.",
                    icon: "M9 12l2 2 4-4M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
                  },
                  {
                    t: "Free Worldwide Shipping",
                    d: "Fast, tracked express delivery to your door at no cost.",
                    icon: "M1 3h15v13H1zM16 8h4l3 3v5h-7M5.5 18.5a2.5 2.5 0 1 0 0 .01M18.5 18.5a2.5 2.5 0 1 0 0 .01",
                  },
                  {
                    t: "Secure Visa Checkout",
                    d: "Pay safely with encrypted Visa, Mastercard & more.",
                    icon: "M3 11h18M3 11a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2M3 11v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8",
                  },
                ].map((f) => (
                  <div key={f.t} className="flex flex-col items-center gap-3 text-center">
                    <svg
                      className="h-8 w-8 text-black"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path d={f.icon} />
                    </svg>
                    <h3 className="font-bold">{f.t}</h3>
                    <p className="max-w-xs text-sm text-zinc-500">{f.d}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {view.name === "product" && (
          <ProductDetail product={view.product} onBack={goHome} />
        )}

        {view.name === "checkout" && (
          <Checkout
            onBack={goHome}
            onDone={goHome}
          />
        )}
      </main>

      <Footer />

      <CartDrawer
        onCheckout={() => {
          setView({ name: "checkout" });
          window.scrollTo({ top: 0 });
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <StoreFront />
    </CartProvider>
  );
}
