import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const TestimonialControls = ({ onPrevious, onNext }) => {
  const { isDarkMode } = useTheme();

  const buttonClasses = `
    p-3 rounded-full transition-all duration-300 
    ${isDarkMode ?
      'bg-gray-800 hover:bg-gray-700 text-white' :
      'bg-white hover:bg-gray-100 text-black'} 
    shadow-lg hover:scale-110
  `;

  return (
    <div className="absolute w-full top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-8">
      <button onClick={onPrevious} className={buttonClasses} aria-label="Previous testimonial">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={onNext} className={buttonClasses} aria-label="Next testimonial">
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default TestimonialControls;