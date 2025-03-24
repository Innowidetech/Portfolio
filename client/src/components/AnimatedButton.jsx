import React from 'react';
import { useTheme } from '../context/ThemeContext';

function AnimatedButton({ children, onClick, className = '' }) {
    const { isDarkMode } = useTheme();

    return (
        <div
            onClick={onClick}
            className={`
                relative 
                border
                lg:h-[400px]
                h-[150px]
                ${isDarkMode ? 'border-[#E9E1B4] hover:text-[#14213D]' : 'border-[#14213D] hover:text-[#14213d]'}
                rounded-2xl 
                overflow-hidden 
                transition-all 
                duration-500 
                group
                ${className}
            `}
        >
            <span 
                className={`
                    relative z-10
                    group-hover:${isDarkMode ? 'text-[#14213D]' : 'text-[#14213d]'} 
                    ${isDarkMode ? 'text-[#E9E1B4]' : 'text-[#14213D]'}
                `}
            >
                {children}
            </span>
            <div
                className={`
                    absolute 
                    bottom-0 
                    right-0
                    md:w-[30px] 
                    md:h-[40px] 
                    h-[10px]
                    w-[10px]
                    rounded-tl-xl
                    ${isDarkMode ? 'bg-[#E9E1B4]' : 'bg-[#f7f7f7]'}
                    group-hover:w-full 
                    group-hover:h-full 
                    transition-all 
                    duration-500 
                    ease-out
                `}
            />
        </div>
    );
}

export default AnimatedButton;
