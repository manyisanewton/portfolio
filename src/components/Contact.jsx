import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { FiSend } from 'react-icons/fi';

// Step 2a: Import SweetAlert2
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Create a SweetAlert2 instance for React
const MySwal = withReactContent(Swal);


const Contact = () => {
  const { setCursorVariant } = useCursor();
  const handleMouseEnter = () => setCursorVariant('link');
  const handleMouseLeave = () => setCursorVariant('default');

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  // The old 'status' state is no longer needed
  
  // Remember to paste your actual Web3Forms Access Key here
  const accessKey = '798c17d6-2220-48d8-9fa2-0d56eb8bb278';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show a loading alert
    MySwal.fire({
      title: 'Sending...',
      text: 'Please wait a moment.',
      allowOutsideClick: false,
      didOpen: () => {
        MySwal.showLoading();
      },
    });

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: accessKey, ...formData }),
      });

      const result = await res.json();
      if (result.success) {
        // Step 2b: Show success alert
        MySwal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'Thank you for reaching out. I will get back to you shortly.',
          timer: 3000,
          showConfirmButton: false,
          background: '#1f2937', // bg-gray-800
          color: '#ffffff'
        });
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        // Step 2c: Show error alert
        console.error("Error from Web3Forms:", result);
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: result.message || 'An error occurred. Please try again.',
          background: '#1f2937',
          color: '#ffffff'
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      MySwal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Could not send the message. Please check your connection.',
        background: '#1f2937',
        color: '#ffffff'
      });
    }
  };

  const inputVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="contact" className="py-24 bg-gray-800 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Get In Touch</h2>
        <p className="text-lg text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Have a project in mind or just want to say hi? I'm always open to new opportunities and collaborations.
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
        {/* The old status paragraph is now removed */}
      </div>
    </section>
  );
};

export default Contact;