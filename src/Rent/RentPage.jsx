import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import narutoCover from '../images/naru.jpg'; // Replace with your actual image path

const RentPage = () => {
  const manga = {
    title: 'Naruto',
    image: narutoCover,
    pricePerDay: 75,
  };

  const [days, setDays] = useState(3);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const total = days * manga.pricePerDay;

  const handleDurationChange = (e) => {
    const val = parseInt(e.target.value);
    setDays(isNaN(val) || val < 1 ? 1 : val);
  };

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const handleClose = () => {
    // TODO: Implement actual navigation or modal close
    alert('Close clicked');
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white font-[Montserrat] flex justify-center items-start pt-20 px-4">
      <div className="relative bg-[#1e1e1e] max-w-5xl w-full rounded-3xl shadow-2xl p-8 flex flex-col lg:flex-row gap-8">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white hover:text-red-400 text-lg"
          onClick={handleClose}
        >
          <FaTimes />
        </button>

        {/* Manga Cover */}
        <div className="flex-shrink-0 flex justify-center">
          <img
            src={manga.image}
            alt={manga.title}
            className="w-52 h-80 rounded-2xl object-cover shadow-lg"
          />
        </div>

        {/* Rent Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">{manga.title}</h2>
              <div className="text-lg text-yellow-400 font-semibold">
                Total: <span className="text-white">Rs {total}</span>
              </div>
            </div>

            <p className="text-sm text-gray-400">
              Price/Day: Rs {manga.pricePerDay}
            </p>

            {/* Duration Input */}
            <div>
              <label className="text-sm mb-1 block">Duration:</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  value={days}
                  onChange={handleDurationChange}
                  className="bg-transparent border border-gray-500 rounded-full px-4 py-2 w-24 text-sm focus:ring-2 focus:ring-purple-600 focus:outline-none"
                />
                <span className="text-sm text-gray-400">days</span>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="text-sm mb-1 block">Payment Method:</label>
              <div className="flex gap-3 flex-wrap">
                {['Cash', 'Esewa', 'Khalti'].map((method) => (
                  <button
                    key={method}
                    onClick={() => handlePaymentChange(method)}
                    className={`px-4 py-2 text-sm rounded-full border transition ${
                      paymentMethod === method
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Rent Button */}
          <div className="mt-8">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-full transition duration-300">
              Rent Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentPage;
