import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
// Correct the import path if your file is named 'projects.js'
import { projectData } from '../data/projects.js'; 
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

const Projects = () => {
  const { setCursorVariant } = useCursor();

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
            <motion.div
              key={index}
              className="group surface-panel relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img 
                src={project.imageUrl} 
                alt={project.title}
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-72"
              />
              
              <div className="flex min-h-[280px] flex-col p-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map(t => (
                      <span key={t} className="rounded-full border accent-warm-border accent-warm-tint px-2.5 py-1 text-xs font-semibold text-orange-200">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-5 border-t border-white/10 pt-5">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub repository" className="text-slate-400 transition-colors hover:text-white">
                    <FaGithub size={22} />
                  </a>
                  
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live demo" className="text-slate-400 transition-colors hover:text-white">
                    <FiExternalLink size={22} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
