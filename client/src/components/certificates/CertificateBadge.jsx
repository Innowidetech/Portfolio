// import React from "react";

// const StarShape = ({ children }) => (
//   <svg width="200" height="200" viewBox="0 0 200 200" className="relative z-10">
//     <path
//       d="M100 0
//          L130 68
//          L200 68
//          L145 110
//          L170 180
//          L100 140
//          L30 180
//          L55 110
//          L0 68
//          L70 68
//          Z"
//       fill="#E9E1B4"
//       stroke="#D4CCA1"
//       strokeWidth="2"
//     />
//     <foreignObject x="30" y="40" width="140" height="120">
//       {children}
//     </foreignObject>
//   </svg>
// );

// const Ribbon = () => (
//   <div className="absolute w-96 h-12 bg-[#E9E1B4] -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//     <div className="absolute left-0 top-0 h-full w-12 bg-[#E9E1B4] transform -skew-x-[30deg] -translate-x-4"></div>
//     <div className="absolute right-0 top-0 h-full w-12 bg-[#E9E1B4] transform skew-x-[30deg] translate-x-4"></div>
//   </div>
// );

// const CertificateContent = ({ title, issuedBy, year }) => (
//   <div className="flex flex-col items-center justify-center text-center h-full">
//     <h3 className="text-[#14213D] text-lg font-bold mb-2">{title}</h3>
//     <p className="text-[#14213D] text-sm mb-1">Issued by</p>
//     <p className="text-[#14213D] text-sm mb-3">{issuedBy}</p>
//     <p className="text-[#14213D] text-lg font-semibold">{year}</p>
//   </div>
// );

// const CertificateBadge = () => {
//   const certificates = [
//     {
//       title: "Project Management Professional",
//       issuedBy: "Project Management Institute",
//       year: "2022"
//     }
//     // Add more certificates here if needed
//   ];

//   return (
//     <div className="p-8 flex flex-wrap gap-8 justify-center">
//       {certificates.map((cert, index) => (
//         <div key={index} className="relative w-72 h-72 flex items-center justify-center">
//           <div className="relative">
//             <Ribbon />
//             <StarShape>
//               <CertificateContent {...cert} />
//             </StarShape>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CertificateBadge;

import React from 'react';
import './certificates.css';
import { useTheme } from '../../context/ThemeContext';

function CertificateBadge({ title, issuedBy, year }) {
  const { isDarkMode } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center text-center h-[200px] w-[200px] md:h-[300px] md:w-[300px]">
      <div
        id="burst-12"
        className={`z-40 ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
      >
        <div className="mt-4">
          <h3 className={`${isDarkMode ? 'text-[#14213D]' : 'text-[#fffcf2]'} text-lg font-bold mb-2`}>{title}</h3>
          <p className={`${isDarkMode ? 'text-[#14213D]' : 'text-[#fffcf2]'} text-xs mb-1`}>Issued by</p>
          <p className={`${isDarkMode ? 'text-[#14213D]' : 'text-[#fffcf2]'} text-sm mb-3 font-semibold`}>{issuedBy}</p>
          <p className={`${isDarkMode ? 'text-[#14213D]' : 'text-[#fffcf2]'} text-lg font-semibold`}>{year}</p>
        </div> 
      </div>
    </div>
  );
}

export default CertificateBadge;
