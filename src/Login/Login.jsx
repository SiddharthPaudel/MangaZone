import React from "react";
import animeImage from "../images/smallguy.png"; // Replace with your actual image path

const Login = () => {
  return (
    <div
      className="flex min-h-screen bg-gray-100 justify-center items-center px-4"
      style={{ backgroundColor: "#121212" }}
    >
      <form
        className="bg-[#1e1e1e] rounded-3xl p-8 shadow-lg max-w-4xl w-full flex text-white h-[580px]"
      >
        {/* Left side: Image */}
        <div className="w-1/2 flex items-center justify-center pr-0 border-r border-gray-700">
          <img
            src={animeImage}
            alt="Anime character"
            className="w-full max-w-sm h-auto object-contain rounded-md"
          />
        </div>

        {/* Right side: Login Fields */}
        <div className="w-1/2 pl-8 flex flex-col justify-center space-y-6">
          <h2 className="text-3xl font-bold text-purple-500 text-center mb-4">
            Login
          </h2>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800 transition"
          >
            Login
          </button>

          <p className="mt-6 text-center text-gray-400 text-sm">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-purple-500 font-medium hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
