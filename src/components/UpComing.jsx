import React from 'react';
import characterLeft from '../images/char_left.png';     // replace with your actual image
import characterRight from '../images/char_right.png';   // replace with your actual image
import onepiece from '../images/onepng.png';
import aot from '../images/aotpng.png';
import mha from '../images/myheropng.png';

const mangas = [
  {
    id: 1,
    title: "New Chapter of 'One Piece' Released",
    image: onepiece,
    description: "Read the latest chapter of the epic 'One Piece' saga. Join Luffy and his crew on their new adventure in this epic finale!!",
    date: "October 15, 2021",
    bgColor: "bg-red-600",
  },
  {
    id: 2,
    title: "Exciting Release: 'Attack on Titan' Finale",
    image: aot,
    description: "Witness the thrilling conclusion of 'Attack on Titan'. Find out the fate of Eren and the world in this epic finale!",
    date: "October 20, 2021",
    bgColor: "bg-blue-500",
  },
  {
    id: 3,
    title: "Fresh Manga Alert: 'My Hero Academia'",
    image: mha,
    description: "Discover the newest chapter of 'My Hero Academia'. Follow Deku and his friends as they face new challenges and villains!",
    date: "October 25, 2021",
    bgColor: "bg-yellow-400",
  },
];

const UpcomingManga = () => {
  return (
   <div className="bg-[#121212] py-20 px-4 font-montserrat relative overflow-hidden">

  {/* Left Character */}
  <img
    src={characterLeft}
    alt="Left Character"
    className="absolute left-0 bottom-0 h-[260px] object-contain hidden md:block z-0"
  />

  {/* Right Character */}
  <img
    src={characterRight}
    alt="Right Character"
    className="absolute right-0 bottom-0 h-[260px] object-contain hidden md:block z-0"
  />

  <h2 className="text-3xl text-white font-bold text-center mb-10 z-10 relative">Upcoming Manga Highlights</h2>

  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-4 z-10 relative">
    {mangas.map((manga) => (
      <div
        key={manga.id}
        className="rounded-xl shadow-md overflow-hidden"
      >
        {/* Top Color Banner */}
        <div className={`${manga.bgColor} p-2`}>
          <img src={manga.image} alt={manga.title} className="w-full h-36 object-cover rounded-md" />
        </div>

        {/* Content */}
        <div className="bg-white p-3">
          <h3 className="text-sm font-bold text-gray-900 mb-1">{manga.title}</h3>
          <p className="text-xs text-gray-700 mb-2">{manga.description}</p>
          <p className="text-xs text-gray-500">{manga.date}</p>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default UpcomingManga;