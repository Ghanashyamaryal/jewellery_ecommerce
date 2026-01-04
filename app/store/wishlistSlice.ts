import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../data/products";

export interface WishlistItem {
    product: Product;
    addedAt: number;
}

interface WishlistState {
    items: WishlistItem[];
}

// Load initial state from localStorage if available
const loadInitialState = (): WishlistState => {
    if (typeof window !== "undefined") {
        try {
            const savedWishlist = localStorage.getItem("wishlist");
            if (savedWishlist) {
                return JSON.parse(savedWishlist);
            }
        } catch (error) {
            console.error("Failed to load wishlist from localStorage:", error);
        }
    }
    return { items: [] };
};

const initialState: WishlistState = loadInitialState();

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist: (state, action: PayloadAction<Product>) => {
            const existingItem = state.items.find(
                (item) => item.product.id === action.payload.id
            );
            if (!existingItem) {
                state.items.push({
                    product: action.payload,
                    addedAt: Date.now(),
                });
                // Save to localStorage
                if (typeof window !== "undefined") {
                    localStorage.setItem("wishlist", JSON.stringify(state));
                }
            }
        },
        removeFromWishlist: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.product.id !== action.payload
            );
            // Save to localStorage
            if (typeof window !== "undefined") {
                localStorage.setItem("wishlist", JSON.stringify(state));
            }
        },
        toggleWishlist: (state, action: PayloadAction<Product>) => {
            const existingItemIndex = state.items.findIndex(
                (item) => item.product.id === action.payload.id
            );

            if (existingItemIndex !== -1) {
                state.items.splice(existingItemIndex, 1);
            } else {
                state.items.push({
                    product: action.payload,
                    addedAt: Date.now(),
                });
            }

            // Save to localStorage
            if (typeof window !== "undefined") {
                localStorage.setItem("wishlist", JSON.stringify(state));
            }
        },
        clearWishlist: (state) => {
            state.items = [];
            // Save to localStorage
            if (typeof window !== "undefined") {
                localStorage.setItem("wishlist", JSON.stringify(state));
            }
        },
    },
});

export const {
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;

// Selectors
export const selectWishlistItems = (state: { wishlist: WishlistState }) =>
    state.wishlist.items;
export const selectWishlistCount = (state: { wishlist: WishlistState }) =>
    state.wishlist.items.length;
export const selectIsInWishlist = (productId: string) => (state: { wishlist: WishlistState }) =>
    state.wishlist.items.some((item) => item.product.id === productId);