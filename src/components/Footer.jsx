import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { useCursor } from '../context/CursorContext';
import { FaLinkedin, FaGithub, FaEnvelope, FaFacebookF, FaPhone, FaMapMarkerAlt, FaReact, FaBolt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiArrowUp, FiEye } from 'react-icons/fi';
import { SiTailwindcss, SiVite, SiFramer } from 'react-icons/si';

const Footer = () => {
  const { setCursorVariant } = useCursor();
  const handleMouseEnter = () => setCursorVariant('link');
  const handleMouseLeave = () => setCursorVariant('default');
  
  const currentYear = new Date().getFullYear();

  const usefulLinks = ['Home', 'About', 'Skills', 'Projects', 'Contact'];
  const socialLinks = [
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/yourprofile' },
    { icon: <FaGithub />, url: 'https://github.com/yourprofile' },
    { icon: <FaXTwitter />, url: 'https://twitter.com/yourprofile' },
    { icon: <FaFacebookF />, url: 'https://facebook.com/yourprofile' },
  ];

  const siteCraftsmanship = [
    { icon: <FaReact size={20}/>, name: 'React', tooltip: 'Built with a robust and scalable component architecture.' },
    { icon: <SiVite size={20}/>, name: 'Vite', tooltip: 'For a lightning-fast development experience and optimized builds.' },
    { icon: <SiTailwindcss size={20}/>, name: 'Tailwind CSS', tooltip: 'Styled with a modern, utility-first CSS framework.' },
    { icon: <SiFramer size={20}/>, name: 'Framer Motion', tooltip: 'To create fluid and meaningful user interface animations.' },
    { icon: <FaBolt size={20}/>, name: 'Performance', tooltip: 'Optimized for speed and a great user experience.' },
    { icon: <FiEye size={20}/>, name: 'Accessibility', tooltip: 'Designed with accessibility (a11y) in mind.' },
  ];

  return (
    // ==========================================================
    // THE FIX IS HERE: add `overflow-hidden` to the footer tag
    // ==========================================================
    <footer className="bg-gray-900 pt-16 pb-8 text-white relative font-roboto overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          
          {/* Column 1: Contact Details */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Contact Info</h3>
            <div className="flex flex-col items-center md:items-start space-y-4">
              <div className="flex items-center space-x-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-green-400 font-semibold">Available for Hire</span>
              </div>
              <a href="mailto:newtonmanyisa@example.com" className="flex items-center text-gray-400 hover:text-cyan-400 transition-colors" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <FaEnvelope className="mr-3" />
                <span>manyisanewton26@gmail.com.com</span>
              </a>
              <a href="tel:+254799425417" className="flex items-center text-gray-400 hover:text-cyan-400 transition-colors" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <FaPhone className="mr-3" />
                <span>+254 799 425417</span>
              </a>
              <div className="flex items-center text-gray-400">
                <FaMapMarkerAlt className="mr-3" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          {/* Column 2: Useful Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Useful Links</h3>
            <ul className="space-y-3">
              {usefulLinks.map(link => (
                <li key={link}>
                  <Link 
                    to={link.toLowerCase()} 
                    smooth={true} 
                    duration={500} 
                    className="text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer" 
                    onMouseEnter={handleMouseEnter} 
                    onMouseLeave={handleMouseLeave}
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Follow Me & Craftsmanship */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Follow Me</h3>
            <div className="flex justify-center md:justify-start space-x-4 mb-8">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="bg-gray-800 p-3 rounded-full text-gray-400"
                  whileHover={{
                    y: -5,
                    scale: 1.1,
                    backgroundColor: '#06b6d4',
                    color: '#ffffff',
                    boxShadow: '0 0 15px rgba(6, 182, 212, 0.6)',
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="text-xl">{link.icon}</div>
                </motion.a>
              ))}
            </div>

            <h3 className="text-xl font-bold mb-4 text-white">Digital Craftsmanship</h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {siteCraftsmanship.map((tech) => (
                <div
                  key={tech.name}
                  className="relative group flex items-center"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-gray-800 p-3 rounded-full text-cyan-400">
                    {tech.icon}
                  </div>
                  <div className="absolute bottom-full mb-2 w-max max-w-xs p-2 text-sm bg-gray-700 text-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                    {tech.tooltip}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-700"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Back to Top */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm mb-4 sm:mb-0">
            © {currentYear} Newton Manyisa. All Rights Reserved.
          </p>
          <Link
            to="home"
            smooth={true}
            duration={800}
            className="group flex items-center text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Back to Top
            <FiArrowUp className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;