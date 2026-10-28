import { apiSlice } from "./api";

import type {
  CartResponse,
  AddCartItemPayload,
  UpdateCartItemPayload,
} from "@/types/cart";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyCart: builder.query<CartResponse, void>({
      query: () => ({
        url: "/cart",
        method: "GET",
      }),

      providesTags: ["Cart"],
    }),

    addCartItem: builder.mutation<CartResponse, AddCartItemPayload>({
      query: (body) => ({
        url: "/cart/items",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Cart"],
    }),

    updateCartItem: builder.mutation<CartResponse, UpdateCartItemPayload>({
      query: ({ key, quantity }) => ({
        url: `/cart/items/${encodeURIComponent(key)}`,
        method: "PATCH",
        body: { quantity },
      }),

      invalidatesTags: ["Cart"],
    }),

    removeCartItem: builder.mutation<CartResponse, string>({
      query: (key) => ({
        url: `/cart/items/${encodeURIComponent(key)}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Cart"],
    }),

    clearMyCart: builder.mutation<CartResponse, void>({
      query: () => ({
        url: "/cart",
        method: "DELETE",
      }),

      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetMyCartQuery,
  useAddCartItemMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearMyCartMutation,
} = cartApi;
