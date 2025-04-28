import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, User, Sun, Moon, Code, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { MdArrowOutward } from "react-icons/md";
import AnimatedGif from "../assets/darkmodeportfolio.gif";
import AnimatedGif1 from "../assets/lightmodeportfolio.gif";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const navItems = [
    { label: "Home", path: "/" },
    { label: "My Works", path: "/projects" },
    { label: "Services", path: "/service" },
    { label: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("hi");
  };

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full opacity-100 ${
          isDarkMode ? "bg-black" : "bg-[#14213d] text-[#fffcf2]"
        } shadow-lg backdrop-blur-2xl h-20`}
        style={{ fontFamily: "Inria Sans" }}
      >
        <div className="px-3 lg:mx-20">
          <div className="flex items-center justify-between h-16">
            {/* Left - Menu Button (Mobile) and Logo */}
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-1"
                aria-label="Toggle menu"
              >
                <Menu
                  className={`h-6 w-6 ${
                    isDarkMode ? "text-[#E9E1B4]" : "text-[#FFFCF2]"
                  }`}
                />
              </button>
              <Link to="/" className="flex items-center">
                <Code
                  className={`hidden h-8 w-8 ${
                    isDarkMode ? "text-[#E9E1B4]" : "text-white"
                  }`}
                />
                {/* Desktop Logo */}
                <div className="hidden md:block overflow-hidden rounded-lg lg:-ml-4">
                  <img
                    key={isDarkMode ? "dark-desktop" : "light-desktop"}
                    className="w-full h-32 object-cover"
                    src={isDarkMode ? AnimatedGif : AnimatedGif1}
                    alt="Animated GIF"
                  />
                </div>
                {/* Mobile Logo */}
                <div className="md:hidden overflow-hidden rounded-lg flex items-center">
                  <img
                    key={isDarkMode ? "dark-mobile" : "light-mobile"}
                    className="h-24 w-auto object-cover -mt-1"
                    src={isDarkMode ? AnimatedGif : AnimatedGif1}
                    alt="Animated GIF"
                    style={{
                      filter: isDarkMode
                        ? "brightness(1.2) contrast(1.1)"
                        : "brightness(1) contrast(1)",
                    }}
                  />
                </div>
              </Link>
            </div>
            {/* Desktop Navigation */}
            <div
              className={`hidden md:flex items-center justify-center space-x-8 md:p-3 md:mt-4`}
            >
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`${
                    location.pathname === item.path
                      ? isDarkMode
                        ? "text-[#ffffff] font-medium"
                        : "text-[#D4A373] font-medium"
                      : isDarkMode
                      ? "text-[#E9E1B4] hover:text-[#c1b888]"
                      : "text-[#FFFCF2] hover:text-[#fffcf2]"
                  } transition-colors duration-200 lg:text-xl md:text-sm`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            {/* Right - User Profile & Theme Toggle */}
            <div className="flex items-center md:space-x-0 md:mt-4 gap-4 lg:gap-6">
              <MdArrowOutward
                className={`h-6 w-6 ml-2 md:hidden ${
                  isDarkMode ? "text-[#E9E1B4]" : "text-[#FFFCF2]"
                }`}
                onClick={() => navigate("/contact")}
              />
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${
                  isDarkMode ? "" : ""
                } transition-colors duration-200`}
              >
                {isDarkMode ? (
                  // <Sun className="h-5 w-5 text-[#E9E1B4] bg-[#a0a083]/90 rounded-full p-1 " />
                  <div className="p-2 bg-[#FFFFFF26] rounded-full">
                    <Sun className="h-5 w-5 text-[#E9E1B4]" />
                  </div>
                ) : (
                  <div className="p-2 bg-[#FFFFFF]/15 rounded-full">
                    <Moon className="h-5 w-5 text-white" />
                  </div>
                )}
              </button>
              <button
                className={`hidden md:flex items-center lg:py-1.7 sm:block md:p-3 md:justify-between relative overflow-hidden rounded-full cursor-pointer ${
                  isDarkMode
                    ? "text-[#000000] bg-[#E9E1B4] hover:bg-[#a0a083]/[0.15] hover:text-white hover:border hover:border-[#E9E1B4]"
                    : "text-[#14213d] bg-[#ffffff] hover:bg-[#F7F7F7] hover:text-[#14213d]"
                }`}
                onClick={() => navigate("/contact")}
              >
                <h1 className="text-md lg:text-md lg:px-3">Book a Demo</h1>
                <MdArrowOutward className="md:text-lg lg:mx-3 lg:-ml-2" />
              </button>

              <User
                className={`h-5 w-5 hidden md:block cursor-pointer ${
                  isDarkMode ? "text-[#E9E1B4]" : "text-[#FFFCF2]"
                }`}
                onClick={() => navigate("/login")}
              />
            </div>
          </div>
          {/* Mobile Menu - Slide from left */}
          <div
            className={`fixed inset-y-0 left-0 h-96 rounded-rb-md transform ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } md:hidden w-64 ${
              isDarkMode
                ? "bg-black bg-opacity-90 backdrop-blur-lg z-100 border border-[#E9EDC9]"
                : "bg-[#14213D]"
            } transition-transform duration-300 ease-in-out z-50`}
          >
            <div className="p-6">
              <div className="flex justify-end items-center mb-8">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg"
                >
                  <X
                    className={`h-6 w-6 ${
                      isDarkMode ? "text-white" : "text-[#FFFCF2]"
                    }`}
                  />
                </button>
              </div>
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`block py-2 px-4 rounded-lg ${
                      location.pathname === item.path
                        ? isDarkMode
                          ? "bg-[#FFFFFF26] text-white"
                          : "bg-[#CCD5AE] text-black"
                        : isDarkMode
                        ? "text-white hover:bg-gray-800"
                        : "text-[#FFFCF2] hover:bg-[#CCD5AE]"
                    } transition-colors duration-200`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div
                  className={`flex md:hidden justify-start py-2 rounded-md px-4 backdrop-blur-lg gap-2 ${
                    isDarkMode ? "bg-[#FFFFFF26]" : "bg-[#FFFFFF26]"
                  }`}
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                >
                  <p className={`${isDarkMode ? "" : "text-[#FFFCF2] "}`}>
                    Login
                  </p>
                  <User
                    className={`h-5 w-5 cursor-pointer ${
                      isDarkMode ? "text-[#E9E1B4]" : "text-[#FFFCF2]"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
          {isMenuOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
              onClick={() => setIsMenuOpen(false)}
            />
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
