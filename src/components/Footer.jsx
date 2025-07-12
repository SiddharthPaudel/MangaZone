import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-[#121212] text-gray-300 py-12 px-6 font-montserrat">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-bold text-400 mb-2"style={{ color: '#FFC107' }}>Manga Zone</h2>
          <p className="text-sm text-gray-400">
            Your go-to hub for all manga lovers. Enjoy reading with smooth visuals and a rich interface.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/explore" className="hover:text-yellow-400">Explore</a></li>
            <li><a href="/bookmark" className="hover:text-yellow-400">Bookmarks</a></li>
            <li><a href="/account" className="hover:text-yellow-400">My Account</a></li>
            <li><a href="/contact" className="hover:text-yellow-400">Contact</a></li>
          </ul>
        </div>

        {/* Do You Need Help? */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Do You Need Help?</h3>
          <p className="text-sm text-gray-400 mb-2">
            We're here for you! If you're facing issues or have questions, reach out anytime.
          </p>
          <Link
            to="/support"
            className="inline-block mt-2 text-400 hover:underline text-sm"style={{ color: '#FFC107' }}
          >
            Visit Support Page →
          </Link>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Connect</h3>
          <p className="text-sm text-gray-400 mb-2">Follow us on:</p>
          <div className="flex space-x-4 text-sm">
            <a href="#" className="hover:text-pink-400">Facebook</a>
            <a href="#" className="hover:text-pink-400">Instagram</a>
            <a href="#" className="hover:text-pink-400">Twitter</a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-10">
        © {new Date().getFullYear()} Manga Zone. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
