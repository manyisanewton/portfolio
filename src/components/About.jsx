import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll'; // Import Link for smooth scrolling
import { useCursor } from '../context/CursorContext';
import profilePic from '../assets/images/newton-profile1.png'; // Make sure this is the correct path
import { FiDownload, FiSend } from 'react-icons/fi';

// Data for the new stats section
const statsData = [
  { value: '2+', label: 'Years of Experience' },
  { value: '15+', label: 'Projects Completed' },
  { value: '10+', label: 'Technologies Mastered' },
];


const About = () => {
  const { setCursorVariant } = useCursor();
  const handleMouseEnter = () => setCursorVariant('link');
  const handleMouseLeave = () => setCursorVariant('default');

  return (
    <section id="about" className="py-24 bg-gray-900 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Image and Glow Effect */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            viewport={{ once: true }}
          >
            {/* The Elliptical Glow - works great with a rectangle too */}
            <div className="absolute bottom-0 w-full h-56 bg-violet-600 rounded-full blur-3xl opacity-20"></div>
            
            {/* --- THE UPGRADED IMAGE --- */}
            <img
              src={profilePic}
              alt="Newton Manyisa"
              // Added rounded-md (5px), border, and shadow for a framed look
              className="relative z-10 w-full max-w-sm h-auto object-cover rounded-md border-2 border-gray-700 shadow-2xl"
            />
          </motion.div>

          {/* Right Column: Text Content */}
          <motion.div
            className="flex flex-col items-start"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold uppercase mb-4">
              <span className="text-cyan-400">About</span> Me
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              A Full-Stack Software Developer with solid experience in building scalable web applications using Python, Flask, React, and more. I'm proficient in Agile environments and passionate about turning complex requirements into user-focused solutions.
            </p>

            {/* --- NEW STATS SECTION --- */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-10 w-full">
              {statsData.map(stat => (
                <div key={stat.label} className="text-center">
                  <span className="text-4xl font-bold text-cyan-400">{stat.value}</span>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* --- NEW DUAL CTA BUTTONS --- */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="contact" // Scrolls to the contact section
                smooth={true}
                duration={500}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="group inline-flex items-center px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg cursor-pointer transition-all duration-300"
              >
                Let's Talk
                <FiSend className="ml-2 transition-transform duration-300 group-hover:rotate-12" />
              </Link>
              <a
                href="/NewtonManyisa_CV.pdf"
                download
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="group inline-flex items-center px-6 py-3 bg-transparent border-2 border-gray-600 hover:bg-gray-700/50 hover:border-gray-500 text-white font-bold rounded-lg cursor-pointer transition-all duration-300"
              >
                Download CV
                <FiDownload className="ml-2 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;