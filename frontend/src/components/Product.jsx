import React, { useEffect, useState } from "react";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Navbar from "./Navbar";
import { Check } from "lucide-react";

const Product = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();
  const [size, setSize] = useState("");

  const fetchProduct = async () => {
    try {
      const response = await axiosConfig.get(`${API_ENDPOINTS.GETPRODUCT(id)}`);

      if (response.status === 200) {
        setProduct(response.data);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error fetching product");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);
  return (
    <div>
      <Navbar />
      <div className="flex w-full mt-20">
        <div className="pb-10">
          {!product ? (
            <p>Loading ...</p>
          ) : (
            <div className="flex gap-10  w-full">
              <img src={assets.home3} className="w-[60%]" alt="" />
              <div className="flex flex-col gap-2 mx-12 w-[40%]">
                <h1 className="text-xs text-gray-400">ATELIER VERONIQUE</h1>
                <h1 className="text-lg font-semibold">{product.name}</h1>
                <h1 className="text-gray-500 text-lg font-bold">
                  {product.price}TD
                </h1>
                <p className="w-full h-1 text-gray-300  border-b-1 mt-5" />
                <p className="text-gray-400">{product.description}</p>
                <div>
                  <p className="mb-3">Size:</p>
                  {product.sizes.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSize(item)}
                      className={`border border-gray-200 px-4 py-2 cursor-pointer rounded-md mx-2 ${size === item ? "border-gray-800 " : ""}`}
                    >
                      {item.size}
                    </button>
                  ))}
                </div>
                <button className="w-full text-center bg-black text-white py-3 text-sm tracking-[0.3em] mt-4 shadow-md cursor-pointer">
                  ADD TO CART
                </button>
                <div className="flex items-start gap-2 mt-5 ">
                  <Check className="w-4 h-4 text-gray-500 mt-1.25" />
                  <div className="text-gray-700">
                    <p>Pickup available at Schoffa Flagship Store</p>
                    <p className="text-gray-700">Usually ready in 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 mt-2 ">
                  <Check className="w-4 h-4 text-gray-500 mt-1.25" />
                  <p>Cash on delivery is available on this product.</p>
                </div>
                <div className="flex items-start gap-2 mt-2 ">
                  <Check className="w-4 h-4 text-gray-500 mt-1.25" />
                  <p>Easy return and exchange policy within 7 days.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
