import type { Product } from "./product";

export interface WishlistResponse {
  success: boolean;
  message?: string;
  wishlist: Product[];
}

export interface AddWishlistPayload {
  productId: string;
}
