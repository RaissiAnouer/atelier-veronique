import React, { useState } from "react";
import { ArrowBigLeft, ArrowRightIcon, Minus, Plus, X } from "lucide-react";
import { assets, SIDEBAR_NAVIGATION } from "../assets/assets";
import { set } from "@cloudinary/url-gen/actions/variable";
import { useNavigate } from "react-router-dom";

export const SecondSIdeBar = ({
  isOpen,
  onClose,
  content,
  title,
  onCloseAll,
}) => {
  const [openSubItem, setOpenSubItem] = useState({});
  const toggleSubItem = (index) => {
    setOpenSubItem((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
    onCloseAll();
    setOpenSubItem({});
  };
  return (
    <>
      <div
        className={`fixed z-50 md:z-40 top-0 bottom-0 left-0 w-full md:w-85 bg-white border-l border-gray-200 overflow-y-auto
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0 md:translate-x-96" : "-translate-x-full"}
  `}
      >
        <div
          className={`flex flex-col p-7 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"} transition-opacity duration-300 delay-300`}
        >
          <div className="flex items-center  border-b border-gray-200 text-center my-8 ">
            <button onClick={onClose}>
              <img
                src={assets.arrowDown}
                className="rotate-90 hover:text-gray-800 cursor-pointer w-3 h-3"
                alt=""
              />
            </button>
            <h2 className=" w-full text-gray-500  pb-4  ">{title}</h2>
          </div>
          <div className={`flex flex-col divide-y divide-gray-300 text-sm  `}>
            {content.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => {
                    item.path === ""
                      ? toggleSubItem(index)
                      : handleNavigation(item.path);
                  }}
                  className="w-full uppercase flex justify-between items-center py-4 cursor-pointer"
                >
                  <p className="  text-gray-800 font-light transition">
                    {item.title}
                  </p>
                  {item.subItems?.length > 0 && (
                    <div
                      className={` transition-transform duration-300 ${openSubItem[index] ? "rotate-180" : "rotate-0"}  `}
                    >
                      {openSubItem[index] ? (
                        <Minus className="h-3 w-3 text-gray-500 " />
                      ) : (
                        <Plus className="h-3 w-3 text-gray-500 " />
                      )}
                    </div>
                  )}
                </button>
                <div className="flex flex-col    ">
                  {item.subItems?.length > 0 && (
                    <div
                      className={`border-l pl-6 border-gray-200 flex flex-col gap-4  transition-all duration-300 
  ${openSubItem[index] ? "opacity-100 max-h-40 mb-10" : "opacity-0 max-h-0 overflow-hidden"}
`}
                    >
                      {item.subItems.map((subItem, subIndex) => (
                        <p
                          key={subIndex}
                          onClick={() => handleNavigation(subItem.path)}
                          className="text-gray-800 hover:text-gray-400 cursor-pointer text-sm uppercase transition"
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
      </div>
    </>
  );
};
export default SecondSIdeBar;
