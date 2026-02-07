import { ArrowRightIcon, X } from "lucide-react";
import { assets } from "../assets/assets";

const SidebarModal = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed z-50 top-0 bottom-0 left-0 w-96 bg-white overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col gap-12 p-7">
          {/* Close button */}
          <button onClick={onClose}>
            <X
              className="text-gray-500 hover:text-gray-800 cursor-pointer"
              size={25}
            />
          </button>

          {/* Sidebar items */}
          <div className="flex flex-col divide-y divide-gray-300 text-md">
            {/* Item 1 */}
            <div className="flex justify-between items-center py-6 cursor-pointer">
              <p className=" text-gray-500 hover:text-gray-800 font-semibold transition">
                COLLECTION
              </p>
              <img src={assets.next} className=" w-5 h-5" />
            </div>

            {/* Item 2 */}
            <div className="flex justify-between items-center py-6 cursor-pointer">
              <p className=" text-gray-500 hover:text-gray-800 font-semibold transition">
                MADE-TO-MESURE
              </p>
              <img src={assets.next} className=" w-5 h-5" />
            </div>

            {/* Item 3 */}
            <div className="flex justify-between items-center py-6 cursor-pointer">
              <p className=" text-gray-500 hover:text-gray-800 font-semibold transition">
                GIFT CARDS
              </p>
            </div>

            {/* Item 4 */}
            <div className="flex justify-between items-center py-6 cursor-pointer">
              <p className="text-gray-500 hover:text-gray-800 font-semibold transition">
                STYLE GUIDE
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarModal;
