import React, { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import RotatingIcons from "../components/RotatingIcons/RotatingIcons";
import Expertise from "./Expertise";
import Experience from "./Experience";
import Education from "./Education";
import Testimonials from "./testimonals/Testimonials";
import "../index.css";
import { useNavigate } from "react-router-dom";
import MobileRotatingIcons from "./RotatingIcons/MobileRotatingIcons";
import RotatingText from "../components/RotatingIcons/RotatingText";
import Specialization from "./Specialization";
import Scroll from "./scroll/RightScroll";
import AOS from "aos";
import "aos/dist/aos.css";
import AnimatedButton from "./AnimatedButton";
import Certificates from "./certificates/Certificates";
import Overview from "./Overview";
import { FaLocationArrow } from "react-icons/fa6";

const Home = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const projectSectionRef = useRef(null);
  const [isProjectSectionVisible, setIsProjectSectionVisible] = useState(false);

  const projects = [
    "LiveScar",
    "CareerLoom",
    "SuperCard",
    "ProjectX",
    "DevFlow",
    "CodeCraft",
    "WebMaster",
    "Portfolio",
    "Shikshamitra",
    "Shivam Trading",
    "Marina Shipping",
    "Playscape",
    "Katie",
  ];

  const text = "Shiva Raj";
  const [currentText, setCurrentText] = useState("");
  const [isAdding, setIsAdding] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsProjectSectionVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      }
    );

    if (projectSectionRef.current) {
      observer.observe(projectSectionRef.current);
    }

    return () => {
      if (projectSectionRef.current) {
        observer.unobserve(projectSectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });

    if (isPaused) return;

    intervalRef.current = setInterval(() => {
      if (isAdding) {
        setCurrentText((prevText) => {
          const newText = text.slice(0, prevText.length + 1);
          if (newText.length === text.length) {
            setIsAdding(false);
            setIsPaused(true);
            setTimeout(() => setIsPaused(false), 500);
          }
          return newText;
        });
      } else {
        setCurrentText((prevText) => {
          const newText = prevText.slice(0, -1);
          if (newText.length === 0) {
            setIsAdding(true);
          }
          return newText;
        });
      }
    }, 200);

    return () => clearInterval(intervalRef.current);
  }, [isAdding, isPaused]);

  const stats = [
    { value: "25+", label: "Clients" },
    { value: "4+", label: "Years of Experience" },
  ];

  const staticText = `Web development is essential in today’s digital world, involving front-end and back-end development. Front-end developers focus on the client-side, creating the elements users interact with using HTML, CSS, and JavaScript to ensure an engaging and responsive user experience. Back-end developers handle the server-side, using languages like PHP, Ruby, and Python to manage data, user authentication, and security. Full-stack developers are skilled in both areas, allowing them to create complete websites and applications.`;

  const words = staticText.split(/\s+/);
  const maxWords = 75;

  const truncatedText =
    words.length > maxWords ? words.slice(0, maxWords).join(" ") : staticText;

  return (
    <>
      <div className="overflow-x-hidden md:overflow-x-visible">
        <section className="py-10 lg:mx-14 md:mx-4 lg:h-[80vh] lg:mt-14">
          <div className="lg:px-10 px-4">
            <div className="flex flex-col-reverse lg:flex-row items-center lg:justify-between">
              <div
                className="w-full lg:w-1/2 text-center md:text-left"
                style={{ fontFamily: "Inria Sans" }}
                data-aos="fade-left"
              >
                <h2
                  data-aos="fade-up"
                  className={`text-2xl mb-2 ${
                    isDarkMode ? "text-[#E9E1B4]" : "text-[#14213D]"
                  } `}
                >
                  Hi,
                </h2>
                <h1
                  className="text-4xl md:text-6xl font-bold mb-6 text-[#14213D] dark:text-[#E9E1B4]"
                  data-aos="fade-up"
                >
                  {"I'm"}{" "}
                  <span className="text-[#14213D] dark:text-[#E9E1B4]">
                    {currentText}
                  </span>
                  <RotatingText />
                </h1>
                <p
                  className={`md:text-xl mb-8 text-justify text-sm ${
                    isDarkMode ? "text-[#FFFFFF]" : "text-[#14213D]"
                  }`}
                  style={{ fontFamily: "Inria Sans" }}
                  data-aos="zoom-in"
                >
                  {truncatedText}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <button
                    className={`flex items-center justify-center  px-6 py-3 rounded-full md:w-40 md:py-3.5 ${
                      isDarkMode
                        ? "bg-[#E9E1B4] text-black hover:bg-[#ffffff]/[0.15] hover:text-white hover:border hover:border-[#E9E1B4]"
                        : "bg-[#14213d] text-[white] hover:bg-[#F7F7F7] hover:border hover:border-[#14213d] hover:text-[#14213d]"
                    } transition-colors duration-200`}
                    onClick={() => navigate("/contact")}
                  >
                    <span>Hire Me</span>
                  </button>

                  <button
                    className={`flex items-center justify-center px-6 py-3 rounded-full md:w-40 md:py-3.5 ${
                      isDarkMode
                        ? "bg-[#E9E1B4] text-black hover:bg-[#ffffff]/[0.15] hover:text-white hover:border hover:border-[#E9E1B4]"
                        : "bg-[#14213d] text-[white] hover:bg-[#F7F7F7] hover:border hover:border-[#14213d] hover:text-[#14213d]"
                    } transition-colors duration-200`}
                    onClick={() => navigate("/projects")}
                    whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>My Works</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="w-full md:w-1/2 md:flex md:justify-center items-center md:p-8 lg:-translate-x-16">
                <div className="">
                  <RotatingIcons />
                  <MobileRotatingIcons />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <Overview />
        </section>
        <section>
          <Specialization />
        </section>
        <section>
          <Expertise />
        </section>
        <section>
          <Experience />
        </section>
        <section>
          <Education />
        </section>
        <section>
          <Certificates />
        </section>

        <section
          ref={projectSectionRef}
          className={`md:mt-14 py-10 ${
            isDarkMode ? "" : ""
          } lg:h-[430px] md:h-[230px]`}
        >
          <div className="px-4 translate-y-6 lg:mx-20" data-aos="zoom-in-up">
            <AnimatedButton>
              <div className="flex justify-center">
                <div
                  className={`relative flex justify-center items-center text-center p-2 h-[150px] lg:min-w-full md:h-[155px] lg:h-[400px] cursor-pointer ${
                    isDarkMode
                      ? "bg-[#FFFFFF26] w-full hover:text-black"
                      : "text-[#14213D] hover:text-[#14213d]"
                  }`}
                  onClick={() => navigate("/projects")}
                >
                  {/* Title and Arrow Container */}
                  <div className="absolute top-6 lg:top-16 flex items-center gap-4">
                    <h1
                      className="text-lg md:text-xl lg:text-4xl"
                      style={{
                        WebkitTextFillColor: "transparent",
                        WebkitTextStrokeWidth: "1px",
                      }}
                    >
                      Explore My Projects
                    </h1>
                    <FaLocationArrow className="md:h-[30px] md:w-[50px]" />
                  </div>

                  {/* Falling Project Cards */}
                  {projects.map((project, index) => (
                    <div
                      key={project}
                      className={`project-card lg:mr-20 ${
                        index < 2 ? "show-mobile" : "hide-mobile"
                      } -ml-14 md:-ml-0 px-3 md:px-6 py-3 rounded-xl transform transition-transform hover:scale-105 ${
                        isProjectSectionVisible ? "visible" : ""
                      } ${
                        isDarkMode
                          ? "bg-[#2A2A2A] text-[#E9E1B4] border border-[#E9E1B4]/30 hover:bg-[#363636]"
                          : "bg-white text-[#14213D] border border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-lg md:text-xl font-bold">
                        {project}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedButton>
          </div>
        </section>

        <section className="lg:py-32">
          <Testimonials />
        </section>
        <div>
          <Scroll />
        </div>
      </div>
    </>
  );
};

export default Home;
