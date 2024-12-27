import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API slice for stocks
export const stocksApi = createApi({
  reducerPath: "stocksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.polygon.io/v3/reference/",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer 88HYYHw8r1r9n62arT7sNGct60ig_NyD`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getStocks: builder.query({
      query: (params) => ({
        url: "tickers",
        params: {
          active: true,
          limit: params?.limit || 10,
          apiKey: "88HYYHw8r1r9n62arT7sNGct60ig_NyD",
        },
      }),
    }),
  }),
});

export const { useGetStocksQuery } = stocksApi;
