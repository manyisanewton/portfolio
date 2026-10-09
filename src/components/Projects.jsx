import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi';
import { projectData } from '../data/projects.js';
import { useCursor } from '../context/CursorContext';
import { TiltCard, MagneticButton } from './ui';

const slugify = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const Projects = () => {
  const { setCursorVariant } = useCursor();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const handleMouseEnter = () => setCursorVariant('link');
  const handleMouseLeave = () => setCursorVariant('default');

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-shell !overflow-visible"
      aria-labelledby="projects-heading"
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-16 max-w-3xl"
        >
          <span className="section-kicker">Projects</span>
          <h2 id="projects-heading" className="section-heading mt-2">
            Products, platforms, and workflows shipped to production.
          </h2>
          <p className="section-subheading">
            A curated selection of recent work spanning full-stack applications,
            AI-powered tools, e-commerce platforms, and business system integrations.
          </p>
        </motion.div>

        {/* Asymmetric Editorial Grid */}
        <div className="space-y-8 lg:space-y-16">
          {projectData.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                className="relative lg:sticky lg:will-change-transform"
                style={{
                  top: `calc(6.5rem + ${index * 14}px)`,
                  zIndex: 10 + index,
                }}
              >
                <Link
                  to={`/project/${slugify(project.title)}`}
                  className="block"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <TiltCard
                    intensity={isEven ? 10 : 8}
                    scale={1.015}
                    glow={true}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Image Side */}
                    <div className={`relative min-h-[300px] overflow-hidden bg-slate-100 sm:min-h-[380px] lg:min-h-[460px] ${!isEven ? 'lg:order-2' : ''}`}>
                      <motion.img
                        src={project.imageUrl}
                        alt={project.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700"
                        whileHover={{ scale: 1.025 }}
                        transition={{ type: 'spring', stiffness: 150 }}
                      />
                    </div>

                    {/* Content Side */}
                    <div className={`relative flex items-center justify-center bg-white p-7 sm:p-8 lg:p-10 ${!isEven ? 'lg:order-1' : ''}`}>
                      <div className="w-full max-w-md">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-3 rounded-xl" style={{ background: 'var(--color-cyan-soft)' }}>
                            <FiExternalLink className="h-5 w-5" style={{ color: 'var(--color-cyan)' }} />
                          </div>
                          <span className="text-sm font-medium uppercase tracking-[0.1em]" style={{ color: 'var(--color-cyan)' }}>Case Study</span>
                        </div>

                        <h3 className="font-display font-semibold text-2xl sm:text-3xl mb-4" style={{ color: 'var(--fg-primary)' }}>
                          {project.title}
                        </h3>

                        <p className="text-base leading-7 mb-6" style={{ color: 'var(--fg-secondary)' }}>
                          {project.shortDescription}
                        </p>

                        {/* Problem/Result Preview */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="p-4 rounded-xl" style={{ background: 'var(--bg-subtle)' }}>
                            <div className="text-xs font-medium uppercase tracking-[0.1em] mb-2" style={{ color: 'var(--color-amber)' }}>Problem</div>
                            <p className="text-sm leading-6 line-clamp-2" style={{ color: 'var(--fg-secondary)' }}>{project.problem}</p>
                          </div>
                          <div className="p-4 rounded-xl" style={{ background: 'var(--bg-subtle)' }}>
                            <div className="text-xs font-medium uppercase tracking-[0.1em] mb-2" style={{ color: 'var(--color-emerald)' }}>Impact</div>
                            <p className="text-sm leading-6 line-clamp-2" style={{ color: 'var(--fg-secondary)' }}>{project.result[0]}</p>
                          </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="mb-6">
                          <div className="text-xs font-medium uppercase tracking-[0.1em] mb-3" style={{ color: 'var(--fg-tertiary)' }}>Stack</div>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((t) => (
                              <span key={t} className="badge badge-cyan">{t}</span>
                            ))}
                          </div>
                        </div>

                        {/* CTA */}
                        <MagneticButton
                          variant="primary"
                          magneticStrength={0.3}
                          className="w-full justify-between"
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          <span>View Case Study</span>
                          <FiArrowRight className="h-5 w-5" />
                        </MagneticButton>
                      </div>
                    </div>
                    </div>
                  </TiltCard>
                </Link>

                {/* Decorative accent line between cards */}
                {index < projectData.length - 1 && (
                  <div className="hidden lg:block absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-24 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--color-cyan), transparent)' }} />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <MagneticButton
            variant="ghost"
            size="lg"
            onClick={() => {
              const section = document.querySelector('#projects');
              if (section) section.scrollIntoView({ behavior: 'smooth' });
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {projectData.length} Projects Total — Explore All
            <FiArrowRight className="h-5 w-5" />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
