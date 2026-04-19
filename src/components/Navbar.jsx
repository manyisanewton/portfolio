import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { FiMenu, FiX } from 'react-icons/fi';
import profilePic from '../assets/images/newton-profile.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setCursorVariant } = useCursor();

  const handleMouseEnter = () => setCursorVariant('link');
  const handleMouseLeave = () => setCursorVariant('default');

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Skills', href: '#skills' },
    { name: 'Journey', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const linkVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-6">

          {/* ✅ Logo Section */}
          <a
            href="#home"
            className="cursor-pointer group flex items-center space-x-3"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={profilePic}
              alt="Newton Manyisa Logo"
              className="h-11 w-11 rounded-full object-cover border border-white/15 group-hover:border-cyan-400 transition-colors duration-300"
            />
            <div className="hidden sm:block text-white">
              <div className="text-lg font-medium text-cyan-300">Newton Manyisa</div>
              <div className="text-xs text-slate-400">Full-Stack Developer <span className="accent-warm-text">•</span></div>
            </div>
          </a>

          {/* ✅ Desktop Nav */}
          <div className="hidden md:block">
            <div className="flex items-center rounded-lg border border-white/10 bg-white/5 p-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="relative rounded-md px-3 py-2 text-base font-normal text-slate-300 transition-colors hover:text-white"
                >
                  {link.name}
                  <motion.div
                    className="absolute inset-x-2 bottom-1 h-px accent-warm-bg"
                    initial={{ width: 0 }}
                    whileHover={{ width: 'calc(100% - 1rem)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* ✅ Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-md border border-white/10 bg-white/5 p-2 text-slate-300 transition-colors hover:text-white"
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

      {/* ✅ Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute w-full border-b border-white/10 bg-slate-950/95 backdrop-blur-xl md:hidden"
          >
            <div className="mx-auto w-full max-w-7xl px-4 pb-4 pt-2 sm:px-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-md border border-transparent px-3 py-3 text-base font-normal text-slate-300 transition-colors hover:border-white/10 hover:bg-white/5 hover:text-white"
                  >
                    {link.name}
                  </a>
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
