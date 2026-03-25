import { create } from 'zustand';
import type { CartItem, Product, Cart } from './types';
import { calculateShipping, calculateTax } from './stripe';

interface CartStore {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  calculateTotals: (state: string) => void;
  getCart: () => Cart;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0,

  addToCart: (product: Product, quantity: number) => {
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.product_id === product.id
      );

      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.product_id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [
          ...state.items,
          {
            product_id: product.id,
            product,
            quantity,
          },
        ];
      }

      // Calculate subtotal
      const subtotal = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      return {
        items: newItems,
        subtotal: Math.round(subtotal * 100) / 100,
      };
    });
  },

  removeFromCart: (productId: string) => {
    set((state) => {
      const newItems = state.items.filter((item) => item.product_id !== productId);
      const subtotal = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      return {
        items: newItems,
        subtotal: Math.round(subtotal * 100) / 100,
      };
    });
  },

  updateQuantity: (productId: string, quantity: number) => {
    set((state) => {
      if (quantity <= 0) {
        get().removeFromCart(productId);
        return {};
      }

      const newItems = state.items.map((item) =>
        item.product_id === productId
          ? { ...item, quantity }
          : item
      );

      const subtotal = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      return {
        items: newItems,
        subtotal: Math.round(subtotal * 100) / 100,
      };
    });
  },

  clearCart: () => {
    set({
      items: [],
      subtotal: 0,
      tax: 0,
      shipping: 0,
      total: 0,
    });
  },

  calculateTotals: (state: string) => {
    set((current) => {
      const shipping = calculateShipping(current.subtotal);
      const tax = calculateTax(current.subtotal, state);
      const total = Math.round((current.subtotal + shipping + tax) * 100) / 100;

      return {
        shipping,
        tax,
        total,
      };
    });
  },

  getCart: () => {
    const state = get();
    return {
      items: state.items,
      subtotal: state.subtotal,
      tax: state.tax,
      shipping: state.shipping,
      total: state.total,
    };
  },
}));
