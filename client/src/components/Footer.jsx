import React, { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { AiOutlineInstagram } from "react-icons/ai";
import { MdFacebook } from "react-icons/md";
import { motion } from "framer-motion";
import { EarthCanvas } from "./canvas";
import { IoIosArrowRoundForward } from "react-icons/io";
import { slideIn } from "../utils/motion";
import { useNavigate } from 'react-router-dom';
import { RiTwitterXFill } from "react-icons/ri";
import { IoLogoReddit } from "react-icons/io5";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import darkmodelogo from '../assets/logo1f.png';
import lightmodelogo from '../assets/logo1ff.png';


const ContactFooter = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,  
      easing: 'ease-in-out',  
      once: false,  
    });
    return () => {
      AOS.refreshHard(); 
    };
  }, []);

  return (
    <footer
      className={`flex flex-col items-center justify-center py-10 px-6 mt-24 ${isDarkMode ? 'bg-[#FFFFFF26] text-white' : 'bg-[#14213D] text-white'
        }`}
    >
      <div className="md:hidden pb-4 ">
        <div
        className='h-[230px] w-[230px]'
          variants={slideIn("right", "tween", 0.2, 1)}
        >
          <EarthCanvas/>
        </div>
      </div>
      <div className="w-full max-w-8xl flex items-center justify-center md:justify-between ">
        <div className="text-center md:text-left lg:mx-10">
          <div className="flex flex-col mb-6">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0 mb-2">
              <img
                key={isDarkMode ? "dark-desktop" : "light-desktop"}
                className="w-16 h-16 object-cover mx-auto md:mx-0"
                src={isDarkMode ? darkmodelogo : lightmodelogo}
                alt="Animated GIF"
              />
              <h2 className={`md:text-2xl lg:text-5xl ${isDarkMode ? 'text-[#E9E1B4]' : 'text-[#FFFCF2]'}`}>
                Want to know more?
              </h2>
            </div>
            <p
              className={`lg:mt-8 text-center md:text-start text-md w-[250px] translate-x-3 md:translate-x-0 md:text-lg lg:w-[400px] mb-6 flex items-center justify-center rounded-sm md:py-2 mt-4 cursor-pointer 
                ${isDarkMode ? 'border-[#E9E1B4] text-white bg-[#A0A08338]' : 'border-[#434D61] bg-[#434D61] text-[#FFFCF2]'}`} onClick={() => navigate('/contact')}
            >
              Let's Discuss The Project!
              <IoIosArrowRoundForward className='h-8 w-8' />
            </p>
            <hr className={`lg:w-[600px] w-full my-6 ${isDarkMode ? 'border-[#E9E1B4]' : 'border-[#FFFCF2]'} mx-auto`} />
          </div>
          <div className="flex justify-between items-center w-full max-w-[650px] mx-auto mt-4">
            {/* Navigation Links */}
            <div className={`footer md:flex lg:mt-6 md:gap-3 lg:gap-6 ${isDarkMode ? 'text-[#E9E1B4]' : 'text-[#FFFCF2]'}`}>
              <label className=" lg:text-2xl cursor-pointer hover:underline" onClick={() => navigate('/')}>Home | </label>
              <label className=" lg:text-2xl cursor-pointer hover:underline" onClick={() => navigate('/contact')}>Contact |</label>
              <label className=" lg:text-2xl cursor-pointer hover:underline" onClick={() => navigate('/projects')}>My Works | </label>
              <label className=" lg:text-2xl cursor-pointer hover:underline" onClick={() => navigate('/blog')}>Blog | </label>
              <div className="md:gap-4 flex md:items-center justify-evenly mt-6 md:mt-0">
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <AiOutlineInstagram className="text-xl lg:text-3xl hover:text-[#E9E1B4]" />
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <MdFacebook className="text-xl lg:text-3xl hover:text-[#E9E1B4]" />
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <RiTwitterXFill className="text-xl lg:text-3xl hover:text-[#E9E1B4]" />
                </a><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <IoLogoReddit className="text-xl lg:text-3xl hover:text-[#E9E1B4]" />
                </a>
              </div>
            </div>
          </div>
          <div className="text-start mt-6 lg:mt-14">
            <p className={`text-sm text-center lg:text-xl md:text-start ${isDarkMode ? 'text-[#E9E1B4]' : 'text-[#FFFCF2]'}`}>
              Created by Shivaraj | All Reserved!
            </p>
          </div>
        </div>
        <div className="hidden md:block pb-4">
          <div
            className='h-[300px] w-[300px] lg:h-[450px] lg:w-[550px]'
            variants={slideIn("right", "tween", 0.2, 1)}
          >
            <EarthCanvas />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;