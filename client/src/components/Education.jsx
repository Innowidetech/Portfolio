import React, { useEffect } from "react";
import { GraduationCap } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import AOS from "aos";
import "aos/dist/aos.css";

const Education = () => {
  const { isDarkMode } = useTheme();

  const educationData = [
    {
      degree: "MSc in Computer Science, University College London",
      college:
        "University College London sjkdhfjs df sdha dfhs dfjsdhf asjdf f shd fjhsd f sjda dfdsfhdf sdfjs dfh sjdf  sdf ",
    },
    {
      degree: "BSc Maths and Physics, Imperial College London",
      college: "Imperial College London sjkdhfjs df sdha dfhs dfjsdhf asjdf f shd fjhsd f sjda dfdsfhdf sdfjs dfh sjdf  sdf ",
    },
    {
      degree: "MSc in Computer Science, University College London",
      college: "University College London sjkdhfjs df sdha dfhs dfjsdhf asjdf f shd fjhsd f sjda dfdsfhdf sdfjs dfh sjdf  sdf ",
    },
  ];

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

  return (
    <section className="mt-14 py-10" data-aos="fade-right">
      <div style={{ fontFamily: "Inria Sans" }}>
        <div
          className={`lg:grid  ${
            isDarkMode ? "bg-[#FFFFFF26]" : "bg-[#f7f7f7] "
          } p-6 rounded-2xl mx-4 md:mx-6 lg:mx-24`}
        >
          <h1
            className={`text-3xl md:text-4xl font-medium ${
              isDarkMode ? "text-[#e9e1b4]" : "text-[#14213d]"
            }`}
            style={{ fontFamily: "Inria Sans" }}
          >
            Education
          </h1>

          <div className="space-y-6 py-10 md:mx-6 lg:mx-20 md:p-6 lg:pb-20 lg:pt-14">
            {educationData.map((item, index) => (
              <div
                key={index}
                data-aos="slide-up"
                data-aos-delay={`${index * 100}`}
                className={`flex justify-between items-center border-b ${
                  isDarkMode ? "border-[#FFFADF]" : "border-[#14213d]"
                } pb-4 lg:-mt-10`}
              >
                <div className="flex items-center space-x-4">
                  <GraduationCap
                    className={`h-6 w-6 md:h-10 md:w-10 lg:w-14 lg:h-14 ${
                      isDarkMode ? "text-[#E9E1B4]" : "text-[#14213d]"
                    }`}
                  />
                </div>
                <div className="ml-5 md:w-[400px] lg:w-[500px] collegeName ">
                  <span
                    className={`text-xs md:text-md lg:text-xl  ${
                      isDarkMode ? "text-white" : "text-[#14213d]"
                    }`}
                  >
                    {item.degree}
                  </span>
                </div>
                <div className="md:w-[300px] lg:w-[500px] w-[250px] lg:max-w-md md:flex md:justify-end collegeName1">
                  <span
                    className={`text-xs md:text-md lg:text-xl ${
                      isDarkMode ? "text-[#CACACA]" : "text-[#14213d]"
                    }`}
                  >
                    {item.college}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
