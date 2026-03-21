import { Minus, Plus } from "lucide-react";
import React from "react";

const Quantity = ({ quantity, setQuantity }) => {
  return (
    <div className="flex ">
      <div className="flex justify-between border border-gray-300 py-1 px-2 items-center gap-4 min-w-1/5">
        <Minus
          className="w-3 h-3 text-gray-500 cursor-pointer"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        />
        <span className="text-sm">{quantity}</span>
        <Plus
          className="w-3 h-3 text-gray-500 cursor-pointer"
          onClick={() => setQuantity(quantity + 1)}
        />
      </div>
    </div>
  );
};

export default Quantity;
