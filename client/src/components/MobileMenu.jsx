import React from 'react';
import { Menu } from 'lucide-react';
import NavLinks from './NavLinks';

const MobileMenu = ({ isDarkMode, isMenuOpen, setIsMenuOpen }) => (
  <>
    <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="md:hidden p-2 rounded-lg"
    >
      <Menu className={`h-6 w-6 ${isDarkMode ? 'text-white' : 'text-black'}`} />
    </button>

    {isMenuOpen && (
      <div className="md:hidden py-4">
        <NavLinks isDarkMode={isDarkMode} isMobile={true} />
      </div>
    )}
  </>
);

export default MobileMenu;