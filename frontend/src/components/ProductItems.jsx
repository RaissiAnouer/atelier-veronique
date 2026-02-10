import React from "react";

const ProductItems = ({ id, image, name, price }) => {
  return (
    <div className="flex-shrink-0 basis-[calc((100%-5.5rem)/3)] snap-start">
      <div className="bg-[#F5F5F3] cursor-pointer ">
        <img
          className="hover:scale-110 transition ease-in-out "
          src={image?.[0]}
          alt=""
        />
      </div>
      <p className="pt-3 pb-1 text-lg font-semibold">{name}</p>
      <p className="text-md text-gray-500">{price} tnd</p>
    </div>
  );
};

export default ProductItems;
