import React from "react";
import { useLocation } from "react-router-dom";
import { SidebarItem } from "./SidebarItem";
import { sidebarConfig } from "../config/sidebarConfig";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = ({ open }) => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <aside
      className={`fixed md:static top-0 left-0 h-screen w-64 z-40 transform ${
        open ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300 bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-lg`}
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-6 whitespace-nowrap">
          🎓 {user.role === "student" ? "Student Panel" : "Admin Panel"}
        </h2>
        {sidebarConfig[user.role]?.map((item) => (
          <SidebarItem
            key={item.label}
            item={item}
            currentPath={location.pathname}
          />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
