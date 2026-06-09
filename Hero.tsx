import { useCart } from "../context/CartContext";
import { formatINR } from "../utils/format";

type Props = {
  onCheckout: () => void;
};

export default function CartDrawer({ onCheckout }: Props) {
  const { items, isOpen, setOpen, updateQty, removeItem, subtotal } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
          <h2 className="text-lg font-black tracking-wide">
            YOUR BAG ({items.reduce((s, i) => s + i.qty, 0)})
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-zinc-100"
            aria-label="Close cart"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100">
              <svg
                className="h-7 w-7 text-zinc-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <p className="font-semibold">Your bag is empty</p>
            <p className="text-sm text-zinc-500">
              Add some fresh kicks to get started.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={`${item.product.id}-${item.size}`}
                    className="flex gap-4 border-b border-zinc-100 pb-4"
                  >
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-50">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-contain p-1"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-bold">
                            {item.product.name}
                          </h3>
                          <p className="text-xs text-zinc-500">
                            {item.product.subtitle}
                          </p>
                          <p className="text-xs text-zinc-500">
                            Size: US {item.size}
                          </p>
                        </div>
                        <p className="text-sm font-bold">
                          {formatINR(item.product.price * item.qty)}
                        </p>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-zinc-200">
                          <button
                            onClick={() =>
                              updateQty(
                                item.product.id,
                                item.size,
                                item.qty - 1
                              )
                            }
                            className="flex h-7 w-7 items-center justify-center text-zinc-600 hover:text-black"
                          >
                            −
                          </button>
                          <span className="w-7 text-center text-sm font-semibold">
                            {item.qty}
                          </span>
                          <button
                            onClick={() =>
                              updateQty(
                                item.product.id,
                                item.size,
                                item.qty + 1
                              )
                            }
                            className="flex h-7 w-7 items-center justify-center text-zinc-600 hover:text-black"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() =>
                            removeItem(item.product.id, item.size)
                          }
                          className="text-xs font-medium text-zinc-400 underline hover:text-black"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-zinc-200 p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-zinc-500">Subtotal</span>
                <span className="text-lg font-black">{formatINR(subtotal)}</span>
              </div>
              <p className="mb-4 text-xs text-zinc-400">
                Shipping & taxes calculated at checkout.
              </p>
              <button
                onClick={() => {
                  setOpen(false);
                  onCheckout();
                }}
                className="w-full rounded-full bg-black py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-zinc-800"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
