import React from 'react';
import manga1 from '../images/naru.jpg';
import manga2 from '../images/ble.jpg';
import manga3 from '../images/saku.jpg';
import manga4 from '../images/tokyo.jpg';
import manga5 from '../images/jugo.jpg';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';

const mangas = [
  { id: 1, title: 'Naruto', image: manga1 },
  { id: 2, title: 'Bleach', image: manga2 },
  { id: 3, title: 'Sakamoto Days', image: manga3 },
  { id: 4, title: 'Tokyo Revengers', image: manga4 },
  { id: 5, title: 'Jujutsu Kaisen', image: manga5 },
 
];

const MangaCards = () => {
  return (
    <div className="bg-[#121212] px-6 py-12 font-[Montserrat]">
      {/* Header */}
      <h3 className="text-3xl text-white font-semibold text-center mb-10 ">Mangas</h3>
<br/>
      {/* Card Grid */}
     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">

        {mangas.map((manga) => (
          <div
            key={manga.id}
            className="bg-[#1e1e1e] rounded-xl shadow-md p-3 text-center transition hover:scale-[1.02]"
          >
            <div className="relative w-44">
              <img
                src={manga.image}
                alt={manga.title}
                className="w-44 h-64 object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center gap-2">
                <button
                  className="flex items-center gap-2 px-4 py-1.5 text-sm font-semibold text-black border border-white rounded-full font-montserrat"
                  style={{ backgroundColor: '#FFC107' }}
                >
                  <FaPlay style={{color:"F3F3F3"}} /> Read
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-1.5 text-sm font-semibold text-white border-white rounded-full font-montserrat"
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
