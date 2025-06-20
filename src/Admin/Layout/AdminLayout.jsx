// src/Layout/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // You’ll create this

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#121212] text-white">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
