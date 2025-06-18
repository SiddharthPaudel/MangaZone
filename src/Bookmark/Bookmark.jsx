import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Dummy bookmark data
const dummyBookmarks = [
  {
    id: 1,
    title: "Sakamoto Days",
    image: require("../images/0.webp"),
  },
  {
    id: 2,
    title: "One Piece",
    image: require("../images/1.webp"),
  },
  {
    id: 3,
    title: "Chainsaw Man",
    image: require("../images/2.webp"),
  },
];

const Bookmark = () => {
  const [bookmarks, setBookmarks] = useState(dummyBookmarks);
  const navigate = useNavigate();

  const handleRemove = (id) => {
    setBookmarks(bookmarks.filter((item) => item.id !== id));
  };

  const handleRead = (id) => {
    navigate(`/reader/${id}`); // Adjust if you're using /reader route
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-purple-500">My Bookmarks</h1>

      {bookmarks.length === 0 ? (
        <p className="text-gray-400">No bookmarks yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bookmarks.map((manga) => (
            <div
              key={manga.id}
              className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-md flex flex-col"
            >
              <img
                src={manga.image}
                alt={manga.title}
                className="h-60 w-full object-cover"
              />
              <div className="p-4 flex flex-col justify-between h-full">
                <h2 className="text-lg font-semibold mb-2">{manga.title}</h2>
                <div className="flex justify-between mt-auto gap-2">
                  <button
                    onClick={() => handleRead(manga.id)}
                    className="bg-purple-600 hover:bg-purple-700 text-white py-1 px-4 rounded"
                  >
                    Read
                  </button>
                  <button
                    onClick={() => handleRemove(manga.id)}
                    className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmark;
