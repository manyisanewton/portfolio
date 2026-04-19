import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';
import profilePic from '../assets/images/newton-profile.png';
import { useCursor } from '../context/CursorContext';
import HeroNetwork from './HeroNetwork';

const Home = () => {
  const { setCursorVariant } = useCursor();

  const handleMouseEnterLink = () => setCursorVariant('link');
  const handleMouseEnterText = () => setCursorVariant('text');
  const handleMouseLeave = () => setCursorVariant('default');

  // ✅ Custom scroll handler for SEO-friendly anchor link
  const handleScroll = (e) => {
    e.preventDefault();
    const section = document.querySelector('#projects');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-slate-950 pt-24 text-white"
    >
      <HeroNetwork />
      <div className="grid-overlay absolute inset-0 opacity-60"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.14),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(241,90,36,0.14),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.1),_transparent_28%)]"></div>
      <div className="section-wrap relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:gap-16">

          {/* Left Side: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span
              onMouseEnter={handleMouseEnterText}
              onMouseLeave={handleMouseLeave}
              className="section-kicker"
            >
              Full-Stack Developer | Frontend Engineer
            </span>

            <h1
              onMouseEnter={handleMouseEnterText}
              onMouseLeave={handleMouseLeave}
              className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              I Build Modern Interfaces and Reliable Digital Systems.
            </h1>

            <p
              onMouseEnter={handleMouseEnterText}
              onMouseLeave={handleMouseLeave}
              className="mb-8 mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg"
            >
              I design responsive frontend experiences, develop full-stack applications, integrate business systems, and support deployments that keep products running smoothly.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                onClick={handleScroll}
                onMouseEnter={handleMouseEnterLink}
                onMouseLeave={handleMouseLeave}
                className="group inline-flex items-center rounded-md px-6 py-3 font-semibold text-white transition-all duration-300 hover:opacity-95"
                style={{ backgroundColor: '#f15a24' }}
              >
                View My Work
                <FiArrowDown className="ml-2 transition-transform duration-300 group-hover:translate-y-1" />
              </a>
              <a
                href="#contact"
                onMouseEnter={handleMouseEnterLink}
                onMouseLeave={handleMouseLeave}
                className="inline-flex items-center rounded-md border border-white/15 px-6 py-3 font-semibold text-slate-200 transition-colors duration-300 hover:text-white accent-warm-border"
              >
                Start a Conversation
              </a>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="surface-panel p-4">
                <div className="text-sm uppercase tracking-[0.18em] accent-warm-text">Focus</div>
                <div className="mt-2 text-sm leading-7 text-slate-300">Frontend systems, full-stack delivery, and business tooling.</div>
              </div>
              <div className="surface-panel p-4">
                <div className="text-sm uppercase tracking-[0.18em] accent-warm-text">Stack</div>
                <div className="mt-2 text-sm leading-7 text-slate-300">React, Next.js, Angular, Flask, ERPNext, APIs, and deployment support.</div>
              </div>
              <div className="surface-panel p-4">
                <div className="text-sm uppercase tracking-[0.18em] accent-warm-text">Approach</div>
                <div className="mt-2 text-sm leading-7 text-slate-300">Clean interfaces, reliable architecture, and practical delivery from build to launch.</div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Image */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onMouseEnter={handleMouseEnterLink}
            onMouseLeave={handleMouseLeave}
          >
            <div className="surface-panel w-full max-w-[420px] p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <div className="text-sm font-semibold text-white">Newton Manyisa</div>
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Available for frontend and full-stack work</div>
                </div>
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400"></div>
              </div>
              <div className="overflow-hidden rounded-lg border border-white/10">
                <motion.img
                  src={profilePic}
                  alt="Newton Manyisa"
                  className="aspect-[4/5] w-full object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 260 }}
                />
              </div>
              <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] accent-warm-text">Open to Work</div>
                    <div className="mt-2 text-sm text-slate-300">Frontend, full-stack, ERP, and deployment support.</div>
                  </div>
                  <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.75)]" />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Home;
