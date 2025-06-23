import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaBookmark,
  FaCommentDots,
  FaInfoCircle,
  FaExchangeAlt,
  FaExpand,
  FaCompress,
  FaRegBookmark,
  FaBookmark as FaBookmarkFilled
} from "react-icons/fa";

const MangaReader = () => {
  const { id } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("vertical");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [chapterImages, setChapterImages] = useState([]);
  const [mangaTitle, setMangaTitle] = useState("Loading...");

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleBookmark = () => setIsBookmarked((prev) => !prev);

  const toggleScroll = () => {
    setScrollDirection((prev) =>
      prev === "vertical" ? "horizontal" : "vertical"
    );
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

  // ✅ Fetch real manga & chapter images
  useEffect(() => {
    const fetchManga = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/manga/${id}`);
        if (!res.ok) throw new Error("Failed to fetch manga");
        const data = await res.json();

        setMangaTitle(data.title);

        const lastChapter = data.chapters[data.chapters.length - 1];

        if (lastChapter?.imageUrls?.length > 0) {
          const fullUrls = lastChapter.imageUrls.map(
            (imgPath) => `${apiUrl}/uploads/chapters/${imgPath}`
          );
          setChapterImages(fullUrls);
        } else {
          setChapterImages([]);
        }
      } catch (err) {
        console.error("Error fetching manga:", err);
        setMangaTitle("Failed to load");
      }
    };

    fetchManga();
  }, [id]);

  return (
    <div className="flex bg-[#121212] min-h-screen text-white relative">
      {/* Sidebar */}
      <aside className="w-64 p-6 bg-[#1e1e1e] hidden md:flex flex-col sticky top-0 h-screen">
        <h2 className="text-xl font-semibold">{mangaTitle}</h2>

        {/* Scroll Switch Button */}
        <button
          onClick={toggleScroll}
          className="mt-6 flex items-center gap-2 text-sm bg-[#2a2a2a] hover:bg-[#3a3a3a] px-3 py-2 rounded"
        >
          <FaExchangeAlt className="text-[#ffc107]" />
          {scrollDirection === "vertical"
            ? "Switch to Horizontal"
            : "Switch to Vertical"}
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
          <button
            onClick={() => setShowComments(true)}
            className="flex items-center gap-2 hover:text-[#ffc107]"
          >
            <FaCommentDots className="text-[#ffc107]" />
            <span>Comments</span>
          </button>

          <button className="flex items-center gap-2 hover:text-[#ffc107]">
            <FaInfoCircle className="text-[grey]" />
            <span>Info</span>
          </button>

          <button
            onClick={handleBookmark}
            className="flex items-center gap-2 text-purple hover:text-[#ffc107]"
          >
            {isBookmarked ? <FaBookmarkFilled /> : <FaRegBookmark />}
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
        {chapterImages.length === 0 ? (
          <p className="text-gray-400 text-center w-full mt-10">
            No chapter pages available.
          </p>
        ) : (
          chapterImages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Page ${idx + 1}`}
              className={`rounded shadow-md object-contain ${
                scrollDirection === "horizontal"
                  ? "w-[75%] min-w-[450px] max-w-[700px]"
                  : "w-full max-w-4xl mx-auto"
              }`}
            />
          ))
        )}
      </main>

      {/* Comment Section (Right Panel) */}
      {showComments && (
        <div className="fixed top-0 right-0 w-80 h-full bg-[#1e1e1e] p-4 z-50 shadow-lg border-l border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Comments</h3>
            <button
              onClick={() => setShowComments(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="text-sm text-gray-400">No comments yet.</div>
          </div>

          <div className="mt-4">
            <textarea
              className="w-full bg-[#2a2a2a] p-2 text-sm text-white rounded resize-none"
              placeholder="Write a comment..."
              rows={3}
            ></textarea>
            <button className="mt-2 bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded text-sm">
              Post Comment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MangaReader;
