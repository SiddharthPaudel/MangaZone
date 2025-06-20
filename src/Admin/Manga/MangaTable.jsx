import React, { useState } from "react";

const MangaTable = () => {
  const [mangaList, setMangaList] = useState([
    {
      id: 1,
      title: "Naruto",
      author: "Masashi Kishimoto",
      genre: ["Action", "Adventure"],
      isRentable: true,
    },
    {
      id: 2,
      title: "One Piece",
      author: "Eiichiro Oda",
      genre: ["Adventure", "Fantasy"],
      isRentable: false,
    },
    {
      id: 3,
      title: "Jujutsu Kaisen",
      author: "Gege Akutami",
      genre: ["Dark Fantasy", "Action"],
      isRentable: true,
    },
  ]);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedManga, setSelectedManga] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isRentable: true,
  });

  const handleUpdateClick = (manga) => {
    setSelectedManga(manga);
    setFormData({
      title: manga.title,
      author: manga.author,
      genre: manga.genre.join(", "),
      isRentable: manga.isRentable,
    });
    setIsUpdateModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleUpdateSubmit = () => {
    if (!formData.title || !formData.author || !formData.genre) {
      alert("Please fill in all fields");
      return;
    }
    
    const updatedManga = {
      ...selectedManga,
      title: formData.title,
      author: formData.author,
      genre: formData.genre.split(",").map(g => g.trim()).filter(g => g),
      isRentable: formData.isRentable,
    };

    setMangaList(prev => 
      prev.map(manga => 
        manga.id === selectedManga.id ? updatedManga : manga
      )
    );

    setIsUpdateModalOpen(false);
    setSelectedManga(null);
    setFormData({ title: "", author: "", genre: "", isRentable: true });
  };

  const handleCloseModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedManga(null);
    setFormData({ title: "", author: "", genre: "", isRentable: true });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this manga?")) {
      setMangaList(prev => prev.filter(manga => manga.id !== id));
    }
  };

  return (
    <div className="min-h-screen p-8 bg-[#121212] text-white font-[Montserrat]">
      <div className="bg-[#1e1e1e] p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">All Manga</h2>

        <div className="overflow-x-auto rounded-xl border border-gray-700">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#2c2c2c] text-gray-400 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-3 border-b border-gray-700">Title</th>
                <th className="px-6 py-3 border-b border-gray-700">Author</th>
                <th className="px-6 py-3 border-b border-gray-700">Genre</th>
                <th className="px-6 py-3 border-b border-gray-700">Rentable</th>
                <th className="px-6 py-3 border-b border-gray-700 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-200 divide-y divide-gray-700">
              {mangaList.map((manga) => (
                <tr key={manga.id} className="hover:bg-[#232323] transition">
                  <td className="px-6 py-4">{manga.title}</td>
                  <td className="px-6 py-4">{manga.author}</td>
                  <td className="px-6 py-4">{manga.genre.join(", ")}</td>
                  <td className="px-6 py-4">
                    {manga.isRentable ? (
                      <span className="text-green-400">Yes</span>
                    ) : (
                      <span className="text-red-400">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <button 
                      onClick={() => handleUpdateClick(manga)}
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md text-xs transition"
                    >
                      Update
                    </button>
                    <button 
                      onClick={() => handleDelete(manga.id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-xs transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {mangaList.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center px-6 py-6 text-gray-500"
                  >
                    No manga records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1e1e1e] p-6 rounded-2xl w-full max-w-md mx-4 border border-gray-700">
            <h3 className="text-xl font-bold mb-4">Update Manga</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-[#2c2c2c] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-[#2c2c2c] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Genre (comma-separated)
                </label>
                <input
                  type="text"
                  name="genre"
                  value={formData.genre}
                  onChange={handleInputChange}
                  placeholder="Action, Adventure, Fantasy"
                  className="w-full px-3 py-2 bg-[#2c2c2c] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isRentable"
                  checked={formData.isRentable}
                  onChange={handleInputChange}
                  className="mr-2 w-4 h-4 text-blue-600 bg-[#2c2c2c] border-gray-600 rounded focus:ring-blue-500"
                />
                <label className="text-sm font-medium">Rentable</label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleUpdateSubmit}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-md transition"
                >
                  Update
                </button>
                <button
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 px-4 rounded-md transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MangaTable;