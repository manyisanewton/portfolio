import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiBriefcase, FiAward, FiMapPin, FiCalendar, FiCode, FiBookOpen, FiTarget, FiBook } from 'react-icons/fi';
import { useCursor } from '../context/CursorContext';
import { TiltCard } from './ui';

const journeyData = [
  {
    category: 'experience',
    items: [
      {
        title: 'Project Coordinator & Software Developer',
        company: 'Norwa Africa',
        period: 'Nov 2024 – Present',
        location: 'Nairobi, Kenya',
        highlight: 'AI quotation generator: 5hrs → 10min using Python, Ollama, OCR',
        tech: ['Python', 'React', 'PostgreSQL', 'ERPNext', 'n8n', 'Docker'],
      },
      {
        title: 'Volunteer Technical Mentor',
        company: 'Moringa School',
        period: 'Nov 2024 – Jul 2025',
        location: 'Remote',
        highlight: 'Mentored 5 students in React, JS, career prep — 100% project completion',
        tech: ['React', 'JavaScript', 'Git', 'Career Coaching'],
      },
      {
        title: 'ICT & Computer Studies Teacher',
        company: 'Gracefields International School',
        period: '2023 – 2024',
        location: 'Nairobi, Kenya',
        highlight: 'Designed practical CS curriculum, digital literacy & programming basics',
        tech: ['ICT Curriculum', 'Digital Literacy', 'Programming Basics'],
      },
    ],
  },
  {
    category: 'education',
    items: [
      {
        title: 'Full-Stack Web Development Certificate',
        company: 'Moringa School',
        period: '2025',
        location: 'Nairobi, Kenya',
        highlight: 'Intensive program: React, Node.js, MongoDB, Express, CI/CD, Agile',
        tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Git', 'CI/CD'],
      },
      {
        title: 'BSc Computer Science (Upper Division)',
        company: 'University of Nairobi',
        period: '2019 – 2022',
        location: 'Nairobi, Kenya',
        highlight: 'Data Structures, Algorithms, Web Dev, DB Systems, Software Eng, Networks',
        tech: ['C++', 'Java', 'SQL', 'Algorithms', 'Systems Design'],
      },
    ],
  },
  {
    category: 'certifications',
    items: [
      {
        title: 'Cisco Certified Network Associate (CCNA)',
        company: 'Cisco Networking Academy',
        period: 'Apr 2026',
        location: 'Kenya',
        highlight: 'Networking, routing, switching, security fundamentals, automation',
        tech: ['Networking', 'Routing', 'Switching', 'Security'],
      },
      {
        title: 'Artificial Intelligence Part-Time Course',
        company: 'Moringa School',
        period: 'Jul – Aug 2025',
        location: 'Kenya',
        highlight: 'LLM fundamentals, prompt engineering, Hugging Face, Ollama, AI apps',
        tech: ['LLMs', 'Prompt Engineering', 'Hugging Face', 'Ollama'],
      },
    ],
  },
];

const categoryConfig = {
  experience: {
    icon: FiBriefcase,
    label: 'Professional Experience',
    subtitle: 'Delivering software projects, leading integrations, automating workflows',
    color: 'cyan',
    iconComponent: FiCode,
  },
  education: {
    icon: FiBook,
    label: 'Education',
    subtitle: 'Academic foundation in computer science and specialized full-stack training',
    color: 'amber',
    iconComponent: FiBookOpen,
  },
  certifications: {
    icon: FiAward,
    label: 'Certifications & Training',
    subtitle: 'Validated expertise in networking, AI, and modern development practices',
    color: 'emerald',
    iconComponent: FiTarget,
  },
};

const journeyMilestones = [
  { ...journeyData[1].items[1], category: 'education' },
  { ...journeyData[0].items[2], category: 'experience' },
  { ...journeyData[0].items[0], category: 'experience' },
  { ...journeyData[0].items[1], category: 'experience' },
  { ...journeyData[1].items[0], category: 'education' },
  { ...journeyData[2].items[1], category: 'certifications' },
  { ...journeyData[2].items[0], category: 'certifications' },
];

const Experience = () => {
  const { setCursorVariant } = useCursor();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const handleMouseEnter = () => setCursorVariant('link');
  const handleMouseLeave = () => setCursorVariant('default');

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="section-shell alt"
      aria-labelledby="journey-heading"
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-12 max-w-4xl"
        >
          <span className="section-kicker">Journey</span>
          <h2 id="journey-heading" className="section-heading mt-2">
            From classroom to production — the path so far.
          </h2>
          <p className="section-subheading">
            A continuous path from computer-science foundations to teaching, production delivery,
            technical mentorship, and deeper specialization in AI and infrastructure.
          </p>
        </motion.div>

        {/* Journey overview */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {Object.entries(categoryConfig).map(([key, config], index) => (
            <div key={key} className="flex items-center gap-4 rounded-2xl border bg-white/80 p-5 shadow-sm" style={{ borderColor: 'var(--border-light)' }}>
              <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl" style={{ background: `var(--color-${config.color}-soft)` }}>
                <config.icon className="h-5 w-5" style={{ color: `var(--color-${config.color})` }} />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: `var(--color-${config.color})` }}>
                  Chapter {index + 1}
                </div>
                <div className="mt-1 font-display font-semibold" style={{ color: 'var(--fg-primary)' }}>{config.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Unified chronological timeline */}
        <div className="relative">
          <div className="absolute bottom-0 left-5 top-0 w-px lg:left-1/2" style={{ background: 'linear-gradient(to bottom, var(--color-cyan), var(--color-amber), var(--color-emerald))' }} />

          <div className="space-y-10 lg:space-y-14">
            {journeyMilestones.map((item, index) => {
              const config = categoryConfig[item.category];
              const isRight = index % 2 === 1;

              return (
                <motion.article
                  key={`${item.period}-${item.title}`}
                  initial={{ opacity: 0, x: isRight ? 36 : -36 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                  className={`relative pl-14 lg:grid lg:grid-cols-2 lg:pl-0 ${isRight ? '' : ''}`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    className="absolute left-5 top-8 z-20 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-4 bg-white shadow-md lg:left-1/2"
                    style={{ borderColor: `var(--color-${config.color})` }}
                  >
                    <config.iconComponent className="h-4 w-4" style={{ color: `var(--color-${config.color})` }} />
                  </div>

                  <div className={`${isRight ? 'lg:col-start-2 lg:pl-14' : 'lg:pr-14'}`}>
                    <TiltCard intensity={4} scale={1.008} glow={false} className="p-6 sm:p-7">
                      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.13em]" style={{ color: `var(--color-${config.color})` }}>
                          <config.icon className="h-4 w-4" />
                          {config.label}
                        </div>
                        <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 font-mono text-xs text-slate-600">
                          <FiCalendar className="h-3.5 w-3.5" />
                          {item.period}
                        </div>
                      </div>

                      <div className="mb-5">
                        <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                          Milestone {String(index + 1).padStart(2, '0')}
                        </div>
                        <h3 className="font-display text-xl font-semibold leading-snug sm:text-2xl" style={{ color: 'var(--fg-primary)' }}>
                          {item.title}
                        </h3>
                        <p className="mt-2 font-semibold" style={{ color: `var(--color-${config.color})` }}>{item.company}</p>
                        <p className="mt-1 flex items-center gap-2 text-sm" style={{ color: 'var(--fg-tertiary)' }}>
                          <FiMapPin className="h-4 w-4" />
                          {item.location}
                        </p>
                      </div>

                      <div className="mb-5 rounded-xl border border-slate-100 bg-slate-50/80 p-4 shadow-[0_6px_18px_rgba(15,23,42,0.055)]">
                        <p className="text-sm leading-7" style={{ color: 'var(--fg-secondary)' }}>{item.highlight}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {item.tech.map((tech) => (
                          <span key={tech} className="badge badge-neutral text-[10px]">{tech}</span>
                        ))}
                      </div>
                    </TiltCard>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
