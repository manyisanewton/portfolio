import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import profilePic from '../assets/images/newton-profile1.png'; // Your background-removed photo
import { FiDownload } from 'react-icons/fi';

const About = () => {
  // Hooks for the custom cursor
  const { setCursorVariant } = useCursor();
  const handleMouseEnter = () => setCursorVariant('link');
  const handleMouseLeave = () => setCursorVariant('default');

  return (
    <section id="about" className="py-20 bg-gray-900 text-white overflow-hidden">
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
            {/* The Elliptical Glow */}
            <div className="absolute bottom-0 w-full h-48 bg-violet-600 rounded-full blur-3xl opacity-20"></div>
            
            {/* The Image */}
            <img
              src={profilePic}
              alt="Newton Manyisa"
              className="relative z-10 max-h-[500px] object-contain"
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
            <a
              href="/NewtonManyisa_CV.pdf" // This links to the CV in your 'public' folder
              download
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="group inline-flex items-center px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg cursor-pointer transition-all duration-300"
            >
              Download CV
              <FiDownload className="ml-2 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;