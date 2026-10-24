import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types/product";

export interface CartItem {
  key: string;
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Cart {
  _id?: string;
  user_id?: string;
  items: CartItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AddToCartPayload {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface UpdateCartQuantityPayload {
  key: string;
  quantity: number;
}

const initialState: Cart = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { product, quantity, size, color } = action.payload;

      const existingItem = state.items.find(
        (item) =>
          item.product._id === product._id &&
          item.size === size &&
          item.color === color,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          key: `${product._id}-${size}-${color}`,
          product,
          quantity,
          size,
          color,
        });
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.key !== action.payload);
    },

    updateCartQuantity: (
      state,
      action: PayloadAction<UpdateCartQuantityPayload>,
    ) => {
      const { key, quantity } = action.payload;

      const item = state.items.find((item) => item.key === key);

      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateCartQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
