import { apiSlice } from "./api";

import type {
  CustomersResponse,
  CustomerStatsResponse,
  GetCustomersParams,
  CustomerDetail,
} from "@/types/customer";

export const customerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all customers
    getAllCustomers: builder.query<CustomersResponse, GetCustomersParams>({
      query: (params) => ({
        url: "/customers",
        method: "GET",
        params,
      }),
      providesTags: ["Customers"],
    }),

    // Get customer statistics
    getCustomerStats: builder.query<CustomerStatsResponse, void>({
      query: () => ({
        url: "/customers/stats",
        method: "GET",
      }),
      providesTags: ["Customers"],
    }),

    // Get customer details
    getCustomerById: builder.query<CustomerDetail, string>({
      query: (id) => ({
        url: `/customers/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Customers", id }],
    }),
  }),
});

export const {
  useGetAllCustomersQuery,
  useGetCustomerStatsQuery,
  useGetCustomerByIdQuery,
} = customerApi;
