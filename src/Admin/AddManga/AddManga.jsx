import React, { useState } from "react";

const AddManga = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isRentable: false,
    author: "",
    genre: "",
    coverImage: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // You will replace this with your Axios call
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <div className="max-w-3xl mx-auto bg-[#1e1e1e] p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Manga</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-500 px-4 py-2 rounded-lg text-white"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-500 px-4 py-2 rounded-lg text-white"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full bg-transparent border border-gray-500 px-4 py-2 rounded-lg text-white"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Genre (comma-separated)</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-500 px-4 py-2 rounded-lg text-white"
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isRentable"
              checked={formData.isRentable}
              onChange={handleChange}
              className="accent-yellow-400"
            />
            <label className="font-semibold">Is Rentable</label>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Cover Image</label>
            <input
              type="file"
              name="coverImage"
              onChange={handleChange}
              className="text-white"
              accept="image/*"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-lg"
          >
            Add Manga
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddManga;
