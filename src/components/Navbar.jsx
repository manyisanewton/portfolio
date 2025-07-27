import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { FiMenu, FiX } from 'react-icons/fi';
// Step 1: Import your profile picture
import profilePic from '../assets/images/newton-profile.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setCursorVariant } = useCursor();

  const handleMouseEnter = () => setCursorVariant('link');
  const handleMouseLeave = () => setCursorVariant('default');

  const navLinks = ['Home', 'About', 'Projects', 'Skills', 'Contact'];

  const linkVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <nav className="bg-gray-900 bg-opacity-50 fixed w-full top-0 z-50 backdrop-filter backdrop-blur-lg font-roboto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* ========================================================== */}
          {/* Logo - This is the updated section                      */}
          {/* ========================================================== */}
          <Link
            to="home"
            smooth={true}
            duration={500}
            className="cursor-pointer group" // Added 'group' for hover effect on image
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center space-x-3">
              {/* The Image */}
              <img
                src={profilePic}
                alt="Newton Manyisa Logo"
                className="h-12 w-12 rounded-full object-cover border-2 border-gray-700 group-hover:border-cyan-400 transition-colors duration-300"
              />
              {/* The Text */}
              <div className="text-white text-xl hidden sm:block">
                <span className="font-pacifico text-cyan-400">Newton</span>
                <span className="font-semibold"> Manyisa</span>
              </div>
            </div>
          </Link>
          {/* ========================================================== */}
          {/* End of Logo Section                                      */}
          {/* ========================================================== */}


          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link}
                  activeClass="active"
                  to={link.toLowerCase()}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="relative text-gray-300 hover:text-white px-3 py-2 text-sm font-medium cursor-pointer"
                >
                  {link}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-cyan-400"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden bg-gray-900 bg-opacity-95 backdrop-filter backdrop-blur-lg absolute w-full"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  <Link
                    to={link.toLowerCase()}
                    spy={true}
                    smooth={true}
                    offset={-80}
                    duration={500}
                    onClick={() => setIsOpen(false)}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    {link}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;