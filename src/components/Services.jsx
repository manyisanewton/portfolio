import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { FaReact, FaServer, FaCode, FaDatabase, FaChalkboardTeacher, FaTools, FaRobot, FaCogs } from 'react-icons/fa';
import InteractiveCard from './InteractiveCard';

const servicesData = [
  {
    icon: <FaReact />,
    iconColor: 'accent-primary-text',
    iconBg: 'accent-primary-tint',
    iconBorder: 'accent-primary-border',
    title: 'Frontend Development',
    description: 'Building sleek, responsive, and interactive interfaces with React, Next.js, Angular, Vue.js, Blazor, Tailwind CSS, Framer Motion, TypeScript, and modern component-driven patterns.',
  },
  {
    icon: <FaServer />,
    iconColor: 'accent-green-text',
    iconBg: 'accent-green-tint',
    iconBorder: 'accent-green-border',
    title: 'Backend & API Development',
    description: 'Developing scalable backend services, RESTful APIs, and business logic using Node.js, NestJS, Python (Flask, Django), C# (ASP.NET Core), PHP (Laravel), PostgreSQL, MySQL, Firebase, and SQLAlchemy.',
  },
  {
    icon: <FaCode />,
    iconColor: 'accent-warm-text',
    iconBg: 'accent-warm-tint',
    iconBorder: 'accent-warm-border',
    title: 'Full-Stack Solutions',
    description: 'Delivering end-to-end applications from database design to production-ready interfaces, with reusable components, dashboards, auth flows, admin tools, and real-time features.',
  },
  {
    icon: <FaDatabase />,
    iconColor: 'accent-primary-text',
    iconBg: 'accent-primary-tint',
    iconBorder: 'accent-primary-border',
    title: 'ERP & Business Systems',
    description: 'Customizing ERPNext/Frappe modules, aligning workflows to operations, and supporting digital processes that improve how teams work across sales, HR, inventory, and finance.',
  },
  {
    icon: <FaTools />,
    iconColor: 'accent-green-text',
    iconBg: 'accent-green-tint',
    iconBorder: 'accent-green-border',
    title: 'Deployment & DevOps',
    description: 'Setting up hosting environments, Docker containerization, CI/CD pipelines, cloud platforms (AWS, Vercel, Render, Hostinger), Linux servers, cPanel, and Frappe Cloud.',
  },
  {
    icon: <FaRobot />,
    iconColor: 'accent-warm-text',
    iconBg: 'accent-warm-tint',
    iconBorder: 'accent-warm-border',
    title: 'AI-Powered Applications',
    description: 'Integrating LLMs (Hugging Face, Ollama), prompt engineering, OCR/document processing, automated document generation, and AI-assisted workflows for business automation.',
  },
  {
    icon: <FaCogs />,
    iconColor: 'accent-primary-text',
    iconBg: 'accent-primary-tint',
    iconBorder: 'accent-primary-border',
    title: 'Workflow Automation',
    description: 'Building automated workflows with n8n and Zoho, connecting ERPNext, CRM, and other business tools to reduce manual processes and improve operational efficiency.',
  },
  {
    icon: <FaChalkboardTeacher />,
    iconColor: 'accent-green-text',
    iconBg: 'accent-green-tint',
    iconBorder: 'accent-green-border',
    title: 'Training & Mentorship',
    description: 'Teaching technical concepts clearly, mentoring developers (HTML, CSS, JavaScript, React), supporting code reviews, system adoption, and helping teams build confidence with tools and workflows.',
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
    <section id="services" className="section-shell">
      <div className="section-wrap relative z-10">
        <span className="section-kicker">Services</span>
        <h2 className="section-heading max-w-3xl">From interface work to business systems, AI, and delivery support.</h2>
        <p className="section-copy">
          I work across product delivery, business systems, AI integration, automation, deployment, and technical mentoring to move projects from idea to dependable execution.
        </p>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.2 }}
        >
          {servicesData.map((service, index) => (
            <InteractiveCard
              key={index}
              className="surface-card"
              intensity={6}
            >
              <motion.div
                variants={cardVariants}
                className="flex min-h-[260px] flex-col"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border text-2xl ${service.iconBorder} ${service.iconBg} ${service.iconColor}`}>{service.icon}</div>
                <h3 className="text-xl font-semibold sm:text-2xl" style={{ color: 'var(--text-primary)' }}>{service.title}</h3>
                <p className="mt-4 text-sm leading-7 sm:text-base" style={{ color: 'var(--text-secondary)' }}>{service.description}</p>
              </motion.div>
            </InteractiveCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;