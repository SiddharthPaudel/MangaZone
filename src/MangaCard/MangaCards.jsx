import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import { useManga } from "../ContextAPI/MangaContext"; // Import the context

const MangaCards = () => {
  const { mangas, loading, error } = useManga(); // Use the context
  const scrollRef = useRef(null);
  const navigate = null; // You can implement navigation later
  const [imageErrors, setImageErrors] = useState({}); // Track image loading errors

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handleRead = (mangaId) => {
    console.log('Navigate to read manga:', mangaId);
    // navigate(`/manga/${mangaId}`);
  };

  const handleInfo = (mangaId) => {
    console.log('Navigate to manga info:', mangaId);
    // navigate(`/manga/${mangaId}/info`);
  };

  const handleImageError = (mangaId) => {
    setImageErrors(prev => ({
      ...prev,
      [mangaId]: true
    }));
  };

  const getImageUrl = (manga) => {
    if (!manga.coverImage) {
      return '/placeholder-manga.jpg';
    }
    
    // Add cache-busting parameter and API URL
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const timestamp = new Date().getTime();
    return `${apiUrl}/uploads/covers/${manga.coverImage}?t=${timestamp}`;
  };

  if (loading) {
    return (
      <div className="bg-[#121212] px-6 py-12 font-[Montserrat]">
        <div className="flex justify-center items-center h-64">
          <div className="text-white text-lg">Loading manga...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#121212] px-6 py-12 font-[Montserrat]">
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500 text-lg">{error}</div>
        </div>
      </div>
    );
  }

  if (mangas.length === 0) {
    return (
      <div className="bg-[#121212] px-6 py-12 font-[Montserrat]">
        <div className="flex justify-center items-center h-64">
          <div className="text-white text-lg">No manga available yet</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#121212] px-6 py-12 font-[Montserrat] relative">
      {/* Arrows */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transition-all"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transition-all"
      >
        <ChevronRight size={24} />
      </button>

      {/* Scrollable Row */}
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide px-8"
        style={{ scrollBehavior: 'smooth' }}
      >
        {mangas.map((manga) => (
          <div
            key={manga._id}
            className="flex-shrink-0 bg-[#1e1e1e] rounded-xl shadow-md p-3 text-center transition hover:scale-[1.02] w-48"
          >
            <div className="relative">
              <img
                src={imageErrors[manga._id] ? '/placeholder-manga.jpg' : getImageUrl(manga)}
                alt={manga.title}
                className="w-44 h-64 object-cover rounded-lg"
                onError={() => handleImageError(manga._id)}
                onLoad={() => {
                  // Remove from error state if image loads successfully
                  setImageErrors(prev => {
                    const newState = { ...prev };
                    delete newState[manga._id];
                    return newState;
                  });
                }}
                // Add loading attribute for better performance
                loading="lazy"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center gap-2 opacity-0 hover:opacity-100 transition-opacity bg-black/40 rounded-lg">
                <button
                  onClick={() => handleRead(manga._id)}
                  className="flex items-center gap-2 px-4 py-1.5 text-sm font-semibold text-black rounded-full hover:bg-yellow-500 transition-colors"
                  style={{ backgroundColor: '#FFC107' }}
                >
                  <FaPlay /> Read
                </button>
                <button
                  onClick={() => handleInfo(manga._id)}
                  className="flex items-center gap-2 px-4 py-1.5 text-sm font-semibold text-white rounded-full hover:bg-gray-600 transition-colors"
                  style={{ backgroundColor: '#2D2D2D' }}
                >
                  <FaInfoCircle /> Info
                </button>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-white font-medium">{manga.title}</span>
              {manga.author && (
                <div className="text-gray-400 text-sm mt-1">{manga.author}</div>
              )}
              {manga.isRentable && (
                <div className="text-yellow-400 text-xs mt-1 font-semibold">
                  Rentable
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MangaCards;