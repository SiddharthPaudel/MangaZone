import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import MangaCards from "../MangaCard/MangaCards"; // keep this
import toast from "react-hot-toast";

const Product = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [topRated, setTopRated] = useState([]);

  const genres = ["All Genres", "Fantasy", "Adventure", "Sci-Fi"];
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Fetch top-rated manga
  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/manga/top-rated`);
        if (!res.ok) throw new Error("Failed to fetch top-rated manga");
        const data = await res.json();
        setTopRated(data);
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchTopRated();
  }, []);

  return (
    <div className="bg-900 text-white p-6 min-h-screen relative">
      {/* Search Bar */}
      <div className="flex justify-end mb-6 relative">
        <div className="flex items-center bg-white rounded-xl px-3 py-2 w-full max-w-xl shadow-sm">
          <button
            onClick={() => setShowFilter((prev) => !prev)}
            className="text-xs font-semibold bg-purple-200 text-purple-800 px-3 py-1 rounded-md mr-3"
          >
            FILTER
          </button>
          <input
            type="text"
            placeholder="Search manga..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent focus:outline-none w-full text-sm text-gray-700 placeholder-gray-400"
          />
          <FaSearch className="text-black ml-3" />
        </div>

        {/* Dropdown */}
        {showFilter && (
          <div className="absolute right-0 top-12 bg-yellow border border-black-300 rounded-md shadow-md z-10 w-48">
            {genres.map((genre) => (
              <div
                key={genre}
                onClick={() => {
                  setSelectedGenre(genre === "All Genres" ? "" : genre);
                  setShowFilter(false);
                }}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-purple-800 ${
                  selectedGenre === genre ? "bg-white-200" : ""
                }`}
              >
                {genre}
              </div>
            ))}
          </div>
        )}
      </div>
      


      {/* 🧩 KEEPING MangaCards */}
      <MangaCards />

      {/* ⭐ Top Rated Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">🔥 Top Rated Manga</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {topRated.length === 0 ? (
            <p className="text-gray-400 col-span-full">No top-rated manga found.</p>
          ) : (
            topRated.map((manga) => (
              <div key={manga._id} className="bg-[#1e1e1e] p-3 rounded-lg shadow-md">
                <img
                  src={`${apiUrl}/uploads/covers/${manga.coverImage}`}
                  alt={manga.title}
                  className="w-full h-44 object-cover rounded"
                />
                <div className="mt-2">
                  <h3 className="text-md font-semibold">{manga.title}</h3>
                  <p className="text-sm text-gray-400">{manga.genre?.join(", ")}</p>
                  <p className="text-yellow-400 text-sm mt-1">⭐ {manga.rating?.toFixed(1) || "4.5"}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
