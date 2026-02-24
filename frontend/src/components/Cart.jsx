import { X } from "lucide-react";
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Cart = ({ isOpen, onClose }) => {
  const { cart, setCart } = useContext(AppContext);
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      <div
        className={`fixed z-50 top-0 bottom-0 right-0 w-96 bg-white overflow-y-auto transform transition-transform duration-300 ease-in-out
             ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col gap-4 py-7">
          <div className="flex justify-between items-center px-7">
            <h2 className="d ">CART</h2>
            <button onClick={onClose}>
              <X
                className="text-gray-500 hover:text-gray-800 cursor-pointer"
                size={25}
              />
            </button>
          </div>
          <p className="border-b border-gray-200 h-1 w-full"></p>
          {cart.length === 0 ? (
            <p className="text-gray-400 text-sm">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                className="grid grid-cols-3 w-full gap-4 items-center"
                key={`${item.selectedSize}-${item.id}`}
              >
                <img
                  src={item.image[0]}
                  className="w-16 h-16 object-cover"
                  alt=""
                />
                <div>
                  <h1 className="text-sm text-gray-400">ATELIER VERONIQUE</h1>
                  <h2 className="text-md text-gray-600 text-center tracking-[0.3em] font-semibold">
                    {item.name}
                  </h2>
                  <h1 className="text-gray-500 text-sm font-bold">
                    {item.price}TD
                  </h1>
                  <p className="text-xs text-gray-400">{item.selectedSize}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
