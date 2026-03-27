import { ArrowRightIcon, X } from "lucide-react";
import { assets, SIDEBAR_NAVIGATION } from "../assets/assets";
import { useState } from "react";
import { SecondSIdeBar } from "./SecondSIdeBar";
import { useNavigate } from "react-router-dom";

const SidebarModal = ({ isOpen, onClose }) => {
  const [openSecondSidebar, setOpenSecondSidebar] = useState(false);
  const [content, setContent] = useState([]);
  const [title, setTitle] = useState("");
  const handleItemClick = (title, subItems) => {
    setTitle(title);
    setContent(subItems);
    setOpenSecondSidebar(true);
  };

  const navigate = useNavigate();
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => {
          onClose();
          setOpenSecondSidebar(false);
        }}
      />

      <div
        className={`fixed z-50 top-0 bottom-0 left-0 w-96 bg-white overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div
          className={`flex flex-col gap-12 p-7 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"} transition-opacity duration-300 delay-300`}
        >
          <button
            onClick={() => {
              onClose();
              setOpenSecondSidebar(false);
            }}
          >
            <X
              className="text-gray-500 hover:text-gray-800 cursor-pointer"
              size={25}
            />
          </button>

          <div className="flex flex-col divide-y divide-gray-300 text-sm">
            {SIDEBAR_NAVIGATION.map((item, index) => (
              <button
                key={index}
                onClick={() =>
                  item.content.length > 0
                    ? handleItemClick(item.name, item.content)
                    : navigate(item.path)
                }
                className="flex justify-between items-center py-4 cursor-pointer"
              >
                <p className="  text-gray-800 hover:text-gray-800 font-light transition">
                  {item.name}
                </p>
                {item.content?.length > 0 && (
                  <img src={assets.next} className=" w-3 h-3" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      <SecondSIdeBar
        isOpen={isOpen && openSecondSidebar}
        onClose={() => setOpenSecondSidebar(false)}
        content={content}
        title={title}
        onCloseAll={onClose}
      />
    </>
  );
};

export default SidebarModal;
