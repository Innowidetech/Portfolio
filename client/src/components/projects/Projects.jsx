import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import ProjectCard from "./ProjectCard";
import ProjectList from "./ProjectList";
import Scroll from "../scroll/RightScroll";
import AOS from "aos";
import "aos/dist/aos.css";
// import Ecomdark from "../../assets/ecomlight.png";
import Ecomlight from "../../assets/ecomlight1.png";
import Ecomdark from '../../assets/Ecommerce.png';
import Careerloom from '../../assets/carrerloom.png';
import LivesCarelight from '../../assets/livescaredark.png';
import LivesCareDark from '../../assets/livescaredark.png';
// import shippingdark from "../../assets/shippingdark.jpg";
// import shippinglight from "../../assets/shippinglight.jpg";
// import sabjidark from "../../assets/sabjidark.jpg";
// import sabjilight from "../../assets/sabjilight.jpg";

const projectsData = [
  {
    id: 1,
    title: "Ecommerce ",
    description:
    "Developed a high-performance e-commerce platform with an intuitive UI, real-time product filtering, and a dynamic cart system. Ensured seamless navigation and secure transactions for an optimized shopping experience.",
    imageDark: Ecomdark,
    imageLight: Ecomdark,
    category: "Website",
    link: "#",
    github: "https://github.com/username/portfolio",
    tags: "Next.js,Mongodb, Node.js, Express.js, Redux, Responsive",
  },
  {
    id: 2,
    title: "Careerloom ",
    description:
    "Designed and developed a user-friendly mobile and web application for a job portal, enabling employers to post jobs, manage applications, and track candidates while allowing job seekers to apply and receive real-time updates.",
    imageDark: Careerloom,
    imageLight: Careerloom,
    category: "Website",
    link: "#",
    github: "https://github.com/username/portfolio",
    tags: "HTMX,Mongodb, Node.js, Express.js, Redux, Responsive",
  },
  {
    id: 3,
    title: "LivesCare ",
    description:
     "Designed and implemented a high-impact NGO platform with an intuitive UI, real-time donation tracking, and a dynamic volunteer management system. Ensured seamless navigation and secure transactions for an optimized user experience.",
    imageDark: LivesCareDark,
    imageLight: LivesCarelight,
    category: "Website",
    link: "#",
    github: "https://github.com/username/portfolio",
    tags: "React.js, MongoDb, Redux, Node.js, Express.js",
  },
 
];

const Projects = () => {
  const { isDarkMode } = useTheme();
  const [activeFilter, setActiveFilter] = useState("All");
  const [showProjectList, setShowProjectList] = useState(false);
  const projectListRef = useRef(null);

  const filteredProjects = projectsData.filter((project) =>
    activeFilter === "All" ? true : project.category === activeFilter
  );

  const text = "Let's Explore My Crafting Excellence";  
  const [currentText, setCurrentText] = useState("");
  const [isAdding, setIsAdding] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  
  const intervalRef = useRef(null);
  
  useEffect(() => {
    if (isPaused) return;
  
    intervalRef.current = setInterval(() => {
      if (isAdding) {
        setCurrentText((prevText) => {
          const newText = text.slice(0, prevText.length + 1);
          if (newText.length === text.length) {
            setIsAdding(false);
            setIsPaused(true);
            setTimeout(() => setIsPaused(false), 500); // Pause after complete text
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
    }, 200); // Speed of the typing effect
  
    return () => clearInterval(intervalRef.current);
  }, [isAdding, isPaused]);
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowProjectList(true);
        } else {
          setShowProjectList(false);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (projectListRef.current) {
      observer.observe(projectListRef.current);
    }

    return () => {
      if (projectListRef.current) {
        observer.unobserve(projectListRef.current);
      }
    };
  }, []);

  // const animatedText = `Let's Explore My Crafting Excellence`;

  return (
    <section className="min-h-screen py-10 overflow-x-hidden md:overflow-x-visible">
      <div className="px-4">
        <div>
          <h2
            className={`text-2xl md:text-5xl text-center font-medium mb-10 ${
              isDarkMode ? "text-[#E3D5A7]" : "text-[#14213D]"
            }`}
            style={{ fontFamily: "Inria Sans", minHeight: "65px" }}
            // data-aos="fade-right"
          >
            {currentText}
          </h2>
          <h2
            className={`text-justify md:text-2xl md:font-medium max-w-7xl mx-auto ${
              isDarkMode ? "text-[#E3D5A7]" : "text-[#14213D]"
            }`}
            // style={{ fontFamily: "Charm" }}
            style={{ fontFamily: "Inria Sans" }}
          >
            A diverse range of impactful digital projects showcases innovation
            and creativity. These initiatives leverage cutting-edge technology
            to solve real-world problems, enhance user experiences, and drive
            positive change. From interactive apps to transformative websites
            and digital campaigns, these projects highlight the power of design,
            functionality, and purpose-driven development.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:gap-10 mt-14 gap-4 md:gap-0 lg:mx-14">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div>
          <ProjectList />
        </div>
      </div>
      <div>
        <Scroll />
      </div>
    </section>
  );
};

export default Projects;
