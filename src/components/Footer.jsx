// src/components/Footer.jsx
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

  const usefulLinks = ['Home', 'About', 'Services', 'Skills', 'Projects', 'Contact'];
  const socialLinks = [
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/newton-manyisa-b053733bb/', label: 'LinkedIn' },
    { icon: <FaGithub />, url: 'https://github.com/manyisanewton', label: 'GitHub' },
    { icon: <FaXTwitter />, url: 'https://x.com/ManyisaNewton', label: 'Twitter' },
    { icon: <FaFacebookF />, url: 'https://facebook.com/yourprofile', label: 'Facebook' },
  ];

  const siteCraftsmanship = [
    { icon: <FaReact size={20}/>, name: 'React', tooltip: 'Built with a robust and scalable component architecture.' },
    { icon: <SiVite size={20}/>, name: 'Vite', tooltip: 'For a lightning-fast development experience and optimized builds.' },
    { icon: <SiTailwindcss size={20}/>, name: 'Tailwind CSS', tooltip: 'Styled with a modern, utility-first CSS framework.' },
    { icon: <SiFramer size={20}/>, name: 'Framer Motion', tooltip: 'To create fluid and meaningful UI animations.' },
    { icon: <FaBolt size={20}/>, name: 'Performance', tooltip: 'Optimized for speed and a great user experience.' },
    { icon: <FiEye size={20}/>, name: 'Accessibility', tooltip: 'Designed with accessibility (a11y) in mind.' },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950 pb-8 pt-16 text-white">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent"></div>
      
      <div className="section-wrap">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:text-left">
          
          <div>
            <section aria-label="Contact Information">
            <h3 className="text-xl font-bold mb-4 text-white">Contact Info</h3>
            <div className="flex flex-col items-center space-y-4 md:items-start">
              <div className="flex items-center space-x-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-green-400 font-semibold">Available for Hire</span>
              </div>
              <a
                href="mailto:manyisanewton26@gmail.com"
                className="flex items-center text-slate-400 hover:text-orange-300 transition-colors"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                aria-label="Email Newton Manyisa"
              >
                <FaEnvelope className="mr-3" aria-hidden="true" />
                <span>manyisanewton26@gmail.com</span>
              </a>
              <a
                href="tel:+254799425417"
                className="flex items-center text-slate-400 hover:text-orange-300 transition-colors"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                aria-label="Call Newton Manyisa"
              >
                <FaPhone className="mr-3" aria-hidden="true" />
                <span>+254 799 425417</span>
              </a>
              <div className="flex items-center text-slate-400">
                <FaMapMarkerAlt className="mr-3" aria-hidden="true" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
            </section>
          </div>

          <div>
            <nav aria-label="Useful Links">
            <h3 className="text-xl font-bold mb-4 text-white">Useful Links</h3>
            <ul className="space-y-3">
              {usefulLinks.map(link => (
                <li key={link}>
                  <Link
                    to={link.toLowerCase()}
                    smooth={true}
                    duration={500}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="text-slate-400 hover:text-orange-300 transition-colors cursor-pointer"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
            </nav>
          </div>

          <div>
            <section aria-label="Follow Me on Social Media">
            <h3 className="text-xl font-bold mb-4 text-white">Follow Me</h3>
            <div className="mb-8 flex justify-center space-x-4 md:justify-start">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit my ${link.label} profile`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-400"
                  whileHover={{ y: -5, scale: 1.1, backgroundColor: '#06b6d4', color: '#ffffff', boxShadow: '0 0 15px rgba(6, 182, 212, 0.6)'}}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="text-xl" aria-hidden="true">{link.icon}</div>
                </motion.a>
              ))}
            </div>

            <h3 className="text-xl font-bold mb-4 text-white">Digital Craftsmanship</h3>
            <div className="flex flex-wrap justify-center gap-4 md:justify-start">
              {siteCraftsmanship.map((tech) => (
                <div key={tech.name} className="relative group flex items-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <div className="rounded-full border accent-warm-border accent-warm-tint p-3 accent-warm-text" aria-hidden="true">{tech.icon}</div>
                  <div className="pointer-events-none absolute bottom-full z-50 mb-2 w-max max-w-xs rounded-md bg-slate-800 p-2 text-sm text-white shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {tech.tooltip}
                    <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-4 border-x-transparent border-t-4 border-t-slate-800"></div>
                  </div>
                </div>
              ))}
            </div>
            </section>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center sm:flex-row sm:text-left">
          <p className="mb-4 text-sm text-slate-500 sm:mb-0">&copy; {currentYear} Newton Manyisa. All Rights Reserved.</p>
          <Link
            to="home"
            smooth={true}
            duration={800}
            className="group flex items-center text-slate-400 transition-colors cursor-pointer hover:text-orange-300"
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
