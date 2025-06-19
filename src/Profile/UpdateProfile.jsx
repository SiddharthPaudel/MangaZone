import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { GiNinjaHead, GiRobotGolem, GiMaskedSpider, GiSpikedDragonHead } from "react-icons/gi";

const avatarIcons = [
  { id: 1, icon: <GiNinjaHead className="text-4xl" />, label: "Ninja" },
  { id: 2, icon: <GiRobotGolem className="text-4xl" />, label: "Robot" },
  { id: 3, icon: <GiMaskedSpider className="text-4xl" />, label: "Spider" },
  { id: 4, icon: <GiSpikedDragonHead className="text-4xl" />, label: "Dragon" },
];

const UpdateProfile = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: "NarutoUzumaki",
    email: "naruto@example.com",
  });

  const [selectedAvatar, setSelectedAvatar] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarSelect = (id) => {
    setSelectedAvatar(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated with avatar " + selectedAvatar);
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center font-[Montserrat] pt-10 px-2 py-40">
      <div className="relative bg-[#1e1e1e] text-white rounded-xl shadow-lg w-full max-w-3xl flex overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <FaTimes size={20} />
        </button>

        {/* Left - Avatar Selection */}
        <div className="w-1/3 bg-[#181818] flex flex-col items-center justify-center p-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Choose Avatar</h3>
          <div className="grid grid-cols-2 gap-4">
            {avatarIcons.map((avatar) => (
              <button
                key={avatar.id}
                onClick={() => handleAvatarSelect(avatar.id)}
                className={`p-2 rounded-full border-2 transition ${
                  selectedAvatar === avatar.id ? "border-yellow-400" : "border-transparent"
                } hover:border-yellow-300`}
              >
                {avatar.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Right - Form */}
        <div className="w-2/3 p-8">
          <h2 className="text-2xl font-semibold mb-6 text-purple-400 text-center">
            Update Profile
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-semibold transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
