import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SidebarItem } from "./SidebarItem";
import { sidebarConfig } from "../config/sidebarConfig";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-64 bg-white border-r shadow h-screen fixed top-0 left-0 p-4 flex flex-col justify-between overflow-y-auto">
      <div>
        <div className="text-2xl font-bold mb-6">🎓 Admin Panel</div>
        {sidebarConfig.map((item) => (
          <SidebarItem
            key={item.label}
            item={item}
            currentPath={location.pathname}
          />
        ))}
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
