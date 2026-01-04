import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

// Load initial state from localStorage if available
const loadInitialState = (): CartState => {
  if (typeof window !== "undefined") {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        return {
          items: parsed.items || [],
          isOpen: false, // Always start with cart closed
        };
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
    }
  }
  return {
    items: [],
    isOpen: false,
  };
};

// Helper function to save cart to localStorage
const saveToLocalStorage = (state: CartState) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("cart", JSON.stringify({ items: state.items }));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }
};

const initialState: CartState = loadInitialState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({
          product: action.payload.product,
          quantity: action.payload.quantity,
        });
      }
      saveToLocalStorage(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.product.id !== action.payload);
      saveToLocalStorage(state);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const item = state.items.find((item) => item.product.id === action.payload.productId);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
        saveToLocalStorage(state);
      }
    },
    clearCart: (state) => {
      state.items = [];
      saveToLocalStorage(state);
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
export const selectCartItemsCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);
export const selectIsCartOpen = (state: { cart: CartState }) => state.cart.isOpen;