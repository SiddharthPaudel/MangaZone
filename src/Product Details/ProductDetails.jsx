import { useState } from 'react';
import { FaBookmark, FaRegBookmark, FaStar, FaRegStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import manga1 from '../images/naru.jpg';

const dummyManga = {
  id: '1',
  title: 'Japan Summons',
  description:
    'In the Kingdom of Japan, ordinary citizens are summoned to a fantasy world where they must battle evil forces and protect the realm. With epic sword fights and mysterious magic, this manga takes you on a thrilling journey.',
  genre: 'Fantasy',
  cover: manga1,
  rentPrice: '$2.99',
  chapters: 45,
  author: 'Keito Koume',
  status: 'Ongoing',
  rating: 4,
  reviews: 120,
};

const ProductDetails = () => {
  const { id } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = () => setIsBookmarked((prev) => !prev);

  return (
    <div className="bg-[#121212] text-white min-h-screen p-6">
      <div className="max-w-5xl mx-auto bg-[#1e1e1e] rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-6">
        {/* Cover Image */}
        <img
          src={dummyManga.cover}
          alt={dummyManga.title}
          className="w-full md:w-64 h-auto rounded-lg object-cover shadow-lg"
        />

        {/* Manga Info */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold">{dummyManga.title}</h1>
            <button
              onClick={handleBookmark}
              className="transition-colors duration-200 hover:text-[#ffc107]"
            >
              {isBookmarked ? (
                <FaBookmark className="text-[#ffc107] text-2xl" />
              ) : (
                <FaRegBookmark className="text-gray-400 text-2xl" />
              )}
            </button>
          </div>

          {/* Rating */}
          <div className="mt-2 flex items-center text-[#ffc107]">
            {Array.from({ length: 5 }, (_, i) =>
              i < dummyManga.rating ? (
                <FaStar key={i} />
              ) : (
                <FaRegStar key={i} />
              )
            )}
            <span className="text-sm text-gray-400 ml-2">
              ({dummyManga.reviews} reviews)
            </span>
          </div>

          {/* Description */}
          <p className="mt-4 text-sm text-gray-300">{dummyManga.description}</p>

          {/* Genre */}
          <div className="mt-4">
            <span className="bg-[#ffc107] text-black text-xs px-2 py-1 rounded font-medium">
              {dummyManga.genre}
            </span>
          </div>

          {/* Extra Details */}
          <ul className="text-sm text-gray-400 mt-4 space-y-1">
            <li>
              <strong>Chapters:</strong> {dummyManga.chapters}
            </li>
            <li>
              <strong>Author:</strong> {dummyManga.author}
            </li>
            <li>
              <strong>Status:</strong> {dummyManga.status}
            </li>
          </ul>

          {/* Buttons */}
          <div className="mt-6 flex gap-4 flex-wrap">
            <button className="bg-[#ffc107] hover:bg-yellow-400 text-black px-5 py-2 rounded-md transition">
              Rent for {dummyManga.rentPrice}
            </button>
            <button className="bg-white text-black px-5 py-2 rounded-md hover:bg-gray-300 transition">
              Read Now
            </button>
            <button className="bg-gray-800 text-white px-5 py-2 rounded-md hover:bg-gray-700 transition">
              Watch Trailer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
