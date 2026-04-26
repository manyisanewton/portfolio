import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
// Correct the import path if your file is named 'projects.js'
import { projectData } from '../data/projects.js'; 
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink, FiX } from 'react-icons/fi';
import InteractiveCard from './InteractiveCard';

const Projects = () => {
  const { setCursorVariant } = useCursor();
  const [activeProject, setActiveProject] = useState(null);

  const handleMouseEnter = () => setCursorVariant('link');
  const handleMouseLeave = () => setCursorVariant('default');

  return (
    <section id="projects" className="section-shell relative overflow-hidden bg-slate-900 text-white">
      
      {/* Video Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <video autoPlay loop muted className="h-full w-full object-cover opacity-15" src="/videos/projects-bg.mp4"></video>
        <div className="absolute top-0 left-0 h-full w-full bg-slate-950/80"></div>
      </div>

      <div className="section-wrap relative z-10">
        <span className="section-kicker">Projects</span>
        <h2 className="section-heading max-w-3xl">Selected work across commerce, content, and interactive product experiences.</h2>
        <p className="section-copy">These projects show how I approach interface quality, API integration, user flow, and production-minded frontend execution.</p>
        
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projectData.map((project, index) => (
            <InteractiveCard
              key={index}
              className="group surface-panel"
              intensity={8}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative overflow-hidden"
              >
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-72"
                />
                
                <div className="flex min-h-[280px] flex-col p-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-slate-300">{project.shortDescription}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tech.map(t => (
                        <span key={t} className="rounded-full border accent-warm-border accent-warm-tint px-2.5 py-1 text-xs font-semibold text-orange-200">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                    <button
                      type="button"
                      onClick={() => setActiveProject(project)}
                      className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-orange-400/30 hover:text-white"
                    >
                      View Case Study
                    </button>
                    <div className="flex items-center gap-5">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub repository" className="text-slate-400 transition-colors hover:text-white" onClick={(e) => e.stopPropagation()}>
                      <FaGithub size={22} />
                    </a>
                    
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live demo" className="text-slate-400 transition-colors hover:text-white" onClick={(e) => e.stopPropagation()}>
                      <FiExternalLink size={22} />
                    </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </InteractiveCard>
          ))}
        </div>

        <AnimatePresence>
          {activeProject && (
            <>
              <motion.button
                type="button"
                aria-label="Close case study"
                className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-[2px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveProject(null)}
              />
              <motion.aside
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.32, ease: 'easeInOut' }}
                className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-xl flex-col border-l border-white/10 bg-slate-950/96 shadow-[-20px_0_50px_rgba(2,6,23,0.48)]"
              >
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] accent-warm-text">Case Study</div>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{activeProject.title}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveProject(null)}
                    className="rounded-full border border-white/10 p-2 text-slate-300 transition-colors hover:border-orange-400/30 hover:text-white"
                    aria-label="Close panel"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                <div className="overflow-y-auto px-6 py-6">
                  <img
                    src={activeProject.imageUrl}
                    alt={activeProject.title}
                    className="h-52 w-full rounded-xl object-cover"
                  />

                  <div className="mt-6 grid gap-6">
                    <section>
                      <div className="text-xs uppercase tracking-[0.18em] accent-warm-text">Problem</div>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{activeProject.problem}</p>
                    </section>

                    <section>
                      <div className="text-xs uppercase tracking-[0.18em] accent-warm-text">Approach</div>
                      <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-300">
                        {activeProject.approach.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-3 h-1.5 w-1.5 rounded-full accent-warm-bg" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <div className="text-xs uppercase tracking-[0.18em] accent-warm-text">Stack</div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {activeProject.tech.map((item) => (
                          <span key={item} className="rounded-full border accent-warm-border accent-warm-tint px-3 py-1.5 text-xs font-semibold text-orange-200">
                            {item}
                          </span>
                        ))}
                      </div>
                    </section>

                    <section>
                      <div className="text-xs uppercase tracking-[0.18em] accent-warm-text">Result</div>
                      <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-300">
                        {activeProject.result.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-3 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>
                </div>

                <div className="mt-auto flex items-center gap-4 border-t border-white/10 px-6 py-5">
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-md px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95"
                    style={{ backgroundColor: '#f15a24' }}
                  >
                    Open Project
                  </a>
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-md border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-orange-400/30 hover:text-white"
                  >
                    View Code
                  </a>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
