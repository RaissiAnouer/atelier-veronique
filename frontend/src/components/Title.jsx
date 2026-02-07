import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div>
      <h3 className="font-medium text-sm md:text-md ml-2 mb-[-10px]">
        {text1}
      </h3>

      <h1 className="font-bold text-5xl md:text-5xl lg:text-7xl ">{text2}</h1>
    </div>
  );
};

export default Title;
