import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaBookmark,
  FaCommentDots,
  FaInfoCircle,
  FaExchangeAlt,
  FaExpand,
  FaCompress,
} from "react-icons/fa";

import manga1 from "../images/0.webp";
import manga2 from "../images/1.webp";
import manga3 from "../images/2.webp";
import manga4 from "../images/3.webp";

const dummyPages = [
  { image: manga1 },
  { image: manga2 },
  { image: manga3 },
  { image: manga4 },
];

const dummyInfo = {
  title: "Sakamoto Days",
  genres: ["Comedy", "Slice of Life", "Mafia"], // Not displayed now
};

const MangaReader = () => {
  const { id } = useParams();
  const [scrollDirection, setScrollDirection] = useState("vertical");
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleScroll = () => {
    setScrollDirection((prev) => (prev === "vertical" ? "horizontal" : "vertical"));
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Error attempting fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  return (
    <div className="flex bg-[#121212] min-h-screen text-white">
      {/* Sidebar */}
      <aside className="w-64 p-6 bg-[#1e1e1e] hidden md:flex flex-col sticky top-0 h-screen">
        <h2 className="text-xl font-semibold">{dummyInfo.title}</h2>

        {/* Scroll Switch Button */}
        <button
          onClick={toggleScroll}
          className="mt-6 flex items-center gap-2 text-sm bg-[#2a2a2a] hover:bg-[#3a3a3a] px-3 py-2 rounded"
        >
          <FaExchangeAlt className="text-[#ffc107]" />
          {scrollDirection === "vertical" ? "Switch to Horizontal" : "Switch to Vertical"}
        </button>

        {/* Full Screen Button */}
        <button
          onClick={toggleFullScreen}
          className="mt-3 flex items-center gap-2 text-sm bg-[#2a2a2a] hover:bg-[#3a3a3a] px-3 py-2 rounded"
        >
          {isFullScreen ? (
            <>
              <FaCompress className="text-[#ffc107]" />
              Exit Full Screen
            </>
          ) : (
            <>
              <FaExpand className="text-[#ffc107]" />
              Full Screen
            </>
          )}
        </button>

        {/* Bottom Buttons */}
        <div className="flex flex-col gap-4 mb-6 mt-auto">
          <button className="flex items-center gap-2 hover:text-[#ffc107]">
            <FaCommentDots className="text-[#ffc107]" />
            <span>Comments</span>
          </button>
          <button className="flex items-center gap-2 hover:text-[#ffc107]">
            <FaInfoCircle className="text-[#ffc107]" />
            <span>Info</span>
          </button>
          <button className="flex items-center gap-2 hover:text-[#ffc107]">
            <FaBookmark className="text-[#ffc107]" />
            <span>Bookmark</span>
          </button>
        </div>
      </aside>

      {/* Manga Pages */}
      <main
        className={`flex-1 p-4 ${
          scrollDirection === "horizontal"
            ? "flex gap-4 overflow-x-auto"
            : "space-y-4 overflow-y-auto"
        }`}
      >
        {dummyPages.map((page, idx) => (
          <img
            key={idx}
            src={page.image}
            alt={`Page ${idx + 1}`}
            className="w-full max-w-4xl mx-auto rounded shadow-md object-contain"
          />
        ))}
      </main>
    </div>
  );
};

export default MangaReader;
