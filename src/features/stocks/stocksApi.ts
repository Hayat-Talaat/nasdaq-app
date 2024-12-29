import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StockResponse } from "../../types";

const API_KEY = `88HYYHw8r1r9n62arT7sNGct60ig_NyD`;

export const stocksApi = createApi({
  reducerPath: "stocksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.polygon.io/v3/reference" }),
  endpoints: (builder) => ({
    getStocks: builder.query({
      query: ({ active = true, limit = 10, search = "", cursor = null }) => {
        console.log("cursor", cursor);
        return cursor
          ? `${cursor}&limit=${limit}&search=${search}&apiKey=${API_KEY}`
          : `tickers?active=${active}&limit=${limit}&search=${search}&apiKey=${API_KEY}`;
      },
      transformResponse: (response: StockResponse) => ({
        results: response.results,
        nextUrl: response.next_url,
      }),
    }),
  }),
});

export const { useLazyGetStocksQuery } = stocksApi;
