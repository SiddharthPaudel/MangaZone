import React, { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark, FaStar, FaRegStar } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../ContextAPI/Auth";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // 👈 Get the logged-in user
  const userId = user?._id;

  const [manga, setManga] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/manga/${id}`);
        if (!res.ok) throw new Error("Failed to fetch manga");
        const data = await res.json();
        setManga(data);
        setIsBookmarked(data.bookmarks?.includes(userId));
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchManga();
  }, [id, userId]);

  const handleBookmark = async () => {
     if (!user) {
    toast.error("Please log in to bookmark");
    return;
  }

  const userId = user.id;  // <--- changed from user._id to user.id

  if (!userId) {
    toast.error("User ID missing");
    return;
  }

    try {
      const res = await fetch(`${apiUrl}/api/manga/${manga._id}/bookmark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to bookmark");

      setIsBookmarked(true);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message || "Bookmark failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white font-montserrat">
        Loading manga details...
      </div>
    );
  }

  if (!manga) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white font-montserrat">
        Manga not found.
      </div>
    );
  }

  return (
    <div className="bg-[#121212] text-white min-h-screen px-6 py-10 font-montserrat">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Left: Cover Image */}
        <img
          src={`${apiUrl}/uploads/covers/${manga.coverImage}`}
          alt={manga.title}
          className="w-[220px] h-[330px] rounded-lg shadow-lg object-cover"
        />

        {/* Middle: Main Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold">{manga.title}</h1>
            <p className="text-gray-400 italic mt-1">{manga.jpTitle}</p>

            {/* Buttons */}
            <div className="mt-4 flex items-center gap-4">
              <button
                onClick={() => navigate("/reader")}
                className="text-black px-4 py-2 rounded-md hover:bg-gray-300"
                style={{ backgroundColor: "#FFC107" }}
              >
                Read Now
              </button>

              <button
                onClick={() => navigate("/rent")}
                className="text-black px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition"
                style={{ backgroundColor: "#FFC107" }}
              >
                💸 Rent Rs {manga.rentalDetails?.price ?? "N/A"}/
                {manga.rentalDetails?.duration?.unit ?? "day"}
              </button>

              <button
                onClick={handleBookmark}
                className="p-2 bg-[#1e1e1e] rounded-md text-yellow hover:text-purple-500"
              >
                {isBookmarked ? (
                  <FaBookmark size={20} />
                ) : (
                  <FaRegBookmark size={20} />
                )}
              </button>
            </div>

            {/* Genre Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {manga.genre?.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#2a2a2a] text-sm px-3 py-1 rounded-full text-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="mt-5 text-sm text-gray-300 leading-relaxed">
              {manga.description}
            </p>
          </div>
        </div>

        {/* Right: Info Box */}
        <div className="w-full md:w-72 bg-[#1e1e1e] p-6 rounded-lg shadow-md">
          <ul className="text-sm text-gray-300 space-y-3">
            <li>
              <strong>Type:</strong> {manga.type || "Manga"}
            </li>
            <li>
              <strong>Author:</strong> {manga.author || "Unknown"}
            </li>
          </ul>

          {/* Rating */}
          <div className="mt-6">
            <div className="flex items-center text-[#ffc107] text-xl font-bold mb-1">
              <FaStar className="mr-1" />
              {manga.rating ?? "4.5"}
              <span className="text-sm text-gray-400 ml-2">
                ({manga.ratings?.length ?? 0} votes)
              </span>
            </div>

            <p className="text-sm text-gray-400">Give me your Rating?</p>
            <div className="mt-3 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setUserRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none"
                >
                  {star <= (hoverRating || userRating) ? (
                    <FaStar className="text-[#ffc107]" size={24} />
                  ) : (
                    <FaRegStar className="text-[#ffc107]" size={24} />
                  )}
                </button>
              ))}
            </div>

            <p className="mt-2 text-sm text-gray-400">
              What do you think about this manga?
            </p>

            <div className="mt-3 flex gap-2 flex-wrap">
              <button className="bg-white text-black px-4 py-2 rounded-lg text-sm">
                😒 Boring
              </button>
              <button className="bg-white text-black px-4 py-2 rounded-lg text-sm">
                😊 Great
              </button>
              <button className="bg-white text-black px-4 py-2 rounded-lg text-sm">
                😍 Amazing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
