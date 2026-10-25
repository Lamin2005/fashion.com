import { apiSlice } from "./api";

export interface DailyProductAnalytics {
  date: string;
  created: number;
  updated: number;
}

interface DailyProductAnalyticsResponse {
  success: boolean;
  data: DailyProductAnalytics[];
}

export const productAnalyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDailyProductAnalytics: builder.query<
      DailyProductAnalyticsResponse,
      void
    >({
      query: () => "/products/daily",
    }),
  }),
});

export const { useGetDailyProductAnalyticsQuery } = productAnalyticsApi;
