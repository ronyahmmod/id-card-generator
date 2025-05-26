import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
