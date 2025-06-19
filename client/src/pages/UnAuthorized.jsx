import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const Unauthorized = () => {
  const [seconds, setSeconds] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate("/dashboard");
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 text-center transition-all duration-500">
      <div className="animate-bounce text-red-500 text-6xl mb-4">
        <FaLock />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
        Access Denied
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-2">
        You don’t have permission to view this page.
      </p>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
        Redirecting to dashboard in{" "}
        <span className="font-semibold">{seconds}</span> seconds...
      </p>
      <button
        onClick={() => navigate("/dashboard")}
        className="inline-block px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go to Dashboard Now
      </button>
    </div>
  );
};

export default Unauthorized;
