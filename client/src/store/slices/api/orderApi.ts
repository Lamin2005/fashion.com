import { apiSlice } from "./api";
import {
  type Order,
  type OrdersResponse,
  type UpdateOrderPayload,
} from "@/types/order";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrderBySession: builder.query<
      { success: boolean; order: Order },
      string
    >({
      query: (sessionId) => `/orders/session/${sessionId}`,
    }),

    getAllOrders: builder.query<OrdersResponse, void>({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),

    // Get current user's orders
    getMyOrders: builder.query<OrdersResponse, void>({
      query: () => ({
        url: "/orders/my-orders",
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),

    // Get one order by ID
    getOrderById: builder.query<OrdersResponse, string>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),

    // Update order
    updateOrder: builder.mutation<OrdersResponse, UpdateOrderPayload>({
      query: ({ id, ...body }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Orders"],
    }),

    // Delete order
    // deleteOrder: builder.mutation<DeleteOrderResponse, string>({
    //   query: (id) => ({
    //     url: `/orders/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: (_result, _error, id) => [
    //     { type: "Orders", id },
    //     { type: "Orders", id: "LIST" },
    //     { type: "Orders", id: "MY_LIST" },
    //   ],
    // }),
  }),
});

export const {
  useGetOrderBySessionQuery,
  useGetAllOrdersQuery,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
} = orderApi;
