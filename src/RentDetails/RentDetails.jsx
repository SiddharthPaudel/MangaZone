import React, { useEffect, useState } from 'react';
import { useAuth } from '../ContextAPI/Auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const RentDetails = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchRentals = async () => {
      if (!user) return;

      try {
        const res = await fetch(`${apiUrl}/api/manga/user/${user.id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Failed to fetch rentals');

        setRentals(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, [user]);

  // Toast alert if any expired rental is found
  useEffect(() => {
    if (rentals.length > 0) {
      const expired = rentals.find(r => new Date(r.expiresAt) < new Date());
      if (expired) {
        toast.error(`⚠️ Your rental for ${expired.mangaId?.title || "a manga"} has expired.`);
      }
    }
  }, [rentals]);

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6 font-[Montserrat]">
      <h1 className="text-3xl font-bold mb-6 text-purple-500">My Rent Details</h1>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : rentals.length === 0 ? (
        <p className="text-gray-500">You haven't rented any manga yet.</p>
      ) : (
        <div className="space-y-6">
          {rentals.map((rent) => {
            const total = rent.price;
            const title = rent.mangaId?.title || 'Unknown';
            const image = `${apiUrl}/uploads/covers/${rent.mangaId?.coverImage || ''}`;
            const now = new Date();
            const rentedAt = new Date(rent.rentedAt);
            const expiresAt = new Date(rent.expiresAt);
            const isExpired = expiresAt < now;
            const days =
              Math.ceil((expiresAt - rentedAt) / (1000 * 60 * 60 * 24));

            const remainingMs = expiresAt - now;
            const remainingDays = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
            const remainingHours = Math.floor((remainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

            const status = isExpired ? 'Returned' : 'Active';

            return (
              <div
                key={rent._id}
                className="bg-gradient-to-br from-[#1e1e1e] to-[#151515] rounded-2xl shadow-lg p-5 flex flex-col md:flex-row gap-4 transition-all hover:scale-[1.01] hover:shadow-2xl"
              >
                <img
                  src={image}
                  alt={title}
                  className="rounded-xl w-48 h-64 object-cover"
                />

                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <h2 className="text-2xl font-bold text-purple-400 mb-2">{title}</h2>
                    <p className="text-sm text-gray-300">Days: <span className="text-white">{days}</span></p>
                    <p className="text-sm text-gray-300">Payment: <span className="text-yellow-400">{rent.paymentMethod}</span></p>
                    <p className="text-sm text-gray-300">Per Day: Rs {Math.round(rent.price / days)}</p>
                    <p className="text-sm text-gray-200 mt-1">Total: <span className="font-bold text-white">Rs {total}</span></p>
                    <p className="text-sm text-gray-400">Rented At: {rentedAt.toLocaleDateString()}</p>
                    <p className="text-sm text-gray-400">Expires At: {expiresAt.toLocaleDateString()}</p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${status === 'Returned' ? 'bg-red-500' : 'bg-green-500'}`}>
                      {status}
                    </span>
                    <button className="text-sm text-purple-500 underline hover:text-purple-300" onClick={() => toast("Invoice feature coming soon...")}>
                      View Invoice
                    </button>
                  </div>

                  {/* Message based on expiry */}
                  {isExpired ? (
                    <p className="mt-3 text-sm text-red-400 italic">
                      ⚠️ Your rental for <span className="font-semibold">{title}</span> has expired. Please return or renew it.
                    </p>
                  ) : (
                    <p className="mt-3 text-sm text-green-400 italic">
                      ⏳ {remainingDays} day(s) and {remainingHours} hour(s) remaining.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RentDetails;
