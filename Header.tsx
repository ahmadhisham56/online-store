import { useState } from "react";
import { useCart } from "../context/CartContext";
import { formatINR } from "../utils/format";

type Props = {
  onBack: () => void;
  onDone: () => void;
};

export default function Checkout({ onBack, onDone }: Props) {
  const { items, subtotal, clear } = useCart();
  const [method, setMethod] = useState<"visa" | "applepay">("visa");
  const [placed, setPlaced] = useState(false);
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const shipping = subtotal > 0 ? 0 : 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  const formatCard = (v: string) =>
    v
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const formatExp = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  const validate = () => {
    const e: Record<string, boolean> = {};
    if (!name.trim()) e.name = true;
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = true;
    if (!address.trim()) e.address = true;
    if (!city.trim()) e.city = true;
    if (!zip.trim()) e.zip = true;
    if (method === "visa") {
      if (card.replace(/\s/g, "").length < 16) e.card = true;
      if (exp.length < 5) e.exp = true;
      if (cvc.length < 3) e.cvc = true;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlace = () => {
    if (!validate()) return;
    setPlaced(true);
    clear();
  };

  if (placed) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-10 w-10 text-green-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1 className="text-2xl font-black">Order Confirmed!</h1>
        <p className="text-sm text-zinc-500">
          Thank you for shopping with AHMD. A confirmation email has been sent to{" "}
          <span className="font-semibold text-black">{email}</span>. Your fresh
          kicks are on the way.
        </p>
        <p className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-bold">
          Order #AHMD-{Math.floor(100000 + Math.random() * 900000)}
        </p>
        <button
          onClick={onDone}
          className="mt-4 rounded-full bg-black px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white hover:bg-zinc-800"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const inputCls = (key: string) =>
    `w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-black ${
      errors[key] ? "border-red-400 bg-red-50" : "border-zinc-200"
    }`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-black"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back
      </button>

      <h1 className="mb-8 text-3xl font-black tracking-tight">Checkout</h1>

      {items.length === 0 ? (
        <p className="text-zinc-500">Your bag is empty.</p>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Form */}
          <div className="space-y-8">
            {/* Contact */}
            <section>
              <h2 className="mb-4 text-lg font-bold">Contact & Shipping</h2>
              <div className="grid gap-3">
                <input
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputCls("name")}
                />
                <input
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls("email")}
                />
                <input
                  placeholder="Street address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={inputCls("address")}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={inputCls("city")}
                  />
                  <input
                    placeholder="ZIP / Postal code"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className={inputCls("zip")}
                  />
                </div>
              </div>
            </section>

            {/* Payment */}
            <section>
              <h2 className="mb-4 text-lg font-bold">Payment</h2>
              <div className="mb-4 grid grid-cols-2 gap-3">
                <button
                  onClick={() => setMethod("visa")}
                  className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-bold transition ${
                    method === "visa"
                      ? "border-black bg-black text-white"
                      : "border-zinc-200 text-zinc-600 hover:border-black"
                  }`}
                >
                  <span
                    className={`rounded px-1.5 py-0.5 text-[11px] font-black italic ${
                      method === "visa"
                        ? "bg-white text-blue-700"
                        : "bg-blue-700 text-white"
                    }`}
                  >
                    VISA
                  </span>
                  Credit / Debit Card
                </button>
                <button
                  onClick={() => setMethod("applepay")}
                  className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-bold transition ${
                    method === "applepay"
                      ? "border-black bg-black text-white"
                      : "border-zinc-200 text-zinc-600 hover:border-black"
                  }`}
                >
                   Pay
                </button>
              </div>

              {method === "visa" ? (
                <div className="grid gap-3">
                  <div className="relative">
                    <input
                      placeholder="Card number"
                      inputMode="numeric"
                      value={card}
                      onChange={(e) => setCard(formatCard(e.target.value))}
                      className={inputCls("card")}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-blue-700 px-1.5 py-0.5 text-[11px] font-black italic text-white">
                      VISA
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      placeholder="MM / YY"
                      inputMode="numeric"
                      value={exp}
                      onChange={(e) => setExp(formatExp(e.target.value))}
                      className={inputCls("exp")}
                    />
                    <input
                      placeholder="CVC"
                      inputMode="numeric"
                      value={cvc}
                      onChange={(e) =>
                        setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
                      }
                      className={inputCls("cvc")}
                    />
                  </div>
                  <p className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Secured with 256-bit SSL encryption.
                  </p>
                </div>
              ) : (
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-center text-sm text-zinc-500">
                  You'll confirm your purchase with Apple Pay after placing the
                  order.
                </div>
              )}
            </section>
          </div>

          {/* Summary */}
          <aside className="h-fit rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
            <h2 className="mb-4 text-lg font-bold">Order Summary</h2>
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-3"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white">
                    <img
                      src={item.product.image}
                      alt=""
                      className="h-full w-full object-contain p-1"
                    />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold">{item.product.name}</p>
                    <p className="text-xs text-zinc-500">
                      {item.product.subtitle} · US {item.size}
                    </p>
                  </div>
                  <p className="text-sm font-bold">
                    {formatINR(item.product.price * item.qty)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="my-4 border-t border-zinc-200" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Subtotal</span>
                <span className="font-semibold">{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Tax (est.)</span>
                <span className="font-semibold">{formatINR(tax)}</span>
              </div>
            </div>
            <div className="my-4 border-t border-zinc-200" />
            <div className="flex items-baseline justify-between">
              <span className="font-bold">Total</span>
              <span className="text-2xl font-black">{formatINR(total)}</span>
            </div>

            <button
              onClick={handlePlace}
              className="mt-6 w-full rounded-full bg-black py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-zinc-800"
            >
              Pay {formatINR(total)}
            </button>
            <p className="mt-3 text-center text-[11px] text-zinc-400">
              By placing this order you agree to AHMD's Terms & Privacy Policy.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
