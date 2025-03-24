import React, { useEffect, useState } from 'react';
import { Github, FileCode, Linkedin, Mail } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Hero from '../../assets/hero.png';
import { SiLeetcode, SiCodechef } from "react-icons/si";
import { LiaHackerrank } from "react-icons/lia";
import { SiGeeksforgeeks } from "react-icons/si";

const RotatingIcons = () => {
  const { isDarkMode } = useTheme();
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(null);
  const iconSize = "h-8 w-8";
  const iconColor = isDarkMode ? 'text-white' : 'text-[#ffffff]';

  useEffect(() => {
    let interval;
    if (isHovered === null) { 
      interval = setInterval(() => {
        setRotation(prev => (prev + 0.5) % 360);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  const calculatePosition = (index, totalIcons) => {
    const angle = (index * (360 / totalIcons) + rotation) * (Math.PI / 180);
    const radius = window.innerWidth <= 640 ? 140 : 180;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  const icons = [
    { Icon: Github, name: 'GitHub', link: "https://github.com" },
    { Icon: FileCode, name: 'Resume', link: "/resume" },
    { Icon: SiCodechef, name: 'CodeChef', link: "/tech" },
    { Icon: SiLeetcode, name: 'LeetCode', link: "/database" },
    { Icon: LiaHackerrank, name: 'HackerRank', link: "/hackerrank" },
    { Icon: SiGeeksforgeeks, name: 'GeeksforGeeks', link: "/hackerrank" },
    { Icon: Linkedin, name: 'LinkedIn', link: "https://www.linkedin.com" },
    { Icon: Mail, name: 'Contact', link: "mailto:stackmastry@gmail.com" },
  ];

  return (
    <div className="hidden lg:block w-[500px] h-[450px] relative">
    {/* Rotating Icons */}
    <div className="absolute -top-5 left-0 w-full h-full">
      {icons.map(({ Icon, name, link }, index) => {
        const { x, y } = calculatePosition(index, icons.length);
        const isLeft = x < 0;
  
        return (
          <div
            key={index}
            className="absolute p-2 transition-all duration-300 ease-in-out"
            style={{
              transform: `translate(${x + 340}px, ${y + 220}px)`,
              left: 0,
              top: 0,
            }}
            onMouseEnter={() => setIsHovered(index)} 
            onMouseLeave={() => setIsHovered(null)} 
          >
            <a href={link} target="_blank" rel="noopener noreferrer">
              <div className={`${isDarkMode ? 'bg-[#000000] border border-[#e9e1b4]' : 'bg-[#14213d] border-[#e9e1b4]'} p-4 rounded-full shadow-lg`}>
                <Icon className={`${iconSize} ${iconColor}`} />
              </div>
            </a>
            {isHovered === index && (
              <div 
                className={`absolute top-0 left-4 mt-4 text-center p-1 ${isDarkMode ? 'text-[#FFFCF2]' :'text-[#14213d]'} text-sm`}
                style={{
                  left: isLeft ? '-100%' : '100%', 
                  // transform: isLeft ? 'translateX(-10px)' : 'translateX(10px)',
                  textAlign: isLeft ? 'right' : 'left', 
                }}
              >
                {name} 
              </div>
            )}
          </div>
        );
      })}
    </div>
  
    {/* Center Image */}
    <div className="absolute top-1/2 left-1/2 transform translate-x-12 -translate-y-16">
      <img
        src={Hero}
        alt="Hero"
        className="w-20 h-20 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg"
      />
    </div>
  </div>
  

  );
};

export default RotatingIcons;
