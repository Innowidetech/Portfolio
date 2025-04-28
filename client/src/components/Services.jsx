import { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useParams, useNavigate } from "react-router-dom";
import useCounter from "./UseCounter.jsx";
import Amazon from "../assets/amazon.png";
import blogfive from "../assets/blogfive.jpg";
import blogfour from "../assets/blogfour.jpg";
import WebDevelop from "../assets/webdev.png";
import Digitalmark from "../assets/digitalmark.png";
import UIUx from "../assets/uiux.png";
import Devops from "../assets/devops.png";
import Scroll from "../components/scroll/RightScroll";
import { Lightbulb, Rocket, LineChart } from "lucide-react";
import { HiOutlineMailOpen } from "react-icons/hi";
import AOS from "aos";
import "aos/dist/aos.css";
import Shivdhara from "../assets/shivadhara.png";
import Amrit from "../assets/amrit.png";
import Superior from "../assets/superior.png";
import Innowide from "../assets/innowide.png";
import PlayScape from "../assets/playscape.png";
import Shivam from "../assets/shivam.png";
import { GoArrowUpRight } from "react-icons/go";

const DEFAULT_SERVICE = "web-dev";

const stats = [
  { id: 1, label: "Years Of Experience", value: 4 },
  { id: 2, label: "Completed Projects", value: 90 },
  { id: 3, label: "Worldwide Clients", value: 100 },
];

const services = [
  {
    id: "web-dev",
    name: "Web Development ",
    image: WebDevelop,
    description:
      "We offer expert web development services that are tailored to meet your business needs. From building custom websites to enhancing existing platforms, we focus on delivering fast, responsive, and scalable solutions. Our team ensures that every website is designed to be functional, user-friendly, and aligned with your objectives.",
    buttons: [
      "WordPress Development",
      "Shopify Development",
      "Ecommerce",
      "CRM",
      "LMS",
      "drs",
      "rgr",
    ],
    clientImages: [Amazon, blogfive, blogfour],
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    image: Digitalmark,
    description:
      "Our digital marketing services aim to help you grow your online presence and increase conversions. By utilizing a variety of strategies including search engine optimization (SEO), pay-per-click (PPC) advertising, and social media campaigns, we make sure that your brand reaches its target audience effectively and efficiently.",
    buttons: [
      "SEO",
      "Social Media Marketing",
      "Email Marketing",
      "Mobile Marketing",
      "SEM",
    ],
    clientImages: [Amazon, blogfive, blogfour],
  },
  {
    id: "uiux-design",
    name: "UI/UX Development",
    image: UIUx,
    description:
      "We create visually appealing and user-friendly designs that enhance the customer experience. Our UI/UX development team focuses on building interfaces that are intuitive, easy to navigate, and designed to drive user engagement. We ensure that every design decision is made with the end-user in mind to maximize usability.",
    buttons: ["Prototyping", "User Research", "Figma", "PhotShop"],
    clientImages: [Amazon, blogfive, blogfour],
  },
  {
    id: "devops",
    name: "DevOps",
    image: Devops,
    description:
      "Our DevOps services streamline the development and operational process, enabling faster and more reliable delivery of software. By integrating continuous integration and continuous delivery (CI/CD) practices, we ensure that your digital infrastructure is scalable, efficient, and ready for rapid growth.",
    buttons: ["CI/CD", "Cloud Deployment", "AWS", "Azure"],
    clientImages: [Amazon, blogfive, blogfour],
  },
];

const clientLogos = [Shivdhara, Amrit, Superior, Innowide, PlayScape, Shivam];

export default function WebServices() {
  const { service } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const statsRef = useRef(null);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [currentService, setCurrentService] = useState(DEFAULT_SERVICE);
  const [currentLogoIndices, setCurrentLogoIndices] = useState(
    Array(7)
      .fill(0)
      .map((_, i) => i)
  );
  const [displayText, setDisplayText] = useState("");
  const [transformDisplayText, setTransformDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isTransformTypingComplete, setIsTransformTypingComplete] =
    useState(false);
  const typingRef = useRef(null);
  const transformTypingRef = useRef(null);

  const fullText =
    "Collaboration drives success. We partner with leading businesses, delivering innovative solutions that transform ideas into reality, enhance brand presence, and drive growth. By fostering creativity and leveraging cutting-edge technology, we empower companies to stay ahead of the competition, build strong customer connections, and achieve long-term success in their industries.";

  const transformText =
    "I specialize in crafting intuitive and visually engaging digital experiences. With a keen eye for design and a passion for innovation, I transform ideas into functional and aesthetically pleasing solutions. Whether it's UI/UX design, web development, or creative problem-solving, I strive to create meaningful interactions that leave a lasting impact.";

  useEffect(() => {
    let currentIndex = 0;
    if (typingRef.current) return;

    typingRef.current = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingRef.current);
        typingRef.current = null;
        setIsTypingComplete(true);
      }
    }, 30);

    return () => {
      if (typingRef.current) {
        clearInterval(typingRef.current);
        typingRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    if (transformTypingRef.current) return;

    transformTypingRef.current = setInterval(() => {
      if (currentIndex <= transformText.length) {
        setTransformDisplayText(transformText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(transformTypingRef.current);
        transformTypingRef.current = null;
        setIsTransformTypingComplete(true);
      }
    }, 30);

    return () => {
      if (transformTypingRef.current) {
        clearInterval(transformTypingRef.current);
        transformTypingRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndices((prevIndices) => {
        return prevIndices.map(
          (currentIndex) => (currentIndex + 1) % clientLogos.length
        );
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!service) {
      navigate(`/service/${DEFAULT_SERVICE}`, { replace: true });
      return;
    }

    const serviceExists = services.some((s) => s.id === service);
    if (!serviceExists) {
      navigate(`/service/${DEFAULT_SERVICE}`, { replace: true });
      return;
    }

    setCurrentService(service);
  }, [service, navigate]);

  const activeService =
    services.find((s) => s.id === currentService) || services[0];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStatsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const counters = stats.map((stat) =>
    useCounter({
      end: stat.value,
      startOnView: true,
      duration: 2000,
    })
  );

  const handleServiceChange = (newService) => {
    navigate(`/service/${newService.id}`);
    setCurrentService(newService.id);
  };

  const createButtonRows = (buttons) => {
    const mobileRows = [];
    const tabletRows = [];
    const desktopRows = [];

    for (let i = 0; i < buttons.length; i++) {
      mobileRows.push([buttons[i]]);
    }

    for (let i = 0; i < buttons.length; i += 3) {
      tabletRows.push(buttons.slice(i, i + 3));
    }

    for (let i = 0; i < buttons.length; i += 5) {
      desktopRows.push(buttons.slice(i, i + 5));
    }

    return { mobileRows, tabletRows, desktopRows };
  };

  const { mobileRows, tabletRows, desktopRows } = createButtonRows(
    activeService.buttons
  );

  if (!activeService) {
    return null;
  }

  return (
    <>
      <div className="mt-14 lg:mx-20 relative">
        <h2 className="ml-6 relative">
          <span
            className={`text-xl md:text-4xl lg:text-7xl font-medium ${
              isDarkMode ? "text-[#e9e1b4] " : ""
            }`}
          >
            {activeService.name.split("").map((letter, letterIndex) => (
              <span
                key={letterIndex}
                style={{
                  display: "inline-block",
                  opacity: 0,
                  animation: `falling 1s forwards ${
                    letterIndex * 0.1
                  }s, fadeIn 1s forwards ${letterIndex * 0.1}s`,
                }}
              >
                {letter}
              </span>
            ))}
          </span>
          <span
            className={`text-center text-[3rem] md:text-[6rem] lg:text-[12rem] -mt-6 ml-16 md:ml-0 md:-mt-14 lg:-mt-24 top-[4rem] md:top-[5rem] lg:top-[7rem]  ${
              isDarkMode ? "text-[#e9e1b4] opacity-55" : ""
            }`}
            style={{
              position: "absolute",
              left: "calc(50% - 50px)",
              transform: "translateX(-40%)",
            }}
          >
            Services
          </span>
        </h2>
      </div>

      <div className="min-h-screen mt-14 px-4 sm:px-6 py-10 md:py-14 lg:py-20 lg:px-8 xl:px-0 md:overflow-x-visible">
        <div className="">
          <div className="lg:mx-24 mt-14">
            <div className="md:flex md:space-x-8 lg:space-x-12">
              {/* Left Side Menu */}
              <div className=" space-y-4 md:space-y-6">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceChange(service)}
                    className={`block w-full text-left px-6 py-3 md:text-lg rounded-full transition-all duration-300  ${
                      activeService.id === service.id
                        ? isDarkMode
                          ? "bg-[#FFFFFF26] text-[#e9e1b4]"
                          : "bg-[#14213d] text-[#ffffff]"
                        : isDarkMode
                        ? "hover:bg-[#ffffff26] hover:border-[#e9e1b4] hover:border-2 hover:text-white"
                        : "hover:bg-[white] hover:border-2 hover:border-[#14213d] hover:text-[#14213d]"
                    }`}
                  >
                    {service.name}
                  </button>
                ))}
              </div>

              {/* Right Side Content */}
              <div className="md:w-2/3 lg:w-3/10 mt-6 md:mt-0">
                <div className="rounded-2xl overflow-hidden lg:ml-20">
                  <img
                    src={activeService.image}
                    alt={activeService.name}
                    className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-fill rounded-2xl"
                    data-aos="zoom-in-up"
                  />
                </div>
              </div>
            </div>

            <div className="mt-14 py-10">
              <h2
                className={`text-2xl md:text-3xl lg:text-4xl font-medium text-center mb-4 md:mb-6 lg:mb-10 ${
                  isDarkMode ? "text-[#e9e1b4]" : "text-[#14213d]"
                }`}
                data-aos="zoom-in"
              >
                {activeService.name}
              </h2>
              <p
                className={`text-lg md:text-xl lg:text-2xl text-justify mb-4 md:mb-6 lg:mb-10 ${
                  isDarkMode ? "text-[#E3D5A7]" : "text-[#14213D]"
                }`}
                style={{ fontFamily: "Inria Sans" }}
                data-aos="zoom-in"
              >
                {activeService.description}
              </p>

              <div className="space-y-6">
                {/* Mobile view */}
                <div className="block md:hidden">
                  {mobileRows.map((row, rowIndex) => (
                    <div
                      key={`mobile-row-${rowIndex}`}
                      className="flex justify-center mb-6"
                    >
                      <button
                        data-aos="flip-down"
                        data-aos-delay={rowIndex * 100}
                        className={`px-6 py-4 border rounded-full transition-all duration-300 w-full max-w-[280px] ${
                          isDarkMode
                            ? "border-[#e9e1b4] bg-[#FFFFFF26] hover:bg-[#FFFFFF35]"
                            : "border-[#14213d] hover:bg-[#14213d] hover:text-white"
                        }`}
                      >
                        {row[0]}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Tablet view */}
                <div className="hidden md:block lg:hidden">
                  {tabletRows.map((row, rowIndex) => (
                    <div
                      key={`tablet-row-${rowIndex}`}
                      className="flex justify-center mb-6"
                    >
                      <div className="flex gap-6 justify-center">
                        {row.map((btn, index) => (
                          <button
                            key={index}
                            data-aos="flip-down"
                            data-aos-delay={index * 100 + rowIndex * 300}
                            className={`px-6 py-4 border rounded-full transition-all duration-300 h-16 w-[180px] ${
                              isDarkMode
                                ? "border-[#e9e1b4] bg-[#FFFFFF26] hover:bg-[#FFFFFF35]"
                                : "border-[#14213d] hover:bg-[#14213d] hover:text-white"
                            }`}
                          >
                            {btn}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop view */}
                <div className="hidden lg:block">
                  {desktopRows.map((row, rowIndex) => (
                    <div
                      key={`desktop-row-${rowIndex}`}
                      className="flex justify-center mb-6"
                    >
                      <div className="flex gap-6 justify-center">
                        {row.map((btn, index) => (
                          <button
                            key={index}
                            data-aos="flip-down"
                            data-aos-delay={index * 100 + rowIndex * 500}
                            className={`px-6 py-4 border rounded-full transition-all duration-300 h-16 lg:w-[240px] ${
                              isDarkMode
                                ? "border-[#e9e1b4] bg-[#FFFFFF26] hover:bg-[#FFFFFF35] border-2"
                                : "border-[#14213d] hover:bg-[#14213d] hover:text-white"
                            }`}
                          >
                            {btn}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14 md:py-10 lg:mx-24 mx-4">
        <div
          ref={statsRef}
          className={`rounded-2xl p-8 md:p-10 lg:p-12 lg:h-[400px] flex items-center ${
            isDarkMode ? "bg-[#e9e1b4]" : "bg-[#f7f7f7]"
          }`}
        >
          <div className="md:flex md:justify-evenly w-full">
            {stats.map((stat, index) => (
              <div
                key={stat.id}
                className={`${
                  isDarkMode ? "text-black" : ""
                } flex flex-col items-center md:items-center pb-4 md:pb-0`}
              >
                <div ref={counters[index].counterRef}>
                  <h1 className="text-center md:text-4xl text-xl font-medium md:mb-4">
                    {counters[index].count}+
                  </h1>
                </div>
                <label className="lg:text-3xl text-center">{stat.label}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-14 py-10 lg:mx-24 mx-4">
        <div className={`text-center mx-auto`}>
          <h1
            className={`text-2xl lg:text-3xl font-medium ${
              isDarkMode ? "text-[#e9e1b4]" : "text-[#14213d]"
            }`}
          >
            Transforming Ideas into Reality
          </h1>
          <h2
            className={`mt-10 py-6 text-justify md:text-lg lg:text-xl md:font-medium max-w-7xl mx-auto ${
              isDarkMode ? "text-[#ffffff]" : "text-[#14213D]"
            }`}
            style={{ fontFamily: "Inria Sans" }}
          >
            {transformDisplayText}
            {isTransformTypingComplete && (
              <span className="animate-blink cursor">|</span>
            )}
          </h2>
        </div>
        <div
          className="md:flex gap-4 p-4 justify-evenly mt-10 py-10"
          data-aos="zoom-in"
        >
          <div
            className={`flex items-center border rounded-lg p-4 gap-4 ${
              isDarkMode
                ? "border-[#e9e1b4] bg-[#FFFFFF26]"
                : "border-[#14213d] bg-[#f7f7f7]"
            }`}
          >
            <div
              className={`p-3 rounded-full ${
                isDarkMode ? "bg-[#e9e1b4]" : "bg-[#14213d]"
              }`}
            >
              <Lightbulb className="w-12 h-12 text-blue-600" />
            </div>
            <div className="grid">
              <h1
                className={`md:text-xl ${
                  isDarkMode ? "text-[#e9e1b4]" : "text-[#14213d]"
                }`}
              >
                Understanding & Strategy
              </h1>
            </div>
          </div>

          <div
            className={`flex items-center border rounded-lg p-4 gap-4 mt-6 md:mt-0 ${
              isDarkMode
                ? "border-[#e9e1b4] bg-[#FFFFFF26]"
                : "border-[#14213d] bg-[#f7f7f7]"
            }`}
          >
            <div
              className={`p-3 rounded-full ${
                isDarkMode ? "bg-[#e9e1b4]" : "bg-[#14213d]"
              }`}
            >
              <Rocket className="w-12 h-12 text-green-600" />
            </div>
            <div className="grid">
              <h1
                className={`md:text-xl ${
                  isDarkMode ? "text-[#e9e1b4]" : "text-[#14213d]"
                }`}
              >
                Innovation & Execution
              </h1>
            </div>
          </div>

          <div
            className={`flex items-center border rounded-lg p-4 gap-4 mt-6 md:mt-0 ${
              isDarkMode
                ? "border-[#e9e1b4] bg-[#FFFFFF26]"
                : "border-[#14213d] bg-[#f7f7f7]"
            }`}
          >
            <div
              className={`p-3 rounded-full ${
                isDarkMode ? "bg-[#e9e1b4]" : "bg-[#14213d]"
              }`}
            >
              <LineChart className="w-12 h-12 text-red-600" />
            </div>
            <div className="grid">
              <h1
                className={`md:text-xl ${
                  isDarkMode ? "text-[#e9e1b4]" : "text-[#14213d]"
                }`}
              >
                Results & Growth
              </h1>
            </div>
          </div>
        </div>
        <hr
          className={`mt-12 max-w-7xl lg:mx-auto border-t mx-4 ${
            isDarkMode ? "border-[#e9e1b4]" : "border-[#14213d]"
          }`}
        />
      </div>

      <div className="text-center grid py-6">
        <h1
          className={`text-xl md:text-2xl lg:text-3xl ${
            isDarkMode ? "text-white" : ""
          }`}
        >
          Let's start a conversation!
        </h1>
        <div className="flex justify-center mt-6 mb-10 py-6">
          <button
            className={`flex items-center justify-center gap-2 px-4 py-2 lg:py-3.5 w-[200px] md:w-auto text-sm rounded-full shadow-md transition-all 
              ${
                isDarkMode
                  ? "text-[#000000] bg-[#E9E1B4] hover:bg-[#ffffff]/[0.15] hover:text-white hover:border hover:border-[#E9E1B4]"
                  : "text-[#0B2945] bg-[#ffffff] hover:bg-[#F7F7F7] hover:border hover:border-[#14213d] hover:text-[#14213d]"
              }`}
            onClick={() => navigate("/contact")}
          >
            <span className="text-xs md:text-lg font-medium">
              Let’s engage in a conversation!
            </span>
            <GoArrowUpRight className="text-xl font-medium" />
          </button>
        </div>
      </div>

      <div className="lg:mx-24 mx-4 mb-16">
        <div className={`text-center mx-auto mb-10`}>
          <h1
            className={`text-2xl lg:text-3xl font-medium ${
              isDarkMode ? "text-[#e9e1b4]" : "text-[#14213d]"
            }`}
          >
            Clients
          </h1>
          <h2
            className={`mt-10 py-6 text-justify md:text-lg lg:text-xl md:font-medium max-w-7xl mx-auto ${
              isDarkMode ? "text-[#ffffff]" : "text-[#14213D]"
            }`}
            style={{ fontFamily: "Inria Sans" }}
          >
            {displayText}
            {isTypingComplete && (
              <span className="animate-blink cursor">|</span>
            )}
          </h2>
        </div>

        <div className="py-4">
          <div
            className={`relative overflow-hidden py-20 ${
              isDarkMode ? "bg-[#FFFFFF26]" : "bg-[#f7f7f7]"
            }`}
          >
            {/* Mobile and Tablet View */}
            <div className="lg:hidden flex justify-evenly items-center py-8">
              {currentLogoIndices.slice(0, 3).map((logoIndex, position) => (
                <div
                  key={`logo-${position}`}
                  className={`mx-4 flex items-center justify-center p-2 
                    h-[60px] w-[60px] md:h-28 md:w-48  
                    rounded-lg ${isDarkMode ? "" : ""}`}
                >
                  <img
                    src={clientLogos[logoIndex]}
                    alt={`Client ${logoIndex + 1}`}
                    className={`max-h-16 max-w-16 p-1 md:max-h-20 md:max-w-40 object-contain transition-opacity duration-500 ${
                      isDarkMode
                        ? "bg-[#e9e1b4] rounded-full"
                        : "bg-[#14213D40] rounded-full"
                    }`}
                    style={{ opacity: 1 }}
                  />
                </div>
              ))}
            </div>

            {/* Desktop View */}
            <div className="hidden lg:flex justify-evenly items-center py-8">
              {currentLogoIndices.slice(0, 4).map((logoIndex, position) => (
                <div
                  key={`logo-${position}`}
                  className={`mx-4 flex items-center justify-center p-2 
        h-28 w-48  
        rounded-lg`}
                >
                  {/* Wrapper div to control background size */}
                  <div
                    className={`flex items-center justify-center p-4 rounded-full 
          ${isDarkMode ? "bg-[#e9e1b4]" : "bg-[#14213D40]"}`}
                    style={{ height: "160px", width: "160px" }}
                  >
                    <img
                      src={clientLogos[logoIndex]}
                      alt={`Client ${logoIndex + 1}`}
                      className="max-h-20 max-w-40 p-1 object-contain transition-opacity duration-500"
                      style={{ opacity: 1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <Scroll />
      </div>
    </>
  );
}
