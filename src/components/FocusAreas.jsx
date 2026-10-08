import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCode, FiServer, FiCpu, FiLayers, FiArrowRight } from 'react-icons/fi';
import { useCursor } from '../context/CursorContext';
import { TiltCard, MagneticButton } from './ui';

const focusAreas = [
  {
    icon: FiCode,
    title: 'Frontend & UI Engineering',
    tagline: 'Pixel-perfect interfaces that feel alive',
    description: 'React, Next.js, TypeScript, Tailwind, Framer Motion — component-driven UIs with motion, accessibility, and performance baked in.',
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion', 'Vue', 'Angular'],
    color: 'cyan',
    href: '#projects',
  },
  {
    icon: FiServer,
    title: 'Backend & API Architecture',
    tagline: 'Scalable systems, clean contracts',
    description: 'Node.js, Python, Go, PostgreSQL, Redis — REST & GraphQL APIs, auth, real-time, background jobs, observability.',
    stack: ['Node.js', 'Python', 'Go', 'PostgreSQL', 'Redis', 'NestJS', 'FastAPI'],
    color: 'amber',
    href: '#projects',
  },
  {
    icon: FiCpu,
    title: 'AI & Workflow Automation',
    tagline: 'LLMs + OCR + workflows that save hours',
    description: 'Hugging Face, Ollama, n8n, Zoho — prompt engineering, document AI, automated generation, RAG, agent orchestration.',
    stack: ['Ollama', 'Hugging Face', 'n8n', 'Zoho', 'LangChain', 'RAG', 'OCR'],
    color: 'emerald',
    href: '#projects',
  },
  {
    icon: FiLayers,
    title: 'ERP & Platform Engineering',
    tagline: 'Frappe/ERPNext, custom integrations',
    description: 'ERPNext, Frappe Framework, Docker, CI/CD — module customization, workflow automation, multi-tenant deployments, migrations.',
    stack: ['ERPNext', 'Frappe', 'Docker', 'Python', 'PostgreSQL', 'CI/CD', 'AWS'],
    color: 'cyan',
    href: '#projects',
  },
];

const FocusAreas = () => {
  const { setCursorVariant } = useCursor();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const handleMouseEnter = () => setCursorVariant('link');
  const handleMouseLeave = () => setCursorVariant('default');

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-shell"
      aria-labelledby="focus-heading"
    >
      <div className="dot-grid-pattern -left-16 bottom-4 sm:-left-8 lg:left-0" aria-hidden="true" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-16 max-w-3xl"
        >
          <span className="section-kicker">Focus Areas</span>
          <h2 id="focus-heading" className="section-heading mt-2">
            Four areas where I deliver end-to-end value.
          </h2>
          <p className="section-subheading">
            From interface craft to system architecture, AI integration to platform engineering —
            each area represents production-grade capability, not just familiarity.
          </p>
        </motion.div>

        {/* Grid of 4 Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {focusAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
            >
              <TiltCard
                intensity={10}
                scale={1.02}
                glow={true}
                className="h-full p-6 flex flex-col"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0.8, rotate: -12 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 200 }}
                    className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{
                      background: `var(--color-${area.color}-soft)`,
                      color: `var(--color-${area.color})`,
                    }}
                  >
                    <area.icon className="h-7 w-7" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="font-display font-semibold text-xl mb-2" style={{ color: 'var(--fg-primary)' }}>
                    {area.title}
                  </h3>

                  {/* Tagline */}
                  <p className="text-sm font-medium mb-4" style={{ color: `var(--color-${area.color})` }}>
                    {area.tagline}
                  </p>

                  {/* Description */}
                  <p className="mb-6 text-sm leading-relaxed flex-1" style={{ color: 'var(--fg-secondary)' }}>
                    {area.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {area.stack.slice(0, 4).map((tech, tIndex) => (
                      <span
                        key={tech}
                        className="badge badge-neutral text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {area.stack.length > 4 && (
                      <span className="badge badge-neutral text-xs" style={{ color: 'var(--fg-tertiary)' }}>
                        +{area.stack.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <MagneticButton
                    variant="ghost"
                    onClick={() => {
                      const section = document.querySelector(area.href);
                      if (section) section.scrollIntoView({ behavior: 'smooth' });
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    magneticStrength={0.2}
                    className="w-full justify-between text-sm px-4 py-3"
                  >
                    <span>View Projects</span>
                    <FiArrowRight className="h-4 w-4" />
                  </MagneticButton>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;
