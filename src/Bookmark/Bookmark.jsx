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
    <div className="min-h-screen bg-[#121212] text-white p-6 font-montserrat">
      <h1 className="text-3xl font-bold mb-6 text-purple-500">My Bookmarks</h1>

      {bookmarks.length === 0 ? (
        <p className="text-gray-400">No bookmarks yet.</p>
      ) : (
       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[-1px]">
          {bookmarks.map((manga) => (
 <div
  key={manga.id}
  className="w-[200px] flex flex-col items-center bg-[#1e1e1e] rounded-2xl p-2 relative font-montserrat"
>
  {/* Manga Cover */}
  <div className="relative w-full h-[290px]">
    <img
      src={manga.image}
      alt={manga.title}
      className="w-full h-full object-cover rounded-xl"
    />

    {/* Play Button - Top Right */}
    <button
      onClick={() => handleRead(manga.id)}
      className="absolute top-2 right-2 bg-black bg-opacity-60 p-1.5 rounded-full text-yellow-400 hover:text-yellow-300"
      title="Read"
    >
      <FaPlay size={12} />
    </button>

    {/* Close Button - Top Left */}
    <button
      onClick={() => handleRemove(manga.id)}
      className="absolute top-2 left-2 bg-black bg-opacity-60 p-1.5 rounded-full text-red-500 hover:text-red-400"
      title="Remove"
    >
      <FaTimes size={12} />
    </button>
  </div>

  {/* Manga Title */}
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
