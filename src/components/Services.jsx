import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { FaReact, FaServer, FaCode, FaDatabase, FaChalkboardTeacher, FaTools } from 'react-icons/fa';

const servicesData = [
  {
    icon: <FaReact />,
    title: 'Frontend Development',
    description: 'Building sleek, responsive, and interactive interfaces with React, Next.js, Angular, Tailwind CSS, Framer Motion, and modern component-driven patterns.',
  },
  {
    icon: <FaServer />,
    title: 'Backend & API Development',
    description: 'Developing scalable backend services, RESTful APIs, and business logic using Flask, PHP, C#, PostgreSQL, and real-time integrations.',
  },
  {
    icon: <FaCode />,
    title: 'Full-Stack Solutions',
    description: 'Delivering end-to-end applications from database design to production-ready interfaces, with reusable components, dashboards, auth flows, and admin tools.',
  },
  {
    icon: <FaDatabase />,
    title: 'ERP & Business Systems',
    description: 'Customizing ERPNext setups, aligning workflows to operations, and supporting digital processes that improve how teams work across the business.',
  },
  {
    icon: <FaTools />,
    title: 'Deployment & Technical Support',
    description: 'Setting up hosting environments, working with cPanel and servers, handling troubleshooting, and supporting deployments that stay reliable after launch.',
  },
  {
    icon: <FaChalkboardTeacher />,
    title: 'Training & Mentorship',
    description: 'Teaching technical concepts clearly, mentoring developers, supporting system adoption, and helping teams build confidence with tools and workflows.',
  },
];

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

const Services = () => {
  const { setCursorVariant } = useCursor();
  const handleMouseEnter = () => setCursorVariant('link');
  const handleMouseLeave = () => setCursorVariant('default');

  return (
    <section id="services" className="section-shell bg-slate-950 text-white">
      <div className="section-wrap relative z-10">
        <span className="section-kicker">Services</span>
        <h2 className="section-heading max-w-3xl">From interface work to business systems and delivery support.</h2>
        <p className="section-copy">
          I work across product delivery, business systems, deployment, and technical mentoring to move projects from idea to dependable execution.
        </p>

        <motion.div 
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.2 }}
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="surface-panel flex min-h-[260px] flex-col p-6 sm:p-7"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-md border accent-warm-border accent-warm-tint text-2xl accent-warm-text">{service.icon}</div>
              <h3 className="text-xl font-semibold text-white sm:text-2xl">{service.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
