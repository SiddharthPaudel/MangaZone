import Logo from "../images/mainlogo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
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
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ProfileIcon from "../icons/profileIcon.png";
import BookmarkIcon from "../icons/book6.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

        {/* Profile Dropdown */}
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end gap-4">
  {/* Bookmark Icon (left of profile) */}
  <Link to="/bookmark">
    <img
      src={BookmarkIcon}
      alt="Bookmarks"
      className="h-9 w-9 hover:opacity-80 transition"
    />
  </Link>

  {/* Profile Icon (farthest right) */}
  <Popover className="relative">
    <PopoverButton className="text-white hover:text-gray-300">
      <img
        src={ProfileIcon}
        alt="Profile"
        className="h-9 w-9 rounded-full border-2 border-white object-cover"
      />
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
        <button className="w-full text-left px-4 py-2 hover:bg-gray-700">
          Logout
        </button>
      </div>
    </PopoverPanel>
  </Popover>
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
              >
                Home
              </Link>
              <Link
                to="/bookmark"
                className="block rounded-lg px-3 py-2 font-semibold text-white hover:bg-gray-700"
              >
                AboutUs
              </Link>
              <Link
                to="/products"
                className="block rounded-lg px-3 py-2 font-semibold text-white hover:bg-gray-700"
              >
                Manga
              </Link>
              <Link
                to="/productsdetails"
                className="block rounded-lg px-3 py-2 font-semibold text-white hover:bg-gray-700"
              >
                Upcoming
              </Link>
            </div>
            <div className="py-6">
              <Link
                to="/signUp"
                className="block rounded-lg px-3 py-2.5 font-semibold text-white hover:bg-gray-700"
              >
                Join Us
              </Link>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;
