import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt, FaReact } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiArrowUp } from 'react-icons/fi';
import { SiTailwindcss, SiVite, SiFramer } from 'react-icons/si';

const Footer = () => {
  const { setCursorVariant } = useCursor();
  const currentYear = new Date().getFullYear();
  const handleMouseEnter = () => setCursorVariant('link');
  const handleMouseLeave = () => setCursorVariant('default');

  const usefulLinks = [
    ['Home', 'home'], ['About', 'about'], ['Focus', 'services'], ['Skills', 'skills'],
    ['Journey', 'journey'], ['Projects', 'projects'], ['Contact', 'contact'],
  ];
  const socialLinks = [
    { icon: FaLinkedin, url: 'https://www.linkedin.com/in/newton-manyisa-b053733bb/', label: 'LinkedIn' },
    { icon: FaGithub, url: 'https://github.com/manyisanewton', label: 'GitHub' },
    { icon: FaXTwitter, url: 'https://x.com/ManyisaNewton', label: 'X' },
  ];
  const tools = [
    { icon: FaReact, label: 'React' },
    { icon: SiVite, label: 'Vite' },
    { icon: SiTailwindcss, label: 'Tailwind CSS' },
    { icon: SiFramer, label: 'Framer Motion' },
  ];

  return (
    <footer className="relative overflow-hidden border-t bg-slate-50" style={{ borderColor: 'var(--border-light)' }}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        <div className="grid min-w-0 grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_1fr] lg:gap-16">
          <section className="min-w-0" aria-labelledby="footer-contact-heading">
            <div className="mb-5 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-sm font-semibold text-emerald-700">Available for new work</span>
            </div>
            <h2 id="footer-contact-heading" className="max-w-md font-display text-2xl font-semibold leading-tight text-slate-900 sm:text-3xl">Have a project in mind?</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">Let&apos;s discuss what you want to build.</p>

            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <a href="mailto:manyisanewton26@gmail.com" className="flex min-w-0 items-center gap-3 transition-colors hover:text-cyan-600" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <FaEnvelope className="h-4 w-4 flex-none" />
                <span className="min-w-0 break-all">manyisanewton26@gmail.com</span>
              </a>
              <a href="tel:+254799425417" className="flex items-center gap-3 transition-colors hover:text-cyan-600" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <FaPhone className="h-4 w-4 flex-none" /><span>+254 799 425417</span>
              </a>
              <div className="flex items-center gap-3"><FaMapMarkerAlt className="h-4 w-4 flex-none" /><span>Nairobi, Kenya</span></div>
            </div>
          </section>

          <nav className="min-w-0" aria-label="Footer navigation">
            <h2 className="mb-5 font-display text-base font-semibold text-slate-900">Explore</h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 lg:grid-cols-1">
              {usefulLinks.map(([label, id]) => (
                <li key={id}>
                  <a href={`/#${id}`} className="text-sm text-slate-500 transition-colors hover:text-cyan-600" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <section className="min-w-0 md:col-span-2 lg:col-span-1" aria-labelledby="footer-connect-heading">
            <h2 id="footer-connect-heading" className="mb-5 font-display text-base font-semibold text-slate-900">Connect</h2>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ icon: Icon, url, label }) => (
                <motion.a key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border bg-white text-slate-500 shadow-sm"
                  style={{ borderColor: 'var(--border-light)' }} whileHover={{ y: -3, color: 'var(--color-cyan)' }}
                  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>

            <div className="mt-8 border-t pt-6" style={{ borderColor: 'var(--border-light)' }}>
              <div className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Built with</div>
              <div className="flex flex-wrap gap-2">
                {tools.map(({ icon: Icon, label }) => (
                  <span key={label} className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-2 text-xs font-medium text-slate-600" style={{ borderColor: 'var(--border-light)' }}>
                    <Icon className="h-4 w-4 text-cyan-500" />{label}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: 'var(--border-light)' }}>
          <p>&copy; {currentYear} Newton Manyisa. All rights reserved.</p>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex w-fit items-center gap-2 font-medium transition-colors hover:text-cyan-600" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            Back to top <FiArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
