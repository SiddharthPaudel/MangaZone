import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { GiNinjaHead, GiRobotGolem, GiMaskedSpider, GiSpikedDragonHead } from "react-icons/gi";
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from "../ContextAPI/Auth";
import { useNavigate } from "react-router-dom";
import Avatar1 from "../icons/a1.png"; // Add your avatar images
import Avatar2 from "../icons/a2.png";
import Avatar3 from "../icons/a3.png";
import Avatar4 from "../icons/a4.png";
import Avatar5 from "../icons/a5.png";
import Avatar6 from "../icons/a6.png";


const avatarIcons = [
  { 
    id: 1, 
    icon: <img src={Avatar1} alt="Ninja Avatar" className="w-12 h-12 rounded-full object-cover" />, 
    label: "Naruto" 
  },
  { 
    id: 2, 
    icon: <img src={Avatar2} alt="Robot Avatar" className="w-12 h-12 rounded-full object-cover" />, 
    label: "Sasuke" 
  },
  { 
    id: 3, 
    icon: <img src={Avatar3} alt="Spider Avatar" className="w-12 h-12 rounded-full object-cover" />, 
    label: "kakashi" 
  },
  { 
    id: 4, 
    icon: <img src={Avatar4} alt="Dragon Avatar" className="w-12 h-12 rounded-full object-cover" />, 
    label: "Sakura" 
  },
   { 
    id: 5, 
    icon: <img src={Avatar5} alt="Dragon Avatar" className="w-12 h-12 rounded-full object-cover" />, 
    label: "Hinata" 
  },
   { 
    id: 6, 
    icon: <img src={Avatar6} alt="Dragon Avatar" className="w-12 h-12 rounded-full object-cover" />, 
    label: "Luffy" 
  }
];

const UpdateProfile = ({ onClose }) => {
  const { user, token, updateUserProfile } = useAuth(); // Use the custom hook directly
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [selectedAvatar, setSelectedAvatar] = useState(1);
  const [updating, setUpdating] = useState(false);
   const handleClose = () => navigate("/");
  // Set form data from context user data
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.name || "",
        email: user.email || "",
      });
      setSelectedAvatar(user.avatar || 1);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarSelect = (id) => {
    setSelectedAvatar(id);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setUpdating(true);

  try {
const response = await fetch(`http://localhost:5000/api/auth/update/${user.id || user._id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    name: formData.username,
    email: formData.email,
    avatar: selectedAvatar,
  }),
});




    // Check if response is ok before trying to parse JSON
    if (!response.ok) {
      // Handle different HTTP status codes
      if (response.status === 404) {
        throw new Error('API endpoint not found. Please check your server configuration.');
      } else if (response.status === 403) {
        throw new Error('Unauthorized to update this profile.');
      } else if (response.status === 500) {
        throw new Error('Server error. Please try again later.');
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    // Check if response has content before parsing JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server did not return JSON response');
    }

    const data = await response.json();

    // Update user data in context
    if (updateUserProfile) {
      updateUserProfile({
        ...user,
        name: formData.username,
        email: formData.email,
        avatar: selectedAvatar,
      });
    }
    
    toast.success('Profile updated successfully! 🎉', {
      duration: 3000,
      style: {
        background: '#10B981',
        color: '#fff',
      },
    });
    
  <button
  onClick={() => {
    if (onClose) onClose();
    console.log("bnutton presses")
    navigate('/');
  }}
  className="absolute top-4 right-4 text-gray-400 hover:text-white"
>
  <FaTimes size={20} />
</button>


  } catch (error) {
    console.error('Error updating profile:', error);
    
    // Show specific error message
    const errorMessage = error.message.includes('fetch') 
      ? 'Network error. Please check your connection.' 
      : error.message;
      
    toast.error(errorMessage || 'Failed to update profile. Please try again.');
  } finally {
    setUpdating(false);
  }
};

  if (!user) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-white">Loading user data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center font-[Montserrat] pt-10 px-2 py-40">
      {/* <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1e1e1e',
            color: '#fff',
            border: '1px solid #374151',
          },
        }}
      /> */}
      <div className="relative bg-[#1e1e1e] text-white rounded-xl shadow-lg w-full max-w-3xl flex overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
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
                disabled={updating}
              >
                {avatar.icon}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            {avatarIcons.find(a => a.id === selectedAvatar)?.label}
          </p>
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
                disabled={updating}
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
                disabled={updating}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={updating}
            >
              {updating ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;