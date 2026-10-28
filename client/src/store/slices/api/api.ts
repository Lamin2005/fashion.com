import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import { clearUserInfo } from "../states/auth";

const baseUrl =
  import.meta.env.VITE_MOOD === "development"
    ? import.meta.env.VITE_LOCAL_API_URL
    : import.meta.env.VITE_API_URL;

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
});

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    api.dispatch(clearUserInfo());
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["User", "Products", "Cart"],
  endpoints: () => ({}),
});
