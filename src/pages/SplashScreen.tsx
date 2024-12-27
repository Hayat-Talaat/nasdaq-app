import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/explore");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      {/* Nasdaq Logo */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/4/42/NASDAQ_Logo.svg"
        alt="Nasdaq Logo"
        className="w-48 h-auto mb-4"
      />
      {/* Developer Name */}
      <p className="text-sm text-gray-500 absolute bottom-5">
        Developed by Hayat Talaat
      </p>
    </div>
  );
};

export default SplashScreen;
