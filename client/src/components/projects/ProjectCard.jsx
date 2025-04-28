import React, { useEffect, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import AOS from "aos";

const getRandomColor = () => {
  const colors = [
    "text-[#FF6347]",
    "text-[#32CD32]",
    "text-[#1E90FF]",
    "text-[#FFD700]",
    "text-[#8A2BE2]",
    "text-[#FF69B4]",
    "text-[#40E0D0]",
    "text-[#F4A300]",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const ProjectCard = ({ project, index }) => {
  const { isDarkMode } = useTheme();
  const [showFullDescription, setShowFullDescription] = useState(false); // New state to toggle description

  const tags = project.tags.split(",");

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });

    return () => {
      AOS.refresh();
    };
  }, []);

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev); // Toggle full description visibility
  };

  return (
    <div
      className={`relative group overflow-hidden rounded-lg transition-all duration-300 md:mx-6 ${
        isDarkMode
          ? "border border-[#E9E1B4] bg-[#FFFFFF26]"
          : "border border-[#14213d] bg-[#d5d4d47a] text-[#14213d]"
      }`}
      data-aos={index % 2 === 0 ? "zoom-in-up" : "zoom-in-down"}
      data-aos-delay={`${index * 100}`}
    >
      <div
        className={`relative overflow-hidden aspect-video p-2`}
      >
        <a href={project.github} target="_blank" rel="noopener noreferrer">
          <Github
            className={`${
              isDarkMode
                ? "bg-black rounded-full p-2"
                : "bg-[#14213d] text-[#f7f7f7] rounded-full border-[#e9e1b4]"
            } absolute top-14 right-6  z-10 h-10 w-10 p-2 cursor-pointer`}
          />
        </a>
        <img
          src={isDarkMode ? project.imageDark : project.imageLight}
          alt={project.title}
          className="w-full h-full object-fill transition-transform duration-300 group-hover:scale-110 transform scale-95 rounded-md"
        />
      </div>

      <div className={`bottom-0 left-0 right-0 p-6 md:p-3 lg:p-6 md:mb-2`}>
        <div className="flex items-center justify-between">
          <h3
            className={`text-xl ${
              isDarkMode ? "text-white" : "text-[#14213d]"
            }`}
          >
            {project.title}
          </h3>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
          >
            <ExternalLink
              className={`w-5 h-5 ${
                isDarkMode ? "text-[#E9E1B4]" : "text-[#14213d]"
              }`}
            />
          </a>
        </div>

        <p className={`mt-2 text-md ${isDarkMode ? "text-white" : ""}`}>
          {showFullDescription
            ? project.description
            : `${project.description.slice(0, 50)}...`}
        </p>

        {/* Toggle button for read more */}
        <button
          onClick={toggleDescription}
          className="text-sm text-[#FF6347] hover:underline mt-2"
        >
          {showFullDescription ? "Read Less" : "Read More"}
        </button>

        <div className="mt-4 grid grid-cols-2 lg:grid-cols-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`text-sm font-medium py-1 rounded-full ${getRandomColor()}`}
            >
              #{tag.trim()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
