import React from "react";
import { motion } from "framer-motion";
import characterImage from "../images/booknaru.png";

const AboutUs = () => {
  return (
    <section className="bg-[#121212] py-16 px-6 font-montserrat text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Text Content (Left Side) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 text-left"
        >
          <h2 className="text-3xl font-bold text-pink-400 mb-4"style={{ color: "#f3f3f3" }}>About Manga Zone</h2>
          <p className="text-base text-gray-300">
            Manga Zone is your digital manga destination. Read, rent, and enjoy manga with clean visuals and an immersive experience. Whether you're into action, romance, or slice-of-life, we’ve designed it all for manga fans like you.
          </p>
        </motion.div>

        {/* Character Image (Right Side) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 flex justify-center"
        >
          <img
            src={characterImage}
            alt="Manga Character"
            className="w-[250px] md:w-[320px] rounded-xl  hover:scale-105 transition-transform duration-300"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default AboutUs;
