import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { assets, inventory, sortByOptions } from "../assets/assets";
import ProductItems from "../components/ProductItems";
import FilterModal from "../components/FilterModal";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
const Collections = () => {
  const [openSortBy, setOpenSortBy] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [collection, setCollection] = useState([]);
  const navigate = useNavigate();
  const { category } = useParams();

  const handleClick = (id) => {
    navigate(`/collection/product/${id}`);
  };

  const sort = async (field, direction) => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.SORTBYOPTION, {
        params: {
          field,
          direction,
        },
      });
      if (response.status === 200) {
        setCollection(response.data);
        console.log("Sorted products:", response.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sorting products");
    }
  };

  useEffect(() => {
    const fetchCollection = async () => {
      let endpoint;
      if (category === "gift-cards") {
        endpoint = API_ENDPOINTS.GETGIFTCARDS;
      } else {
        endpoint = category
          ? API_ENDPOINTS.GETBYCATEGORY(category)
          : API_ENDPOINTS.GETCOLLECTION;
      }
      try {
        const response = await axiosConfig.get(endpoint);

        if (response.status === 200) {
          console.log("Fetched collection:", response.data);
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
  }, [category]);

  const handleFilter = (filteredProducts) => {
    setCollection(filteredProducts);
  };

  useEffect(() => {
    if (openFilter) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openFilter]);

  return (
    <div className="mb-6">
      <Navbar />
      <h2 className="text-md mt-6 text-gray-600 text-center tracking-[0.3em] font-semibold">
        COLLECTION
      </h2>
      <div className="w-full sticky top-[80px] z-10 py-3 border-y border-gray-200 mt-3 flex items-center bg-white px-4 md:px-0">
        <p className="absolute left-4 md:left-1/2 md:-translate-x-1/2 text-center text-[10px] md:text-xs text-gray-400">
          {collection.length} PRODUCTS
        </p>

        <div className="flex items-center ml-auto gap-4 md:gap-2 mr-4 md:mr-8">
          <div className="relative flex items-center gap-8">
            <button
              onClick={() => setOpenSortBy(!openSortBy)}
              className=" flex items-center cursor-pointer gap-2"
            >
              <p className="text-[10px] md:text-xs text-gray-400 hover:text-gray-600">
                SORT BY
              </p>
              <img
                src={assets.arrowDown}
                className={`transition-transform duration-200 ease-in-out h-2 w-2 ${openSortBy ? "rotate-180" : "rotate-0"} `}
                alt=""
              />
            </button>
            {openSortBy && (
              <div className="absolute text-center top-full right-4 md:right-8 bg-white border border-gray-200 rounded shadow-md p-4  z-20">
                {sortByOptions.map((option, index) => (
                  <p
                    key={index}
                    className="text-[10px] md:text-[15px] text-gray-400 hover:text-gray-600 p-2 cursor-pointer whitespace-nowrap"
                    onClick={() => sort(option.field, option.direction)}
                  >
                    {option.name}
                  </p>
                ))}
              </div>
            )}
            <button
              onClick={() => setOpenFilter(!openFilter)}
              className="cursor-pointer text-[10px] md:text-xs text-gray-400 hover:text-gray-600 mr-4 "
            >
              FILTER
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 px-4 md:px-12 pt-6 md:pt-10 gap-4 md:gap-5">
        {collection.map((item, index) => (
          <div onClick={() => handleClick(item.id)} key={index}>
            <ProductItems
              id={item.id}
              name={item.name}
              price={item.price}
              image={assets.redshirt1}
            />
          </div>
        ))}
      </div>
      <FilterModal
        isOpen={openFilter}
        onClose={() => setOpenFilter(false)}
        onFilter={handleFilter}
      />
    </div>
  );
};

export default Collections;
