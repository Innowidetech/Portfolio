import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Plus, Minus } from 'lucide-react';
import { GoArrowUpRight } from "react-icons/go";
import { Link } from 'react-router-dom';
// import AOS from "aos";
import "aos/dist/aos.css";

function Specialization() {
  const { isDarkMode } = useTheme();
  const [hasMounted, setHasMounted] = useState(false);
  const [expandedService, setExpandedService] = useState(1);

  const services = [
    {
      id: 1,
      title: 'Web Development',
      description: 'With experience in building dynamic, responsive web applications using React, Node.js and JavaScript, I specialize in delivering seamless digital experiences.',
      route: '/service/web-dev'
    },
    {
      id: 2,
      title: 'UI/UX Design',
      description: 'Creating intuitive and engaging user interfaces with a focus on user experience and modern design principles.',
      route: '/service/uiux-design'
    },
    {
      id: 3,
      title: 'Full Stack Development',
      description: 'Creating intuitive and engaging user interfaces with a focus on user experience and modern design principles.',
      route: '/service/devops'
    },
    {
      id: 4,
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing solutions including SEO, social media management, and content strategy to boost your online presence.',
      route: '/service/digital-marketing'
    },
  ];

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const toggleService = (id) => {
    setExpandedService(expandedService === id ? null : id);
  };

  return (
    <div className="mt-14 py-10 mx-4 md:mx-6 lg:mx-24">
      <h1 className={`text-3xl md:text-4xl font-medium mx-6 ${isDarkMode ? 'text-[#e9e1b4]' : 'text-[#14213d]'}`} style={{fontFamily:'Inria Sans'}}>
        Specialization
      </h1>
      <h1 className={`md:text-2xl py-6 mx-6 ${isDarkMode ? 'text-[#ffffff]' : 'text-[#14213d]'}`} style={{fontFamily:'Inria Sans'}}>
        Our Services
      </h1>
      <div className="space-y-6">
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`rounded-2xl p-6 transition-all duration-300 md:py-10 md:w-full lg:py-16 ${isDarkMode ? 'bg-[#FFFFFF26] text-white border border-[#737373]' : 'bg-[#f7f7f7] border-[#737373] border'}`}
            data-aos={index % 2 === 0 ? 'flip-up' : 'flip-down'} 
          >
            <div className="flex items-center justify-between">
              <h2 className={`font-medium ${isDarkMode ? 'text-[#e9e1b4]' : 'text-[#14213d]'} font-medium text-md w-[10px] md:w-auto md:text-3xl`} style={{fontFamily:'Inria Sans'}}>
                {service.title}
              </h2>
              <div className="flex items-center gap-6 lg:gap-10">
                <Link
                  to={service.route}
                  className={`hidden md:flex md:block px-4 py-2  lg:py-3 text-xs lg:text-lg rounded-full ${isDarkMode ? 'bg-[#e9e1b4] text-[#14213d] hover:bg-[#ffffff]/[0.15] hover:text-white hover:border hover:border-[#E9E1B4]' : 'bg-[#14213d] text-[white]  hover:bg-[#F7F7F7] hover:border hover:border-[#14213d] hover:text-[#14213d]'} flex items-center gap-2`} style={{fontFamily:'Inria Sans'}}
                >
                  Offered Services
                  <GoArrowUpRight size={16} />
                </Link>
                <Link
                  to={service.route}
                  className={`md:hidden md:w-auto px-4 p-1 md:px-4 md:py-2 text-xs lg:text-lg rounded-full ${isDarkMode ? ' text-[#ffffff] hover:bg-[#c3c0b1]' : ' text-[#14213d] hover:bg-[#c6c2b5]'} flex items-center gap-2`} style={{fontFamily:'Inria Sans'}}
                >
                  <GoArrowUpRight size={16} />
                </Link>
                <button
                  onClick={() => toggleService(service.id)}
                  className={`p-2 rounded-full ${isDarkMode ? 'bg-black' : 'text-[#14213d] border-[#191A23] bg-[#ffffff]'}`}
                >
                  {expandedService === service.id ? (
                    <Minus size={24}/>
                  ) : (
                    <Plus size={24}/>
                  )}
                </button>
              </div>
            </div>
            {expandedService === service.id && (
              <div className="mt-4 text-sm opacity-80">
                <div className={`border-t my-6 ${isDarkMode ? '' : 'border-[#14213d]'}`}></div>
                <span className={`text-lg lg:text-xl ${isDarkMode ? 'text-[#ffffff]' : 'text-[#14213d]'}`} style={{fontFamily:'Inria Sans'}}>{service.description}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Specialization;