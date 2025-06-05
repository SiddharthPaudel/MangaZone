import React from 'react';
// import main from '../images/Dattebayo.jpg';
// import main from '../images/killua.jpg';
// import main from '../images/zenitsu.png';
import main from '../images/zen.webp';

const HeroSection = () => {
  return (
    <div
      className="flex flex-col-reverse items-center justify-between gap-6 px-6 py-16 md:flex-row md:gap-8 md:px-16 lg:px-24"
      style={{ backgroundColor: '#121212' }}
    >
      {/* Left Text Content */}
      <div className="w-full md:w-1/2 text-center md:text-left font-montserrat">
        <p className="text-base text-gray-400 mb-3">Discover the New</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
          Find Your Favorite <br />
          Manga At MangaZone
        </h1>
        <button
          className="mt-4 rounded-lg px-8 py-3 text-lg text-black font-semibold transition hover:brightness-110"
          style={{ backgroundColor: '#FFC107' }}
        >
          Explore Now
        </button>
      </div>

      {/* Right Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={main}
          alt="Hero"
          className="max-w-full h-auto rounded-[10px] shadow-lg"
        />
      </div>
    </div>
  );
};

export default HeroSection;
