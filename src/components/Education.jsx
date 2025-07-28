import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { FaGraduationCap, FaUsers, FaCodeBranch } from 'react-icons/fa';

// The data remains the same, but we will filter it inside the component.
const journeyData = [
  {
    type: 'education',
    icon: <FaGraduationCap />,
    title: 'Bachelor of Science in Computer Science',
    subtitle: 'Nairobi University',
    date: '2019 – 2022',
    description: 'Second Class Upper Honors. Key coursework in Data Structures, Algorithms, and Web Development.',
  },
  {
    type: 'education',
    icon: <FaGraduationCap />,
    title: 'Full-Stack Web Development Certificate',
    subtitle: 'Moringa School',
    date: '2025',
    description: 'Completed an intensive program covering modern web technologies and professional software practices.',
  },
  {
    type: 'experience',
    icon: <FaUsers />,
    title: 'Mentor, Coding Bootcamp',
    subtitle: 'Moringa School Volunteer Program',
    date: 'Nov 2024 – May 2025',
    description: 'Guided beginner developers in React & JavaScript, reviewed projects, and hosted Q&A sessions.',
  },
  {
    type: 'experience',
    icon: <FaCodeBranch />,
    title: 'Open Source Contributor',
    subtitle: 'GitHub Projects',
    date: 'Jan 2024 – Present',
    description: 'Contributed to bug fixes, feature improvements, and documentation for various open-source libraries.',
  },
];

// Animation variants for the lists
const listVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};


const Education = () => {
  const { setCursorVariant } = useCursor();
  const handleMouseEnter = () => setCursorVariant('link');
  const handleMouseLeave = () => setCursorVariant('default');
  
  // Filter the data into two separate arrays
  const educationItems = journeyData.filter(item => item.type === 'education');
  const experienceItems = journeyData.filter(item => item.type === 'experience');

  return (
    <section id="education" className="py-24 bg-gray-800 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">My Journey</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Column 1: Formal Education */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h3 className="text-3xl font-bold mb-8 flex items-center"><FaGraduationCap className="mr-4 text-cyan-400" /> Formal Education</h3>
            <motion.div variants={listVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
              {educationItems.map((item, index) => (
                <motion.div key={index} variants={itemVariants} className="relative pl-8 border-l-2 border-gray-700 group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <div className="absolute -left-px w-2 h-2 bg-cyan-400 rounded-full top-2 transition-transform duration-300 group-hover:scale-150"></div>
                  <p className="text-sm font-semibold text-gray-400 mb-1">{item.date}</p>
                  <h4 className="text-xl font-bold text-white">{item.title}</h4>
                  <p className="text-md text-cyan-300 mb-2">{item.subtitle}</p>
                  <p className="text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Column 2: Practical Experience */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
            <h3 className="text-3xl font-bold mb-8 flex items-center"><FaCodeBranch className="mr-4 text-cyan-400" /> Practical Experience</h3>
            <motion.div variants={listVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
              {experienceItems.map((item, index) => (
                <motion.div key={index} variants={itemVariants} className="relative pl-8 border-l-2 border-gray-700 group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <div className="absolute -left-px w-2 h-2 bg-cyan-400 rounded-full top-2 transition-transform duration-300 group-hover:scale-150"></div>
                  <p className="text-sm font-semibold text-gray-400 mb-1">{item.date}</p>
                  <h4 className="text-xl font-bold text-white">{item.title}</h4>
                  <p className="text-md text-cyan-300 mb-2">{item.subtitle}</p>
                  <p className="text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Education;