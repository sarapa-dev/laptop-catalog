import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "@/lib/axios";

export interface CartItem {
  laptop_id: number;
  name: string;
  price: number;
  image_url?: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (laptop_id: number) => void;
  updateQuantity: (laptop_id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  checkout: () => Promise<string>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.laptop_id === item.laptop_id);
          return {
            items: existing
              ? state.items.map((i) =>
                  i.laptop_id === item.laptop_id ? { ...i, quantity: i.quantity + 1 } : i
                )
              : [...state.items, { ...item, quantity: 1 }],
          };
        }),

      removeItem: (laptop_id) =>
        set((state) => ({
          items: state.items.filter((i) => i.laptop_id !== laptop_id),
        })),

      updateQuantity: (laptop_id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.laptop_id === laptop_id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        })),

      clearCart: () => set({ items: [] }),

      totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      totalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0) / 100;
      },

      checkout: async () => {
        try {
          const response = await axiosInstance.post("/payment/create-checkout-session", {
            items: get().items.map((item) => ({
              laptop_id: item.laptop_id,
              quantity: item.quantity,
            })),
          });

          if (response.data.url) {
            window.location.href = response.data.url;
          }

          return response.data.url;
        } catch (error) {
          throw new Error("Checkout failed");
        }
      },
    }),
    {
      name: "laptop-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
