import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true; 
  });

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  //     document.documentElement.classList.toggle('dark', isDarkMode);
  //   }
  // }, [isDarkMode]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.add('dark'); // Ensure dark mode is applied
      localStorage.setItem('theme', 'dark');
    }
  }, [])

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};