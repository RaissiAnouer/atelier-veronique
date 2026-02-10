import React from "react";
import Navbar from "../components/Navbar";
import { assets, inventory } from "../assets/assets";
import ProductItems from "../components/ProductItems";
import ItemsScroll from "../components/ItemsScroll";

const Home = () => {
  return (
    <div>
      <Navbar />
      <img
        src={assets.home}
        className="w-full h-full object-cover"
        alt=""
      />{" "}
      <ItemsScroll
        title="DESIGNED WITH CARE USING ONLY THE FINEST FABRICS"
        inventory={inventory}
        button="VIEW MORE"
      />
      <div className="relative mt-10 w-full h-1/2">
        <img
          src={assets.home2}
          className="relative w-full h-1/2 object-cover mt-10"
          alt=""
        />
        <button className="absolute border border-white top-[50%] bg-black/40 left-[50%] transform -translate-x-1/2 -translate-y-1/2 px-5 py-2 text-white cursor-pointer font-bold shadow-xs ">
          OUTWEAR ELEGANCE
        </button>
      </div>
      <ItemsScroll
        title="OUR KNITWEAR ARTISAN WORK WITH MODERNS SILHOUTE"
        inventory={inventory}
        button="BROWSE"
      />
      <div className=" w-full border-t border-gray-200 my-10" />
      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col items-start w-1/5 mr-20 font-medium">
          <p className="mb-6">
            Snow-laced mountains frame St. Moritz in bright winter light, as
            sleek cars glide past grand façades of Suvretta House and Badrutt’s
            Palace. Their windows glowing warmly against the cold. Champagne
            glasses clink softly by roaring fires, and the frozen lake shines
            like polished crystal.
          </p>
          <p>
            In St. Moritz, winter is not just a season — it is a statement of
            timeless luxury.
          </p>
          <button className="mt-5 mb-5 px-5 py-2 border-1 border-gray-200 text-sm cursor-pointer  shadow-xs ">
            BROWSE NEW ARRIVALAS
          </button>
        </div>
        <img src={assets.home3} className="w-60 h-90 object-cover" alt="" />
        <img src={assets.home4} className="w-60 h-80 object-cover" alt="" />
      </div>
      <div className="relative ">
        <img
          src={assets.home5}
          className="w-full h-screen object-cover my-10 "
          alt=""
        />
        <button className="absolute border border-white top-[50%] bg-black/40 left-[50%] transform -translate-x-1/2 -translate-y-1/2 px-5 py-2 text-white cursor-pointer font-bold shadow-xs">
          OUTWEAR ELEGANCE
        </button>
      </div>
      <ItemsScroll
        title="Made by hand in Puglia"
        inventory={inventory}
        button="VIEW MORE"
      />
      <img src={assets.home6} className="w-full h-screen object-cover" alt="" />
    </div>
  );
};

export default Home;
