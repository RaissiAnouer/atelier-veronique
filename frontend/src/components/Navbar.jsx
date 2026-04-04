import React, { useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import Title from "./Title";
import SidebarModal from "./SidebarModal";
import { assets, CATEGORIES } from "../assets/assets";
import CartModal from "./CartModal";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const dropdownRef = useRef(null);

  const { user, clearUser, openCart, setOpenCart } = useContext(AppContext);
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
    <>
      {user?.role?.toLowerCase() === "admin" && (
        <div className="bg-gray-900 text-white text-[10px] py-1 px-4 flex justify-between items-center tracking-tighter">
          <span>ADMIN MODE</span>
          <button
            onClick={() => navigate("/admin")}
            className="underline hover:text-gray-300"
          >
            Go to Dashboard →
          </button>
        </div>
      )}
      <div className="relative flex items-center justify-between md:justify-between bg-white z-40 sticky top-0 px-4 py-4  md:px-12 md:py-7">
        <div className="flex items-center gap-6 shrink-0">
          <button onClick={() => setOpenSideMenu(true)}>
            {openSideMenu ? (
              <X className="text-2xl text-gray-500 cursor-pointer" />
            ) : (
              <Menu className="text-2xl text-gray-500 cursor-pointer" />
            )}
          </button>

          {/* <div className=" items-center gap-6 hidden md:flex">
            <div className="relative group  ">
              <p
                className="text-md font-semibold text-gray-400 group-hover:text-gray-800  cursor-pointer"
                onClick={() => navigate("/collection")}
              >
                Collection
              </p>
              <div className="absolute top-full  font-semibold opacity-0 invisible translate-y-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 w-[160px] border border-gray-200 bg-white  px-5 py-4 text-sm space-y-3 font-medium text-[14px] ">
                {CATEGORIES.map((item, index) => (
                  <div key={index}>
                    <div className="relative group/top">
                      <div className="flex justify-between  items-center">
                        <p
                          key={index}
                          className="cursor-pointer"
                          onClick={() => navigate(item.path)}
                        >
                          {item.title}
                        </p>
                        {item.subItems && item.subItems.length > 0 && (
                          <img src={assets.next} className="w-2 h-2" alt="" />
                        )}
                      </div>
                      {item.subItems && item.subItems.length > 0 && (
                        <div className="absolute left-full px-5 top-0 opacity-0 invisible translate-x-2 transition-all duration-300 ease-out group-hover/top:opacity-100 group-hover/top:visible group-hover/bottom:translate-x-0 w-[160px] border border-gray-200 bg-white px-5 py-4 text-sm space-y-3 font-medium text-[14px]">
                          {item.subItems.map((subItem, subIndex) => (
                            <p
                              key={subIndex}
                              className="cursor-pointer"
                              onClick={() => navigate(subItem.path)}
                            >
                              {subItem.name}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-md font-semibold text-gray-400 hover:text-gray-800 cursor-pointer">
              About
            </p>
            <p className="text-md font-semibold text-gray-400 hover:text-gray-800 cursor-pointer">
              Contact
            </p>
          </div>
          */}
        </div>

        <div
          className="absolute left-1/2 -translate-x-1/2 text-center leading-tight  cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <h3 className="text-xs md:text-sm text-gray-500 mb-[-10px]">
            ATELIER
          </h3>
          <h1 className="text-lg md:text-2xl font-bold text-gray-600">
            VERONIQUE
          </h1>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          {user?.role?.toLowerCase() === "admin" && (
            <button
              onClick={() => navigate("/admin")}
              className="ml-2 px-3 py-1 text-xs tracking-widest uppercase border border-gray-300 text-gray-500 hover:bg-gray-800 hover:text-white transition-all duration-300 rounded-sm"
            >
              Admin Panel
            </button>
          )}
          <button onClick={() => setOpenSearchBar(!openSearchBar)}>
            <Search className="text-gray-500 cursor-pointer" size={25} />
          </button>
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
          <ShoppingBag
            onClick={() => setOpenCart(true)}
            className="text-gray-500 cursor-pointer"
            size={25}
          />
        </div>
        <CartModal isOpen={openCart} onClose={() => setOpenCart(false)} />

        <SidebarModal
          isOpen={openSideMenu}
          onClose={() => setOpenSideMenu(false)}
        />
      </div>

      <SearchBar
        isOpen={openSearchBar}
        onClose={() => setOpenSearchBar(false)}
      />
    </>
  );
};

export default Navbar;
