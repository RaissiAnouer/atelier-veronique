import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import { assets } from "../assets/assets";
import PriceFilter from "./PriceFilter";

const FilterModal = ({ isOpen, onClose, onFilter }) => {
  const [categoryCount, setCategoryCount] = useState([]);
  const [fetchSizes, setFetchSizes] = useState([]);
  const [sizeFilter, setSizeFilter] = useState([]);
  const [category, setCategory] = useState([]);
  const [catToggle, setCatToggle] = useState(true);
  const [priceToggle, setPriceToggle] = useState(true);
  const [sizeToggle, setSizeToggle] = useState(true);
  const [range, setRange] = useState([0, 1000]);

  const filterProducts = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.FILTER, {
        params: {
          category: category,
          max: range[1],
          min: range[0],
          sizes: sizeFilter,
        },
      });
      if (response.status === 200) {
        onFilter(response.data);
        onClose();
        console.log("filtered products", response.data);
      }
    } catch (err) {
      console.error("Error filtering products:", err);
    }
  };
  useEffect(() => {
    if (isOpen) {
      const fetchSizeFilter = async () => {
        try {
          const response = await axiosConfig.get(API_ENDPOINTS.GETSIZEFILTER);
          if (response.status === 200) {
            setFetchSizes(response.data);
          }
        } catch (err) {
          console.log("error fetching size filters", err.message);
        }
      };
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
      fetchSizeFilter();
      fetchCategoryCount();
    }
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300  ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed z-50 top-0 bottom-0 right-0 w-full md:w-86 bg-white overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : " translate-x-full"}
        `}
      >
        <div className="flex flex-col gap-4 py-7 h-full relative">
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
          <p className="border-b border-gray-200 h-1 w-full relative"></p>

          <div className="flex flex-col font-semibold px-7 mb-24">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setCatToggle(!catToggle)}
            >
              <h2 className="text-[11px] text-gray-500 mt-4  tracking-[0.2em]  ">
                CATEGORY
              </h2>
              <img
                src={assets.arrowDown}
                className={`transform duration-300 transition-transform ${catToggle ? "rotate-180" : ""}`}
                alt=""
              />
            </div>

            {categoryCount.length === 0 ? (
              <p className="text-gray-400 text-sm">No categories found.</p>
            ) : (
              catToggle &&
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
            <p className="w-full h-[1px] bg-gray-200 my-4"></p>
            <div>
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setPriceToggle(!priceToggle)}
              >
                <h2 className="text-[11px] text-gray-500  tracking-[0.2em]  ">
                  PRICE
                </h2>
                <img
                  src={assets.arrowDown}
                  className={`transform duration-300 transition-transform ${priceToggle ? "rotate-180" : ""}`}
                  alt=""
                />
              </div>
              {priceToggle && <PriceFilter range={range} setRange={setRange} />}
            </div>
            <div>
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setSizeToggle(!sizeToggle)}
              >
                <h2 className="text-[11px] text-gray-500  tracking-[0.2em]  ">
                  SIZE
                </h2>
                <img
                  src={assets.arrowDown}
                  className={`transform duration-300 transition-transform ${sizeToggle ? "rotate-180" : ""}`}
                  alt=""
                />
              </div>
              {fetchSizes.length === 0 ? (
                <p className="text-gray-400 text-sm">No size filters found.</p>
              ) : (
                sizeToggle &&
                fetchSizes.map((siz) => {
                  const isSizeSelected = sizeFilter.includes(siz.size);
                  return (
                    <div key={siz.size} className="flex py-1 gap-1">
                      <button
                        onClick={() => {
                          if (isSizeSelected) {
                            setSizeFilter(
                              sizeFilter.filter((s) => s !== siz.size),
                            );
                          } else {
                            setSizeFilter([...sizeFilter, siz.size]);
                          }
                        }}
                        className={`flex text-sm gap-2  cursor-pointer ${isSizeSelected ? "text-gray-800 " : "text-gray-400  "}   `}
                      >
                        <span
                          className={` transition-all duration-300 transform ${isSizeSelected ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
                        >
                          •
                        </span>
                        <span>{siz.size}</span>
                        <span
                          className={` text-sm  ${isSizeSelected ? " text-gray-800" : "text-gray-400"} `}
                        >
                          ({siz.count})
                        </span>
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full p-7 bg-white border-t border-gray-100">
            <button
              onClick={() => filterProducts()}
              className="w-full py-4 bg-gray-800 text-white text-xs md:text-sm tracking-[0.2em] cursor-pointer"
            >
              VIEW RESULTS
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterModal;
