import { apiSlice } from "./api";
import type { WishlistResponse, AddWishlistPayload } from "@/types/wishlist";

export const wishlistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get Wishlist
    getWishlist: builder.query<WishlistResponse, void>({
      query: () => "/wishlists",
      providesTags: ["Wishlists"],
    }),

    // Add Wishlist Item
    addWishlistItem: builder.mutation<WishlistResponse, AddWishlistPayload>({
      query: (body) => ({
        url: "/wishlists/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Wishlists"],
    }),

    // Remove Wishlist Item
    removeWishlistItem: builder.mutation<WishlistResponse, string>({
      query: (productId) => ({
        url: `/wishlists/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlists"],
    }),

    // Clear Wishlist
    clearWishlist: builder.mutation<WishlistResponse, void>({
      query: () => ({
        url: "/wishlists/clear",
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlists"],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddWishlistItemMutation,
  useRemoveWishlistItemMutation,
  useClearWishlistMutation,
} = wishlistApi;
