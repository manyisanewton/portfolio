import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChalkboardTeacher,
  FaChevronLeft,
  FaChevronRight,
  FaCodeBranch,
  FaLayerGroup,
  FaServer,
  FaStar,
  FaStarHalfAlt,
  FaTools,
  FaRobot,
  FaCogs,
} from 'react-icons/fa';
import InteractiveCard from './InteractiveCard';

const capabilityItems = [
  {
    title: 'Frontend',
    icon: <FaLayerGroup />,
    iconColor: 'accent-primary-text',
    iconBg: 'accent-primary-tint',
    iconBorder: 'accent-primary-border',
    summary: 'Responsive, polished UI systems built for clarity, speed, and interaction.',
    stack: ['React', 'Next.js', 'Angular', 'Vue.js', 'Blazor', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    rating: 5,
  },
  {
    title: 'Backend',
    icon: <FaServer />,
    iconColor: 'accent-green-text',
    iconBg: 'accent-green-tint',
    iconBorder: 'accent-green-border',
    summary: 'Reliable APIs, business logic, data handling, and real-world integrations.',
    stack: ['Node.js', 'NestJS', 'Python', 'Flask', 'Django', 'C#', 'ASP.NET Core', 'PHP', 'Laravel', 'PostgreSQL', 'MySQL', 'Firebase'],
    rating: 4.5,
  },
  {
    title: 'AI & Automation',
    icon: <FaRobot />,
    iconColor: 'accent-warm-text',
    iconBg: 'accent-warm-tint',
    iconBorder: 'accent-warm-border',
    summary: 'LLM integration, prompt engineering, OCR, document generation, and workflow automation.',
    stack: ['Hugging Face', 'Ollama', 'n8n', 'Zoho', 'OCR', 'Prompt Engineering', 'Doc Generation'],
    rating: 4.5,
  },
  {
    title: 'ERP Systems',
    icon: <FaCodeBranch />,
    iconColor: 'accent-primary-text',
    iconBg: 'accent-primary-tint',
    iconBorder: 'accent-primary-border',
    summary: 'ERPNext/Frappe workflows, operational support, and practical business system improvements.',
    stack: ['ERPNext', 'Frappe', 'Custom Modules', 'Reports', 'Dashboards'],
    rating: 4.5,
  },
  {
    title: 'DevOps & Deploy',
    icon: <FaTools />,
    iconColor: 'accent-green-text',
    iconBg: 'accent-green-tint',
    iconBorder: 'accent-green-border',
    summary: 'Hosting, containers, CI/CD, cloud platforms, and dependable production environments.',
    stack: ['Docker', 'AWS', 'Vercel', 'Render', 'Hostinger', 'Frappe Cloud', 'Linux', 'GitHub Actions', 'cPanel'],
    rating: 4.5,
  },
  {
    title: 'Mentoring',
    icon: <FaChalkboardTeacher />,
    iconColor: 'accent-warm-text',
    iconBg: 'accent-warm-tint',
    iconBorder: 'accent-warm-border',
    summary: 'Teaching, reviews, technical guidance, and helping teams grow with confidence.',
    stack: ['Teaching', 'Code Reviews', 'Coaching', 'Career Prep', 'Technical Support'],
    rating: 5,
  },
];

const wrapIndex = (index) => (index + capabilityItems.length) % capabilityItems.length;

const RatingStars = ({ rating, muted = false }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;

  return (
    <div className={`flex items-center gap-1 ${muted ? 'text-yellow-300/35' : 'text-yellow-400'}`}>
      {Array.from({ length: fullStars }).map((_, index) => (
        <FaStar key={`full-${index}`} className="h-3.5 w-3.5" />
      ))}
      {hasHalf && <FaStarHalfAlt className="h-3.5 w-3.5" />}
    </div>
  );
};

const GhostCard = ({ item, side }) => (
  <div
    className={`pointer-events-none absolute top-1/2 hidden h-[250px] w-[220px] -translate-y-1/2 rounded-[24px] border bg-slate-100/80 p-5 opacity-100 blur-[0.2px] lg:block ${side === 'left' ? 'left-[12%]' : 'right-[12%]'}`}
    style={{ borderColor: 'var(--border-light)' }}
  >
    <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border text-lg ${item.iconBorder} ${item.iconBg} ${item.iconColor}/40`}>
      {item.icon}
    </div>
    <div className="max-w-[160px] text-2xl font-medium" style={{ color: 'var(--text-muted)' }}>{item.title}</div>
    <div className="mt-3">
      <RatingStars rating={item.rating} muted />
    </div>
    <div className="mt-5 h-px w-full" style={{ background: 'var(--border-light)' }} />
    <div className="mt-4 space-y-3">
      <div className="h-3 w-4/5 rounded-full" style={{ background: 'var(--border-light)' }} />
      <div className="h-3 w-2/3 rounded-full" style={{ background: 'var(--border-light)' }} />
      <div className="h-3 w-3/4 rounded-full" style={{ background: 'var(--border-light)' }} />
    </div>
  </div>
);

const SystemsMap = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (paused) return undefined;
    const interval = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => wrapIndex(current + 1));
    }, 3400);
    return () => window.clearInterval(interval);
  }, [paused]);

  const activeItem = capabilityItems[activeIndex];
  const prevItem = capabilityItems[wrapIndex(activeIndex - 1)];
  const nextItem = capabilityItems[wrapIndex(activeIndex + 1)];

  const cardMotion = {
    enter: (dir) => ({
      x: dir > 0 ? 220 : -220,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -220 : 220,
      opacity: 0,
      scale: 0.96,
    }),
  };

  return (
    <section id="systems-map" className="section-shell">
      <div className="section-wrap">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="section-kicker">Systems Map</span>
            <h2 className="mt-3 text-3xl font-medium sm:text-4xl" style={{ color: 'var(--text-primary)' }}>How I work</h2>
            <p className="mt-3 text-sm sm:text-base" style={{ color: 'var(--text-tertiary)' }}>Frontend to AI, automation, and delivery — in one moving deck.</p>
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={() => {
                setDirection(-1);
                setActiveIndex((current) => wrapIndex(current - 1));
              }}
              className="btn-secondary h-11 w-11 px-0"
              aria-label="Previous"
            >
              <FaChevronLeft />
            </button>
            <button
              type="button"
              onClick={() => {
                setDirection(1);
                setActiveIndex((current) => wrapIndex(current + 1));
              }}
              className="btn-secondary h-11 w-11 px-0"
              aria-label="Next"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div
          className="relative px-0 py-8 sm:py-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
          <div className="pointer-events-none absolute left-[14%] right-[14%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0" />
          <motion.div
            className="pointer-events-none absolute left-[16%] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full accent-primary-bg"
            style={{ boxShadow: '0 0 18px var(--color-primary-glow)' }}
            animate={{ x: ['0%', '300%', '600%'], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative mx-auto flex min-h-[320px] items-center justify-center sm:min-h-[360px]">
            <GhostCard item={prevItem} side="left" />
            <GhostCard item={nextItem} side="right" />
            <div className="relative z-10 w-full max-w-[360px]">
              <AnimatePresence mode="wait" custom={direction}>
                <InteractiveCard className="rounded-[24px]" intensity={6}>
                <motion.article
                  key={activeItem.title}
                  custom={direction}
                  variants={cardMotion}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.42, ease: 'easeInOut' }}
                  className="mx-auto min-h-[420px] rounded-[24px] border p-6 shadow-card-hover sm:min-h-[450px] sm:p-7"
                  style={{ borderColor: 'var(--color-warm-border)', background: 'var(--bg-card)' }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border text-xl ${activeItem.iconBorder} ${activeItem.iconBg} ${activeItem.iconColor}`}>
                        {activeItem.icon}
                      </div>
                      <h3 className="text-2xl font-medium sm:text-3xl" style={{ color: 'var(--text-primary)' }}>{activeItem.title}</h3>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-7 sm:text-base" style={{ color: 'var(--text-secondary)' }}>
                    {activeItem.summary}
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <RatingStars rating={activeItem.rating} />
                    <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{activeItem.rating}/5</span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {activeItem.stack.map((entry) => (
                      <span key={entry} className="badge badge-neutral">{entry}</span>
                    ))}
                  </div>
                </motion.article>
                </InteractiveCard>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 lg:hidden">
            <button
              type="button"
              onClick={() => {
                setDirection(-1);
                setActiveIndex((current) => wrapIndex(current - 1));
              }}
              className="btn-secondary h-11 w-11 px-0"
              aria-label="Previous"
            >
              <FaChevronLeft />
            </button>
            <div className="flex items-center gap-2">
              {capabilityItems.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`View card ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'w-8 accent-primary-bg' : 'w-2.5'
                  }`}
                  style={{ background: index === activeIndex ? 'var(--color-primary)' : 'var(--border-medium)' }}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setDirection(1);
                setActiveIndex((current) => wrapIndex(current + 1));
              }}
              className="btn-secondary h-11 w-11 px-0"
              aria-label="Next"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemsMap;