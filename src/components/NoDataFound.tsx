import React from "react";
import { useNavigate } from "react-router-dom";

interface NoDataFoundProps {
  onRetry: () => void;
}

const NoDataFound: React.FC<NoDataFoundProps> = ({ onRetry }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r ">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-3/4 md:w-1/2 lg:w-1/3">
        {/* Heroicons SVG (Cloud Offline Icon) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-24 h-24 text-gray-500 mx-auto mb-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H3"
          />
        </svg>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          No Stocks Found
        </h2>
        <p className="text-gray-600 mb-6">
          We couldn't find any stocks matching your search. Try again or go back
          to the homepage.
        </p>

        <div className="flex justify-between gap-4">
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition duration-300 w-full"
          >
            Retry
          </button>
          <button
            onClick={handleGoHome}
            className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300 w-full"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoDataFound;
