import React from "react";

const RentalTable = () => {
  const rentals = [
    {
      _id: 1,
      userName: "Siddhartha Paudel",
      mangaTitle: "Naruto",
      rentedAt: "2025-06-01T10:00:00Z",
      expiresAt: "2025-06-05T10:00:00Z",
      price: 40,
      paymentMethod: "Esewa",
      phoneNumber: "9812345678",
      location: "Kathmandu",
    },
    {
      _id: 2,
      userName: "Anjali Sharma",
      mangaTitle: "One Piece",
      rentedAt: "2025-06-10T14:30:00Z",
      expiresAt: "2025-06-11T14:30:00Z",
      price: 10,
      paymentMethod: "Khalti",
      phoneNumber: "9807654321",
      location: "Pokhara",
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8 font-[Montserrat]">
      <div className="bg-[#1e1e1e] p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Manga Rentals</h2>

        <div className="overflow-x-auto rounded-xl border border-gray-700">
          <table className="min-w-full text-sm text-left text-gray-300">
            <thead className="bg-[#2c2c2c] text-sm uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 border-b border-gray-700">User Name</th>
                <th className="px-4 py-3 border-b border-gray-700">Manga Title</th>
                <th className="px-4 py-3 border-b border-gray-700">Rented At</th>
                <th className="px-4 py-3 border-b border-gray-700">Expires At</th>
                <th className="px-4 py-3 border-b border-gray-700">Phone</th>
                <th className="px-4 py-3 border-b border-gray-700">Location</th>
                <th className="px-4 py-3 border-b border-gray-700">Payment</th>
                <th className="px-4 py-3 border-b border-gray-700">Price (Rs)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {rentals.map((rental) => (
                <tr key={rental._id} className="hover:bg-[#292929] transition">
                  <td className="px-4 py-3 text-gray-200">{rental.userName}</td>
                  <td className="px-4 py-3">{rental.mangaTitle}</td>
                  <td className="px-4 py-3">{new Date(rental.rentedAt).toLocaleString()}</td>
                  <td className="px-4 py-3">{new Date(rental.expiresAt).toLocaleString()}</td>
                  <td className="px-4 py-3">{rental.phoneNumber}</td>
                  <td className="px-4 py-3">{rental.location}</td>
                  <td className="px-4 py-3">{rental.paymentMethod}</td>
                  <td className="px-4 py-3 font-semibold text-yellow-400">Rs {rental.price}</td>
                </tr>
              ))}
              {rentals.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-6 py-6 text-center text-gray-500">
                    No rental records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RentalTable;
