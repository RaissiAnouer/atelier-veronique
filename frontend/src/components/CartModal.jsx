import { Minus, Plus, X } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import axiosConfig from "../utils/axiosConfig";

const CartModal = ({ isOpen, onClose }) => {
  const { cart, setCart } = useContext(AppContext);

  const fetchCart = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GETCART);
      if (response.status === 200) setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axiosConfig.delete(
        API_ENDPOINTS.REMOVEFROMCART(productId),
      );
      if (response.status === 200) fetchCart();
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  useEffect(() => {
    if (isOpen) fetchCart();
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
        className={`fixed z-50 top-0 bottom-0 right-0 w-96 bg-white overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-7 py-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">CART</h2>
          <button onClick={onClose}>
            <X
              className="text-gray-500 hover:text-gray-800 cursor-pointer"
              size={25}
            />
          </button>
        </div>

        {/* Products */}
        <div className="flex flex-col h-full">
          {cart.products?.length === 0 ? (
            <p className="text-gray-400 text-sm text-center mt-6">
              Your cart is empty.
            </p>
          ) : (
            <div className="flex flex-col h-full justify-between">
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {cart?.products?.map((item, index) => (
                  <div className="flex gap-4 items-center" key={index}>
                    <img
                      src={item.image?.[0] || assets.redshirt1}
                      className="w-1/3 h-24 object-cover rounded-md"
                      alt={item.productName}
                    />
                    <div className="flex-1 flex flex-col gap-1">
                      <h1 className="text-xs text-gray-400">
                        ATELIER VERONIQUE
                      </h1>
                      <h2 className="text-sm text-gray-800 tracking-[0.05em]">
                        {item.productName}
                      </h2>
                      <h2 className="text-gray-500 text-xs">{item.price} TD</h2>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex justify-between border border-gray-300 py-1 px-2 items-center gap-2 min-w-[80px]">
                          <Minus className="w-3 h-3 text-gray-400" />
                          <span className="text-sm">{item.quantity}</span>
                          <button disabled>
                            <Plus className="w-3 h-3 text-gray-400" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.productSizeId)}
                          className="relative text-gray-600 text-sm cursor-pointer group"
                        >
                          Remove
                          <span className="absolute left-0 bottom-0 h-[1px] w-full bg-gray-500 transition-all duration-300 ease-in-out origin-center scale-x-100 group-hover:scale-x-0"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checkout button */}
              <div className="sticky py-4 bottom-0 right-0 left-0 border-t border-gray-200">
                <button className="w-4/5 mx-auto block bg-black text-white py-3 text-sm tracking-[0.3em] shadow-md cursor-pointer ">
                  CHECKOUT
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartModal;
