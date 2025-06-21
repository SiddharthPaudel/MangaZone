import Logo from "../images/mainlogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../ContextAPI/Auth";
import toast from 'react-hot-toast'; // ✅ Import React Hot Toast
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import {
  GiNinjaHead,
  GiRobotGolem,
  GiMaskedSpider,
  GiSpikedDragonHead,
} from "react-icons/gi";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ProfileIcon from "../icons/profileIcon.png";
import BookmarkIcon from "../icons/book6.png";
const avatarIcons = {
  1: <GiNinjaHead className="h-9 w-9 text-white" />,
  2: <GiRobotGolem className="h-9 w-9 text-white" />,
  3: <GiMaskedSpider className="h-9 w-9 text-white" />,
  4: <GiSpikedDragonHead className="h-9 w-9 text-white" />,
};


const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // ✅ For navigation after logout
  
  const { user, logout } = useAuth(); // ✅ from context
  console.log("User in header:", user);

  // ✅ Enhanced logout function with toast notifications
  const handleLogout = () => {
    // Show loading toast
    const loadingToast = toast.loading('Logging out...', {
      style: {
        borderRadius: '12px',
        background: '#1e1e1e',
        color: '#fff',
        border: '1px solid #8b5cf6',
      },
    });

    try {
      // Call the logout function from context
      logout();
      
      // Show success toast
      toast.success('Successfully logged out! See you next time! 👋', {
        id: loadingToast, // Replaces the loading toast
        duration: 4000,
        style: {
          borderRadius: '12px',
          background: '#1e1e1e',
          color: '#fff',
          border: '1px solid #10b981',
        },
        iconTheme: {
          primary: '#10b981',
          secondary: '#1e1e1e',
        },
      });

      // Navigate to home page after logout
      setTimeout(() => {
        navigate('/');
        setMobileMenuOpen(false); // Close mobile menu if open
      }, 1500);

    } catch (error) {
      // Show error toast if logout fails
      toast.error('Logout failed. Please try again.', {
        id: loadingToast,
        duration: 4000,
        style: {
          borderRadius: '12px',
          background: '#1e1e1e',
          color: '#fff',
          border: '1px solid #ef4444',
        },
        iconTheme: {
          primary: '#ef4444',
          secondary: '#1e1e1e',
        },
      });
    }
  };

  return (
    <header style={{ backgroundColor: "#121212" }}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 font-montserrat">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <div className="flex items-center space-x-3 pl-0 ml-0">
              <img
                alt="Site Logo"
                src={Logo}
                className="h-10 w-auto object-contain"
              />
              <span className="text-base font-semibold text-white">
                Manga Zone
              </span>
            </div>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon
              aria-hidden="true"
              className="size-6"
              style={{ color: "#f3f3f3" }}
            />
          </button>
        </div>

        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Link
            to="/"
            className="text-base font-semibold"
            style={{ color: "#F3F3F3" }}
          >
            Home
          </Link>
          <Link
            to="/bookmark"
            className="text-base font-semibold"
            style={{ color: "#F3F3F3" }}
          >
            AboutUs
          </Link>
          <Link
            to="/products"
            className="text-base font-semibold"
            style={{ color: "#F3F3F3" }}
          >
            Manga
          </Link>
          <Link
            to="/productsdetails"
            className="text-base font-semibold"
            style={{ color: "#F3F3F3" }}
          >
            Upcoming
          </Link>
        </PopoverGroup>

        {/* 🔁 Conditional Rendering (Desktop view) */}
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end gap-4">
          {user ? (
            <>
              {/* ✅ Bookmark icon always visible */}
              <Link to="/bookmark">
                <img
                  src={BookmarkIcon}
                  alt="Bookmarks"
                  className="h-9 w-9 hover:opacity-80 transition"
                />
              </Link>

              {/* ✅ Profile icon, dropdown only on click */}
              <Popover className="relative">
                <PopoverButton className="flex items-center space-x-1 text-white hover:text-gray-300 focus:outline-none">
                  <div className="relative group">
                    <div className="h-9 w-9 rounded-full border-2 border-white bg-gray-800 flex items-center justify-center">
  {avatarIcons[user?.avatar] || <GiNinjaHead className="h-6 w-6 text-white" />}
</div>
                    {user?.name && (
                      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg z-50 whitespace-nowrap">
                        {user.name}
                      </div>
                    )}
                  </div>
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                </PopoverButton>
                <PopoverPanel className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-[#1e1e1e] shadow-lg ring-1 ring-white/10 focus:outline-none">
                  <div className="py-1 text-sm text-white">
                    <Link
                      to="/updateProfile"
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      Update Profile
                    </Link>
                    <Link
                      to="/bookmark"
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      Bookmarks
                    </Link>
                    <Link
                      to="/rentdetails"
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      Rent Details
                    </Link>
                    <button
                      onClick={handleLogout} // ✅ Updated to use new logout handler
                      className="w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </PopoverPanel>
              </Popover>
            </>
          ) : (
            // 👇 Show Join Us when not logged in
            <Link
              to="/signUp"
              className="text-sm font-semibold text-white hover:text-gray-300"
            >
              Join Us <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[#1C1C1C] px-6 py-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <div className="flex items-center space-x-2 pl-0 ml-0">
                <img
                  alt="Site Logo"
                  src={Logo}
                  className="h-8 w-auto object-contain"
                />
                <span className="text-sm font-semibold text-white">
                  Manga Zone
                </span>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          <div className="mt-6 divide-y divide-gray-700">
            <div className="flex flex-col space-y-4 py-6">
              <Link
                to="/"
                className="block rounded-lg px-3 py-2 font-semibold text-white hover:bg-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/bookmark"
                className="block rounded-lg px-3 py-2 font-semibold text-white hover:bg-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                AboutUs
              </Link>
              <Link
                to="/products"
                className="block rounded-lg px-3 py-2 font-semibold text-white hover:bg-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Manga
              </Link>
              <Link
                to="/productsdetails"
                className="block rounded-lg px-3 py-2 font-semibold text-white hover:bg-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Upcoming
              </Link>
            </div>
            
            {/* ✅ Mobile menu user section */}
            <div className="py-6">
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 px-3">
                    <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-800 flex items-center justify-center">
  {avatarIcons[user?.avatar] || <GiNinjaHead className="h-5 w-5 text-white" />}
</div>

                    <span className="text-white font-semibold">
                      {user.name || 'User'}
                    </span>
                  </div>
                  <Link
                    to="/updateProfile"
                    className="block rounded-lg px-3 py-2 font-semibold text-white hover:bg-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Update Profile
                  </Link>
                  <Link
                    to="/bookmark"
                    className="block rounded-lg px-3 py-2 font-semibold text-white hover:bg-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Bookmarks
                  </Link>
                  <Link
                    to="/rentdetails"
                    className="block rounded-lg px-3 py-2 font-semibold text-white hover:bg-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Rent Details
                  </Link>
                  <button
                    onClick={handleLogout} // ✅ Same logout handler for mobile
                    className="w-full text-left rounded-lg px-3 py-2 font-semibold text-white hover:bg-gray-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/signUp"
                  className="block rounded-lg px-3 py-2.5 font-semibold text-white hover:bg-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Join Us
                </Link>
              )}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;