import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { FaAlignJustify, FaTimes } from "react-icons/fa";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar
        open={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Content Area */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        <div className="md:hidden absolute top-4 left-4 z-50">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-white dark:bg-gray-800 p-2 rounded shadow"
          >
            {sidebarOpen ? <FaTimes /> : <FaAlignJustify />}
          </button>
        </div>
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
