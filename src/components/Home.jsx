import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FiArrowDown } from 'react-icons/fi';
import profilePic from '../assets/images/newton-profile.png'; // Make sure the path is correct
import { useCursor } from '../context/CursorContext'; // <-- Step 1: Import the hook

const Home = () => {
  // Step 2: Get the function to change the cursor state
  const { setCursorVariant } = useCursor();

  // Step 3: Define handler functions for clarity
  const handleMouseEnterLink = () => setCursorVariant('link');
  const handleMouseEnterText = () => setCursorVariant('text');
  const handleMouseLeave = () => setCursorVariant('default');

  return (
    <section id="home" className="min-h-screen flex items-center bg-gray-900 text-white relative" style={{ background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)' }}>
      <div className="container mx-auto px-2.5 sm:px-6 md:px-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-4">
          
          {/* Left Side: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span 
              onMouseEnter={handleMouseEnterText} 
              onMouseLeave={handleMouseLeave} 
              className="text-cyan-400 font-semibold"
            >
              Full-Stack Software Developer
            </span>
            <h1 
              onMouseEnter={handleMouseEnterText} 
              onMouseLeave={handleMouseLeave} 
              className="text-4xl md:text-6xl font-bold mt-2 mb-4"
            >
              I Build Digital Solutions that Work.
            </h1>
            <p 
              onMouseEnter={handleMouseEnterText} 
              onMouseLeave={handleMouseLeave} 
              className="text-lg text-gray-300 mb-8 max-w-lg"
            >
              Passionate about creating clean, scalable, and user-friendly web applications from front-end to back-end.
            </p>
            <Link
              to="projects"
              smooth={true}
              duration={500}
              className="group inline-flex items-center px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg cursor-pointer transition-all duration-300"
              // Step 4: Apply the handlers to the button
              onMouseEnter={handleMouseEnterLink}
              onMouseLeave={handleMouseLeave}
            >
              View My Work
              <FiArrowDown className="ml-2 transition-transform duration-300 group-hover:translate-y-1" />
            </Link>
          </motion.div>

          {/* Right Side: Image */}
          <motion.div
            className="flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            // Apply handlers to the entire image container
            onMouseEnter={handleMouseEnterLink}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-violet-500 rounded-full blur-3xl opacity-30"></div>
              <motion.img
                src={profilePic}
                alt="Newton Manyisa"
                className="relative w-full h-full object-cover rounded-full shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home;