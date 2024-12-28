import React from "react";

interface SpinnerProps {
  size?: number;
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 50, color = "#3b82f6" }) => {
  return (
    <div
      className={`flex justify-center items-center`}
      style={{ width: size, height: size }}
    >
      <svg
        className="animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        style={{ width: size, height: size, color }}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291l-.707-.707C4.523 15.744 4 13.929 4 12H0c0 3.042 1.235 5.788 3.222 7.778l.707-.707zm0 0"
        ></path>
      </svg>
    </div>
  );
};

export default Spinner;
