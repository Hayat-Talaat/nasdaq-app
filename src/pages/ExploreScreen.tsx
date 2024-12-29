import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLazyGetStocksQuery } from "../features/stocks/stocksApi";
import useDebounce from "../hooks/useDebounce";
import { Stock } from "../types";
// Components
import StockCard from "../components/StockCard";
import Spinner from "../components/Spinner";
import ErrorMsg from "../components/ErrorMsg";
import SearchBar from "../components/SearchBar";
import NoDataFound from "../components/NoDataFound";

const StocksList: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [fetchStocks, { isFetching, error }] = useLazyGetStocksQuery();
  const observer = useRef<IntersectionObserver | null>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const loadStocks = async (
    cursor: string | null = null,
    search: string = ""
  ) => {
    try {
      const response = await fetchStocks({ cursor, search }).unwrap();
      setStocks((prev) =>
        cursor ? [...prev, ...response.results] : response.results
      );
      setNextUrl(response.nextUrl);
    } catch (err) {
      console.error("Error fetching stocks:", err);
    }
  };

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextUrl) {
          loadStocks(nextUrl, debouncedSearchTerm);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching, nextUrl, debouncedSearchTerm]
  );

  useEffect(() => {
    loadStocks(null, debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    loadStocks();
  }, []);

  if (isFetching && stocks.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size={50} color="#2563eb" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMsg
        error={error}
        onRetry={() => loadStocks(null, debouncedSearchTerm)}
      />
    );
  }

  if (!isFetching && stocks.length === 0) {
    return <NoDataFound onRetry={() => loadStocks(null, "")} />;
  }

  return (
    <div className="p-6 bg-gradient-to-r bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-blue-900">
            Nasdaq Stocks
          </h1>
          <p className="text-gray-600 text-sm">
            Search and explore the stock market.
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-1000 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {stocks.map((stock, index) => {
          return <StockCard key={index} stock={stock} />;
        })}
      </div>

      {/* Infinite Scroll Sentinel */}
      <div ref={lastElementRef} style={{ height: "20px", marginTop: "10px" }}>
        {isFetching && (
          <div className="flex justify-center">
            <Spinner size={30} color="#2563eb" />{" "}
          </div>
        )}
        {!nextUrl && stocks.length > 0 && (
          <p className="text-center text-gray-500 mt-4">
            No more stocks to load
          </p>
        )}
      </div>
    </div>
  );
};

export default StocksList;
