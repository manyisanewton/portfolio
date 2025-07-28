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
    <section id="projects" className="py-24 bg-gray-900 text-white relative overflow-hidden">
      
      {/* Video Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <video autoPlay loop muted className="w-full h-full object-cover filter blur-sm opacity-20" src="/videos/projects-bg.mp4"></video>
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900/60"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">My Recent Work</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectData.map((project, index) => (
            // ==========================================================
            // THE FIX IS HERE: Increased the card height
            // From h-96 to h-[32rem]
            // ==========================================================
            <motion.div
              key={index}
              className="group relative h-[32rem] rounded-lg overflow-hidden shadow-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* --- Full Bleed Background Image --- */}
              <img 
                src={project.imageUrl} 
                alt={project.title}
                // The `object-cover` will now work as intended because the container has the correct aspect ratio
                className="absolute top-0 left-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* --- Gradient Overlay for Readability --- */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>

              {/* --- Content Area on Top --- */}
              <div className="relative h-full flex flex-col justify-end p-6">
                
                {/* Details that appear on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out">
                  <p className="text-gray-300 mb-4 text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(t => (
                      <span key={t} className="bg-cyan-900 text-cyan-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Always visible title and links */}
                <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                
                <div className="flex space-x-4">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub repository">
                    <FaGithub className="text-gray-400 hover:text-white transition-colors" size={24} />
                  </a>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live demo">
                    <FiExternalLink className="text-gray-400 hover:text-white transition-colors" size={24} />
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