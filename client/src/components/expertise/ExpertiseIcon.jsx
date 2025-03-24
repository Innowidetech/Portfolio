import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";

function ExpertiseIcon({ icon: Icon, color, name, progress, img, delay, isVisible }) {
  const { isDarkMode } = useTheme();
  const [currentProgress, setCurrentProgress] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      let start = 0;
      const duration = 1500;
      const steps = 60;
      const increment = progress / steps;
      const stepTime = duration / steps;

      const timerInterval = setInterval(() => {
        start += increment;
        if (start >= progress) {
          setCurrentProgress(progress);
          clearInterval(timerInterval);
          setHasAnimated(true);
        } else {
          setCurrentProgress(start);
        }
      }, stepTime);

      return () => clearInterval(timerInterval);
    }
  }, [isVisible, progress, hasAnimated]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-2" ref={elementRef}>
      <div
        className={`p-3 ${
          isDarkMode ? "bg-black" : "bg-[#ffffff]"
        } rounded-full`}
      >
        <div className="relative w-24 h-24">
          <svg className="absolute inset-0 w-full h-full">
            <circle
              cx="48"
              cy="48"
              r="36"
              strokeWidth="10"
              fill="none"
              stroke="#e9e1b4"
            />
            <circle
              cx="48"
              cy="48"
              r="36"
              strokeWidth="10"
              fill="none"
              className={`${color} opacity-80`}
              strokeDasharray={`${2 * Math.PI * 44}`}
              strokeDashoffset={`${
                2 * Math.PI * 44 * (1 - currentProgress / 100)
              }`}
              stroke="currentColor"
              strokeLinecap="round"
              transform="rotate(-90 48 48)"
            />
          </svg>
          <div className="absolute inset-4 rounded-full flex items-center justify-center">
            {img ? (
              <img
                src={img}
                alt={name}
                className="w-10 h-10 object-contain rounded-2xl p-1"
              />
            ) : (
              <Icon className={`w-10 h-10 ${color}`} />
            )}
          </div>
        </div>
      </div>

      <span
        className={`text-sm md:text-lg mt-2 text-center ${
          isDarkMode ? "" : "text-[#14213d]"
        }`}
        style={{ fontFamily: "Inria Sans" }}
      >
        {name}
      </span>
    </div>
  );
}

export default ExpertiseIcon;