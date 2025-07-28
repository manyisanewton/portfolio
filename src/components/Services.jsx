import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { FaReact, FaServer, FaCode, FaDatabase } from 'react-icons/fa';

const servicesData = [
  {
    icon: <FaReact />,
    title: 'Frontend Development',
    description: 'Crafting responsive, dynamic, and intuitive user interfaces with React, ensuring a seamless user experience across all devices.',
  },
  {
    icon: <FaServer />,
    title: 'Backend Development',
    description: 'Building robust, scalable, and secure server-side applications and APIs using Python (Flask) and C#.',
  },
  {
    icon: <FaCode />,
    title: 'Full-Stack Solutions',
    description: 'Developing end-to-end applications from the database to the browser, integrating frontend and backend into a cohesive product.',
  },
  {
    icon: <FaDatabase />,
    title: 'Database & ORM',
    description: 'Designing and managing efficient database schemas with PostgreSQL and implementing powerful data layers using SQLAlchemy.',
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
    <section id="services" className="py-24 bg-gray-900 text-white relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-radial from-gray-800/30 via-gray-900 to-gray-900"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">What I Can Do For You</h2>
        <p className="text-lg text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          I offer a range of services to bring your digital projects to life.
        </p>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.2 }}
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-gray-800/50 p-8 rounded-lg text-center backdrop-blur-sm border border-gray-700/50"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="text-cyan-400 text-5xl mb-6 inline-block">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;