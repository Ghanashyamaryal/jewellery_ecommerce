import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product, ProductVariant } from "@/types/catalog";
import { getUnitPrice } from "@/lib/pricing";

export interface CartItem {
  /** Product id, plus the variant id when a size/length was chosen */
  lineId: string;
  product: Product;
  variant?: Pick<ProductVariant, "id" | "name" | "options">;
  engraving?: string;
  /** Includes the engraving charge */
  unitPrice: number;
  quantity: number;
}

const toLineId = (productId: string, variantId?: string, engraving?: string) =>
  [productId, variantId, engraving && `engrave:${engraving}`].filter(Boolean).join(":");

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

// Drop items saved before the catalog schema change (current products have pricing + metal)
const isCurrentCartItem = (item: CartItem) =>
  Boolean(item?.product?.id && item.product.pricing && item.product.metal);

// Load initial state from localStorage if available
const loadInitialState = (): CartState => {
  if (typeof window !== "undefined") {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        return {
          // Items saved before variants were tracked have no lineId/unitPrice
          items: (parsed.items || []).filter(isCurrentCartItem).map((item: CartItem) => ({
            ...item,
            lineId: item.lineId ?? item.product.id,
            unitPrice: item.unitPrice ?? getUnitPrice(item.product),
          })),
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
    addToCart: (
      state,
      action: PayloadAction<{
        product: Product;
        quantity: number;
        variant?: ProductVariant;
        engraving?: string;
      }>
    ) => {
      const { product, quantity, variant } = action.payload;
      const engraving = product.customization?.engraving?.available
        ? action.payload.engraving?.trim() || undefined
        : undefined;
      const engravingPrice = engraving ? (product.customization?.engraving?.price ?? 0) : 0;
      const lineId = toLineId(product.id, variant?.id, engraving);
      const existingItem = state.items.find((item) => item.lineId === lineId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          lineId,
          product,
          variant: variant && { id: variant.id, name: variant.name, options: variant.options },
          engraving,
          unitPrice: getUnitPrice(product, variant) + engravingPrice,
          quantity,
        });
      }
      saveToLocalStorage(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.lineId !== action.payload);
      saveToLocalStorage(state);
    },
    updateQuantity: (state, action: PayloadAction<{ lineId: string; quantity: number }>) => {
      const item = state.items.find((item) => item.lineId === action.payload.lineId);
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
  state.cart.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
export const selectCartItemsCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);
export const selectIsCartOpen = (state: { cart: CartState }) => state.cart.isOpen;