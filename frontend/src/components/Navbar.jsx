import React, { useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import Title from "./Title";
import SidebarModal from "./SidebarModal";

const Navbar = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { user, clearUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    setShowDropdown(false);
    navigate("/login");
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="relative flex items-center justify-between md:justify-between bg-white z-30 sticky top-0 px-4 py-4  md:px-12 md:py-7">
      <div className="flex items-center gap-6 shrink-0">
        <button onClick={() => setOpenSideMenu(!openSideMenu)}>
          {openSideMenu ? (
            <X className="text-2xl text-gray-500 cursor-pointer" />
          ) : (
            <Menu className="text-2xl text-gray-500 cursor-pointer" />
          )}
        </button>
        <div className=" items-center gap-6 hidden md:flex">
          <p className="text-xl font-semibold text-gray-400 hover:text-gray-800 cursor-pointer">
            Collection
          </p>
          <p className="text-xl font-semibold text-gray-400 hover:text-gray-800 cursor-pointer">
            About
          </p>
          <p className="text-xl font-semibold text-gray-400 hover:text-gray-800 cursor-pointer">
            Contact
          </p>
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 text-center leading-tight  cursor-pointer">
        <h3 className="text-xs md:text-sm text-gray-500 mb-[-10px]">ATELIER</h3>
        <h1 className="text-lg md:text-2xl font-bold text-gray-600">
          VERONIQUE
        </h1>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <Search className="text-gray-500 cursor-pointer" size={25} />
        <div className="relative" ref={dropdownRef}>
          <button
            className="cursor-pointer flex items-center justify-center"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <User className="text-gray-500 " size={25} />
          </button>
          {showDropdown && (
            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white border-1 border-gray-400 rounded-md shadow-lg py-1 z-50">
              <button
                className="block px-4 py-2 text-sm text-gray-400 cursor-pointer hover:text-gray-800 w-full text-left"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <ShoppingBag className="text-gray-500 cursor-pointer" size={25} />
      </div>

      <SidebarModal
        isOpen={openSideMenu}
        onClose={() => setOpenSideMenu(false)}
        children={["collection", "made-to-mesure", "gifts card", "style guide"]}
      />
    </div>
  );
};

export default Navbar;
