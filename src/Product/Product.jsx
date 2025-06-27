import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter, FaStar } from "react-icons/fa";
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
    <div className="bg-900 text-white min-h-screen">
      {/* Header */}
      <div className="px-6 pt-8">
        <div className="max-w-6xl mx-auto">
          {/* Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center bg-white rounded-full px-4 py-3 gap-3 relative">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors"
              >
                FILTER
              </button>
              <input
                type="text"
                placeholder="Search manga..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent text-gray-700 text-sm focus:outline-none placeholder-gray-400"
              />
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <FaSearch className="text-gray-600 text-sm" />
              </button>

              {/* Filter Dropdown */}
              {showFilter && (
                <div className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg w-48 z-20">
                  {genres.map((genre) => (
                    <div
                      key={genre}
                      onClick={() => {
                        setSelectedGenre(genre === "All Genres" ? "" : genre);
                        setShowFilter(false);
                      }}
                      className={`px-4 py-3 text-sm cursor-pointer border-b last:border-b-0 ${
                        selectedGenre === (genre === "All Genres" ? "" : genre)
                          ? "bg-purple-50 text-purple-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {genre}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6">
        <div className="max-w-6xl mx-auto">
          {/* MangaCards */}
          <div className="mb-12">
            <MangaCards />
          </div>

          {/* Latest Updates & Most Viewed */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Latest Updates */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-xl text-white">Latest Updates</h2>
                <div className="flex gap-2">
                  <button className="bg-purple-600 text-white px-4 py-1 text-sm">Chapter</button>
                  <button className="text-gray-400 px-4 py-1 text-sm hover:text-white">Volume</button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {topRated.slice(0, 4).map((manga, index) => (
                  <div key={manga._id} className="bg-[#1a1a1a] rounded-lg p-8 flex gap-6">
                    <div className="relative flex-shrink-0">
                      <img
                        src={`${apiUrl}/uploads/covers/${manga.coverImage}`}
                        alt={manga.title}
                        className="w-28 h-36 object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white text-lg font-medium mb-4">{manga.title}</h3>
                      <div className="text-base text-gray-400 mb-5">
                        {manga.genre?.slice(0, 3).join(', ')}
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-purple-400 text-base">📖</span>
                          <span className="text-purple-400 text-base">Chap {47 - index} [EN]</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-purple-400 text-base">📖</span>
                          <span className="text-purple-400 text-base">Chap {46 - index} [EN]</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-purple-400 text-base">📖</span>
                          <span className="text-purple-400 text-base">Chap {45 - index} [EN]</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Most Viewed */}
            <div>
              <div className="mb-6">
                <h2 className="text-xl text-white mb-4">Most Viewed</h2>
                <div className="flex gap-2">
                  <button className="bg-purple-600 text-white px-4 py-1 text-sm">Today</button>
                  <button className="text-gray-400 px-4 py-1 text-sm hover:text-white">Week</button>
                  <button className="text-gray-400 px-4 py-1 text-sm hover:text-white">Month</button>
                </div>
              </div>
              
              <div className="space-y-6">
                {topRated.slice(0, 5).map((manga, index) => (
                  <div key={manga._id} className="bg-[#1a1a1a] rounded-lg p-6 flex gap-5 items-center">
                    <div className="text-purple-400 text-3xl font-bold w-12">
                      0{index + 1}
                    </div>
                    <img
                      src={`${apiUrl}/uploads/covers/${manga.coverImage}`}
                      alt={manga.title}
                      className="w-20 h-26 object-cover flex-shrink-0 rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white text-lg font-medium mb-3">{manga.title}</h3>
                      <div className="text-base text-gray-400 mb-3">
                        {manga.genre?.[0]}
                      </div>
                      <div className="flex items-center gap-4 text-base">
                        <span className="text-purple-400">📖 Chap {150 - index * 30}</span>
                        <span className="text-purple-400">📚 Vol {index + 1}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;