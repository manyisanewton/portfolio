import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { FaBriefcase, FaCodeBranch, FaGraduationCap, FaUsers } from 'react-icons/fa';

const journeyData = [
  {
    type: 'experience',
    icon: <FaBriefcase />,
    title: 'Frontend Developer (Freelance & Internship)',
    subtitle: 'Client Projects',
    date: 'Jan 2023 - Dec 2024',
  },
  {
    type: 'experience',
    icon: <FaUsers />,
    title: 'Frontend Developer Intern',
    subtitle: 'Nexlify Solutions',
    date: 'Jun 2024 - Aug 2024',
  },
  {
    type: 'experience',
    icon: <FaUsers />,
    title: 'Technical Mentor',
    subtitle: 'Moringa School Volunteer Program',
    date: 'Nov 2024 - May 2025',
  },
  {
    type: 'experience',
    icon: <FaCodeBranch />,
    title: 'Open Source Contributor',
    subtitle: 'GitHub / Open Source Projects',
    date: 'Jan 2024 - Present',
  },
  {
    type: 'education',
    icon: <FaGraduationCap />,
    title: 'Bachelor of Science in Computer Science',
    subtitle: 'University of Nairobi',
    date: '2019 – 2022',
  },
  {
    type: 'education',
    icon: <FaGraduationCap />,
    title: 'Full-Stack Web Development Certificate',
    subtitle: 'Moringa School',
    date: '2025',
  },
  {
    type: 'education',
    icon: <FaGraduationCap />,
    title: 'Certificate of Completion',
    subtitle: 'Artificial Intelligence Part Time Course | Moringa School',
    date: 'Jul 15, 2025 - Aug 8, 2025',
  },
  {
    type: 'education',
    icon: <FaGraduationCap />,
    title: 'Apply AI: Update Your Resume',
    subtitle: 'ICT Authority, Kenya | Cisco Networking Academy',
    date: 'Apr 11, 2026',
  },
];

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
  
  const educationItems = journeyData.filter(item => item.type === 'education');
  const experienceItems = journeyData.filter(item => item.type === 'experience');

  return (
    <section id="education" className="section-shell bg-slate-950 text-white">
      <div className="section-wrap">
        <span className="section-kicker">Journey</span>
        <h2 className="section-heading max-w-3xl">Experience that combines product work, mentoring, and technical foundations.</h2>
        <p className="section-copy">The portfolio is strongest when it shows not only what was built, but the environments, teams, and responsibilities behind that work.</p>
        
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="surface-panel p-6 sm:p-8">
            <h3 className="mb-8 flex items-center text-2xl font-semibold sm:text-3xl"><FaBriefcase className="mr-4 accent-warm-text" /> Professional Journey</h3>
            <motion.div variants={listVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
              {experienceItems.map((item, index) => (
                <motion.div key={index} variants={itemVariants} className="relative pl-8 border-l-2 border-gray-700 group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <div className="absolute -left-px w-2 h-2 rounded-full top-2 transition-transform duration-300 group-hover:scale-150 accent-warm-bg"></div>
                  <p className="text-sm font-semibold text-gray-400 mb-1">{item.date}</p>
                  <h4 className="text-xl font-bold text-white">{item.title}</h4>
                  <p className="text-md accent-warm-text mb-2">{item.subtitle}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="surface-panel p-6 sm:p-8">
            <h3 className="mb-8 flex items-center text-2xl font-semibold sm:text-3xl"><FaGraduationCap className="mr-4 accent-warm-text" /> Academic Foundation</h3>
            <motion.div variants={listVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
              {educationItems.map((item, index) => (
                <motion.div key={index} variants={itemVariants} className="relative pl-8 border-l-2 border-gray-700 group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <div className="absolute -left-px w-2 h-2 rounded-full top-2 transition-transform duration-300 group-hover:scale-150 accent-warm-bg"></div>
                  <p className="text-sm font-semibold text-gray-400 mb-1">{item.date}</p>
                  <h4 className="text-xl font-bold text-white">{item.title}</h4>
                  <p className="text-md accent-warm-text mb-2">{item.subtitle}</p>
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
