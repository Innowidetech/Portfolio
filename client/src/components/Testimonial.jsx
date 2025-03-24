import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const testimonials = [
  {
    name: 'Riya',
    role: 'Digital Marketing',
    feedback: 'The final product was stunning, and Shiva Raj was a joy to work with. I look forward to our next project together!',
    image: 'https://via.placeholder.com/100',
  },
  {
    name: 'Aryan',
    role: 'Web Developer',
    feedback: 'Shiva Raj provided exceptional service and delivered the project on time with great quality.',
    image: 'https://via.placeholder.com/100',
  },
  {
    name: 'Neha',
    role: 'Content Creator',
    feedback: 'Amazing collaboration! The work exceeded my expectations. Highly recommend working with Shiva Raj.',
    image: 'https://via.placeholder.com/100',
  },
  {
    name: 'Rahul',
    role: 'UI/UX Designer',
    feedback: 'Professional and dedicated. It was a pleasure working together.',
    image: 'https://via.placeholder.com/100',
  },
  {
    name: 'Priya',
    role: 'Entrepreneur',
    feedback: 'The project was handled with utmost professionalism. Great results!',
    image: 'https://via.placeholder.com/100',
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isDarkMode } = useTheme();

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section className={`py-10 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`} id="testimonials">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8">Testimonials</h2>

        <div className="relative flex items-center justify-center">
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 text-2xl text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
          >
            <FaChevronLeft />
          </button>

          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg w-full max-w-lg">
            <img
              src={testimonials[currentIndex].image}
              alt={testimonials[currentIndex].name}
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">{testimonials[currentIndex].name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{testimonials[currentIndex].role}</p>
            <p className="mt-4 text-gray-700 dark:text-gray-300">{testimonials[currentIndex].feedback}</p>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 text-2xl text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
