import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll'; // Import Link for smooth scrolling
import { useCursor } from '../context/CursorContext';
import profilePic from '../assets/images/portfolio image.jpeg'; // Make sure this is the correct path
import { FiSend } from 'react-icons/fi';

// Data for the new stats section
const statsData = [
  { value: '2+', label: 'Years Building Products' },
  { value: '15+', label: 'Projects Delivered' },
  { value: '4', label: 'Core Delivery Areas' },
];


const About = () => {
  const { setCursorVariant } = useCursor();
  const handleMouseEnter = () => setCursorVariant('link');
  const handleMouseLeave = () => setCursorVariant('default');

  return (
    <section id="about" className="section-shell bg-slate-900 text-white">
      <div className="section-wrap">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(280px,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          
          {/* Left Column: Image and Glow Effect */}
          <motion.div
            className="relative order-2 flex justify-center lg:order-1"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            viewport={{ once: true }}
          >
            <div className="surface-panel w-full max-w-md p-4">
              <img
                src={profilePic}
                alt="Newton Manyisa"
                className="h-72 w-full rounded-lg object-cover sm:h-80 lg:h-[460px]"
              />
            </div>
          </motion.div>

          {/* Right Column: Text Content */}
          <motion.div
            className="order-1 flex flex-col items-start lg:order-2"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            viewport={{ once: true }}
          >
            <span className="section-kicker">About</span>
            <h2 className="section-heading">
              Full-stack product work with a strong frontend edge.
            </h2>
            <p className="section-copy">
              I am a creative and performance-driven full-stack developer with strong frontend expertise and hands-on experience building responsive web applications, business systems, and deployment-ready platforms. My work spans React, Next.js, Angular, Tailwind CSS, Framer Motion, Flask, PHP, C#, ERPNext setup, cPanel environments, server support, and API integrations. I enjoy turning business requirements into polished user experiences while keeping the systems behind them maintainable, scalable, and dependable.
            </p>

            <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
              {statsData.map(stat => (
                <div key={stat.label} className="surface-panel p-5 text-left">
                  <span className="text-3xl font-semibold accent-warm-text">{stat.value}</span>
                  <p className="mt-2 text-sm uppercase tracking-[0.16em] text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="contact" // Scrolls to the contact section
                smooth={true}
                duration={500}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="group inline-flex items-center rounded-md px-6 py-3 font-semibold text-white transition-all duration-300 hover:opacity-95"
                style={{ backgroundColor: '#f15a24' }}
              >
                Let's Talk
                <FiSend className="ml-2 transition-transform duration-300 group-hover:rotate-12" />
              </Link>
              <a
                href="#projects"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="inline-flex items-center rounded-md border border-white/15 px-6 py-3 font-semibold text-slate-200 transition-colors duration-300 hover:text-white accent-warm-border"
              >
                Explore Projects
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
