import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-14 bg-white dark:bg-gray-800 shadow-md px-4 flex justify-between items-center">
      <h1 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white ml-10 md:ml-0">
        {user.role === "student" ? "Student" : "Admin"} Dashboard
      </h1>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 focus:outline-none"
        >
          <FaUserCircle className="text-xl" />
          <span className="hidden md:inline">{user?.name}</span>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 shadow-lg rounded-md py-2 z-50">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm text-gray-800 dark:text-gray-100"
              onClick={() => navigate("about-me")}
            >
              Profile
            </button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm text-gray-800 dark:text-gray-100">
              Settings
            </button>
            <button
              onClick={logout}
              className="block w-full text-left px-4 py-2 hover:bg-red-100 dark:hover:bg-red-600 text-sm text-red-600 dark:text-red-300"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;
