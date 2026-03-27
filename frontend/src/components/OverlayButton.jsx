import React from "react";

const OverlayButton = ({ text }) => {
  return (
    <button className="absolute border border-white top-[50%] bg-black/40 left-[50%] transform -translate-x-1/2 -translate-y-1/2 px-5 py-2 text-white cursor-pointer font-bold shadow-xs">
      {text}
    </button>
  );
};

export default OverlayButton;
