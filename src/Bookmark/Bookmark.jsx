import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaTimes } from "react-icons/fa";
import { useAuth } from "../ContextAPI/Auth.jsx"
import toast from "react-hot-toast";

const Bookmark = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id;

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Fetch bookmarks
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/manga/bookmarks/${userId}`);
        if (!res.ok) throw new Error("Failed to load bookmarks");
        const data = await res.json();
        setBookmarks(data); // Assuming backend returns array of manga
      } catch (err) {
        toast.error(err.message || "Error loading bookmarks");
      }
    };

    if (userId) {
      fetchBookmarks();
    }
  }, [userId]);

  const handleRemove = async (mangaId) => {
    try {
      const res = await fetch(`${apiUrl}/api/manga/${mangaId}/bookmark`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to remove bookmark");

      setBookmarks(bookmarks.filter((manga) => manga._id !== mangaId));
      toast.success("Bookmark removed");
    } catch (err) {
      toast.error(err.message || "Error removing bookmark");
    }
  };

  const handleRead = (mangaId) => {
    navigate(`/reader/${mangaId}`);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6 font-montserrat">
      <h1 className="text-3xl font-bold mb-6 text-purple-500">My Bookmarks</h1>

      {bookmarks.length === 0 ? (
        <p className="text-gray-400">No bookmarks yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {bookmarks.map((manga) => (
            <div
              key={manga._id}
              className="w-[200px] flex flex-col items-center bg-[#1e1e1e] rounded-2xl p-2 relative"
            >
              {/* Manga Cover */}
              <div className="relative w-full h-[290px]">
                <img
                  src={
                    manga.coverImage
                      ? `${apiUrl}/uploads/covers/${manga.coverImage}`
                      : "/placeholder-manga.jpg"
                  }
                  alt={manga.title}
                  className="w-full h-full object-cover rounded-xl"
                />

                {/* Read Button */}
                <button
                  onClick={() => handleRead(manga._id)}
                  className="absolute top-2 right-2 bg-black bg-opacity-60 p-1.5 rounded-full text-yellow-400 hover:text-yellow-300"
                  title="Read"
                >
                  <FaPlay size={12} />
                </button>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(manga._id)}
                  className="absolute top-2 left-2 bg-black bg-opacity-60 p-1.5 rounded-full text-red-500 hover:text-red-400"
                  title="Remove"
                >
                  <FaTimes size={12} />
                </button>
              </div>

              {/* Title */}
              <p className="mt-2 text-white text-sm font-medium text-center truncate w-full">
                {manga.title}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmark;
