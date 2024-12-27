import React from "react";
import { useGetStocksQuery } from "../features/stocks/stocksApi";
import { Stock } from "../types";

const ExploreScreen: React.FC = () => {
  const { data, error, isLoading } = useGetStocksQuery({
    active: true,
    limit: 10,
  });

  if (isLoading) {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.results?.map((stock: Stock) => (
          <div
            key={stock.ticker}
            className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow"
          >
            <p className="text-lg font-medium text-gray-800">{stock.ticker}</p>
            <p className="text-sm text-gray-600">{stock.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreScreen;
