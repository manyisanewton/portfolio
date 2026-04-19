import React from 'react';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { useCursor } from '../context/CursorContext';

// Import all necessary icons
import {
  FaPython, FaJs, FaReact, FaHtml5, FaCss3Alt, FaPhp, FaDocker, FaGitAlt,
  FaCode, FaBootstrap, FaAws, FaNodeJs
} from 'react-icons/fa';
import {
  SiAngular, SiCpanel, SiErpnext, SiFlask, SiFramer, SiFigma, SiJest, SiMui,
  SiMysql, SiNextdotjs, SiPostgresql, SiRedux, SiStyledcomponents, SiTailwindcss
} from 'react-icons/si';

const skills = {
  frontend: [
    { name: 'React', icon: <FaReact />, color: 'text-cyan-400' },
    { name: 'Next.js', icon: <SiNextdotjs />, color: 'text-gray-200' },
    { name: 'Angular', icon: <SiAngular />, color: 'text-red-500' },
    { name: 'JavaScript (ES6+)', icon: <FaJs />, color: 'text-yellow-400' },
    { name: 'TypeScript', icon: <FaCode />, color: 'text-blue-400' },
    { name: 'Redux', icon: <SiRedux />, color: 'text-purple-500' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: 'text-teal-400' },
  ],
  backend: [
    { name: 'Python', icon: <FaPython />, color: 'text-blue-400' },
    { name: 'Node.js', icon: <FaNodeJs />, color: 'text-green-500' },
    { name: 'Flask', icon: <SiFlask />, color: 'text-gray-300' },
    { name: 'C#', icon: <FaCode />, color: 'text-purple-500' },
    { name: 'PHP', icon: <FaPhp />, color: 'text-indigo-400' },
    { name: 'PostgreSQL', icon: <SiPostgresql />, color: 'text-blue-300' },
    { name: 'MySQL', icon: <SiMysql />, color: 'text-blue-600' },
  ],
  systems: [
    { name: 'ERPNext', icon: <SiErpnext />, color: 'text-orange-400' },
    { name: 'Docker', icon: <FaDocker />, color: 'text-blue-600' },
    { name: 'AWS', icon: <FaAws />, color: 'text-orange-500' },
    { name: 'cPanel', icon: <SiCpanel />, color: 'text-orange-500' },
    { name: 'Git & GitHub', icon: <FaGitAlt />, color: 'text-red-600' },
    { name: 'Figma', icon: <SiFigma />, color: 'text-pink-500' },
    { name: 'Jest', icon: <SiJest />, color: 'text-red-400' },
  ],
  professional: [
    { name: 'IT Support', icon: <FaCode />, color: 'text-cyan-400' },
    { name: 'Troubleshooting', icon: <FaCode />, color: 'text-yellow-400' },
    { name: 'Stakeholder Engagement', icon: <FaCode />, color: 'text-green-400' },
    { name: 'Project Management', icon: <FaCode />, color: 'text-blue-400' },
    { name: 'Team Leadership', icon: <FaCode />, color: 'text-purple-400' },
  ],
};

const allSkills = [...skills.frontend, ...skills.backend, ...skills.systems, ...skills.professional];

const listVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1 } };


const Skills = () => {
  const { setCursorVariant } = useCursor();
  const handleMouseEnter = () => setCursorVariant('link');
  const handleMouseLeave = () => setCursorVariant('default');

  return (
    <section id="skills" className="section-shell bg-slate-900 text-white">
      <div className="section-wrap">
        <span className="section-kicker">Capabilities</span>
        <h2 className="section-heading max-w-3xl">A stack shaped by product delivery, systems work, and frontend craft.</h2>
        <p className="section-copy">I work comfortably across UI implementation, backend logic, infrastructure tools, and the practical teamwork required to ship and support software.</p>
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="surface-panel p-6">
            <h3 className="text-2xl font-bold accent-warm-text mb-4">Frontend</h3>
            <motion.ul variants={listVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-3">
              {skills.frontend.map(skill => (
                <motion.li key={skill.name} variants={itemVariants} className="text-gray-300">{skill.name}</motion.li>
              ))}
            </motion.ul>
          </div>
          <div className="surface-panel p-6">
            <h3 className="text-2xl font-bold accent-warm-text mb-4">Backend</h3>
            <motion.ul variants={listVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-3">
              {skills.backend.map(skill => (
                <motion.li key={skill.name} variants={itemVariants} className="text-gray-300">{skill.name}</motion.li>
              ))}
            </motion.ul>
          </div>
          <div className="surface-panel p-6">
            <h3 className="text-2xl font-bold accent-warm-text mb-4">Systems & Tools</h3>
            <motion.ul variants={listVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-3">
              {skills.systems.map(skill => (
                <motion.li key={skill.name} variants={itemVariants} className="text-gray-300">{skill.name}</motion.li>
              ))}
            </motion.ul>
          </div>
          <div className="surface-panel p-6">
            <h3 className="text-2xl font-bold accent-warm-text mb-4">Professional Strengths</h3>
            <motion.ul variants={listVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-3">
              {skills.professional.map(skill => (
                <motion.li key={skill.name} variants={itemVariants} className="text-gray-300">{skill.name}</motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>

      <div className="mt-14" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Marquee speed={60} gradient={true} gradientColor="#111827" gradientWidth={100}>
          {allSkills.map((skill, index) => (
            <div key={index} className="group mx-3 flex h-20 w-20 items-center justify-center rounded-lg border border-white/10 bg-slate-950/70 shadow-lg sm:mx-4 sm:h-24 sm:w-24">
              <div className={`text-4xl group-hover:scale-125 transition-all duration-300 ${skill.color}`}>
                {skill.icon}
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Skills;
