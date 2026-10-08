import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCode, FiServer, FiCpu, FiLayers } from 'react-icons/fi';
import { useCursor } from '../context/CursorContext';
import { TiltCard } from './ui';

const skillCategories = [
  {
    key: 'frontend',
    label: 'Frontend',
    description: 'Accessible, responsive interfaces built for clarity, speed, and maintainability.',
    icon: FiCode,
    color: 'cyan',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 90 },
      { name: 'TypeScript', level: 92 },
      { name: 'Tailwind CSS', level: 94 },
      { name: 'Framer Motion', level: 88 },
      { name: 'Vue.js', level: 80 },
      { name: 'Angular', level: 75 },
      { name: 'Blazor', level: 70 },
    ],
  },
  {
    key: 'backend',
    label: 'Backend',
    description: 'Reliable APIs, data layers, and services designed around real business workflows.',
    icon: FiServer,
    color: 'amber',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Python', level: 88 },
      { name: 'Go', level: 75 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'Redis', level: 80 },
      { name: 'NestJS', level: 82 },
      { name: 'FastAPI', level: 78 },
      { name: 'GraphQL', level: 75 },
    ],
  },
  {
    key: 'ai',
    label: 'AI & Automation',
    description: 'Practical AI workflows that reduce manual work and improve operational throughput.',
    icon: FiCpu,
    color: 'emerald',
    skills: [
      { name: 'Ollama', level: 85 },
      { name: 'Hugging Face', level: 82 },
      { name: 'n8n', level: 90 },
      { name: 'Zoho', level: 85 },
      { name: 'LangChain', level: 75 },
      { name: 'RAG', level: 78 },
      { name: 'OCR / Doc AI', level: 80 },
      { name: 'Prompt Engineering', level: 88 },
    ],
  },
  {
    key: 'platforms',
    label: 'Platforms & ERP',
    description: 'Business platforms, integrations, deployment tooling, and payment infrastructure.',
    icon: FiLayers,
    color: 'cyan',
    skills: [
      { name: 'ERPNext', level: 92 },
      { name: 'Frappe Framework', level: 88 },
      { name: 'Docker', level: 85 },
      { name: 'AWS', level: 75 },
      { name: 'CI/CD', level: 82 },
      { name: 'Linux', level: 80 },
      { name: 'M-Pesa Daraja', level: 85 },
      { name: 'Payment APIs', level: 80 },
    ],
  },
];

const Skills = () => {
  const { setCursorVariant } = useCursor();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const handleMouseEnter = () => setCursorVariant('link');
  const handleMouseLeave = () => setCursorVariant('default');

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-shell alt"
      aria-labelledby="skills-heading"
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-14 max-w-4xl"
        >
          <span className="section-kicker">Capabilities</span>
          <h2 id="skills-heading" className="section-heading mt-2">
            A production-ready toolkit for building complete digital products.
          </h2>
          <p className="section-subheading">
            A balanced mix of interface engineering, backend architecture, automation, and
            platform delivery—applied together to ship dependable software.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {skillCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{ duration: 0.55, delay: 0.12 + catIndex * 0.09, ease: 'easeOut' }}
            >
              <TiltCard
                intensity={4}
                scale={1.008}
                glow={false}
                className="h-full p-6 sm:p-7"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="mb-7 flex items-start gap-4 border-b pb-6" style={{ borderColor: 'var(--border-light)' }}>
                  <div
                    className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl"
                    style={{ background: `var(--color-${cat.color}-soft)` }}
                  >
                    <cat.icon className="h-6 w-6" style={{ color: `var(--color-${cat.color})` }} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold" style={{ color: 'var(--fg-primary)' }}>
                      {cat.label}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6" style={{ color: 'var(--fg-tertiary)' }}>
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                  {cat.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold" style={{ color: 'var(--fg-secondary)' }}>
                          {skill.name}
                        </span>
                        <span className="font-mono text-[11px]" style={{ color: 'var(--fg-tertiary)' }}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full" style={{ background: 'var(--bg-muted)' }}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: `var(--color-${cat.color})` }}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 0.8, delay: 0.25 + catIndex * 0.08 + skillIndex * 0.035, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
