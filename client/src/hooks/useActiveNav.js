import { useState } from 'react';

export const useActiveNav = () => {
  const [activeItem, setActiveItem] = useState('Home');

  const handleNavClick = (item) => {
    setActiveItem(item);
  };

  return { activeItem, handleNavClick };
};