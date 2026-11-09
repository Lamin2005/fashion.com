import { apiSlice } from "./api";

import {
  type AddressPayload,
  type AddressResponse,
  type AddressesResponse,
} from "@/types/address";

export const addressApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyAddresses: builder.query<AddressesResponse, void>({
      query: () => ({
        url: "/addresses",
        method: "GET",
      }),
      providesTags: ["Addresses"],
    }),

    addAddress: builder.mutation<AddressResponse, AddressPayload>({
      query: (data) => ({
        url: "/addresses",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Addresses"],
    }),

    updateAddress: builder.mutation<
      AddressResponse,
      { id: string; data: AddressPayload }
    >({
      query: ({ id, data }) => ({
        url: `/addresses/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Addresses"],
    }),

    deleteAddress: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/addresses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Addresses"],
    }),

    setDefaultAddress: builder.mutation<AddressResponse, string>({
      query: (id) => ({
        url: `/addresses/${id}/default`,
        method: "PATCH",
      }),
      invalidatesTags: ["Addresses"],
    }),
  }),
});

export const {
  useGetMyAddressesQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
} = addressApi;
