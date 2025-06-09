import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          About Manga Zone
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
          Manga Zone is your one-stop platform to read, rent, and enjoy your favorite manga titles online.
          We aim to make manga more accessible through a seamless and immersive digital experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
              Our Mission
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              To bring manga lovers a clean, fast, and feature-rich platform to enjoy and explore stories anytime, anywhere.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
              What We Offer
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              A wide range of manga, bookmarking, renting features, and smooth reading interface built with the latest tech.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
              Our Vision
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              To be the most reliable and user-friendly online manga platform for readers across the globe.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
