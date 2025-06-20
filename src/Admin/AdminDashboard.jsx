// src/components/admin/AdminDashboard.js
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaUsers, FaPlusCircle, FaList, FaHome, FaBoxes } from 'react-icons/fa';

const AdminDashboard = () => {
  const [active, setActive] = useState("dashboard");

  return (
    <div className="min-h-screen flex font-[Montserrat] bg-[#121212] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e1e1e] p-6 space-y-6 shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
        <nav className="space-y-4">
          <Link to="/admin" onClick={() => setActive("dashboard")} className={`flex items-center gap-3 px-4 py-2 rounded-md hover:bg-purple-700 ${active === "dashboard" ? "bg-purple-600" : ""}`}>
            <FaHome /> Dashboard
          </Link>
          <Link to="/admin/products" onClick={() => setActive("products")} className={`flex items-center gap-3 px-4 py-2 rounded-md hover:bg-purple-700 ${active === "products" ? "bg-purple-600" : ""}`}>
            <FaBoxes /> Manage Products
          </Link>
          <Link to="/admin/add-product" onClick={() => setActive("add")} className={`flex items-center gap-3 px-4 py-2 rounded-md hover:bg-purple-700 ${active === "add" ? "bg-purple-600" : ""}`}>
            <FaPlusCircle /> Add Product
          </Link>
          <Link to="/admin/users" onClick={() => setActive("users")} className={`flex items-center gap-3 px-4 py-2 rounded-md hover:bg-purple-700 ${active === "users" ? "bg-purple-600" : ""}`}>
            <FaUsers /> Users
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
