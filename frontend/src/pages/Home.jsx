import React from "react";
import Navbar from "../components/Navbar";
import { assets, inventory } from "../assets/assets";
import ProductItems from "../components/ProductItems";
import ItemsScroll from "../components/ItemsScroll";
import OverlayButton from "../components/OverlayButton";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate=useNavigate();
  const handleNavigation=(path)=>{
    navigate("/collection"+path);
  }
  return (
    <div>
      <Navbar />
      <div className="relative w-full h-full">
        <img
          src={assets.home}
          className="w-full h-[500px] md:h-[800px] object-cover"
          alt=""
        />
        <button onClick={()=>handleNavigation("?field=createdAt&direction=desc")}>
        <OverlayButton text="NEW ARRIVALS" />
        </button>
      </div>
      <ItemsScroll
        title="DESIGNED WITH CARE USING ONLY THE FINEST FABRICS"
        inventory={inventory}
        button="VIEW MORE"
      />
      <div className="relative mt-10 w-full h-1/2">
        <img
          src={assets.home2}
          className="relative w-full h-[400px] md:h-1/2 object-cover mt-10"
          alt=""
        />
        <OverlayButton text="OUTWEAR ELEGANCE" />
      </div>
      <ItemsScroll
        title="OUR KNITWEAR ARTISAN WORK WITH MODERNS SILHOUTE"
        inventory={inventory}
        button="BROWSE"
      />
      <div className=" w-full border-t border-gray-200 my-10" />

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 px-6 md:px-0">
        <div className="flex flex-col items-start w-full md:w-1/5 md:mr-20 font-medium order-2 md:order-1">
          <p className="mb-6 text-sm md:text-base">
            Snow-laced mountains frame St. Moritz in bright winter light, as
            sleek cars glide past grand façades of Suvretta House and Badrutt’s
            Palace. Their windows glowing warmly against the cold. Champagne
            glasses clink softly by roaring fires, and the frozen lake shines
            like polished crystal.
          </p>
          <p className="text-sm md:text-base">
            In St. Moritz, winter is not just a season — it is a statement of
            timeless luxury.
          </p>
          <button className="mt-5 mb-5 w-full md:w-auto px-5 py-2 border-1 border-gray-200 text-sm cursor-pointer shadow-xs">
            BROWSE NEW ARRIVALAS
          </button>
        </div>
        <div className="flex gap-4 order-1 md:order-2">
          <img
            src={assets.home3}
            className="w-40 h-60 md:w-60 md:h-90 object-cover"
            alt=""
          />
          <img
            src={assets.home4}
            className="w-40 h-50 md:w-60 md:h-80 object-cover mt-10 md:mt-0"
            alt=""
          />
        </div>
      </div>

      <div className="relative ">
        <img
          src={assets.home5}
          className="w-full h-[60vh] md:h-screen object-cover my-10 "
          alt=""
        />
        <OverlayButton text="BROWSE NEW ARRIVALAS" />
      </div>
      <ItemsScroll
        title="Made by hand in Puglia"
        inventory={inventory}
        button="VIEW MORE"
      />
      <img
        src={assets.home6}
        className="w-full h-[60vh] md:h-screen object-cover"
        alt=""
      />
    </div>
  );
};

export default Home;
