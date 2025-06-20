import React from "react";

const MangaTable = () => {
  const mangaList = [
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
  ];

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
                    <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md text-xs">
                      Update
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-xs">
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
    </div>
  );
};

export default MangaTable;
