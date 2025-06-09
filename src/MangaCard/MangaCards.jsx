import React, { useRef } from 'react';
import manga1 from '../images/naru.jpg';
import manga2 from '../images/ble.jpg';
import manga3 from '../images/saku.jpg';
import manga4 from '../images/tokyo.jpg';
import manga5 from '../images/jugo.jpg';
import manga6 from '../images/berserk.jpeg';
import manga7 from '../images/castle.jpeg';
import manga8 from '../images/monster.jpg';
import manga9 from '../images/vin.webp';
import { ChevronLeft, ChevronRight } from "lucide-react";


import { FaPlay, FaInfoCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const mangas = [
  { id: 1, title: 'Naruto', image: manga1 },
  { id: 2, title: 'Bleach', image: manga2 },
  { id: 3, title: 'Sakamoto Days', image: manga3 },
  { id: 4, title: 'Tokyo Revengers', image: manga4 },
  { id: 5, title: 'Dargon', image: manga5 },
  { id: 6, title: 'Berserk', image: manga6 },
  { id: 7, title: 'Castlevania', image: manga7 },
  { id: 8, title: 'Monster', image: manga8 },
  { id: 9, title: 'Vinland Saga', image: manga9 },
];

const MangaCards = () => {
  // const scrollRef = useRef(null);

  // const scroll = (direction) => {
  //   if (scrollRef.current) {
  //     const scrollAmount = 300;
  //     scrollRef.current.scrollBy({
  //       left: direction === 'left' ? -scrollAmount : scrollAmount,
  //       behavior: 'smooth',
  //     });
  //   }
  // };
 const scrollRef = useRef(null);
    const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="bg-[#121212] px-6 py-12 font-[Montserrat] relative">
      {/* Arrows */}
       <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full"
        >
          <ChevronLeft size={24} />
        </button>
      <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full"
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
            key={manga.id}
            className="flex-shrink-0 bg-[#1e1e1e] rounded-xl shadow-md p-3 text-center transition hover:scale-[1.02] w-48"
          >
            <div className="relative">
              <img
                src={manga.image}
                alt={manga.title}
                className="w-44 h-64 object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center gap-2 opacity-0 hover:opacity-100 transition-opacity bg-black/40 rounded-lg">
                <button
                  className="flex items-center gap-2 px-4 py-1.5 text-sm font-semibold text-black rounded-full"
                  style={{ backgroundColor: '#FFC107' }}
                >
                  <FaPlay  /> Read
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-1.5 text-sm font-semibold text-white rounded-full"
                  style={{ backgroundColor: '#2D2D2D' }}
                >
                  <FaInfoCircle /> Info
                </button>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-white font-medium">{manga.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MangaCards;
