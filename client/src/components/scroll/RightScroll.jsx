import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaTimesCircle } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { useTheme } from "../../context/ThemeContext";

function RightScroll() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const bodyHeight = document.body.scrollHeight;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleIconClick = (type) => {
    if (type === "whatsapp") {
      window.open("https://wa.me/", "_blank");
    } else if (type === "phone") {
      window.location.href = "tel:+";
    } else {
      setPopupContent(type);
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div
        className={`fixed right-0 top-2/3 flex flex-col items-center space-y-4 z-50 lg:h-[150px] lg:w-[70px]  ${
          isDarkMode ? "bg-[#ffffff53]" : "bg-[#14213D]"
        } rounded-full p-2 md:p-4 lg:p-2`}
      >
        <div
          className={`p-3 h-8 w-8 md:h-12 md:w-12 lg:mt-[11px] rounded-full ${
            isDarkMode ? "bg-[#E9E1B4]" : "bg-[#FFFCF2]"
          } hover:bg-gray-200 cursor-pointer flex items-center justify-center`}
          onClick={() => handleIconClick("phone")}
        >
          <FaPhone className="text-blue-400 h-4 w-4 md:h-6 md:w-6" />
        </div>

        <div
          className={`p-3 h-8 w-8 md:h-12 md:w-12 rounded-full ${
            isDarkMode ? "bg-[#E9E1B4]" : "bg-[#FFFCF2]"
          } hover:bg-gray-200 cursor-pointer flex items-center justify-center`}
          onClick={() => handleIconClick("whatsapp")}
        >
          <FaWhatsapp className="text-green-500 h-4 w-4 md:h-6 md:w-6" />
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-6">
          <div className="bg-slate-300 p-6 rounded-lg shadow-lg relative max-w-md w-full">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              onClick={handleClosePopup}
            >
              <FaTimesCircle
                className="text-gray-600 hover:text-gray-900"
                size={20}
              />
            </button>
            <h2 className="text-lg font-bold mb-4">
              {popupContent === "phone"
                ? "Innowide Technologies"
                : "Innowide Technologies"}
            </h2>
            <p>
              {popupContent === "phone"
                ? "Contact us on "
                : "You can message us on WhatsApp at "}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default RightScroll;
