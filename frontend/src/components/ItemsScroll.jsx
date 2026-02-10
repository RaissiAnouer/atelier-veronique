import React, { useRef, useState, useEffect } from "react";
import ProductItems from "./ProductItems";
import { assets } from "../assets/assets";

const ItemsScroll = ({ title, inventory, button }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Update button visibility based on scroll position
  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1); // tiny buffer
  };

  useEffect(() => {
    updateScrollButtons();
    // listen to scroll events
    const container = scrollRef.current;
    container.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons); // recalc on resize

    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  const scrollItems = (direction = "right") => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const itemWidth = container.firstChild.offsetWidth;
    const gap = parseInt(getComputedStyle(container).gap) || 10;
    const scrollDistance = (itemWidth + gap) * 3;

    container.scrollBy({
      left: direction === "right" ? scrollDistance : -scrollDistance,
      behavior: "smooth",
    });
  };

  return (
    <div className="text-center mt-30">
      <h1 className="text-md text-gray-600 font-bold">{title}</h1>

      {/* Scroll container */}
      <div className="relative mx-10 mt-10 group">
        {/* Left button */}
        {canScrollLeft && (
          <button
            onClick={() => scrollItems("left")}
            className="absolute top-1/2 -translate-y-1/2 left-0 p-3 bg-white shadow-xl z-10 cursor-pointer rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <img src={assets.previous} className="w-3 h-3" alt="Left" />
          </button>
        )}

        {/* Right button */}
        {canScrollRight && (
          <button
            onClick={() => scrollItems("right")}
            className="absolute top-1/2 -translate-y-1/2 right-0 p-3 bg-white shadow-xl z-10 cursor-pointer rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <img src={assets.next} className="w-3 h-3" alt="Right" />
          </button>
        )}

        {/* Items */}
        <div
          ref={scrollRef}
          className="flex gap-10 overflow-x-auto scroll-smooth scrollbar-hide"
        >
          {inventory.map((item, index) => (
            <ProductItems
              key={index}
              id={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>

      {/* Main centered button */}
      <button className="mt-10 mb-5 px-5 py-2 bg-black text-white cursor-pointer font-bold shadow-xs ">
        {button}
      </button>
    </div>
  );
};

export default ItemsScroll;
