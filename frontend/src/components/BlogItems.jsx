import React from "react";

const BlogItems = ({ image, title, text, author }) => {
  return (
    <div className="flex-shrink-0 basis-[calc((100%-5.5rem)/3)] ">
      <div className="bg-[#F5F5F3] cursor-pointer ">
        <div className="relative group overflow-hidden">
          <img className="w-full h-68 object-cover" src={image} alt="" />

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
            <span className="text-white opacity-0 group-hover:opacity-100 transition">
              Read More
            </span>
          </div>
        </div>
      </div>
      <p className="pt-3 pb-1 text-sm text-center line-clamp-2 tracking-wider uppercase ">
        {title}
      </p>
      <p className="text-xs  text-gray-500 line-clamp-2">{text}</p>
      <p className="text-xs text-end text-gray-500 ">By {author}</p>
    </div>
  );
};

export default BlogItems;
