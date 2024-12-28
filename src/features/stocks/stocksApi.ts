import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const stocksApi = createApi({
  reducerPath: "stocksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.polygon.io/v3/reference" }),
  endpoints: (builder) => ({
    getStocks: builder.query({
      query: ({ active, limit, page }) =>
        `tickers?active=${active}&limit=${limit}&page=${page}&apiKey=88HYYHw8r1r9n62arT7sNGct60ig_NyD`,
    }),
  }),
});

export const { useGetStocksQuery } = stocksApi;
