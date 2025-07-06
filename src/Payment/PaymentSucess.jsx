import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] text-white px-4">
      <CheckCircle className="text-green-400 w-20 h-20 mb-6" />
      <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
      <p className="text-gray-400 mb-6 text-center">
        Your manga rental was successful. You can now start reading.
      </p>
      <Link
        to="/"
        className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default PaymentSuccess;
