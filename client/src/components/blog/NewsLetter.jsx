import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Send } from 'lucide-react';
import Dog from '../../assets/dog.png';


const NewsletterSubscribe = () => {
  const { isDarkMode } = useTheme();

  return (
    <div 
    className={`p-8 ${
      isDarkMode ? 'bg-[#262626]' : 'bg-[#14213D]'
    }`}>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-2/3 w-full">
          <h3 className={`text-2xl font-semibold mb-2 ${
            isDarkMode ? 'text-[#E9E1B4]' : 'text-[#FFFCF2]'
          }`}>
            Subscribe to my newsletter so you won't miss a single awesome post!
          </h3>
          <p className="text-gray-400">
          My goals is to give you a content that you want, not just spam. Subscribe and be notified when I publish my new article
          </p>
          <div className="w-full md:w-1/3 md:py-4">
          <div className="md:flex gap-2">
            <input
              type="text"
              placeholder="First Name"
              className={`flex-1 px-4 py-2  ${isDarkMode ? 'bg-[#262626] text-[#E9E1b4]' : 'bg-[#14213D] text-[#FFFCF2]'}`}
            />
             <input
              type="email"
              placeholder="Email"
              className={`flex-1 px-4 py-2  ${isDarkMode ? 'bg-[#262626] text-[#E9E1b4]' : 'bg-[#14213D] text-[#FFFCF2]'}`}
            />
            <button className="px-4 py-3 mt-4 md:mt-0 md:py-2 rounded-lg bg-[#E9E1B4] text-[#14213D] hover:bg-[#d4cca1] transition-colors duration-300">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
        </div>
        <div>
<img src={Dog} alt="Dog" />
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscribe;