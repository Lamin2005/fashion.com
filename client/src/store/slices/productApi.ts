import { apiSlice } from "./api";
import type { Product } from "@/types/product";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getnewProduct: builder.query<Product[], void>({
      query: () => "/products/new",
    }),
    getProductDetail: builder.query<Product, string>({
      query: (id: string) => `/products/${id}`,
    }),
  }),
});

export const { useGetnewProductQuery, useGetProductDetailQuery } = productApi;
