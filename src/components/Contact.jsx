import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { FiSend } from 'react-icons/fi';

const Contact = () => {
  const { setCursorVariant } = useCursor();
  const handleMouseEnter = () => setCursorVariant('link');
  const handleMouseLeave = () => setCursorVariant('default');

  // State for form fields
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  // State for submission status
  const [status, setStatus] = useState('');

  // Your Web3Forms Access Key
  const accessKey = '798c17d6-2220-48d8-9fa2-0d56eb8bb278'; // <-- PASTE YOUR KEY HERE

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        ...formData,
      }),
    });

    const result = await res.json();
    if (result.success) {
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' }); // Clear form
    } else {
      console.error("Error from Web3Forms:", result);
      setStatus(result.message || 'An error occurred.');
    }
  };

  const inputVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="contact" className="py-20 bg-gray-800 text-white">
      <div className="container mx-auto px-4">
         <section id="about" className="py-20 bg-gray-900 text-white overflow-hidden"></section>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Get In Touch</h2>
        <p className="text-lg text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to new opportunities and collaborations.
        </p>

        <motion.form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.div variants={inputVariants} className="mb-6">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required className="w-full p-4 bg-gray-900 rounded-lg border border-gray-700 focus:border-cyan-400 focus:ring-cyan-400 focus:outline-none transition-colors" />
          </motion.div>
          <motion.div variants={inputVariants} className="mb-6">
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required className="w-full p-4 bg-gray-900 rounded-lg border border-gray-700 focus:border-cyan-400 focus:ring-cyan-400 focus:outline-none transition-colors" />
          </motion.div>
          <motion.div variants={inputVariants} className="mb-6">
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" rows="6" required className="w-full p-4 bg-gray-900 rounded-lg border border-gray-700 focus:border-cyan-400 focus:ring-cyan-400 focus:outline-none transition-colors"></textarea>
          </motion.div>
          <motion.div variants={inputVariants} className="text-center">
            <button
              type="submit"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="group inline-flex items-center px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg cursor-pointer transition-all duration-300"
            >
              Send Message
              <FiSend className="ml-2 transition-transform duration-300 group-hover:rotate-45" />
            </button>
          </motion.div>
        </motion.form>
        {status && <p className="text-center mt-6 text-lg">{status}</p>}
      </div>
    </section>
  );
};

export default Contact;