import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { assets, inventory } from "../assets/assets";
import ProductItems from "../components/ProductItems";
import FilterModal from "../components/FilterModal";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Collections = () => {
  const [openSortBy, setOpenSortBy] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [collection, setCollection] = useState([]);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/collection/${id}`);
  };

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await axiosConfig.get(API_ENDPOINTS.GETCOLLECTION);

        if (response.status === 200) {
          setCollection(response.data);
        }
      } catch (err) {
        toast.error(
          err.response?.data?.message ||
            err.message ||
            "Error fetching collection",
        );
        console.error(
          "Error updating category",
          err.response?.data?.message || err.message,
        );
      }
    };
    fetchCollection();
  }, []);

  return (
    <div className="mb-6">
      <Navbar />
      <h2 className="text-md mt-6 text-gray-600 text-center tracking-[0.3em] font-semibold">
        COLLECTION
      </h2>
      <div className="w-full relative py-3 border-y border-gray-200 mt-3 flex items-center">
        <p className="absolute left-1/2 -translate-x-1/2 text-center text-xs text-gray-400 text-xs">
          {collection.length} PRODUCTS
        </p>

        <button
          onClick={() => setOpenSortBy(!openSortBy)}
          className="flex items-center ml-auto  cursor-pointer gap-2 mr-8"
        >
          <p className=" text-xs text-gray-400 hover:text-gray-600">SORT BY</p>
          <img
            src={assets.arrowDown}
            className={`transition-transform duration-200 ease-in-out h-2 w-2 ${openSortBy ? "rotate-180" : "rotate-0"} `}
            alt=""
          />
        </button>
        <button
          onClick={() => setOpenFilter(!openFilter)}
          className="text-sm cursor-pointer mr-12 text-xs text-gray-400 hover:text-gray-600"
        >
          FILTER
        </button>
      </div>

      <div className="grid grid-cols-3 px-12 pt-10 gap-5">
        {inventory.map((item, index) => (
          <div onClick={() => handleClick(item.id)} key={index}>
            <ProductItems
              id={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          </div>
        ))}
      </div>
      <FilterModal isOpen={openFilter} onClose={() => setOpenFilter(false)} />
    </div>
  );
};

export default Collections;
