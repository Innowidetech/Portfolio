import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const TestimonialCard = ({ testimonial, index, activeIndex, total }) => {
  const { isDarkMode } = useTheme();

  const getCardStyle = () => {
    const distance = index - activeIndex;
    const isActive = distance === 0;
    const isBehind = distance < 0;
    const isAhead = distance > 0;

    let transform = '';
    let zIndex = total - Math.abs(distance);
    let opacity = 1;

    if (isActive) {
      transform = 'translate(-50%, -50%) scale(1)';
      zIndex = total;
    } else if (isBehind) {
      const scale = Math.max(0.8, 1 - Math.abs(distance) * 0.1);
      transform = `translate(-50%, -50%) scale(${scale}) translateY(${Math.abs(distance) * 20}px)`;
      opacity = Math.max(0.5, 1 - Math.abs(distance) * 0.2);
    } else if (isAhead) {
      const scale = Math.max(0.8, 1 - Math.abs(distance) * 0.1);
      transform = `translate(-50%, -50%) scale(${scale}) translateY(${Math.abs(distance) * 20}px)`;
      opacity = Math.max(0.5, 1 - Math.abs(distance) * 0.2);
    }

    return {
      transform,
      zIndex,
      opacity,
    };
  };

  const style = getCardStyle();

  return (
    <div
      className="absolute top-1/2 left-1/2 w-full max-w-2xl transition-all duration-500 ease-in-out"
      style={style}
    >
      <div className={`relative ${isDarkMode ? 'bg-[#E9E1B4]' : 'bg-[#FFFCF2]'} p-8 rounded-2xl shadow-xl`}>
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
        <div className="mt-16 text-center">
          <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-[#394554]' : 'text-[#394554]'}`}>
            {testimonial.name}
          </h3>
          <p className={` font-medium mt-1 ${isDarkMode ? 'text-[#FF3D00]' : 'text-[#14213D]'}`}>
            {testimonial.role}
          </p>
          <p className={`mt-4 text-lg text-center ${isDarkMode ? 'text-[#14213D]' : 'text-[#14213D]'}`}>
            "{testimonial.text}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;