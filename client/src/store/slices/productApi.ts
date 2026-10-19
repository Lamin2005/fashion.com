import { apiSlice } from "./api";
import type { Product, ProductFiltersMeta } from "@/types/product";

export interface ProductResponse {
  message: string;
  product?: Product;
}

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
      providesTags: ["Products"],
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

        if (sizes && sizes.length) {
          sizes.forEach((size: string) => params.append("sizes", size));
        }
        if (category) params.append("category", category);
        if (keyword) params.append("keyword", keyword);
        if (colors && colors.length) {
          colors.forEach((color: string) => params.append("colors", color));
        }
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);
        if (sortBy) params.append("sortBy", sortBy);

        return `/products/?${params.toString()}`;
      },
      providesTags: ["Products"],
    }),
    getProductsMeta: builder.query<ProductFiltersMeta, string>({
      query: () => "/products/filters/meta",
    }),
    createProduct: builder.mutation<ProductResponse, FormData>({
      query: (productData) => ({
        url: "/products/create",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation<
      ProductResponse,
      { id: string; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/products/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation<ProductResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/products/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetnewProductQuery,
  useGetProductsMetaQuery,
  useGetProductDetailQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
