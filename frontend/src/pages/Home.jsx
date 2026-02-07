import React from "react";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";

const Home = () => {
  return (
    <div>
      <Navbar />
      <img src={assets.home} className="w-full h-full object-cover" alt="" />
      <div className="mt-20 flex overflow-x-auto gap-6 px-4 md:px-12"></div>
    </div>
  );
};

export default Home;
