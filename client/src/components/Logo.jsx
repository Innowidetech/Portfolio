import React from 'react';
import { Code } from 'lucide-react';

const Logo = ({ isDarkMode }) => (
  <div className="flex items-center space-x-3">
    <Code className={`h-8 w-8 ${isDarkMode ? 'text-white' : 'text-black'}`} />
    <span className={`font-bold text-xl hidden sm:block ${isDarkMode ? 'text-white' : 'text-black'}`}>
      Portfolio
    </span>
  </div>
);

export default Logo;