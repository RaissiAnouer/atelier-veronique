import React, { useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Menu, Search, ShoppingBag, User, X, LogOut, Package, Settings } from "lucide-react";
import Title from "./Title";
import SidebarModal from "./SidebarModal";
import toast from "react-hot-toast";
import { assets, CATEGORIES } from "../assets/assets";
import CartModal from "./CartModal";
import SearchBar from "./SearchBar";
import OrdersModal from "./OrdersModal";
import ProfileModal from "./ProfileModal";

const Navbar = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [openOrdersModal, setOpenOrdersModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
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
              className="cursor-pointer flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
              onClick={() => {
                if (!user) {
                  navigate("/login");
                } else {
                  setShowDropdown(!showDropdown);
                }
              }}
            >
              <User className="text-gray-500 hover:text-gray-800 transition-colors" size={25} />
            </button>
            {user && showDropdown && (
              <div className="absolute right-0 top-full origin-top-right mt-4 w-64 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 transform transition-all duration-200 animate-in fade-in slide-in-from-top-2">
                <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white text-lg font-semibold shadow-inner shrink-0">
                    {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-semibold text-gray-800 truncate">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="text-xs text-gray-500 truncate">
                      {user.email}
                    </span>
                  </div>
                </div>
                
                <div className="py-2">
                  <button
                    onClick={() => {
                        setOpenOrdersModal(true);
                        setShowDropdown(false);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    <Package size={16} />
                    <span>My Orders</span>
                  </button>
                  <button
                    onClick={() => {
                        setOpenProfileModal(true);
                        setShowDropdown(false);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    <Settings size={16} />
                    <span>Profile Settings</span>
                  </button>
                </div>
                
                <div className="py-2 border-t border-gray-100 mt-1">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
                  >
                    <LogOut size={16} />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          <ShoppingBag
            onClick={() => {
              if (!user) {
                toast.error("Please login to access your cart");
                return;
              }
              setOpenCart(true);
            }}
            className="text-gray-500 cursor-pointer"
            size={25}
          />
        </div>

        {user && (
          <CartModal isOpen={openCart} onClose={() => setOpenCart(false)} />
        )}
        <SidebarModal
          isOpen={openSideMenu}
          onClose={() => setOpenSideMenu(false)}
        />
        <OrdersModal 
          isOpen={openOrdersModal} 
          onClose={() => setOpenOrdersModal(false)} 
        />
        <ProfileModal 
          isOpen={openProfileModal} 
          onClose={() => setOpenProfileModal(false)} 
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
