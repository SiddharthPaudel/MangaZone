import { useParams } from "react-router-dom";
import { FaBookmark, FaCommentDots, FaInfoCircle } from "react-icons/fa";
import manga1 from "../images/0.webp";
import manga2 from "../images/1.webp";
import manga3 from "../images/2.webp";
import manga4 from "../images/3.webp";

const dummyPages = [
  { image: manga1 },
  { image: manga2 },
  { image: manga3 },
  { image: manga4 },
];

const dummyInfo = {
  title: "Sakamoto Days",
};

const MangaReader = () => {
  const { id } = useParams();

  return (
    <div className="flex bg-[#121212] min-h-screen text-white">
      {/* Sticky Sidebar */}
      <aside className="w-64 p-6 bg-[#1e1e1e] hidden md:flex flex-col sticky top-0 h-screen">
        <h2 className="text-xl font-semibold mb-6">{dummyInfo.title}</h2>

        <div className="flex flex-col gap-4">
          <button className="flex items-center gap-2 bg-[#2a2a2a] p-2 rounded hover:bg-[#3a3a3a]">
            <FaCommentDots /> <span>Comments</span>
          </button>
          <button className="flex items-center gap-2 bg-[#2a2a2a] p-2 rounded hover:bg-[#3a3a3a]">
            <FaInfoCircle /> <span>Info</span>
          </button>
          <button className="flex items-center gap-2 bg-[#2a2a2a] p-2 rounded hover:bg-[#3a3a3a]">
            <FaBookmark /> <span>Bookmark</span>
          </button>
        </div>
      </aside>

      {/* Manga Pages */}
      <main className="flex-1 p-4 space-y-6 overflow-auto">
        {dummyPages.map((page, idx) => (
          <img
            key={idx}
            src={page.image}
            alt={`Page ${idx + 1}`}
            className="w-full max-w-4xl mx-auto rounded shadow-md"
          />
        ))}
      </main>
    </div>
  );
};

export default MangaReader;
