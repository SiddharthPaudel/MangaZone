import { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import manga1 from "../images/naru.jpg";
import MangaCards from "../MangaCard/MangaCards";

const dummyManga = {
  id: "1",
  title: "Komi Can't Communicate",
  jpTitle: "古見さんは、コミュ症です。",
  description:
    "It's Shouko Komi’s first day at the prestigious Itan Private High School, and she has already risen to the status of the school’s Madonna. With long black hair and a tall, graceful appearance, she captures the attention of anyone who comes across her. There’s just one problem though—despite her popularity, Komi is terrible at communicating with others.",
  genre: ["Comedy", "School", "Shounen"],
  cover: manga1,
  author: "Oda, Tomohito",
  type: "Manga",
  rating: 4.5,
//   votes: 7091,
  rentPrice: "Rs 50"+"/Day",
};

const ProductDetails = () => {
  const { id } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleBookmark = () => setIsBookmarked((prev) => !prev);

  return (
    <div className="bg-[#121212] text-white min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Left: Cover Image */}
        <img
          src={dummyManga.cover}
          alt={dummyManga.title}
          className="w-[220px] h-[330px] rounded-lg shadow-lg object-cover"
        />

        {/* Middle: Main Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold">{dummyManga.title}</h1>
            <p className="text-gray-400 italic mt-1">{dummyManga.jpTitle}</p>

            {/* Buttons */}
            <div className="mt-4 flex items-center gap-4">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md text-sm font-medium transition">
                📖 Read Now
              </button>
              <button className="bg-white text-black px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition">
                💸 Rent {dummyManga.rentPrice}
              </button>
              <button
                onClick={handleBookmark}
                className="p-2 bg-[#1e1e1e] rounded-md text-white hover:text-purple-500"
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
              {dummyManga.genre.map((tag) => (
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
              {dummyManga.description}
            </p>
          </div>
        </div>

        {/* Right: Minimal Info */}
        <div className="w-full md:w-72 bg-[#1e1e1e] p-6 rounded-lg shadow-md">
          <ul className="text-sm text-gray-300 space-y-3">
            <li>
              <strong>Type:</strong> {dummyManga.type}
            </li>
            <li>
              <strong>Author:</strong> {dummyManga.author}
            </li>
          </ul>

          {/* Rating */}
          <div className="mt-6">
            {/* Rating */}
            <div className="mt-6">
              <div className="flex items-center text-[#ffc107] text-xl font-bold mb-1">
                <FaStar className="mr-1" />
                {dummyManga.rating}
                <span className="text-sm text-gray-400 ml-2">
                  ({dummyManga.votes} voted)
                </span>
              </div>

              <p className="text-sm text-gray-400">
                Give me your Rating?
              </p>

              {/* 5-star rating */}
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
      <MangaCards/>
    </div>
  );
};

export default ProductDetails;
