import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import manga1 from '../images/naru.jpg';
import manga2 from '../images/ble.jpg';
import manga3 from '../images/saku.jpg';
import manga4 from '../images/tokyo.jpg';
import manga5 from '../images/jugo.jpg';
import manga6 from '../images/berserk.jpeg';
import MangaCards from "../MangaCard/MangaCards";

const mangaList = [
  { title: "Japan Summons", genre: "Fantasy", cover: manga1 },
  { title: "Rebuild World", genre: "Sci-Fi", cover: manga2 },
  { title: "Slime Saint", genre: "Fantasy", cover: manga3 },
  { title: "A Heroic Tale", genre: "Adventure", cover: manga4 },
  { title: "Beast Unleashed", genre: "Adventure", cover: manga5 },
  { title: "Demon Sword", genre: "Adventure", cover: manga6 },
];

const Product = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const genres = ["All Genres", "Fantasy", "Adventure", "Sci-Fi"];

  const filteredManga = mangaList.filter(manga =>
    manga.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedGenre === "" || manga.genre.toLowerCase() === selectedGenre.toLowerCase())
  );

  return (
    <div className="bg-900 text-white p-6 min-h-screen relative">
      {/* Search Bar */}
      <div className="flex justify-end mb-6 relative">
        <div className="flex items-center bg-white rounded-xl px-3 py-2 w-full max-w-xl shadow-sm">
          {/* FILTER Button */}
          <button
            onClick={() => setShowFilter(prev => !prev)}
            className="text-xs font-semibold bg-purple-200 text-purple-800 px-3 py-1 rounded-md mr-3"
          >
            FILTER
          </button>

          {/* Input */}
          <input
            type="text"
            placeholder="Search manga..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent focus:outline-none w-full text-sm text-gray-700 placeholder-gray-400"
          />

          {/* Search Icon */}
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

      <MangaCards />

      {/* Latest Updates and Most Viewed */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Latest Updates */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Latest Updates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredManga.map((manga, idx) => (
              <div key={idx} className="flex gap-4 bg-[#1e1e1e] p-3 rounded-lg">
                <img src={manga.cover} alt={manga.title} className="w-20 h-28 object-cover rounded" />
                <div>
                  <h3 className="font-semibold">{manga.title}</h3>
                  <p className="text-sm text-gray-400">{manga.genre}</p>
                  <ul className="mt-2 text-sm space-y-1">
                    <li className="text-purple-400">Chap 47 [EN]</li>
                    <li className="text-purple-400">Chap 46 [EN]</li>
                    <li className="text-purple-400">Chap 45 [EN]</li>
                  </ul>
                </div>
              </div>
            ))}
            {filteredManga.length === 0 && (
              <p className="text-gray-400 col-span-2">No manga found for this search or filter.</p>
            )}
          </div>
        </div>

        {/* Most Viewed */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Most Viewed</h2>
          <ul className="space-y-4">
            {["One Piece", "Blue Lock", "Solo Leveling", "Gachiakuta", "Jujutsu Kaisen"].map((title, i) => (
              <li key={i} className="flex justify-between items-center bg-[#1e1e1e] p-3 rounded-lg">
                <div>
                  <h4 className="font-semibold">{title}</h4>
                  <p className="text-sm text-gray-400">Chap {1000 + i * 10}</p>
                </div>
                <span className="bg-purple-600 px-2 py-1 rounded text-sm">{String(i + 1).padStart(2, "0")}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Product;
