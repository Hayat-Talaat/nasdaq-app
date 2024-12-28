import React, { useState, useRef, useCallback, useEffect } from "react";
import { useGetStocksQuery } from "../features/stocks/stocksApi";
import { Stock } from "../types";
import useDebounce from "../hooks/useDebounce";
import StockCard from "../components/StockCard";

const ExploreScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const { data, error, isLoading, isFetching } = useGetStocksQuery({
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
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg text-gray-600">Loading stocks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg text-red-600">
          Failed to fetch stocks. Please try again later.
        </p>
      </div>
    );
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
        <div className="w-1/3 ml-4">
          <input
            type="text"
            placeholder="Search stocks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
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
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
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
