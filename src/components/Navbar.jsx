import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCursor } from '../context/CursorContext';
import { FiMenu, FiX } from 'react-icons/fi';
import profilePic from '../assets/images/newton-profile.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('#home');
  const [hoveredHref, setHoveredHref] = useState(null);
  const { setCursorVariant } = useCursor();
  const location = useLocation();
  const navigate = useNavigate();

  const handleMouseEnter = () => setCursorVariant('link');
  const handleMouseLeave = () => setCursorVariant('default');

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Focus', href: '#services' },
    { name: 'Skills', href: '#skills' },
    { name: 'Journey', href: '#journey' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const linkVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const handleNavigation = (event, href) => {
    event.preventDefault();
    setIsOpen(false);

    if (location.pathname === '/') {
      const section = document.querySelector(href);
      if (section) {
        window.history.pushState(null, '', href);
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    navigate({ pathname: '/', hash: href });
  };

  useEffect(() => {
    if (location.pathname !== '/' || !location.hash) return undefined;

    const timer = window.setTimeout(() => {
      const section = document.querySelector(location.hash);
      if (section) section.scrollIntoView({ behavior: 'instant', block: 'start' });
    }, 50);

    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveHref(null);
      return undefined;
    }

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
  }, [location.pathname]);

  return (
    <nav className="pointer-events-none fixed inset-x-0 top-4 z-50">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div
          className="pointer-events-auto mx-auto flex h-16 w-full items-center justify-between gap-3 rounded-[2rem] border bg-emerald-50/75 px-3 shadow-[0_12px_35px_rgba(15,23,42,0.10)] backdrop-blur-xl lg:w-fit lg:px-4"
          style={{ borderColor: 'var(--border-medium)' }}
        >

          {/* Logo Section */}
          <a
            href="/#home"
            onClick={(event) => handleNavigation(event, '#home')}
            className="group flex flex-none cursor-pointer items-center gap-3"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={profilePic}
              alt="Newton Manyisa Logo"
              className="h-10 w-10 rounded-full border object-cover transition-colors duration-300 group-hover:border-cyan-400/60"
              style={{ borderColor: 'var(--border-light)' }}
            />
            <div className="block">
              <div className="whitespace-nowrap font-display text-sm font-semibold text-slate-900">
                Newton <span className="text-cyan-500">Manyisa</span>
              </div>
              <div className="whitespace-nowrap text-[10px] font-medium text-slate-500">
                Full-Stack Developer
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:block">
            <div className="relative flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`/${link.href}`}
                  onClick={(event) => handleNavigation(event, link.href)}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onFocus={() => setHoveredHref(link.href)}
                  onBlur={() => setHoveredHref(null)}
                  onMouseOver={() => setHoveredHref(link.href)}
                  onMouseOut={() => setHoveredHref(null)}
                  className={`relative z-10 rounded-full px-4 py-2.5 text-[15px] font-medium transition-all ${
                    activeHref === link.href
                      ? 'text-white border border-transparent'
                      : hoveredHref === link.href
                        ? 'text-cyan-600 border border-cyan-200 bg-cyan-50'
                        : 'text-slate-600 border border-transparent hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  style={{
                    background: activeHref === link.href ? 'var(--color-cyan)' : undefined,
                    boxShadow: activeHref === link.href ? '0 4px 14px rgba(0,212,255,0.35)' : undefined,
                  }}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full transition-all ${
                      activeHref === link.href
                        ? 'bg-white opacity-100'
                        : hoveredHref === link.href
                          ? 'bg-cyan-400 opacity-50'
                          : 'bg-transparent opacity-0'
                    }`}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-xl border bg-white p-2.5 text-slate-600 transition-colors hover:border-cyan-300 hover:text-cyan-600 hover:bg-cyan-50"
              style={{ borderColor: 'var(--border-light)' }}
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
            className="pointer-events-auto absolute left-4 right-4 top-[calc(100%+0.75rem)] rounded-3xl border bg-white/95 shadow-xl backdrop-blur-xl lg:hidden"
            style={{ borderColor: 'var(--border-light)' }}
          >
            <div className="mx-auto w-full px-3 py-3">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  <a
                    href={`/${link.href}`}
                    onClick={(event) => handleNavigation(event, link.href)}
                    className={`block rounded-xl border px-3 py-3 text-base font-medium transition-colors ${
                      activeHref === link.href
                        ? 'border-cyan-200 bg-cyan-50 text-cyan-600'
                        : 'border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-900'
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
