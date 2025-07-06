import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../ContextAPI/Auth';
import { FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import esewa from '../images/esewa.png'
const RentPage = () => {
  const { state } = useLocation(); // Props from ProductDetails
  const navigate = useNavigate();
  const { user } = useAuth();

  const [days, setDays] = useState(3);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [loading, setLoading] = useState(false);

  const total = days * state.pricePerDay;
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleRent = async () => {
    if (!user) {
      toast.error("Please log in first.");
      return;
    }

    if (!phoneNumber.match(/^\d{10}$/)) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }

    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    if (!locationInput.trim()) {
      toast.error("Please enter your location.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/manga/${state.mangaId}/rent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          durationValue: days,
          durationUnit: state.durationUnit || "days",
          paymentMethod,
          phoneNumber,
          location: locationInput.trim()
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to rent");

      if (data.esewa) {
        // 👉 Build and submit form to eSewa
        const form = document.createElement("form");
        form.method = "POST";
        form.action = data.action;

        Object.entries(data.values).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
        return;
      }

      // If not eSewa (i.e., Cash, Khalti)
      toast.success("Manga rented successfully!");
      navigate("/");

    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => navigate(-1);

  return (
    <div className="min-h-screen bg-[#121212] text-white font-[Montserrat] flex justify-center items-start pt-20 px-4">
      <div className="relative bg-[#1e1e1e] max-w-5xl w-full rounded-3xl shadow-2xl p-8 flex flex-col lg:flex-row gap-8">
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-white hover:text-red-400 text-lg" onClick={handleClose}>
          <FaTimes />
        </button>

        {/* Manga Cover */}
        <div className="flex-shrink-0 flex justify-center">
          <img
            src={`${apiUrl}/uploads/covers/${state.coverImage}`}
            alt={state.title}
            className="w-52 h-80 rounded-2xl object-cover shadow-lg"
          />
        </div>

        {/* Form Section */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Title and Total */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">{state.title}</h2>
              <div className="text-lg text-yellow-400 font-semibold">
                Total: <span className="text-white">Rs {total}</span>
              </div>
            </div>

            <p className="text-sm text-gray-400">
              Price/Day: Rs {state.pricePerDay}
            </p>

            {/* Duration */}
            <div>
              <label className="text-sm mb-1 block">Duration:</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  value={days}
                  onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
                  className="bg-transparent border border-gray-500 rounded-full px-4 py-2 w-24 text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
                />
                <span className="text-sm text-gray-400">{state.durationUnit}</span>
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-sm mb-1 block">Phone Number:</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter 10-digit phone number"
                className="w-full bg-transparent border border-gray-500 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none text-white placeholder-gray-400"
              />
            </div>

            {/* Location */}
            <div>
              <label className="text-sm mb-1 block">Location:</label>
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="Enter your location"
                className="w-full bg-transparent border border-gray-500 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none text-white placeholder-gray-400"
              />
            </div>

            {/* Payment Method */}
          <div>
  <label className="text-sm mb-1 block">Payment Via</label>
  <div className="flex gap-3 flex-wrap">
    {[ 'Esewa'].map((method) => (
      <button
        key={method}
        onClick={() => setPaymentMethod(method)}
        className={`px-4 py-2 text-sm rounded-full border transition flex items-center gap-2 ${
          paymentMethod === method
            ? 'bg-purple-600 text-white border-purple-600'
            : 'bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700'
        }`}
      >
        <img src={esewa} alt="eSewa" className="w-5 h-5" />
        {method}
      </button>
    ))}
  </div>
</div>
          </div>

          {/* Rent Now Button */}
          <div className="mt-8">
            <button
              disabled={loading}
              onClick={handleRent}
              className={`bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-full transition duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Renting..." : "Rent Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentPage;
