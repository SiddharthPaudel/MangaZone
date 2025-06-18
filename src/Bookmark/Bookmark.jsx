import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaTimes } from "react-icons/fa";

import manga1 from "../images/naru.jpg";
import manga2 from "../images/ble.jpg";
import manga3 from "../images/saku.jpg";

// Dummy bookmark data
const dummyBookmarks = [
  {
    id: 1,
    title: "Sakamoto Days",
    image: manga1,
  },
  {
    id: 2,
    title: "One Piece",
    image: manga2,
  },
  {
    id: 3,
    title: "Chainsaw Man",
    image: manga3,
  },
];

const Bookmark = () => {
  const [bookmarks, setBookmarks] = useState(dummyBookmarks);
  const navigate = useNavigate();

  const handleRemove = (id) => {
    setBookmarks(bookmarks.filter((item) => item.id !== id));
  };

  const handleRead = (id) => {
    navigate(`/reader/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-purple-500">My Bookmarks</h1>

      {bookmarks.length === 0 ? (
        <p className="text-gray-400">No bookmarks yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {bookmarks.map((manga) => (
            <div
              key={manga.id}
              className="relative bg-[#1e1e1e] rounded-xl overflow-hidden shadow-md group"
            >
              {/* Manga Cover */}
              <img
                src={manga.image}
                alt={manga.title}
                className="h-72 w-full object-cover rounded-xl transition duration-300 group-hover:opacity-90"
              />

              {/* Title */}
              <div className="absolute bottom-0 bg-black bg-opacity-60 w-full text-center p-2">
                <h2 className="text-sm font-semibold truncate">{manga.title}</h2>
              </div>

              {/* Icons Top Right */}
              <div className="absolute top-2 right-2 flex gap-2">
                {/* Play */}
                <button
                  onClick={() => handleRead(manga.id)}
                  className="text-yellow-400 hover:text-yellow-300 bg-black bg-opacity-50 p-2 rounded-full"
                  title="Read"
                >
                  <FaPlay size={14} />
                </button>

                {/* Remove */}
                <button
                  onClick={() => handleRemove(manga.id)}
                  className="text-red-500 hover:text-red-400 bg-black bg-opacity-50 p-2 rounded-full"
                  title="Remove"
                >
                  <FaTimes size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmark;
