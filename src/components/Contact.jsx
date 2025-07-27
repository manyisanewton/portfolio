import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Contact Me</h2>
        <motion.div
          className="max-w-lg mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-300 mb-8">
            Feel free to reach out. I'm open to new opportunities and collaborations.
          </p>
          <div className="flex justify-center space-x-6 text-4xl">
            <a href="mailto:newtonmanyisa@example.com" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"><FaEnvelope /></a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"><FaLinkedin /></a>
            <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"><FaGithub /></a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;