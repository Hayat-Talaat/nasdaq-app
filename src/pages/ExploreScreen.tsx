import React, { useState, useRef, useCallback, useEffect } from "react";
import { useGetStocksQuery } from "../features/stocks/stocksApi";
import useDebounce from "../hooks/useDebounce";
import { Stock } from "../types";

// components
import StockCard from "../components/StockCard";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";
import ErrorMsg from "../components/ErrorMsg";

const ExploreScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const { data, error, isLoading, isFetching, refetch } = useGetStocksQuery({
    active: true,
    limit: 21,
    page,
    search: debouncedSearchTerm,
  });

  const observer = useRef<IntersectionObserver | null>(null);
  const lastStockRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingMore) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setIsFetchingMore(true);
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingMore]
  );

  // Update stocks when new data is received
  useEffect(() => {
    if (data?.results) {
      setStocks((prevStocks) =>
        page === 1 ? data.results : [...prevStocks, ...data.results]
      );
      setIsFetchingMore(false);
    }
  }, [data, page]);

  // Reset stocks when search term changes
  useEffect(() => {
    setPage(1);
    setStocks([]);
  }, [debouncedSearchTerm]);

  // Trigger visibility after component mounts
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 1000);
  }, []);

  if (isLoading && page === 1) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <Spinner size={60} color="#2563eb" />
      </div>
    );
  }

  if (error) {
    return <ErrorMsg error={error} onRetry={() => refetch()} />;
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

      {/* Empty State - No Stocks Found */}
      {stocks.length === 0 && !isLoading && !isFetching && (
        <div className="flex justify-center items-center mt-10">
          <p className="text-lg text-gray-600">No stocks found.</p>
        </div>
      )}

      {/* Stock Cards */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-1000 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {stocks.map((stock, index) => {
          const isLastStock = index === stocks.length - 1;
          return (
            <StockCard
              key={index}
              stock={stock}
              ref={isLastStock ? lastStockRef : null}
            />
          );
        })}
      </div>

      {/* Loading State */}
      {isFetching && (
        <div className="flex justify-center mt-4 opacity-0 transition-opacity duration-500 ease-in-out">
          <p className="text-lg text-gray-600">Loading more stocks...</p>
        </div>
      )}
    </div>
  );
};

export default ExploreScreen;
