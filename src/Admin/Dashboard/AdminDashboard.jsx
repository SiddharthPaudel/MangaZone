import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Naruto", rented: 24 },
  { name: "One Piece", rented: 18 },
  { name: "Attack on Titan", rented: 32 },
  { name: "Chainsaw Man", rented: 15 },
  { name: "Jujutsu Kaisen", rented: 20 },
];

const Dashboard = () => {
  return (
    <div className="p-8 text-white font-[Montserrat]">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#1e1e1e] p-6 rounded-xl shadow-md">
          <h4 className="text-sm text-gray-400 mb-1">Total Manga</h4>
          <p className="text-2xl font-bold text-yellow-400">120</p>
        </div>

        <div className="bg-[#1e1e1e] p-6 rounded-xl shadow-md">
          <h4 className="text-sm text-gray-400 mb-1">Total Users</h4>
          <p className="text-2xl font-bold text-yellow-400">450</p>
        </div>

        <div className="bg-[#1e1e1e] p-6 rounded-xl shadow-md">
          <h4 className="text-sm text-gray-400 mb-1">Total Rents</h4>
          <p className="text-2xl font-bold text-yellow-400">780</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-[#1e1e1e] p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Most Rented Manga</h3>
        {/* <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip contentStyle={{ backgroundColor: "#2d2d2d", border: "none" }} />
            <Bar dataKey="rented" fill="#FFB300" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer> */}
      </div>
    </div>
  );
};

export default Dashboard;
