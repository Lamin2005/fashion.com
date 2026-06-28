import { apiSlice } from "./api";
import type { Product } from "@/types/product";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getnewProduct: builder.query<Product[], void>({
      query: () => "/products/new",
    }),
  }),
});

export const { useGetnewProductQuery } = productApi;
