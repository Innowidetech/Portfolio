import React from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ isDarkMode, toggleTheme }) => (
  <button
    onClick={toggleTheme}
    className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-[#ffffff26]' : 'hover:bg-[#E9EDC9]'
      } transition-colors duration-200`}
  >
    {isDarkMode ? (
      <Sun className="h-5 w-5 text-white" />
    ) : (
      <Moon className="h-5 w-5 text-black" />
    )}
  </button>
);

export default ThemeToggle;