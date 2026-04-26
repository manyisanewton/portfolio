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
} from 'react-icons/fa';
import InteractiveCard from './InteractiveCard';

const capabilityItems = [
  {
    title: 'Frontend',
    icon: <FaLayerGroup />,
    summary: 'Responsive, polished UI systems built for clarity, speed, and interaction.',
    stack: ['React', 'Next.js', 'Angular', 'Tailwind CSS', 'Framer Motion'],
    rating: 5,
  },
  {
    title: 'Backend',
    icon: <FaServer />,
    summary: 'Reliable APIs, business logic, data handling, and real-world integrations.',
    stack: ['Flask', 'PHP', 'C#', 'REST APIs', 'PostgreSQL'],
    rating: 4.5,
  },
  {
    title: 'ERP Systems',
    icon: <FaCodeBranch />,
    summary: 'ERPNext workflows, operational support, and practical business system improvements.',
    stack: ['ERPNext', 'Frappe', 'Automation', 'Workflows'],
    rating: 4.5,
  },
  {
    title: 'Deployments',
    icon: <FaTools />,
    summary: 'Hosting, server setup, release support, and dependable production environments.',
    stack: ['cPanel', 'Docker', 'AWS', 'Servers'],
    rating: 4.5,
  },
  {
    title: 'Mentoring',
    icon: <FaChalkboardTeacher />,
    summary: 'Teaching, reviews, technical guidance, and helping teams grow with confidence.',
    stack: ['Teaching', 'Code Reviews', 'Coaching', 'Support'],
    rating: 5,
  },
];

const wrapIndex = (index) => (index + capabilityItems.length) % capabilityItems.length;

const RatingStars = ({ rating, muted = false }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;

  return (
    <div className={`flex items-center gap-1 ${muted ? 'text-yellow-300/35' : 'text-yellow-300'}`}>
      {Array.from({ length: fullStars }).map((_, index) => (
        <FaStar key={`full-${index}`} className="h-3.5 w-3.5" />
      ))}
      {hasHalf && <FaStarHalfAlt className="h-3.5 w-3.5" />}
    </div>
  );
};

const GhostCard = ({ item, side }) => (
  <div
    className={`pointer-events-none absolute top-1/2 hidden h-[250px] w-[220px] -translate-y-1/2 rounded-[24px] border border-white/6 bg-slate-900/28 p-5 opacity-100 blur-[0.2px] lg:block ${
      side === 'left' ? 'left-[12%]' : 'right-[12%]'
    }`}
  >
    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border accent-warm-border accent-warm-tint text-lg text-orange-300/45">
      {item.icon}
    </div>
    <div className="max-w-[160px] text-2xl font-medium text-white/18">{item.title}</div>
    <div className="mt-3">
      <RatingStars rating={item.rating} muted />
    </div>
    <div className="mt-5 h-px w-full bg-white/6" />
    <div className="mt-4 space-y-3">
      <div className="h-3 w-4/5 rounded-full bg-white/5" />
      <div className="h-3 w-2/3 rounded-full bg-white/5" />
      <div className="h-3 w-3/4 rounded-full bg-white/5" />
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
    <section id="systems-map" className="section-shell bg-slate-950 text-white">
      <div className="section-wrap">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="section-kicker">Systems Map</span>
            <h2 className="mt-3 text-3xl font-medium text-white sm:text-4xl">How I work</h2>
            <p className="mt-3 text-sm text-slate-400 sm:text-base">Frontend to delivery, in one moving deck.</p>
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={() => {
                setDirection(-1);
                setActiveIndex((current) => wrapIndex(current - 1));
              }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-300 transition-colors hover:text-white accent-warm-border"
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-300 transition-colors hover:text-white accent-warm-border"
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
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.08),_transparent_40%)]" />
          <div className="pointer-events-none absolute left-[14%] right-[14%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-orange-500/0 via-orange-400/35 to-orange-500/0" />
          <motion.div
            className="pointer-events-none absolute left-[16%] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-orange-300 shadow-[0_0_18px_rgba(241,90,36,0.72)]"
            animate={{ x: ['0%', '300%', '600%'], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative mx-auto flex min-h-[320px] items-center justify-center sm:min-h-[360px]">
            <GhostCard item={prevItem} side="left" />
            <GhostCard item={nextItem} side="right" />
            <div className="relative z-10 w-full max-w-[360px]">
              <AnimatePresence mode="wait" custom={direction}>
                <InteractiveCard className="rounded-[24px]" intensity={7}>
                <motion.article
                  key={activeItem.title}
                  custom={direction}
                  variants={cardMotion}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.42, ease: 'easeInOut' }}
                  className="mx-auto min-h-[420px] rounded-[24px] border accent-warm-border bg-slate-900/92 p-6 shadow-[0_20px_70px_rgba(3,7,18,0.42)] sm:min-h-[450px] sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border accent-warm-border accent-warm-tint text-xl accent-warm-text">
                        {activeItem.icon}
                      </div>
                      <h3 className="text-2xl font-medium text-white sm:text-3xl">{activeItem.title}</h3>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                    {activeItem.summary}
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <RatingStars rating={activeItem.rating} />
                    <span className="text-sm text-slate-400">{activeItem.rating}/5</span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {activeItem.stack.map((entry) => (
                      <span
                        key={entry}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-300 sm:text-sm"
                      >
                        {entry}
                      </span>
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-300 transition-colors hover:text-white accent-warm-border"
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
                    index === activeIndex ? 'w-8 bg-orange-400' : 'w-2.5 bg-white/20'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setDirection(1);
                setActiveIndex((current) => wrapIndex(current + 1));
              }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-300 transition-colors hover:text-white accent-warm-border"
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
