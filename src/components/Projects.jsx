import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { projectData } from '../data/project.js';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

const Projects = () => {
  const { setCursorVariant } = useCursor();

  const handleMouseEnter = () => setCursorVariant('link');
  const handleMouseLeave = () => setCursorVariant('default');

  return (
    <section id="projects" className="py-20 bg-gray-900 text-white relative overflow-hidden">
      
      {/* ========================================================== */}
      {/* Video Background - Changes are here                    */}
      {/* ========================================================== */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          // Increased opacity from 10 to 20
          className="w-full h-full object-cover filter blur-sm opacity-20"
          src="/videos/projects-bg.mp4"
        ></video>
        {/* Decreased overlay opacity from 80% to 60% */}
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900/60"></div>
      </div>
      {/* ========================================================== */}
      {/* End of changes                                         */}
      {/* ========================================================== */}

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">My Recent Work</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectData.map((project, index) => (
            <motion.div
              key={index}
              className="group relative bg-gray-800 rounded-lg overflow-hidden shadow-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img 
                src={project.imageUrl} 
                alt={project.title}
                className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent transform translate-y-2/3 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300">
                  {project.tech.map(t => (
                    <span key={t} className="bg-cyan-900 text-cyan-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
                
                <div className="flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-400">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <FaGithub className="text-gray-400 hover:text-white transition-colors" size={24} />
                  </a>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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