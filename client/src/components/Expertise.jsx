import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import ExpertiseSection from "./expertise/ExpertiseSection";
import HTML from "../assets/tech/html.png";
import CSS from "../assets/tech/css.png";
import JavaScript from "../assets/tech/javascript.png";
import Reactjs from "../assets/tech/reactjs.png";
import Redux from "../assets/tech/redux.png";
import Tailwind from "../assets/tech/tailwind.png";
import Nodejs from "../assets/tech/nodejs.png";
import Mongodb from "../assets/tech/mongodb.png";
import SEO from "../assets/tech/seo.png";
import SocialMedia from "../assets/tech/socialmedia.png";
import Analytics from "../assets/tech/analytics.png";
import Content from "../assets/tech/content.png";
import Email from "../assets/tech/email.png";
import PPC from "../assets/tech/ppc.png";
import Strategy from "../assets/tech/strategy.png";
import Figma from "../assets/tech/figma.png";
import Photoshop from "../assets/tech/photoshop.png";
import Adobe from "../assets/tech/adobe.png";

function Expertise() {
  const { isDarkMode } = useTheme();
  const [visibleSections, setVisibleSections] = useState([0]);
  const navigate = useNavigate();

  const webDevelopment = [
    { img: HTML, color: "text-orange-400", name: "Html", progress: 50 },
    { img: CSS, color: "text-blue-600", name: "Css", progress: 60 },
    { img: JavaScript, color: "text-yellow-400", name: "JavaScript", progress: 70 },
    { img: Reactjs, color: "text-cyan-400", name: "React.js", progress: 75 },
    { img: Nodejs, color: "text-green-700", name: "Node.js", progress: 60 },
    { img: Mongodb, color: "text-green-400", name: "MongoDB", progress: 65 },
    { img: Tailwind, color: "text-cyan-500", name: "Tailwind Css", progress: 75 },
    { img: Redux, color: "text-purple-600", name: "Next.js", progress: 70 },
  ];

  const digitalMarketing = [
    { img: SEO, color: "text-yellow-400", name: "SEO", progress: 65 },
    { img: SocialMedia, color: "text-blue-400", name: "Social Media", progress: 60 },
    { img: Analytics, color: "text-green-400", name: "Analytics", progress: 55 },
    { img: Content, color: "text-blue-200", name: "Content", progress: 70 },
    { img: Email, color: "text-yellow-400", name: "Email Marketing", progress: 50 },
    { img: PPC, color: "text-blue-400", name: "PPC", progress: 55 },
    { img: Strategy, color: "text-green-400", name: "Strategy", progress: 65 },
  ];

  const uiUxDevelopment = [
    { img: Photoshop, color: "text-yellow-400", name: "UI Design", progress: 40 },
    { img: Figma, color: "text-blue-400", name: "Figma", progress: 65 },
    { img: Adobe, color: "text-green-400", name: "Wireframing", progress: 50 },
  ];

  const digitalMarketing1 = [
    { img: SEO, color: "text-yellow-400", name: "SEO", progress: 85 },
    { img: SocialMedia, color: "text-blue-400", name: "Social Media", progress: 40 },
    { img: Analytics, color: "text-green-400", name: "Analytics", progress: 55 },
  ];

  const sections = [
    { title: "Web Development Expertise", icons: webDevelopment },
    { title: "Digital Marketing Expertise", icons: digitalMarketing },
  ];

  const section1 = [
    { title: "UI/UX Development Expertise", icons: uiUxDevelopment },
    { title: "Digital Marketing Expertise", icons: digitalMarketing1 },
  ];

  useEffect(() => {
    const lastVisibleSection = visibleSections[visibleSections.length - 1];
    if (lastVisibleSection < sections.length - 1) {
      const timer = setTimeout(() => {
        const nextSection = lastVisibleSection + 1;
        setVisibleSections((prev) => [...prev, nextSection]);
      }, (sections[lastVisibleSection].icons.length + 1) * 1000);
      return () => clearTimeout(timer);
    }
  }, [visibleSections, sections.length]);

  return (
    <section className={`mt-14 py-10`}>
      <div className={`md:mx-2 lg:mx-20 p-4 rounded-2xl`}>
        <h1
          className={`text-3xl mx-4 lg:mx-6 md:text-4xl font-medium ${
            isDarkMode ? "text-[#e9e1b4]" : "text-[#14213d]"
          }`}
          style={{ fontFamily: "Inria Sans" }}
        >
          Expertise
        </h1>
        <div className="space-y-16">
          <div
            className={`${
              isDarkMode ? "bg-[#FFFFFF26]" : "bg-[#f7f7f7]"
            } p-4 rounded-2xl mt-6`}
          >
            <h2
              className={`text-3xl pb-6 md:text-4xl font-medium ${
                isDarkMode ? "text-[#e9e1b4]" : "text-[#14213d]"
              }`}
              style={{ fontFamily: "Inria Sans" }}
            >
              Tech Expertise
            </h2>
            {sections.map((section, index) => (
              <ExpertiseSection
                key={index}
                title={
                  <span
                    className="w-full"
                    style={{
                      background: isDarkMode
                        ? "linear-gradient(90deg, #c9c08f 0%, rgba(131, 127, 101, 0) 40%)"
                        : "linear-gradient(90deg, #ffffff 0%, rgba(131, 127, 101, 0) 40%)",
                      backgroundSize: "100% 100%",
                      backgroundPosition: "0 0",
                      fontSize: "1rem",
                      padding: "1rem",
                      borderTopLeftRadius: "0.5rem",
                      borderBottomLeftRadius: "0.5rem",
                      display: "inline-block",
                    }}
                  >
                    {section.title}
                  </span>
                }
                icons={section.icons}
                isVisible={visibleSections.includes(index)}
              />
            ))}
          </div>

           {/**if you want to remove First part comment from here  **/}

          <div className="w-full py-24">
            <div
              className={`py-10 px-6 lg:h-[72vh] md:px-20 rounded-2xl md:mx-auto flex flex-col md:flex-row items-center justify-center placeholder:bg-cover bg-no-repeat bg-center ${
                isDarkMode ? "bg-[#e9e1b4]" : "border-[#14213d] border"
              }`}
            >
              <div
                className={`md:text-center mb-6 md:mb-0 text-center ${
                  isDarkMode ? "text-[#000000]" : "text-[#14213d]"
                }`}
              >
                <h2
                  className="text-xl md:text-4xl font-semibold mb-4"
                  style={{ fontFamily: "Inter" }}
                >
                  Have a vision for a project but need the right expertise to bring
                  it to reality?
                </h2>
                <h2 className="text-xl md:text-4xl font-medium mb-4">
                  Let's connect and make it happen!
                </h2>
                <p
                  className="md:text-xl mb-6 md:max-w-3xl lg:max-w-5xl mx-auto md:mt-6"
                  style={{ fontFamily: "Inter" }}
                >
                  "Reach out to us today to discuss your project ideas and discover
                  how our innovative solutions can bring your vision to life!"
                </p>
                <div className="text-center md:py-4">
                  <button
                    className={`font-medium py-3 md:py-4 md:px-8  px-6 rounded-full ${
                      isDarkMode
                        ? "bg-[#000000] text-[#ffffff] hover:bg-[#ffffff]/[0.15] hover:text-white hover:border hover:border-[#E9E1B4]"
                        : "bg-[#14213d] text-[white]  hover:bg-[#F7F7F7] hover:border hover:border-[#14213d] hover:text-[#14213d]"
                    }`}
                    onClick={() => navigate("/contact")}
                    style={{ fontFamily: "Inter" }}
                  >
                    Start Project
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/**if you want to remove second part comment from here  **/}

          <div
            className={`${
              isDarkMode ? "bg-[#FFFFFF26]" : "bg-[#f7f7f7]"
            } p-4 rounded-2xl mt-6 `}
          >
            {section1.map((section, index) => (
              <ExpertiseSection
                key={index}
                title={
                  <span
                    className="w-full"
                    style={{
                      background: isDarkMode
                        ? "linear-gradient(90deg, #c9c08f 0%, rgba(131, 127, 101, 0) 40%)"
                        : "linear-gradient(90deg, #ffffff 0%, rgba(131, 127, 101, 0) 40%)",
                      backgroundSize: "100% 100%",
                      backgroundPosition: "0 0",
                      fontSize: "1rem",
                      padding: "1rem",
                      borderTopLeftRadius: "0.5rem",
                      borderBottomLeftRadius: "0.5rem",
                      display: "inline-block",
                    }}
                  >
                    {section.title}
                  </span>
                }
                icons={section.icons}
                isVisible={visibleSections.includes(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Expertise;