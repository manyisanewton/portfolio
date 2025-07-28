import React from 'react';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { useCursor } from '../context/CursorContext';

// Import all necessary icons
import {
  FaPython, FaJs, FaReact, FaHtml5, FaCss3Alt, FaPhp, FaDocker, FaGitAlt,
  FaCode, FaDatabase, FaBootstrap, FaAws, FaNodeJs
} from 'react-icons/fa';

// ==========================================================
// THE FIX IS HERE: SiFramer has been added to the import list
// ==========================================================
import {
  SiFlask, SiTailwindcss, SiPostgresql, SiExpress, SiRedux, SiReactrouter,
  SiVite, SiNetlify, SiHeroku, SiVercel, SiRender, SiFirebase, SiGooglecloud,
  SiMysql, SiSqlite, SiFastapi, SiGunicorn, SiSocketdotio, SiEslint, SiFigma, SiFramer
} from 'react-icons/si';


// The same comprehensive skill data structure
const skills = {
  frontend: [
    { name: 'React', icon: <FaReact /> },
    { name: 'JavaScript (ES6+)', icon: <FaJs /> },
    { name: 'Redux Toolkit', icon: <SiRedux /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
    { name: 'HTML5', icon: <FaHtml5 /> },
    { name: 'CSS3', icon: <FaCss3Alt /> },
    { name: 'React Router', icon: <SiReactrouter /> },
    { name: 'Framer Motion', icon: <SiFramer /> }, // This line will now work correctly
    { name: 'Bootstrap', icon: <FaBootstrap /> },
  ],
  backend: [
    { name: 'Python', icon: <FaPython /> },
    { name: 'Node.js', icon: <FaNodeJs /> },
    { name: 'Flask', icon: <SiFlask /> },
    { name: 'Express.js', icon: <SiExpress /> },
    { name: 'FastAPI', icon: <SiFastapi /> },
    { name: 'C#', icon: <FaCode /> },
    { name: 'PHP', icon: <FaPhp /> },
    { name: 'PostgreSQL', icon: <SiPostgresql /> },
    { name: 'MySQL', icon: <SiMysql /> },
    { name: 'SQLAlchemy', icon: <FaDatabase /> },
    { name: 'Socket.IO', icon: <SiSocketdotio /> },
  ],
  devops: [
    { name: 'AWS', icon: <FaAws /> },
    { name: 'Google Cloud', icon: <SiGooglecloud /> },
    { name: 'Docker', icon: <FaDocker /> },
    { name: 'Git & GitHub', icon: <FaGitAlt /> },
    { name: 'Firebase', icon: <SiFirebase /> },
    { name: 'Netlify', icon: <SiNetlify /> },
    { name: 'Vercel', icon: <SiVercel /> },
    { name: 'Heroku', icon: <SiHeroku /> },
    { name: 'Render', icon: <SiRender /> },
  ]
};

// Combine all skills for the marquee
const allSkills = [...skills.frontend, ...skills.backend, ...skills.devops];

// Animation variants for the list
const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};


const Skills = () => {
  const { setCursorVariant } = useCursor();
  const handleMouseEnter = () => setCursorVariant('link');
  const handleMouseLeave = () => setCursorVariant('default');

  return (
    <section id="skills" className="py-24 bg-gray-900 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Skills & Technologies</h2>

        {/* --- Top Section: Three Columns of Text Skills --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          
          {/* Frontend Column */}
          <div className="bg-gray-800/50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">Frontend</h3>
            <motion.ul variants={listVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-3">
              {skills.frontend.map(skill => (
                <motion.li key={skill.name} variants={itemVariants} className="text-gray-300">{skill.name}</motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Backend Column */}
          <div className="bg-gray-800/50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">Backend</h3>
            <motion.ul variants={listVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-3">
              {skills.backend.map(skill => (
                <motion.li key={skill.name} variants={itemVariants} className="text-gray-300">{skill.name}</motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Cloud & DevOps Column */}
          <div className="bg-gray-800/50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">Cloud & DevOps</h3>
            <motion.ul variants={listVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-3">
              {skills.devops.map(skill => (
                <motion.li key={skill.name} variants={itemVariants} className="text-gray-300">{skill.name}</motion.li>
              ))}
            </motion.ul>
          </div>

        </div>
      </div>

      {/* --- Bottom Section: Scrolling Marquee of Icons --- */}
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Marquee
          speed={60}
          gradient={true}
          gradientColor="#111827"
          gradientWidth={100}
        >
          {allSkills.map((skill, index) => (
            <div key={index} className="flex items-center justify-center w-24 h-24 mx-4 bg-gray-800 rounded-lg shadow-lg group">
              <div className="text-4xl text-gray-400 group-hover:text-cyan-400 group-hover:scale-125 transition-all duration-300">
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