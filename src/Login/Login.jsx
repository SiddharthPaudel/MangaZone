import React, { useState } from "react";
import animeImage from "../images/smallguy.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../ContextAPI/Auth";
import toast from "react-hot-toast";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // 🍜 Show loading toast with custom manga-style
    const loadingToast = toast.loading("Entering the manga verse...", {
      style: {
        borderRadius: "12px",
        background: "#1e1e1e",
        color: "#fff",
        border: "1px solid #8b5cf6",
      },
    });

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      // ✅ Save user/token to context
      login(res.data.token, res.data.user);

      // 🎉 Success toast with manga flair
      toast.success("Welcome back, manga reader! 📚✨", {
        id: loadingToast, // Replaces the loading toast
        duration: 4000,
        style: {
          borderRadius: "12px",
          background: "#1e1e1e",
          color: "#fff",
          border: "1px solid #10b981",
        },
        iconTheme: {
          primary: "#10b981",
          secondary: "#1e1e1e",
        },
      });

      // ✅ Redirect after success
      setTimeout(() => {
        if (res.data.user.role === "admin") {
          navigate("/admin"); // or "/admin/dashboard" if that's your route
        } else {
          navigate("/");
        }
      }, 1500);
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.msg || "Login failed. Please try again.";
      setError(errorMessage);

      // ❌ Error toast with manga style
      toast.error(`Authentication failed! ${errorMessage} 💥`, {
        id: loadingToast, // Replaces the loading toast
        duration: 5000,
        style: {
          borderRadius: "12px",
          background: "#1e1e1e",
          color: "#fff",
          border: "1px solid #ef4444",
        },
        iconTheme: {
          primary: "#ef4444",
          secondary: "#1e1e1e",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen bg-gray-100 justify-center items-center px-4"
      style={{ backgroundColor: "#121212" }}
    >
      <form
        onSubmit={handleSubmit}
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
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="text-sm text-red-400 text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Entering...
              </>
            ) : (
              "Login"
            )}
          </button>

          <p className="mt-6 text-center text-gray-400 text-sm">
            Don't have an account?{" "}
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
