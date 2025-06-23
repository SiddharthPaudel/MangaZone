import React, { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark, FaStar, FaRegStar } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../ContextAPI/Auth";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id;

  const [manga, setManga] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
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

        const userRatingData = data.ratings?.find(r => r.userId === userId);
        if (userRatingData) {
          setUserRating(userRatingData.rating);
          setReviewText(userRatingData.review || "");
        }
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchManga();
    }
  }, [id, userId]);
  const handleDeleteReview = async (reviewId) => {
  if (!userId) {
    toast.error("User not logged in");
    return;
  }

  try {
    const res = await fetch(`${apiUrl}/api/manga/review/${id}/${reviewId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Delete failed");

    toast.success("Review deleted successfully");

    // Update local state
    setManga((prev) => ({
      ...prev,
      ratings: prev.ratings.filter((r) => r._id !== reviewId)
    }));
    setUserRating(0);
    setReviewText("");
  } catch (error) {
    toast.error(error.message || "Failed to delete review");
  }
};

  const handleBookmark = async () => {
    if (!user) {
      toast.error("Please log in to bookmark");
      return;
    }

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

  const handleSubmitReview = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/manga/rate/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId, rating: userRating, review: reviewText })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit review");

      toast.success("Review submitted successfully!");
    } catch (err) {
      toast.error(err.message || "Review submission failed");
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
        <img
          src={`${apiUrl}/uploads/covers/${manga.coverImage}`}
          alt={manga.title}
          className="w-[220px] h-[330px] rounded-lg shadow-lg object-cover"
        />

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold">{manga.title}</h1>
            <p className="text-gray-400 italic mt-1">{manga.jpTitle}</p>

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

            <p className="mt-5 text-sm text-gray-300 leading-relaxed">
              {manga.description}
            </p>
          </div>
        </div>

        <div className="w-full md:w-72 bg-[#1e1e1e] p-6 rounded-lg shadow-md">
          <ul className="text-sm text-gray-300 space-y-3">
            <li>
              <strong>Type:</strong> {manga.type || "Manga"}
            </li>
            <li>
              <strong>Author:</strong> {manga.author || "Unknown"}
            </li>
          </ul>

          <div className="mt-6">
            <div className="flex items-center text-[#ffc107] text-xl font-bold mb-1">
              <FaStar className="mr-1" />
              {userRating > 0 ? userRating.toFixed(1) : (manga.rating ?? "4.5") }
              <span className="text-sm text-gray-400 ml-2">
  Rate us <span role="img" aria-label="wink">😉</span>
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

            <textarea
              className="w-full mt-4 p-3 rounded-lg text-sm text-black focus:outline-none resize-none border border-gray-300"
              rows={4}
              placeholder="Write your detailed review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>

            <button
              onClick={handleSubmitReview}
              className="mt-3 bg-[#ffc107] text-black px-4 py-2 rounded-md w-full hover:bg-[#e6b800] transition font-semibold"
            >
              Submit Review
            </button>
<div className="mt-8">
  <h2 className="text-lg font-bold text-white mb-4">User Reviews</h2>
  {manga.ratings?.length === 0 ? (
    <p className="text-gray-400">No reviews yet.</p>
  ) : (
    <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
      {manga.ratings.map((review, index) => (
        <div key={index} className="bg-[#2a2a2a] p-4 rounded-md shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#ffc107]">
              {[1, 2, 3, 4, 5].map((i) =>
                i <= review.rating ? (
                  <FaStar key={i} size={16} />
                ) : (
                  <FaRegStar key={i} size={16} />
                )
              )}
              <span className="ml-2 text-sm text-gray-400">{review.rating.toFixed(1)}</span>
            </div>
            {review.userId?._id === userId && (
              <button
                onClick={() => handleDeleteReview(review._id)}
                className="text-red-400 text-xs hover:underline"
              >
                Delete
              </button>
            )}
          </div>
          <p className="text-sm text-gray-200 italic mt-2">"{review.review}"</p>
          <p className="text-xs text-gray-400 mt-1">
            — {review.userId?.name || "Unknown User"}
          </p>
        </div>
      ))}
    </div>
  )}
</div>



          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
