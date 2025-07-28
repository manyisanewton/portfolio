import React from 'react';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { useCursor } from '../context/CursorContext';

// Import all necessary icons
import {
  FaPython, FaJs, FaReact, FaHtml5, FaCss3Alt, FaPhp, FaDocker, FaGitAlt,
  FaCode, FaDatabase, FaBootstrap, FaAws, FaNodeJs
} from 'react-icons/fa';
import {
  SiFlask, SiTailwindcss, SiPostgresql, SiExpress, SiRedux, SiReactrouter,
  SiVite, SiNetlify, SiHeroku, SiVercel, SiRender, SiFirebase, SiGooglecloud,
  SiMysql, SiSqlite, SiFastapi, SiGunicorn, SiSocketdotio, SiEslint, SiFigma, SiFramer
} from 'react-icons/si';

// ==========================================================
// THE FIX IS HERE: Added a `color` property to each skill object
// ==========================================================
const skills = {
  frontend: [
    { name: 'React', icon: <FaReact />, color: 'text-cyan-400' },
    { name: 'JavaScript (ES6+)', icon: <FaJs />, color: 'text-yellow-400' },
    { name: 'Redux Toolkit', icon: <SiRedux />, color: 'text-purple-500' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: 'text-teal-400' },
    { name: 'HTML5', icon: <FaHtml5 />, color: 'text-orange-500' },
    { name: 'CSS3', icon: <FaCss3Alt />, color: 'text-blue-500' },
    { name: 'React Router', icon: <SiReactrouter />, color: 'text-red-500' },
    { name: 'Framer Motion', icon: <SiFramer />, color: 'text-purple-400' },
    { name: 'Bootstrap', icon: <FaBootstrap />, color: 'text-purple-600' },
  ],
  backend: [
    { name: 'Python', icon: <FaPython />, color: 'text-blue-400' },
    { name: 'Node.js', icon: <FaNodeJs />, color: 'text-green-500' },
    { name: 'Flask', icon: <SiFlask />, color: 'text-gray-300' },
    { name: 'Express.js', icon: <SiExpress />, color: 'text-gray-400' },
    { name: 'FastAPI', icon: <SiFastapi />, color: 'text-green-600' },
    { name: 'C#', icon: <FaCode />, color: 'text-purple-500' },
    { name: 'PHP', icon: <FaPhp />, color: 'text-indigo-400' },
    { name: 'PostgreSQL', icon: <SiPostgresql />, color: 'text-blue-300' },
    { name: 'MySQL', icon: <SiMysql />, color: 'text-blue-600' },
    { name: 'SQLAlchemy', icon: <FaDatabase />, color: 'text-red-500' },
    { name: 'Socket.IO', icon: <SiSocketdotio />, color: 'text-gray-200' },
  ],
  devops: [
    { name: 'AWS', icon: <FaAws />, color: 'text-orange-500' },
    { name: 'Google Cloud', icon: <SiGooglecloud />, color: 'text-blue-500' },
    { name: 'Docker', icon: <FaDocker />, color: 'text-blue-600' },
    { name: 'Git & GitHub', icon: <FaGitAlt />, color: 'text-red-600' },
    { name: 'Firebase', icon: <SiFirebase />, color: 'text-yellow-500' },
    { name: 'Netlify', icon: <SiNetlify />, color: 'text-teal-500' },
    { name: 'Vercel', icon: <SiVercel />, color: 'text-gray-200' },
    { name: 'Heroku', icon: <SiHeroku />, color: 'text-purple-600' },
    { name: 'Render', icon: <SiRender />, color: 'text-teal-300' },
  ]
};

const allSkills = [...skills.frontend, ...skills.backend, ...skills.devops];

const listVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1 } };


const Skills = () => {
  const { setCursorVariant } = useCursor();
  const handleMouseEnter = () => setCursorVariant('link');
  const handleMouseLeave = () => setCursorVariant('default');

  return (
    <section id="skills" className="py-24 bg-gray-900 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Skills & Technologies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-gray-800/50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">Frontend</h3>
            <motion.ul variants={listVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-3">
              {skills.frontend.map(skill => (
                <motion.li key={skill.name} variants={itemVariants} className="text-gray-300">{skill.name}</motion.li>
              ))}
            </motion.ul>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">Backend</h3>
            <motion.ul variants={listVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-3">
              {skills.backend.map(skill => (
                <motion.li key={skill.name} variants={itemVariants} className="text-gray-300">{skill.name}</motion.li>
              ))}
            </motion.ul>
          </div>
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

      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Marquee speed={60} gradient={true} gradientColor="#111827" gradientWidth={100}>
          {allSkills.map((skill, index) => (
            <div key={index} className="flex items-center justify-center w-24 h-24 mx-4 bg-gray-800 rounded-lg shadow-lg group">
              {/* This div now uses the `color` property from our data */}
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