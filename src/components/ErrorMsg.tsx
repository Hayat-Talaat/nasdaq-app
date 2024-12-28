import React from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMsgProps, FetchError } from "../types";

const ErrorMsg: React.FC<ErrorMsgProps> = ({ error, onRetry }) => {
  const navigate = useNavigate();

  let errorStatus = "Unknown";
  let errorMessage = "An unexpected error occurred. Please try again later.";

  if ("status" in error) {
    const fetchError = error as FetchError;
    errorStatus = fetchError.status.toString();
    errorMessage = fetchError.data?.error || errorMessage;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-red-50 to-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md">
        <h2 className="text-3xl font-extrabold text-red-600 mb-4">
          Error {errorStatus}
        </h2>
        <p className="text-gray-700 mb-6">{errorMessage}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRetry}
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            Retry
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto px-6 py-2 bg-gray-100 text-gray-700 rounded-lg shadow-md hover:bg-gray-200 transition-all"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMsg;
