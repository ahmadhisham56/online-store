import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "../data/products";

export type CartItem = {
  product: Product;
  size: number;
  qty: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, size: number) => void;
  removeItem: (id: string, size: number) => void;
  updateQty: (id: string, size: number, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  isOpen: boolean;
  setOpen: (v: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem("ahmd-cart");
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("ahmd-cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, size: number) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.size === size
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.size === size
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }
      return [...prev, { product, size, qty: 1 }];
    });
    setOpen(true);
  };

  const removeItem = (id: string, size: number) =>
    setItems((prev) =>
      prev.filter((i) => !(i.product.id === id && i.size === size))
    );

  const updateQty = (id: string, size: number, qty: number) =>
    setItems((prev) =>
      prev
        .map((i) =>
          i.product.id === id && i.size === size
            ? { ...i, qty: Math.max(1, qty) }
            : i
        )
        .filter((i) => i.qty > 0)
    );

  const clear = () => setItems([]);

  const count = useMemo(
    () => items.reduce((s, i) => s + i.qty, 0),
    [items]
  );
  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.qty * i.product.price, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clear,
        count,
        subtotal,
        isOpen,
        setOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
