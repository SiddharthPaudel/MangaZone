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
import { useAuth } from "../ContextAPI/Auth";
import toast from "react-hot-toast";

const MangaReader = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("vertical");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [chapterImages, setChapterImages] = useState([]);
  const [mangaTitle, setMangaTitle] = useState("Loading...");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

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

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/manga/${id}`);
        if (!res.ok) throw new Error("Failed to fetch manga");
        const data = await res.json();

        setMangaTitle(data.title);
        setComments(data.overallComments || []);

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

  const handleBookmark = async () => {
    if (!user) return toast.error("Please log in to bookmark.");

    try {
      const res = await fetch(`${apiUrl}/api/manga/${id}/bookmark`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Bookmark failed");

      setIsBookmarked(true);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message || "Bookmark failed");
    }
  };

  const handlePostComment = async () => {
    if (!user) return toast.error("Please log in to comment.");

    try {
      const res = await fetch(`${apiUrl}/api/manga/${id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, username: user.name, text: newComment })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to post comment");

      setComments(data.comments);
      setNewComment("");
      toast.success("Comment posted!");
    } catch (err) {
      toast.error(err.message || "Failed to post comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!user) return toast.error("Please log in to delete comment.");

    try {
      const res = await fetch(`${apiUrl}/api/manga/${id}/comment/${commentId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id })
      });

      const data = await res.json();
      setComments(data.comments);  // expects updated comments array here
      if (!res.ok) throw new Error(data.message || "Failed to delete comment");

      setComments(data.comments);
      toast.success("Comment deleted!");
    } catch (err) {
      toast.error(err.message || "Failed to delete comment");
    }
  };

  return (
    <div className="flex bg-[#121212] min-h-screen text-white relative">
      <aside className="w-64 p-6 bg-[#1e1e1e] hidden md:flex flex-col sticky top-0 h-screen">
        <h2 className="text-xl font-semibold">{mangaTitle}</h2>
        <button onClick={toggleScroll} className="mt-6 flex items-center gap-2 text-sm bg-[#2a2a2a] hover:bg-[#3a3a3a] px-3 py-2 rounded">
          <FaExchangeAlt className="text-[#ffc107]" />
          {scrollDirection === "vertical" ? "Switch to Horizontal" : "Switch to Vertical"}
        </button>
        <button onClick={toggleFullScreen} className="mt-3 flex items-center gap-2 text-sm bg-[#2a2a2a] hover:bg-[#3a3a3a] px-3 py-2 rounded">
          {isFullScreen ? (<><FaCompress className="text-[#ffc107]" /> Exit Full Screen</>) : (<><FaExpand className="text-[#ffc107]" /> Full Screen</>)}
        </button>
        <div className="flex flex-col gap-4 mb-6 mt-auto">
          <button onClick={() => setShowComments(true)} className="flex items-center gap-2 hover:text-[#ffc107]">
            <FaCommentDots className="text-[#ffc107]" /><span>Comments</span>
          </button>
          <button className="flex items-center gap-2 hover:text-[#ffc107]">
            <FaInfoCircle className="text-[grey]" /><span>Info</span>
          </button>
          <button onClick={handleBookmark} className="flex items-center gap-2 text-purple hover:text-[#ffc107]">
            {isBookmarked ? <FaBookmarkFilled /> : <FaRegBookmark />}<span>Bookmark</span>
          </button>
        </div>
      </aside>

      <main className={`flex-1 p-4 ${scrollDirection === "horizontal" ? "flex gap-4 overflow-x-auto" : "space-y-4 overflow-y-auto"}`}>
        {chapterImages.length === 0 ? (
          <p className="text-gray-400 text-center w-full mt-10">No chapter pages available.</p>
        ) : (
          chapterImages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Page ${idx + 1}`}
              className={`rounded shadow-md object-contain ${scrollDirection === "horizontal" ? "w-[75%] min-w-[450px] max-w-[700px]" : "w-full max-w-4xl mx-auto"}`}
            />
          ))
        )}
      </main>

      {showComments && (
        <div className="fixed top-0 right-0 w-80 h-full bg-[#1e1e1e] p-4 z-50 shadow-lg border-l border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Comments</h3>
            <button onClick={() => setShowComments(false)} className="text-gray-400 hover:text-white">✕</button>
          </div>

          <div className="space-y-4 max-h-[80vh] overflow-y-auto">
            {comments.length === 0 ? (
              <p className="text-sm text-gray-400">No comments yet.</p>
            ) : (
              comments.map((comment) => (
                <div key={comment._id} className="bg-[#2a2a2a] p-3 rounded shadow">
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-white">{comment.username}</span>
                    {comment.userId === user?.id && (
                      <button onClick={() => handleDeleteComment(comment._id)} className="text-xs text-red-400 hover:underline">Delete</button>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm mt-1">{comment.text}</p>
                </div>
              ))
            )}
          </div>

          <div className="mt-4">
            <textarea
              className="w-full bg-[#2a2a2a] p-2 text-sm text-white rounded resize-none"
              placeholder="Write a comment..."
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button onClick={handlePostComment} className="mt-2 bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded text-sm">Post Comment</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MangaReader;
