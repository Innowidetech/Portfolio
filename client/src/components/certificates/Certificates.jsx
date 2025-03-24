import React, { useEffect, useState } from 'react';
import CertificateBadge from './CertificateBadge';
import { useTheme } from '../../context/ThemeContext';

const certificates = [
  { id: 1, title: "Project Management Professional", year: "2022", issuedBy: "Microsoft" },
  { id: 2, title: "Agile Scrum Master", year: "2022", issuedBy: "Azure" },
  { id: 3, title: "AWS Solutions Architect", year: "2022", issuedBy: "Google" },
  { id: 4, title: "Google Cloud Professional", year: "2022", issuedBy: "Google" },
  { id: 5, title: "Azure DevOps Engineer", year: "2022", issuedBy: "Azure" },
  { id: 6, title: "Digital Marketing", year: "2022", issuedBy: "Google" }
];

const DISPLAY_TIME = 8000;
const TRANSITION_TIME = 2000;
const TOTAL_CYCLE_TIME = DISPLAY_TIME + TRANSITION_TIME;

const Certificates = () => {
  const { isDarkMode } = useTheme();
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayMode, setDisplayMode] = useState(3);

  const getDisplayMode = () => {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  useEffect(() => {
    const handleResize = () => {
      const newDisplayMode = getDisplayMode();
      if (newDisplayMode !== displayMode) {
        setDisplayMode(newDisplayMode);
        setCurrentPage(0);
        setIsTransitioning(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [displayMode]);

  useEffect(() => {
    let displayTimer;
    let transitionTimer;
    
    const startNextTransition = () => {
      setIsTransitioning(true);
      
      transitionTimer = setTimeout(() => {
        setCurrentPage((prev) => {
          const totalPages = displayMode === 1 
            ? certificates.length 
            : Math.ceil(certificates.length / displayMode);
          return (prev + 1) % totalPages;
        });
        setIsTransitioning(false);
      }, TRANSITION_TIME);
    };

    const interval = setInterval(() => {
      displayTimer = setTimeout(() => {
        startNextTransition();
      }, DISPLAY_TIME);
    }, TOTAL_CYCLE_TIME);

    displayTimer = setTimeout(() => {
      startNextTransition();
    }, DISPLAY_TIME);

    return () => {
      clearInterval(interval);
      clearTimeout(displayTimer);
      clearTimeout(transitionTimer);
    };
  }, [displayMode]);

  const getCurrentCertificates = () => {
    if (displayMode === 1) {
      return [certificates[currentPage]];
    }
    const startIndex = (currentPage * displayMode) % certificates.length;
    return certificates.slice(startIndex, startIndex + displayMode);
  };

  const getPositionClass = (index) => {
    if (displayMode !== 3) return '';
    if (index === 0) return 'certificate-left';
    if (index === 1) return 'certificate-middle';
    if (index === 2) return 'certificate-right';
    return '';
  };

  const currentCertificates = getCurrentCertificates();

  return (
    <div className="mt-14 py-10 mx-4 md:mx-6 lg:mx-28">
      <h1
        data-aos="fade-right"
        className={`text-3xl font-medium ${isDarkMode ? 'text-[#e9e1b4]' : ''}`}
        style={{ fontFamily: 'Inria Sans' }}
      >
        Certificates
      </h1>
      <div className="relative lg:mt-10">
        <div className="certificates-wrapper">
          <div
            className={`flex flex-wrap gap-8 items-center min-h-[450px] w-full transition-all duration-500 ease-in-out
              ${displayMode === 3 ? 'lg:justify-evenly' : 
                displayMode === 2 ? 'md:justify-evenly' : 
                'justify-center'}`}
          >
            {currentCertificates.map((cert, index) => (
              <div
                key={cert.id}
                className={`certificate-container ${
                  isTransitioning 
                    ? `slide-out-${displayMode}`
                    : `slide-in-${displayMode}`
                } ${getPositionClass(index)}`}
              >
                <CertificateBadge
                  title={cert.title}
                  year={cert.year}
                  issuedBy={cert.issuedBy}
                  isDarkMode={isDarkMode}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: Math.ceil(certificates.length / displayMode) }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentPage
                ? `${isDarkMode ? 'bg-[#e9e1b4]' : 'bg-[#14213d]'} w-4` 
                : 'bg-gray-300'
            }`}
            onClick={() => setCurrentPage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Certificates;