import React from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarItem } from "./SidebarItem";
import { sidebarConfig } from "../config/sidebarConfig";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white border-r shadow h-screen fixed top-0 left-0 p-4 overflow-y-auto">
      <div className="text-2xl font-bold mb-6">🎓 Admin Panel</div>

      {sidebarConfig.map((item) => (
        <SidebarItem
          key={item.label}
          item={item}
          currentPath={location.pathname}
        />
      ))}
    </div>
  );
};

export default Sidebar;
