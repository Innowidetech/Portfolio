import React, { useState, useEffect } from "react";
import { ExternalLink, Github } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import AOS from "aos";
import "aos/dist/aos.css";

const ProjectList = () => {
  const { isDarkMode } = useTheme();

  const projectData = [
    {
      title: "Personal Portfolio Website",
      description:
        "Built a sleek and interactive portfolio to showcase skills, projects, and achievements. Features a minimalist design, smooth animations, and a dark mode toggle for an enhanced user experience.",
      technologies: ["React", "Tailwind CSS", "Node.js"],
      link: "https://portfolio.example.com",
      github: "https://github.com/username/portfolio",
    },
    {
      title: "E-commerce Platform",
      description:
        "Developed a full-fledged online shopping platform with secure authentication, personalized recommendations, and real-time order tracking.",
      technologies: ["React", "Redux", "Firebase"],
      link: "https://ecommerce.example.com",
      github: "https://github.com/username/ecommerce",
    },
    {
      title: "Weather App",
      description:
        "Created an advanced weather forecasting app providing real-time temperature, humidity, and precipitation data. Integrated geolocation for automatic location-based updates.",
      technologies: ["React", "OpenAPI", "Redux"],
      link: "https://weatherapp.example.com",
      github: "https://github.com/username/weather-app",
    },
    
  ];

  // Technology color mapping
  const techColors = {
    React: "text-blue-500",
    "Tailwind CSS": "text-teal-500",
    "Node.js": "text-green-500",
    Redux: "text-purple-500",
    Firebase: "text-orange-500",
    OpenAPI: "text-red-500",
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
    return () => {
      AOS.refreshHard();
    };
  }, []);

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleDescription = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-10 md:mx-2">
      <div className={`lg:mx-14 px-4`} style={{ fontFamily: "Inria Sans" }}>
        <h2
          data-aos="fade-right"
          className={`text-4xl md:py-10 md:text-5xl font-medium text-center mb-16 ${
            isDarkMode ? "text-[#E3D5A7]" : "text-[#14213D]"
          }`}
        >
          List Of Projects
        </h2>
        <div className={`space-y-6`}>
          {projectData.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              // data-aos-delay={index * 500}
              className={`p-6 rounded-lg transition-all duration-300 border  ${
                isDarkMode
                  ? "bg-[#FFFFFF15] border border-[#E9E1B4]"
                  : "bg-[#f7f7f7] border-[#14213d] hover:bg-gray-50"
              }`}
            >
              <div className="flex md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3
                    className={`text-sm md:text-xl lg:text-2xl font-medium ${
                      isDarkMode ? "text-[#E9E1B4]" : "text-[#14213D]"
                    }`}
                    style={{ fontFamily: "Inria Sans" }}
                  >
                    {item.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 md:gap-10">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                   className="p-3 md:p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
                  >
                    <ExternalLink
                      className={`w-4 h-4 md:h-6 md:w-6 ${
                        isDarkMode ? "text-[#E9E1B4]" : "text-[#14213D]"
                      }`}
                    />
                  </a>
                  <a
                    href={item.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`transition-transform hover:scale-110 ${
                      isDarkMode
                        ? "border border-[#E9E1B4] p-2 rounded-full"
                        : "bg-[#14213D] p-2 rounded-full"
                    }`}
                  >
                    <Github
                      className={`w-5 h-5 ${
                        isDarkMode ? "text-white" : "text-white"
                      }`}
                    />
                  </a>
                </div>
              </div>
              <p
                className={`mt-4 max-w-6xl text-xs md:text-lg ${
                  isDarkMode ? "text-white" : "text-[#14213D]"
                }`}
                style={{ fontFamily: "Inria Sans" }}
              >
                {expandedIndex === index
                  ? item.description
                  : `${item.description.substring(0, 100)}...`}
              </p>
              <div className="mt-2">
                {item.description.length > 100 && (
                  <button
                    onClick={() => toggleDescription(index)}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    {expandedIndex === index ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className={`text-sm font-medium py-1 px-3 rounded-full ${
                      techColors[tech] || "text-gray-500"
                    }`}
                    style={{ fontFamily: "Inria Sans" }}
                  >
                    # {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectList;
