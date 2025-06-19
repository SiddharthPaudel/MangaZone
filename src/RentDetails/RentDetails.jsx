import React from 'react';
import narutoCover from '../images/naru.jpg'; // Replace with actual path

const dummyRentDetails = [
  {
    id: 1,
    title: 'Naruto',
    image: narutoCover,
    days: 3,
    pricePerDay: 75,
    paymentMethod: 'Esewa',
    status: 'Returned',
  },
  // Add more dummy data if needed
];

const RentDetails = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white p-6 font-[Montserrat]">
      <h1 className="text-3xl font-bold mb-6 text-purple-500">My Rent Details</h1>

      <div className="space-y-6">
        {dummyRentDetails.map((rent) => {
          const total = rent.days * rent.pricePerDay;

          return (
            <div
              key={rent.id}
              className="bg-gradient-to-br from-[#1e1e1e] to-[#151515] rounded-2xl shadow-lg p-5 flex flex-col md:flex-row gap-4 transition-all hover:scale-[1.01] hover:shadow-2xl"
            >
              <img
                src={rent.image}
                alt={rent.title}
                className="rounded-xl w-48 h-64 object-cover"
              />

              <div className="flex flex-col justify-between flex-grow">
                <div>
                  <h2 className="text-2xl font-bold text-purple-400 mb-2">{rent.title}</h2>
                  <p className="text-sm text-gray-300">
                    Days: <span className="text-white">{rent.days}</span>
                  </p>
                  <p className="text-sm text-gray-300">
                    Payment: <span className="text-yellow-400">{rent.paymentMethod}</span>
                  </p>
                  <p className="text-sm text-gray-300">Per Day: Rs {rent.pricePerDay}</p>
                  <p className="text-sm text-gray-200 mt-1">
                    Total: <span className="font-bold text-white">Rs {total}</span>
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      rent.status === 'Returned' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {rent.status}
                  </span>
                  <button className="text-sm text-purple-500 underline hover:text-purple-300">
                    View Invoice
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RentDetails;
