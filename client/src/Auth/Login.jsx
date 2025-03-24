import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { CiUser } from "react-icons/ci";


const Login = () => {

    const { isDarkMode } = useTheme();

  return (
    <div className={`flex items-center justify-center min-h-screen mx-4 md:mx-0 ${isDarkMode ? '' : ''}`} data-aos="zoom-in">
      <div className={`border ${isDarkMode ? 'bg-[#4D4D4D] text-[#E9E1B4]' : 'bg-[#14213D] text-[#FFFCF2]'} w-96 p-8 rounded-lg shadow-lg`}>
        {/* User Icon */}
        <div className="flex items-center justify-center mb-8">
          <div className={`w-16 h-16 rounded-full ${isDarkMode ? 'bg-[#2C3E56]' : 'bg-[#273658] opacity-100'} flex items-center justify-center -translate-y-16`}>
            <span className={`text-3xl ${isDarkMode ? 'text-[#FFFCF2]' : 'text-white'}`}><CiUser/></span>
          </div>
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <input
            type="email"
            className="w-full p-3 text-sm text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <input
            type="password"
            className="w-full p-3 text-sm text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>

        {/* Remember Me and Forgot Password */}
        <div className="flex items-center justify-between mb-6">
          <label className="inline-flex items-center text-sm">
            <input type="checkbox" className="form-checkbox text-blue-500" />
            <span className={`ml-2 ${isDarkMode ? 'text-[#FFFCF2]' : ''}`}>Remember me</span>
          </label>
          <button className={`text-sm hover:underline ${isDarkMode ? 'text-[#FFFCF2]' : ''}`}>
            Forgot password?
          </button>
        </div>

        {/* Login Button */}
        <button
          className={`w-full p-3 text-sm font-medium ${isDarkMode ? 'bg-[#2C3E56] text-[#FFFCF2]' : 'bg-[#FFFFFF26]'} rounded-lg`}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default Login;