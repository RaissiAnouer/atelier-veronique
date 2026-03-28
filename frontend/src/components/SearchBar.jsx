import { LoaderCircle, Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import axiosConfig from "../utils/axiosConfig";
import { assets } from "../assets/assets";
import ProductItems from "./ProductItems";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ isOpen, onClose }) => {
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState();
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const fetchSearch = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) {
      setSearchResult([]);
      return;
    }
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.SEARCH, {
        params: { keyword },
      });
      if (response.status === 200) setSearchResult(response.data);
    } catch (err) {
      console.log(err.message);
      setError(err.message || "Something went wrong check console");
    } finally {
      setLoading(false);
      setHasSearched(true);
    }
  };
  const handleClose = () => {
    setKeyword("");
    setSearchResult([]);
    setHasSearched(false);
    onClose();
  };
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-20 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      />

      <div
        className={`fixed left-0 w-full bg-white z-30 transform transition-all duration-300 ease-in-out border-b border-gray-100
          
         
         ${
           isOpen
             ? "translate-y-0 opacity-100"
             : "-translate-y-full opacity-0 pointer-events-none"
         }
        max-h-screen overflow-y-auto`}
      >
        <div>
          <form
            className="flex h-20 items-center justify-between  px-4 md:px-12 w-full gap-4"
            onSubmit={(e) => fetchSearch(e)}
          >
            <button type="submit">
              <Search className="text-gray-500 " size={20} />
            </button>
            <input
              type="text"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                setHasSearched(false);
              }}
              placeholder="SEARCH FOR ..."
              className="flex-1 outline-none text-lg font-light text-gray-800 bg-transparent"
              autoFocus
            />
            <button onClick={handleClose} type="button">
              <X
                className="text-gray-500 hover:text-black transition"
                size={25}
              />
            </button>
          </form>
        </div>
        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-12 pt-10 gap-5   `}
        >
          {loading && (
            <>
              <LoaderCircle className="animate-spin animate-spin text-gray-500 w-8 h-8 mx-auto" />
              <p className="col-span-3 text-center text-gray-500 ">
                Loading...
              </p>
            </>
          )}

          {!loading &&
            hasSearched &&
            searchResult.length === 0 &&
            keyword.trim() !== "" && (
              <p className="col-span-full  text-lg text-gray-500  mx-auto py-8">
                No results found :(
              </p>
            )}
          {!loading &&
            searchResult.map((item, index) => (
              <div
                onClick={() => navigate(`/collection/${item.id}`)}
                className="py-4 pb-8"
              >
                <ProductItems
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  image={assets.redshirt1}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default SearchBar;
