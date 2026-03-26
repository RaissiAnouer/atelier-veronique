import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";

export default function PriceFilter({ range, setRange }) {
  return (
    <div className="p-4">
      <Slider.Root
        min={0}
        max={1000}
        step={10}
        value={range}
        onValueChange={setRange}
        className="relative flex items-center w-72 h-5"
      >
        <Slider.Track className="relative bg-gray-200 rounded-full flex-1 h-[2px]">
          <Slider.Range className="absolute bg-gray-700 rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb className="block w-[10px] h-[10px] bg-gray-700 rounded-full shadow cursor-pointer focus:outline-none" />
        <Slider.Thumb className="block w-[10px] h-[10px] bg-gray-700 rounded-full shadow cursor-pointer  focus:outline-none" />
      </Slider.Root>
      <div className="flex gap-3 items-center jutify-between mt-4">
        <input
          type="text"
          value={range[0]}
          onChange={(e) => setRange([Number(e.target.value), range[1]])}
          className="border border-gray-300  py-2 px-4 text-xs w-20 outline-none "
        />
        <h2>To</h2>
        <input
          type="text"
          value={range[1]}
          onChange={(e) => setRange([range[0], Number(e.target.value)])}
          className="border border-gray-300 text-xs  py-2 px-4 w-20 outline-none"
        />
        <h2 className="text-xs">TND</h2>
      </div>
    </div>
  );
}
