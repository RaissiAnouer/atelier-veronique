import { ArrowRightIcon, X } from "lucide-react";
import { assets, NAVIGATION } from "../assets/assets";
import { useState } from "react";

const SidebarModal = ({ isOpen, onClose }) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed z-50 top-0 bottom-0 left-0 w-96 bg-white overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col gap-12 p-7">
          <button onClick={onClose}>
            <X
              className="text-gray-500 hover:text-gray-800 cursor-pointer"
              size={25}
            />
          </button>

          <div className="flex flex-col divide-y divide-gray-300 text-sm">
            {NAVIGATION.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-4 cursor-pointer"
              >
                <p className="  text-gray-500 hover:text-gray-800 font-semibold transition">
                  {item.name}
                </p>

                <img src={assets.next} className=" w-3 h-3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarModal;
