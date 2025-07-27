import React from 'react';
import { motion } from 'framer-motion';
import {
  FaPython,
  FaJs,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaPhp,
  FaDocker,
  FaGitAlt,
  FaCode,
  FaDatabase
} from 'react-icons/fa';

import {
  SiFlask,
  SiTailwindcss,
  SiPostgresql,
  SiNodedotjs,
  SiExpress
} from 'react-icons/si';

const skills = {
  frontend: [
    { name: 'React', icon: <FaReact className="text-cyan-400" /> },
    { name: 'JavaScript', icon: <FaJs className="text-yellow-400" /> },
    { name: 'HTML5', icon: <FaHtml5 className="text-orange-500" /> },
    { name: 'CSS3', icon: <FaCss3Alt className="text-blue-500" /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-teal-400" /> },
  ],
  backend: [
    { name: 'Python', icon: <FaPython className="text-blue-400" /> },
    { name: 'Flask', icon: <SiFlask className="text-gray-300" /> },
    { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-300" /> },
    { name: 'SQLAlchemy', icon: <FaDatabase className="text-red-500" /> },
    { name: 'C#', icon: <FaCode className="text-purple-500" /> },
    { name: 'PHP', icon: <FaPhp className="text-indigo-400" /> },
    { name: 'Node.js', icon: <SiNodedotjs className="text-green-500" /> },
    { name: 'Express', icon: <SiExpress className="text-gray-400" /> },
  ],
  other: [
    { name: 'Docker', icon: <FaDocker className="text-blue-600" /> },
    { name: 'Git', icon: <FaGitAlt className="text-red-600" /> },
  ]
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Frontend</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {skills.frontend.map(skill => (
                <motion.div key={skill.name} className="flex flex-col items-center p-4 bg-gray-800 rounded-lg" whileHover={{ scale: 1.1 }}>
                  <div className="text-4xl mb-2">{skill.icon}</div>
                  <p>{skill.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-6">Backend</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {skills.backend.map(skill => (
                <motion.div key={skill.name} className="flex flex-col items-center p-4 bg-gray-800 rounded-lg" whileHover={{ scale: 1.1 }}>
                  <div className="text-4xl mb-2">{skill.icon}</div>
                  <p>{skill.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-6">Other Tools</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {skills.other.map(skill => (
                <motion.div key={skill.name} className="flex flex-col items-center p-4 bg-gray-800 rounded-lg" whileHover={{ scale: 1.1 }}>
                  <div className="text-4xl mb-2">{skill.icon}</div>
                  <p>{skill.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
