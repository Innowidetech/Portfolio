import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import ExpertiseIcon from "./ExpertiseIcon";

function ExpertiseSection({ title, icons, isVisible }) {
  const { isDarkMode } = useTheme();
  const [visibleIcons, setVisibleIcons] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (isVisible && visibleIcons.length < icons.length) {
      const timer = setTimeout(() => {
        setVisibleIcons((prev) => [...prev, visibleIcons.length]);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, visibleIcons.length, icons.length]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="mb-16 mt-6" ref={sectionRef}>
      <h2
        className={`text-xl mb-8 ${
          isDarkMode ? "text-[#ffffff]" : "text-[#14213d]"
        }`}
        style={{ fontFamily: "Inria Sans" }}
      >
        {title}
      </h2>
      <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8`}>
        {icons.map((icon, index) => (
          <ExpertiseIcon
            key={index}
            {...icon}
            isVisible={visibleIcons.includes(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default ExpertiseSection;