import { apiSlice } from "./api";
import type { Product, ProductFiltersMeta } from "@/types/product";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getnewProduct: builder.query<Product[], void>({
      query: () => "/products/new",
    }),
    getProductDetail: builder.query<Product, string>({
      query: (id: string) => `/products/${id}`,
      transformResponse: (response: { product: Product }) => {
        return response.product;
      },
    }),
    getProducts: builder.query({
      query: ({
        sizes,
        category,
        keyword,
        colors,
        minPrice,
        maxPrice,
        sortBy,
      }) => {
        const params = new URLSearchParams();

        if (sizes) params.append("sizes", sizes);
        if (category) params.append("category", category);
        if (keyword) params.append("keyword", keyword);
        if (colors) params.append("colors", colors);
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);
        if (sortBy) params.append("sortBy", sortBy);

        return `/products/?${params.toString()}`;
      },
    }),
    getProductsMeta: builder.query<ProductFiltersMeta, string>({
      query: () => "/products/filters/meta",
    }),
  }),
});

export const {
  useGetnewProductQuery,
  useGetProductsMetaQuery,
  useGetProductDetailQuery,
  useGetProductsQuery,
} = productApi;
