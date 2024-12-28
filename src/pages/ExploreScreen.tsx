import React, { useState, useRef, useCallback, useEffect } from "react";
import { useGetStocksQuery } from "../features/stocks/stocksApi";
import { Stock } from "../types";
import useDebounce from "../hooks/useDebounce";

const ExploreScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

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
    <div className="p-6 bg-gradient-to-r from-green-100 to-blue-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-800">
        Nasdaq Stocks
      </h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search stocks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {stocks.length === 0 && !isLoading && !isFetching && (
        <div className="flex justify-center mt-10">
          <p className="text-lg text-gray-600">No stocks found.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stocks.map((stock, index) => {
          const isLastStock = index === stocks.length - 1;
          return (
            <div
              key={index}
              ref={isLastStock ? lastStockRef : null}
              className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow"
            >
              <p className="text-lg font-medium text-gray-800">
                {stock.ticker}
              </p>
              <p className="text-sm text-gray-600">{stock.name}</p>
            </div>
          );
        })}
      </div>
      {isFetching && (
        <div className="flex justify-center mt-4">
          <p className="text-lg text-gray-600">Loading more stocks...</p>
        </div>
      )}
    </div>
  );
};

export default ExploreScreen;
