import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { FiMenu, FiX } from 'react-icons/fi';
import profilePic from '../assets/images/newton-profile.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('#home');
  const [hoveredHref, setHoveredHref] = useState(null);
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

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks
        .map((link) => document.querySelector(link.href))
        .filter(Boolean);

      let current = '#home';
      sections.forEach((section) => {
        const top = section.offsetTop - 140;
        if (window.scrollY >= top) current = `#${section.id}`;
      });

      setActiveHref(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              className="h-11 w-11 rounded-full object-cover border border-white/15 transition-colors duration-300 group-hover:border-orange-400/60"
            />
            <div className="hidden sm:block text-white">
              <div className="text-lg font-medium text-white">Newton <span className="accent-warm-text">Manyisa</span></div>
              <div className="text-xs text-slate-400">Full-Stack Developer <span className="accent-warm-text">•</span></div>
            </div>
          </a>

          {/* ✅ Desktop Nav */}
          <div className="hidden md:block">
            <div className="relative flex items-center rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 shadow-[0_10px_30px_rgba(2,6,23,0.22)]">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onFocus={() => setHoveredHref(link.href)}
                  onBlur={() => setHoveredHref(null)}
                  onMouseOver={() => setHoveredHref(link.href)}
                  onMouseOut={() => setHoveredHref(null)}
                  className={`relative z-10 rounded-xl px-4 py-2.5 text-[15px] font-medium transition-all ${
                    activeHref === link.href
                      ? 'text-white border border-orange-400/20 bg-white/[0.05]'
                      : hoveredHref === link.href
                        ? 'text-white border border-white/10 bg-white/[0.04]'
                        : 'text-slate-300 border border-transparent'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full transition-all ${
                      activeHref === link.href
                        ? 'bg-orange-400 opacity-100 shadow-[0_0_10px_rgba(241,90,36,0.65)]'
                        : 'bg-transparent opacity-0'
                    }`}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* ✅ Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-slate-300 transition-colors hover:border-orange-400/30 hover:text-white"
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
                    className={`block rounded-xl border px-3 py-3 text-base font-medium transition-colors ${
                      activeHref === link.href
                        ? 'border-orange-400/25 bg-white/[0.05] text-white'
                        : 'border-transparent text-slate-300 hover:border-white/10 hover:bg-white/5 hover:text-white'
                    }`}
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
