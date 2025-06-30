import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      toast.success("Reset link sent! Check your email.");
    } catch (err) {
      toast.error("Failed to send reset link.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1e1e1e] text-white rounded-lg shadow-lg p-8 max-w-md w-full"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-purple-500">
          Forgot Password
        </h2>

        <label htmlFor="email" className="block mb-2 font-medium text-gray-300">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-md bg-[#222222] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-6 transition"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-md font-semibold transition"
        >
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
