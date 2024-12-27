import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NasdaqLogo from "../assets/Nasdaq.svg";

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 1000);

    const timeout = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => navigate("/explore"), 500);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div
      className={`flex flex-col justify-center items-center h-screen bg-gradient-to-r from-cyan-500 to-blue-300 text-white transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Nasdaq Logo */}
      <img
        src={NasdaqLogo}
        alt="Nasdaq Logo"
        className="w-40 h-40 mb-6 animate-bounce shadow-blue-gray-900/50"
      />

      {/* Progress Info */}
      <p className="text-lg mb-4 text-center">
        Navigating to Explore Screen in {10 - Math.floor(progress / 10)}{" "}
        seconds...
      </p>

      {/* Progress Bar */}
      <div className="w-64 h-2 bg-white rounded-full overflow-hidden mb-6">
        <div
          className="h-full  rounded-full transition-all duration-300"
          style={{ width: `${progress}%`, backgroundColor: "#0092bc" }}
        ></div>
      </div>

      {/* Footer Developer Name */}
      <p className="text-sm absolute bottom-5">
        Developed by{" "}
        <a
          href="https://www.linkedin.com/in/hayat-talaat-6190a7108/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold underline hover:text-blue-100 transition-colors"
        >
          Hayat Talaat
        </a>
      </p>
    </div>
  );
};

export default SplashScreen;
