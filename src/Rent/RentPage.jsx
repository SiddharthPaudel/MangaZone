import React, { useState } from 'react';
import narutoCover from '../images/naru.jpg'; // Replace with your actual image path

const RentPage = () => {
  const manga = {
    title: 'Naruto',
    image: narutoCover,
    pricePerDay: 75,
  };

  const [days, setDays] = useState(3);
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  const handleDurationChange = (e) => {
    const val = parseInt(e.target.value);
    setDays(isNaN(val) || val < 1 ? 1 : val);
  };

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const total = days * manga.pricePerDay;

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6 flex justify-center items-center font-[Montserrat]">
      <div className="bg-[#1e1e1e] rounded-xl p-6 max-w-4xl w-full flex flex-col sm:flex-row gap-6 shadow-lg">
        {/* Manga Cover */}
        <img
          src={manga.image}
          alt={manga.title}
          className="w-40 h-60 object-cover rounded-xl shadow-md"
        />

        {/* Rent Info */}
        <div className="flex flex-col justify-between flex-grow">
          <div>
            <div className="flex justify-between text-lg font-medium mb-2">
              <span>Name: {manga.title}</span>
              <span>
                Total: <span className="font-bold text-white">Rs {total}</span>
              </span>
            </div>

            <p className="text-sm text-gray-300 mb-4">Price/Day: Rs {manga.pricePerDay}</p>

            {/* Duration */}
            <div className="mb-4">
              <label className="text-sm block mb-1">Duration:</label>
              <input
                type="number"
                min="1"
                value={days}
                onChange={handleDurationChange}
                className="px-3 py-1 bg-transparent border border-gray-500 rounded-full text-sm text-white focus:outline-none w-24"
              />{' '}
              <span className="text-sm text-gray-400">days</span>
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <label className="text-sm block mb-1">Payment Method:</label>
              <div className="flex gap-2 flex-wrap">
                {['Cash', 'Esewa', 'Khalti'].map((method) => (
                  <button
                    key={method}
                    onClick={() => handlePaymentChange(method)}
                    className={`px-3 py-1 text-sm rounded-full border transition ${
                      paymentMethod === method
                        ? 'bg-purple-600 text-white'
                        : 'bg-transparent border-gray-500 text-gray-300'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Rent Button */}
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-full self-start">
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RentPage;
