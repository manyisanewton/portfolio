import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiGithub, FiExternalLink, FiCode, FiStar, FiTarget, FiLayers, FiCheckCircle } from 'react-icons/fi';
import { projectData } from '../data/projects.js';
import { useCursor } from '../context/CursorContext';
import { TiltCard, MagneticButton } from './ui';
import SEO, { DEFAULT_SOCIAL_IMAGE, SITE_URL } from './SEO';

const slugify = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const ProjectDetail = () => {
  const { setCursorVariant } = useCursor();
  const { slug } = useParams();

  // Find project by slugified title
  const project = projectData.find((p) => slugify(p.title) === slug);

  const handleMouseEnter = () => setCursorVariant('link');
  const handleMouseLeave = () => setCursorVariant('default');

  if (!project) {
    return (
      <>
      <SEO
        title="Project Not Found | Newton Manyisa"
        description="The requested portfolio case study could not be found."
        path={`/project/${slug}`}
        robots="noindex, follow"
      />
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
      </>
    );
  }

  const projectPath = `/project/${slug}`;
  const projectDescription = `${project.shortDescription} A case study by Newton Manyisa using ${project.tech.slice(0, 4).join(', ')}.`;
  const projectSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}${projectPath}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Portfolio', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/#projects` },
          { '@type': 'ListItem', position: 3, name: project.title, item: `${SITE_URL}${projectPath}` },
        ],
      },
      {
        '@type': 'SoftwareSourceCode',
        '@id': `${SITE_URL}${projectPath}#project`,
        name: project.title,
        headline: project.title,
        description: project.description,
        url: `${SITE_URL}${projectPath}`,
        image: DEFAULT_SOCIAL_IMAGE,
        codeRepository: project.githubUrl,
        programmingLanguage: project.tech,
        author: { '@id': `${SITE_URL}/#person`, '@type': 'Person', name: 'Newton Manyisa' },
        creator: { '@id': `${SITE_URL}/#person` },
        keywords: project.tech.join(', '),
        inLanguage: 'en',
        ...(project.liveUrl && project.liveUrl !== '#' ? { sameAs: project.liveUrl } : {}),
      },
    ],
  };

  return (
    <>
      <SEO
        title={`${project.title} | Newton Manyisa`}
        description={projectDescription}
        path={projectPath}
        type="article"
        imageAlt={`${project.title} case study by Newton Manyisa`}
        schema={projectSchema}
      />
      {/* Case study introduction */}
      <section
        id="project-detail"
        className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32"
        style={{ background: 'var(--bg-base)' }}
      >
        <div className="gradient-mesh" aria-hidden="true" />

        <div className="container relative z-10">
          <div className="mb-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/#projects" className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:text-cyan-600" style={{ color: 'var(--fg-secondary)', borderColor: 'var(--border-light)' }}>
                <FiArrowLeft className="h-4 w-4" />
                Back to Projects
              </Link>
            </motion.div>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(520px,1.1fr)] lg:gap-14">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-5 flex flex-wrap gap-2">
                <span className="badge badge-cyan">Case Study</span>
                <span className="badge badge-neutral">Production</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="mb-6 font-display text-4xl font-medium leading-[1.08] sm:text-5xl lg:text-6xl" style={{ color: 'var(--fg-primary)', letterSpacing: '-0.035em' }}>
                {project.title}
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="mb-8 max-w-xl text-lg leading-8" style={{ color: 'var(--fg-secondary)' }}>
                {project.shortDescription}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }} className="flex flex-wrap gap-3">
                {project.liveUrl && project.liveUrl !== '#' && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    View Live <FiExternalLink className="h-4 w-4" />
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <FiGithub className="h-4 w-4" /> Source Code
                  </a>
                )}
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="overflow-hidden rounded-3xl border bg-white p-2 shadow-[0_24px_60px_rgba(15,23,42,0.12)]" style={{ borderColor: 'var(--border-light)' }}>
              <div className="aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-slate-100">
                <img src={project.imageUrl} alt={`${project.title} interface`} className="h-full w-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="section-shell alt pt-12">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            {/* Main Content */}
            <div className="space-y-12 sm:space-y-14">
              {/* Overview */}
              <div className="border-b pb-12 sm:pb-14" style={{ borderColor: 'var(--border-light)' }}>
                <div className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-cyan-600">Overview</div>
                <p className="text-base leading-8 sm:text-lg" style={{ color: 'var(--fg-secondary)' }}>{project.description}</p>
              </div>

              {/* Problem */}
              <div className="space-y-5 border-b pb-12 sm:pb-14" style={{ borderColor: 'var(--border-light)' }}>
                <div className="flex items-center gap-3">
                  <FiTarget className="h-6 w-6" style={{ color: 'var(--color-amber)' }} />
                  <h2 className="font-display font-semibold text-2xl" style={{ color: 'var(--fg-primary)' }}>Problem</h2>
                </div>
                <p className="text-base leading-8" style={{ color: 'var(--fg-secondary)' }}>{project.problem}</p>
              </div>

              {/* Approach */}
              <div className="space-y-5 border-b pb-12 sm:pb-14" style={{ borderColor: 'var(--border-light)' }}>
                <div className="flex items-center gap-3">
                  <FiCode className="h-6 w-6" style={{ color: 'var(--color-cyan)' }} />
                  <h2 className="font-display font-semibold text-2xl" style={{ color: 'var(--fg-primary)' }}>Approach</h2>
                </div>
                <ul className="space-y-3">
                  {project.approach.map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex gap-4 text-base leading-7"
                      style={{ color: 'var(--fg-secondary)' }}
                    >
                      <span className="mt-2 flex-shrink-0 w-2 h-2 rounded-full" style={{ background: 'var(--color-cyan)' }} />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="space-y-5 border-b pb-12 sm:pb-14" style={{ borderColor: 'var(--border-light)' }}>
                <div className="flex items-center gap-3">
                  <FiLayers className="h-6 w-6" style={{ color: 'var(--color-emerald)' }} />
                  <h2 className="font-display font-semibold text-2xl" style={{ color: 'var(--fg-primary)' }}>Tech Stack</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="badge badge-cyan">{tech}</span>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <FiStar className="h-6 w-6" style={{ color: 'var(--color-emerald)' }} />
                  <h2 className="font-display font-semibold text-2xl" style={{ color: 'var(--fg-primary)' }}>Results</h2>
                </div>
                <ul className="space-y-3">
                  {project.result.map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex gap-4 text-base leading-7"
                      style={{ color: 'var(--fg-secondary)' }}
                    >
                      <FiCheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-500" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="section-shell pt-8">
        <div className="container">
          <motion.div
            className="mb-12"
          >
            <h2 className="font-display font-semibold text-3xl" style={{ color: 'var(--fg-primary)' }}>More Projects</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectData
              .filter((p) => p.title !== project.title)
              .slice(0, 3)
              .map((relatedProject) => (
                <motion.div
                  key={relatedProject.title}
                >
                  <Link to={`/project/${slugify(relatedProject.title)}`}>
                    <TiltCard intensity={8} scale={1.02} glow={true} className="h-full overflow-hidden">
                      <div className="relative h-48 overflow-hidden bg-slate-100">
                        <img
                          src={relatedProject.imageUrl}
                          alt={relatedProject.title}
                          className="w-full h-full object-cover transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="mb-3 font-display text-xl font-semibold leading-snug" style={{ color: 'var(--fg-primary)' }}>{relatedProject.title}</h3>
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
