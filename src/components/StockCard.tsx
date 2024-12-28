import { forwardRef } from "react";
import { Stock } from "../types";

interface StockCardProps {
  stock: Stock;
}

const StockCard = forwardRef<HTMLDivElement, StockCardProps>(
  ({ stock }, ref) => {
    return (
      <div
        ref={ref}
        className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow flex flex-col space-y-2"
      >
        {/* Row 1: Ticker and Name */}
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-gray-800">{stock.ticker}</p>
          <p className="text-sm font-medium text-gray-600">{stock.name}</p>
        </div>

        {/* Row 2: Market and Locale */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-500 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M13 16h.01M6 18L18 6M6 6l12 12"
              />
            </svg>
            <p className="text-sm text-gray-600">{stock.market}</p>
          </div>
          <p className="text-sm text-gray-600">{stock.locale}</p>
        </div>

        {/* Row 3: Active Status */}
        <div className="flex items-center">
          <div
            className={`h-3 w-3 rounded-full mr-2 ${
              stock.active ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <p className="text-sm text-gray-600">
            {stock.active ? "Active" : "Inactive"}
          </p>
        </div>

        {/* Row 4: Currency Symbol and Base Currency Symbol */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-gray-100 p-1 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-purple-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c1.656 0 3-1.344 3-3s-1.344-3-3-3-3 1.344-3 3 1.344 3 3 3zm0 2c-1.656 0-3 1.344-3 3v5H9c-1.656 0-3 1.344-3 3s1.344 3 3 3h6c1.656 0 3-1.344-3-3s-1.344-3-3-3h-1v-5c0-1.656-1.344-3-3-3z"
                />
              </svg>
            </div>
            <p className="ml-2 text-sm text-gray-600">{stock.currency_name}</p>
          </div>
          <div className="flex items-center">
            <div className="bg-gray-100 p-1 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c1.656 0 3-1.344 3-3s-1.344-3-3-3-3 1.344-3 3 1.344 3 3 3zm0 2c-1.656 0-3 1.344-3 3v5H9c-1.656 0-3 1.344-3 3s1.344 3 3 3h6c1.656 0 3-1.344-3-3s-1.344-3-3-3h-1v-5c0-1.656-1.344-3-3-3z"
                />
              </svg>
            </div>
            <p className="ml-2 text-sm text-gray-600">
              {stock.base_currency_name}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

StockCard.displayName = "StockCard";

export default StockCard;
