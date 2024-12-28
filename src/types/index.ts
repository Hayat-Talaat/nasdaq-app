import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface Stock {
  active: boolean;
  base_currency_name: string;
  base_currency_symbol: string;
  currency_name: string;
  currency_symbol: string;
  last_updated_utc: string;
  locale: string;
  market: string;
  name: string;
  ticker: string;
}

export interface ErrorData {
  status: string;
  request_id: string;
  error: string;
}

export interface FetchError {
  status: number;
  data: ErrorData;
}

export interface ErrorMsgProps {
  error: FetchBaseQueryError | SerializedError;
  onRetry: () => void;
}
