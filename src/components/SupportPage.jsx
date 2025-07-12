import React from "react";
import { BookOpen, Bookmark, HelpCircle } from "lucide-react";
import esewa from "../images/esewa.png"; // ✅ eSewa logo

const guides = [
  {
    icon: <BookOpen size={28} className="text-yellow-400" />,
    title: "How to Read Manga",
    description:
      "Go to the Explore page, select a manga, and click on a chapter. Navigate pages using arrows or swipe gestures.",
  },
  {
    icon: <Bookmark size={28} className="text-yellow-400" />,
    title: "How to Rent Manga",
    description:
      "Login to your account, visit any manga page, and click the 'Rent' button. Choose duration and confirm to start reading.",
  },
  {
    icon: (
      <img
        src={esewa}
        alt="eSewa"
        className="w-7 h-7 object-contain" // ✅ custom logo icon size
      />
    ),
    title: "How to Pay with eSewa",
    description:
      "On checkout, select eSewa as your payment method. Follow on-screen instructions to complete the secure transaction.",
  },
  {
    icon: <HelpCircle size={28} className="text-yellow-400" />,
    title: "Need More Help?",
    description:
      "Visit the Contact page to reach our support team or email us for any questions or issues you encounter.",
  },
];

const SupportPage = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-gray-300 px-4 py-12 font-montserrat">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 mb-10 text-center">
          📚 Support & Guides
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {guides.map((guide, index) => (
            <div
              key={index}
              className="bg-[#1e1e1e] border border-gray-700 rounded-2xl p-6 shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-[#2a2a2a] flex items-center justify-center w-12 h-12">
                  {guide.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2 text-purple-400">
                    {guide.title}
                  </h2>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {guide.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Manga Zone • We're here to help!
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
