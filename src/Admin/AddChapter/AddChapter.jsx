import React from "react";

const AddChapter = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <div className="max-w-2xl mx-auto bg-[#1e1e1e] p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Chapter</h2>
        <form className="space-y-6">
          {/* Chapter Title */}
          <div>
            <label className="block font-semibold mb-1">Chapter Title</label>
            <input
              type="text"
              className="w-full bg-transparent border border-gray-500 px-4 py-2 rounded-lg text-white focus:outline-none"
              placeholder="Enter chapter name"
            />
          </div>

          {/* Zip File Upload */}
          <div>
            <label className="block font-semibold mb-1">Upload Zip File</label>
            <input
              type="file"
              accept=".zip"
              className="text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-black hover:file:bg-yellow-500"
            />
            <p className="text-sm text-gray-400 mt-1">
              Only .zip files containing chapter images are allowed.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-lg w-full"
          >
            Upload Chapter
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddChapter;
