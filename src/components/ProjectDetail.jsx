import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiGithub, FiExternalLink, FiX, FiCalendar, FiCode, FiStar, FiTarget, FiLayers } from 'react-icons/fi';
import { projectData } from '../data/projects.js';
import { useCursor } from '../context/CursorContext';
import { TiltCard, MagneticButton } from './ui';

const ProjectDetail = () => {
  const { setCursorVariant } = useCursor();
  const { slug } = useParams();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  // Find project by slugified title
  const project = projectData.find((p) =>
    p.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === slug
  );

  const handleMouseEnter = () => setCursorVariant('link');
  const handleMouseLeave = () => setCursorVariant('default');

  if (!project) {
    return (
      <section id="project-detail" className="section-shell min-h-[60vh] flex items-center justify-center">
        <div className="container text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-semibold text-3xl sm:text-4xl"
            style={{ color: 'var(--fg-primary)' }}
          >
            Project Not Found
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4"
            style={{ color: 'var(--fg-secondary)' }}
          >
            The project you&apos;re looking for doesn&apos;t exist or has been moved.
          </motion.p>
          <Link to="/#projects" className="mt-6 inline-block">
            <MagneticButton
              variant="primary"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <FiArrowLeft className="h-5 w-5 mr-2" />
              Back to Projects
            </MagneticButton>
          </Link>
        </div>
      </section>
    );
  }

  // Generate slug for other projects (for related projects)
  const slugify = (str) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  return (
    <>
      {/* Hero Section */}
      <section
        id="project-detail"
        className="relative min-h-[70vh] flex items-end overflow-hidden"
        style={{ background: 'var(--bg-base)' }}
      >
        <div className="gradient-mesh" aria-hidden="true" />

        <div className="container relative z-10 pb-20">
          <div className="max-w-5xl">
            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Link to="/#projects" className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--fg-tertiary)' }}>
                <FiArrowLeft className="h-4 w-4" />
                Back to Projects
              </Link>
            </motion.div>

            {/* Meta Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 flex flex-wrap gap-3"
            >
              <span className="badge badge-cyan">Full-Stack</span>
              <span className="badge badge-amber">Production</span>
              {project.tech.slice(0, 3).map((t) => (
                <span key={t} className="badge badge-neutral text-xs">{t}</span>
              ))}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display font-medium leading-[1.05] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-6"
              style={{ color: 'var(--fg-primary)', letterSpacing: '-0.03em' }}
            >
              {project.title}
            </motion.h1>

            {/* Short Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl leading-relaxed max-w-2xl mb-8"
              style={{ color: 'var(--fg-secondary)' }}
            >
              {project.shortDescription}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              {project.liveUrl && project.liveUrl !== '#' && (
                <MagneticButton
                  variant="primary"
                  asChild
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  magneticStrength={0.3}
                >
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center gap-2">
                    <FiExternalLink className="h-5 w-5" />
                    Live Demo
                  </a>
                </MagneticButton>
              )}
              {project.githubUrl && (
                <MagneticButton
                  variant="secondary"
                  asChild
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center gap-2">
                    <FiGithub className="h-5 w-5" />
                    View Code
                  </a>
                </MagneticButton>
              )}
            </motion.div>
          </div>
        </div>

        {/* Project Image - Full Width */}
        <div className="absolute bottom-0 left-0 right-0 h-[50vh] sm:h-[60vh] -z-10">
          <div className="w-full h-full">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section ref={sectionRef} className="section-shell alt pt-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
            {/* Main Content */}
            <div className="space-y-12">
              {/* Problem */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl" style={{ background: 'var(--color-amber-soft)' }}>
                    <FiTarget className="h-5 w-5" style={{ color: 'var(--color-amber)' }} />
                  </div>
                  <h2 className="font-display font-semibold text-2xl" style={{ color: 'var(--fg-primary)' }}>Problem</h2>
                </div>
                <p className="text-base leading-8 pl-10" style={{ color: 'var(--fg-secondary)' }}>{project.problem}</p>
              </motion.div>

              {/* Approach */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl" style={{ background: 'var(--color-cyan-soft)' }}>
                    <FiCode className="h-5 w-5" style={{ color: 'var(--color-cyan)' }} />
                  </div>
                  <h2 className="font-display font-semibold text-2xl" style={{ color: 'var(--fg-primary)' }}>Approach</h2>
                </div>
                <ul className="space-y-3 pl-10">
                  {project.approach.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                      className="flex gap-4 text-base leading-7"
                      style={{ color: 'var(--fg-secondary)' }}
                    >
                      <span className="mt-2 flex-shrink-0 w-2 h-2 rounded-full" style={{ background: 'var(--color-cyan)' }} />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl" style={{ background: 'var(--color-emerald-soft)' }}>
                    <FiLayers className="h-5 w-5" style={{ color: 'var(--color-emerald)' }} />
                  </div>
                  <h2 className="font-display font-semibold text-2xl" style={{ color: 'var(--fg-primary)' }}>Tech Stack</h2>
                </div>
                <div className="flex flex-wrap gap-2 pl-10">
                  {project.tech.map((tech) => (
                    <span key={tech} className="badge badge-cyan">{tech}</span>
                  ))}
                </div>
              </motion.div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl" style={{ background: 'var(--color-emerald-soft)' }}>
                    <FiStar className="h-5 w-5" style={{ color: 'var(--color-emerald)' }} />
                  </div>
                  <h2 className="font-display font-semibold text-2xl" style={{ color: 'var(--fg-primary)' }}>Results</h2>
                </div>
                <ul className="space-y-3 pl-10">
                  {project.result.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                      className="flex gap-4 text-base leading-7"
                      style={{ color: 'var(--fg-secondary)' }}
                    >
                      <span className="mt-2 flex-shrink-0 w-2 h-2 rounded-full" style={{ background: 'var(--color-emerald)' }} />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block">
              <TiltCard intensity={6} scale={1.01} glow={false} className="sticky top-24 p-6">
                <div className="space-y-6">
                  {/* Project Image Thumbnail */}
                  <div className="rounded-xl overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>

                  {/* Quick Facts */}
                  <div className="space-y-4 pt-6 border-t" style={{ borderColor: 'var(--border-light)' }}>
                    <h3 className="font-display font-semibold text-lg" style={{ color: 'var(--fg-primary)' }}>Quick Facts</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs font-medium uppercase tracking-[0.1em]" style={{ color: 'var(--fg-tertiary)' }}>Role</div>
                        <div className="text-sm font-medium" style={{ color: 'var(--fg-primary)' }}>Full-Stack Developer</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium uppercase tracking-[0.1em]" style={{ color: 'var(--fg-tertiary)' }}>Timeline</div>
                        <div className="text-sm font-medium" style={{ color: 'var(--fg-primary)' }}>Production</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium uppercase tracking-[0.1em]" style={{ color: 'var(--fg-tertiary)' }}>Status</div>
                        <div className="text-sm font-medium text-emerald-600">Live & Maintained</div>
                      </div>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="pt-6 border-t space-y-3" style={{ borderColor: 'var(--border-light)' }}>
                    <h3 className="font-display font-semibold text-lg" style={{ color: 'var(--fg-primary)' }}>Links</h3>
                    <div className="space-y-2">
                      {project.liveUrl && project.liveUrl !== '#' && (
                        <MagneticButton
                          variant="secondary"
                          asChild
                          className="w-full justify-start"
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center gap-3">
                            <FiExternalLink className="h-5 w-5 flex-shrink-0" />
                            <span>Live Demo</span>
                          </a>
                        </MagneticButton>
                      )}
                      {project.githubUrl && (
                        <MagneticButton
                          variant="ghost"
                          asChild
                          className="w-full justify-start"
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center gap-3">
                            <FiGithub className="h-5 w-5 flex-shrink-0" />
                            <span>Source Code</span>
                          </a>
                        </MagneticButton>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="section-shell pt-8">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="font-display font-semibold text-3xl" style={{ color: 'var(--fg-primary)' }}>More Projects</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectData
              .filter((p) => p.title !== project.title)
              .slice(0, 3)
              .map((relatedProject, index) => (
                <motion.div
                  key={relatedProject.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/project/${slugify(relatedProject.title)}`}>
                    <TiltCard intensity={8} scale={1.02} glow={true} className="h-full overflow-hidden">
                      <div className="relative h-48">
                        <img
                          src={relatedProject.imageUrl}
                          alt={relatedProject.title}
                          className="w-full h-full object-cover transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <h3 className="font-display font-semibold text-xl text-white">{relatedProject.title}</h3>
                        </div>
                      </div>
                      <div className="p-5">
                        <p className="text-sm leading-6 mb-4" style={{ color: 'var(--fg-secondary)' }}>
                          {relatedProject.shortDescription}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {relatedProject.tech.slice(0, 4).map((t) => (
                            <span key={t} className="badge badge-cyan text-xs">{t}</span>
                          ))}
                        </div>
                      </div>
                    </TiltCard>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;