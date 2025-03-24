import React from 'react';

const NavLinks = ({ isDarkMode, isMobile = false, activeItem, onNavClick }) => {
  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'About Us', href: '#about' },
    { label: 'My Works', href: '#projects' },
    { label: "Services", path: "#service" },
    { label: 'Contact', href: '#contact' },
  ];

  const baseClasses = isMobile ? 'block py-2 px-4' : 'px-4 py-2 rounded-md';

  return navItems.map((item) => (
    <a
      key={item.label}
      href={item.href}
      onClick={() => onNavClick(item.label)}
      className={`${baseClasses} transition-colors duration-200 ${activeItem === item.label
          ? isDarkMode
            ? 'bg-gray-800 text-white'
            : 'bg-[#E9EDC9] text-black'
          : isDarkMode
            ? 'text-white hover:bg-gray-800'
            : 'text-black hover:bg-[#E9EDC9]'
        }`}
    >
      {item.label}
    </a>
  ));
};

export default NavLinks;