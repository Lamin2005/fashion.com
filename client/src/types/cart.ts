import type { Product } from "@/types/product";

export interface CartItem {
  key: string;
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Cart {
  _id: string;
  user_id: string;
  items: CartItem[];
  expiresAt: Date;
}

export interface CartResponse {
  cart: Cart;
  message?: string;
}

export interface AddCartItemPayload {
  product_id: string;
  quantity?: number;
  size: string;
  color: string;
}

export interface UpdateCartItemPayload {
  key: string;
  quantity: number;
}
