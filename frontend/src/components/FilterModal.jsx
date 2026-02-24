import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";

const FilterModal = ({ isOpen, onClose }) => {
  const [categoryCount, setCategoryCount] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const fetchCategoryCount = async () => {
        try {
          const response = await axiosConfig.get(API_ENDPOINTS.GETCOUNT);
          if (response.status === 200) {
            setCategoryCount(response.data);
          }
        } catch (err) {
          console.log("error fetching category counts", err.message);
        }
      };
      fetchCategoryCount();
    }
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed z-50 top-0 bottom-0 right-0 w-96 bg-white overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : " translate-x-full"}
        `}
      >
        <div className="flex flex-col gap-4 py-7">
          <div className="flex justify-between items-center px-7">
            <h2 className="text-md text-gray-600 text-center tracking-[0.3em] font-semibold ">
              FILTERS
            </h2>
            <button onClick={onClose}>
              <X
                className="text-gray-500 hover:text-gray-800 cursor-pointer"
                size={25}
              />
            </button>
          </div>
          <p className="border-b border-gray-200 h-1 w-full"></p>

          <div className="flex flex-col  font-semibold px-7">
            <h2 className="text-[11px] text-gray-500 my-4  tracking-[0.2em]  ">
              CATEGORY
            </h2>
            {categoryCount.length === 0 ? (
              <p className="text-gray-400 text-sm">No categories found.</p>
            ) : (
              categoryCount.map((cat) => {
                const isSelected = category.includes(cat.category);
                return (
                  <div key={cat.category} className="flex py-1 gap-1">
                    <button
                      onClick={() => {
                        if (isSelected) {
                          setCategory(
                            category.filter((c) => c !== cat.category),
                          );
                        } else {
                          setCategory([...category, cat.category]);
                        }
                      }}
                      className={`flex text-sm gap-2  cursor-pointer ${isSelected ? "text-gray-800 " : "text-gray-400  "}   `}
                    >
                      <span
                        className={` transition-all duration-300 transform ${isSelected ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
                      >
                        •
                      </span>
                      <span>{cat.category}</span>
                      <span
                        className={` text-sm  ${isSelected ? " text-gray-800" : "text-gray-400"} `}
                      >
                        ({cat.count})
                      </span>
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterModal;
