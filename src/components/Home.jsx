import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FiArrowRight, FiGithub, FiLinkedin, FiMail, FiExternalLink, FiBarChart2, FiCloud, FiCheck } from 'react-icons/fi';
import profilePic from '../assets/images/newton-hero-cutout-v3.png';
import { useCursor } from '../context/CursorContext';
import { DoodleArrow, MagneticButton } from './ui';

const Home = () => {
  const { setCursorVariant } = useCursor();
  const [visible, setVisible] = useState(false);

  // Refs for parallax
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const imageRef = useRef(null);

  // Scroll-driven animations
  const { scrollY } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });

  const titleY = useTransform(scrollY, [0, 500], [0, -80]);
  const subtitleY = useTransform(scrollY, [0, 500], [0, -50]);

  // Spring for smooth parallax
  const springTitleY = useSpring(titleY, { stiffness: 200, damping: 30 });
  const springSubtitleY = useSpring(subtitleY, { stiffness: 200, damping: 30 });

  const handleMouseEnterLink = () => setCursorVariant('link');
  const handleMouseLeave = () => setCursorVariant('default');

  // Trigger entrance animations
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToProjects = (e) => {
    e.preventDefault();
    const section = document.querySelector('#projects');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{ background: 'linear-gradient(135deg, #effcf4 0%, #f6fffb 55%, #fff8f3 100%)' }}
    >
      {/* Ambient gradient mesh */}
      <div className="gradient-mesh" aria-hidden="true" />

      {/* Floating decorative orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full blur-3xl opacity-20" style={{ background: 'var(--color-cyan)' }} aria-hidden="true" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full blur-3xl opacity-15" style={{ background: 'var(--color-amber)' }} aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-5" style={{ background: 'var(--color-emerald)' }} aria-hidden="true" />

      <div className="container relative z-10 pt-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-12 lg:gap-16 items-center">

          {/* Left: Content */}
          <div className="relative z-20">
            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
            >
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/manyisanewton"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full text-slate-400 hover:text-cyan-500 hover:bg-cyan-50 transition-all duration-300"
                  onMouseEnter={handleMouseEnterLink}
                  onMouseLeave={handleMouseLeave}
                  aria-label="GitHub"
                >
                  <FiGithub className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/newton-manyisa-b053733bb/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                  onMouseEnter={handleMouseEnterLink}
                  onMouseLeave={handleMouseLeave}
                  aria-label="LinkedIn"
                >
                  <FiLinkedin className="h-5 w-5" />
                </a>
                <a
                  href="mailto:manyisanewton26@gmail.com"
                  className="p-2 rounded-full text-slate-400 hover:text-amber-500 hover:bg-amber-50 transition-all duration-300"
                  onMouseEnter={handleMouseEnterLink}
                  onMouseLeave={handleMouseLeave}
                  aria-label="Email"
                >
                  <FiMail className="h-5 w-5" />
                </a>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              ref={titleRef}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              style={{ y: springTitleY }}
              className="relative mb-6"
            >
              <h1
                className="font-display font-medium leading-[1.05] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl"
                style={{
                  color: 'var(--fg-primary)',
                  letterSpacing: '-0.03em',
                  lineHeight: '1.02',
                }}
              >
                <span className="block">I build</span>
                <span className="block text-gradient">production systems</span>
                <span className="block">that ship.</span>
              </h1>
              <DoodleArrow className="left-[280px] top-8 hidden h-24 w-28 xl:block" />
            </motion.div>

            {/* Subheadline */}
            <motion.div
              ref={subtitleRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
              style={{ y: springSubtitleY }}
              className="mb-10 max-w-xl"
            >
              <p className="text-lg sm:text-xl leading-relaxed" style={{ color: 'var(--fg-secondary)' }}>
                Full-stack • AI workflows • ERP systems • Payment integrations
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              className="relative flex flex-wrap gap-4 mb-16"
            >
              <MagneticButton
                variant="primary"
                onClick={scrollToProjects}
                onMouseEnter={handleMouseEnterLink}
                onMouseLeave={handleMouseLeave}
                magneticStrength={0.4}
              >
                View Work
                <FiArrowRight className="h-5 w-5" />
              </MagneticButton>
              <MagneticButton
                variant="secondary"
                onClick={() => {
                  const section = document.querySelector('#contact');
                  if (section) section.scrollIntoView({ behavior: 'smooth' });
                }}
                onMouseEnter={handleMouseEnterLink}
                onMouseLeave={handleMouseLeave}
              >
                Start a Project
              </MagneticButton>
              <MagneticButton
                variant="ghost"
                onClick={() => {
                  const section = document.querySelector('#journey');
                  if (section) section.scrollIntoView({ behavior: 'smooth' });
                }}
                onMouseEnter={handleMouseEnterLink}
                onMouseLeave={handleMouseLeave}
              >
                <FiExternalLink className="h-4 w-4 mr-1" />
                Journey
              </MagneticButton>
            </motion.div>

          </div>

          {/* Right: Free-floating hero portrait */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
            className="relative min-h-[560px] lg:min-h-[660px]"
          >
            <div className="absolute inset-x-0 bottom-0 top-4 rounded-[40%] bg-emerald-200/30 blur-3xl" aria-hidden="true" />

            <img
              src={profilePic}
              alt="Newton Manyisa holding a laptop"
              className="absolute bottom-0 left-1/2 z-10 h-auto w-[108%] max-w-none -translate-x-1/2 object-contain object-bottom drop-shadow-[0_28px_28px_rgba(15,23,42,0.14)] sm:h-full sm:w-auto"
            />

            {[
              { Icon: FiBarChart2, className: 'left-2 top-24 sm:-left-6 sm:top-32', color: 'text-cyan-500' },
              { Icon: FiCloud, className: 'right-2 top-16 sm:-right-8 sm:top-28', color: 'text-emerald-500' },
              { Icon: FiCheck, className: 'right-3 bottom-32 sm:-right-4 sm:bottom-40', color: 'text-orange-500' },
            ].map(({ Icon, className, color }, index) => (
              <div
                key={index}
                className={`absolute z-20 flex h-12 w-12 items-center justify-center rounded-xl border border-white/80 bg-white/90 shadow-xl backdrop-blur-md sm:h-16 sm:w-16 sm:rounded-2xl ${className}`}
              >
                <Icon className={`h-5 w-5 sm:h-7 sm:w-7 ${color}`} />
              </div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.25 }}
              className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/80 bg-white/90 px-4 py-2.5 text-xs font-semibold text-emerald-700 shadow-xl backdrop-blur-md sm:bottom-5 sm:px-5 sm:py-3 sm:text-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="sm:hidden">Available for work</span>
              <span className="hidden sm:inline">Available for new opportunities</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 right-8 hidden flex-col items-center gap-2 text-slate-400 animate-bounce xl:flex"
      >
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        <FiArrowRight className="h-6 w-6 animate-bounce" />
      </motion.div>
    </section>
  );
};

export default Home;
