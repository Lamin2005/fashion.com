import { apiSlice } from "./api";
import { type Order } from "@/types/order";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrderBySession: builder.query<
      { success: boolean; order: Order },
      string
    >({
      query: (sessionId) => `/orders/session/${sessionId}`,
    }),
  }),
});

export const { useGetOrderBySessionQuery } = orderApi;
