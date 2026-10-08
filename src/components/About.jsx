import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiArrowRight, FiMapPin, FiCalendar, FiAward, FiCode, FiUsers, FiBookOpen, FiTrendingUp } from 'react-icons/fi';
import { useCursor } from '../context/CursorContext';
import { TiltCard, MagneticButton } from './ui';

const typeIcons = {
  experience: FiCode,
  education: FiBookOpen,
  certification: FiAward,
};

const typeColors = {
  experience: 'cyan',
  education: 'amber',
  certification: 'emerald',
};

const timelineData = [
  {
    period: 'Nov 2024 – Present',
    role: 'Project Coordinator & Software Developer',
    company: 'Norwa Africa',
    location: 'Nairobi, Kenya',
    highlight: 'AI quotation generator: 5hrs → 10min using Python, Ollama, OCR',
    tech: ['Python', 'React', 'PostgreSQL', 'ERPNext', 'n8n', 'Docker'],
    type: 'experience',
  },
  {
    period: 'Nov 2024 – Jul 2025',
    role: 'Volunteer Technical Mentor',
    company: 'Moringa School',
    location: 'Remote',
    highlight: 'Mentored 5 students in React, JS, career prep — 100% project completion',
    tech: ['React', 'JavaScript', 'Git', 'Career Coaching'],
    type: 'experience',
  },
  {
    period: '2023 – 2024',
    role: 'ICT & Computer Studies Teacher',
    company: 'Gracefields International School',
    location: 'Nairobi, Kenya',
    highlight: 'Designed practical CS curriculum, digital literacy & programming basics',
    tech: ['ICT Curriculum', 'Digital Literacy', 'Programming Basics'],
    type: 'experience',
  },
  {
    period: '2025',
    role: 'Full-Stack Web Development Certificate',
    company: 'Moringa School',
    location: 'Nairobi, Kenya',
    highlight: 'Intensive program: React, Node.js, MongoDB, Express, CI/CD, Agile',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Git', 'CI/CD'],
    type: 'education',
  },
  {
    period: '2019 – 2022',
    role: 'BSc Computer Science (Upper Division)',
    company: 'University of Nairobi',
    location: 'Nairobi, Kenya',
    highlight: 'Data Structures, Algorithms, Web Dev, DB Systems, Software Eng, Networks',
    tech: ['C++', 'Java', 'SQL', 'Algorithms', 'Systems Design'],
    type: 'education',
  },
  {
    period: 'Apr 2026',
    role: 'Cisco Certified Network Associate (CCNA)',
    company: 'Cisco Networking Academy',
    location: 'Kenya',
    highlight: 'Networking, routing, switching, security fundamentals, automation',
    tech: ['Networking', 'Routing', 'Switching', 'Security'],
    type: 'certification',
  },
  {
    period: 'Jul – Aug 2025',
    role: 'Artificial Intelligence Part-Time Course',
    company: 'Moringa School',
    location: 'Kenya',
    highlight: 'LLM fundamentals, prompt engineering, Hugging Face, Ollama, AI apps',
    tech: ['LLMs', 'Prompt Engineering', 'Hugging Face', 'Ollama'],
    type: 'certification',
  },
];

const About = () => {
  const { setCursorVariant } = useCursor();
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);

  const handleMouseEnter = () => setCursorVariant('link');
  const handleMouseLeave = () => setCursorVariant('default');

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.touches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeIndex < timelineData.length - 1) {
        const next = activeIndex + 1;
        setActiveIndex(next);
        moveToCard(next);
      } else if (diff < 0 && activeIndex > 0) {
        const previous = activeIndex - 1;
        setActiveIndex(previous);
        moveToCard(previous);
      }
      setTouchStart(null);
    }
  };

  const moveToCard = (index, behavior = 'smooth') => {
    const track = carouselRef.current;
    const card = track?.children[index];
    if (!track || !card) return;

    track.scrollTo({ left: card.offsetLeft, behavior });
  };

  useEffect(() => {
    if (!isInView || isPaused) return undefined;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => {
        const next = current + 1;
        moveToCard(next);

        if (next === timelineData.length) {
          window.setTimeout(() => {
            moveToCard(0, 'auto');
            setActiveIndex(0);
          }, 750);
        }

        return next;
      });
    }, 3500);

    return () => window.clearInterval(interval);
  }, [isInView, isPaused]);

  const scrollToContact = () => {
    const section = document.querySelector('#contact');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-shell alt"
      aria-labelledby="about-heading"
    >
      <div className="dot-grid-pattern -right-16 top-8 sm:-right-8 lg:right-0" aria-hidden="true" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-16 max-w-3xl"
        >
          <span className="section-kicker">About</span>
          <h2 id="about-heading" className="section-heading mt-2">
            Full-stack product work with a strong frontend edge.
          </h2>
          <p className="section-subheading">
            3+ years delivering production systems across React/Next.js frontends,
            Python/Node.js backends, ERPNext customizations, and AI-assisted workflows.
            I build practical software that solves real business problems.
          </p>
        </motion.div>

        {/* Metric Pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="mb-16 flex flex-wrap items-center gap-4 sm:gap-6"
        >
          <TiltCard intensity={6} scale={1.01} glow={false} className="px-6 py-4 min-w-[160px]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl" style={{ background: 'var(--color-cyan-soft)' }}>
                <FiTrendingUp className="h-5 w-5" style={{ color: 'var(--color-cyan)' }} />
              </div>
              <div>
                <div className="font-display font-bold text-2xl" style={{ color: 'var(--fg-primary)' }}>3+</div>
                <div className="text-xs font-medium" style={{ color: 'var(--fg-tertiary)' }}>Years Experience</div>
              </div>
            </div>
          </TiltCard>
          <TiltCard intensity={6} scale={1.01} glow={false} className="px-6 py-4 min-w-[160px]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl" style={{ background: 'var(--color-amber-soft)' }}>
                <FiCode className="h-5 w-5" style={{ color: 'var(--color-amber)' }} />
              </div>
              <div>
                <div className="font-display font-bold text-2xl" style={{ color: 'var(--fg-primary)' }}>15+</div>
                <div className="text-xs font-medium" style={{ color: 'var(--fg-tertiary)' }}>Projects Shipped</div>
              </div>
            </div>
          </TiltCard>
          <TiltCard intensity={6} scale={1.01} glow={false} className="px-6 py-4 min-w-[160px]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl" style={{ background: 'var(--color-emerald-soft)' }}>
                <FiAward className="h-5 w-5" style={{ color: 'var(--color-emerald)' }} />
              </div>
              <div>
                <div className="font-display font-bold text-2xl" style={{ color: 'var(--fg-primary)' }}>4</div>
                <div className="text-xs font-medium" style={{ color: 'var(--fg-tertiary)' }}>Core Stacks</div>
              </div>
            </div>
          </TiltCard>
          <TiltCard intensity={6} scale={1.01} glow={false} className="px-6 py-4 min-w-[160px]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl" style={{ background: 'var(--color-cyan-soft)' }}>
                <FiUsers className="h-5 w-5" style={{ color: 'var(--color-cyan)' }} />
              </div>
              <div>
                <div className="font-display font-bold text-2xl" style={{ color: 'var(--fg-primary)' }}>2</div>
                <div className="text-xs font-medium" style={{ color: 'var(--fg-tertiary)' }}>Certifications</div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* Horizontal Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Carousel status */}
          <div className="mb-8 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-600">
              {isPaused ? 'Paused' : 'Experience highlights · Auto playing'}
            </p>
            <div className="flex justify-center gap-2">
              {timelineData.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show timeline item ${i + 1}`}
                  onClick={() => {
                    setActiveIndex(i);
                    moveToCard(i);
                  }}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: i === activeIndex % timelineData.length ? '24px' : '8px',
                    background: i === activeIndex % timelineData.length ? 'var(--color-cyan)' : 'var(--border-medium)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Timeline Track */}
          <div className="relative -mx-3 overflow-hidden px-3">
            <div
              ref={carouselRef}
              className="relative flex snap-x snap-mandatory items-stretch gap-6 overflow-hidden py-5 scroll-smooth"
            >
              {[...timelineData, ...timelineData.slice(0, 3)].map((item, index) => (
                <motion.div
                  key={`${item.type}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.08 }}
                  className="relative w-full flex-none snap-start md:w-[calc((100%_-_24px)/2)] lg:w-[calc((100%_-_48px)/3)]"
                >
                  {/* Timeline Card */}
                  <TiltCard
                    intensity={8}
                    scale={1.01}
                    glow={index % timelineData.length === activeIndex % timelineData.length}
                    className={`h-full shadow-[0_8px_20px_rgba(15,23,42,0.055)] transition-all duration-500 ${
                      index % timelineData.length === activeIndex % timelineData.length
                        ? '-translate-y-1 shadow-[0_12px_26px_rgba(15,23,42,0.075)] ring-1'
                        : 'translate-y-0'
                    }`}
                    style={{
                      borderColor: index % timelineData.length === activeIndex % timelineData.length
                        ? `var(--color-${typeColors[item.type]})`
                        : 'var(--border-light)',
                    }}
                  >
                    <div className="p-6 h-full flex flex-col">
                      {/* Type Badge */}
                      <div className="flex items-center gap-2 mb-4">
                        <div
                          className="p-2 rounded-xl"
                          style={{ background: `var(--color-${typeColors[item.type]}-soft)` }}
                        >
                          {React.createElement(typeIcons[item.type], {
                            className: "h-5 w-5",
                            style: { color: `var(--color-${typeColors[item.type]})` },
                          })}
                        </div>
                        <span
                          className="text-xs font-semibold uppercase tracking-[0.1em]"
                          style={{ color: `var(--color-${typeColors[item.type]})` }}
                        >
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </span>
                      </div>

                      {/* Period */}
                      <div className="mb-3 flex items-center gap-2 text-sm" style={{ color: 'var(--fg-tertiary)' }}>
                        <FiCalendar className="h-4 w-4 flex-shrink-0" />
                        <span className="font-mono">{item.period}</span>
                      </div>

                      {/* Role */}
                      <h3 className="font-display font-semibold text-xl mb-1" style={{ color: 'var(--fg-primary)' }}>
                        {item.role}
                      </h3>

                      {/* Company */}
                      <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-cyan)' }}>
                        {item.company}
                      </p>

                      {/* Location */}
                      <div className="mb-4 flex items-center gap-1.5 text-sm" style={{ color: 'var(--fg-tertiary)' }}>
                        <FiMapPin className="h-3.5 w-3.5 flex-shrink-0" />
                        <span>{item.location}</span>
                      </div>

                      {/* Highlight */}
                      <p className="mb-4 text-sm leading-relaxed flex-1" style={{ color: 'var(--fg-secondary)' }}>
                        {item.highlight}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t" style={{ borderColor: 'var(--border-light)' }}>
                        {item.tech.slice(0, 5).map((tech, tIndex) => (
                          <span
                            key={tech}
                            className="badge badge-neutral text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {item.tech.length > 5 && (
                          <span className="badge badge-neutral text-xs" style={{ color: 'var(--fg-tertiary)' }}>
                            +{item.tech.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  </TiltCard>

                  {/* Active indicator */}
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{
                      opacity: index % timelineData.length === activeIndex % timelineData.length ? 1 : 0,
                      scaleY: index % timelineData.length === activeIndex % timelineData.length ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0.5 h-4"
                    style={{
                      background: `var(--color-${typeColors[item.type]})`,
                      transformOrigin: 'bottom center',
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
          className="mt-16 text-center"
        >
          <MagneticButton
            variant="primary"
            onClick={scrollToContact}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            magneticStrength={0.3}
            className="text-lg px-10 py-5"
          >
            Let's Work Together
            <FiArrowRight className="h-5 w-5" />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
