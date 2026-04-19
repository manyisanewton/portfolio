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
  const accessKey = '0a65ca1a-d319-4083-b22b-6d191e558381';

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
    <section id="contact" className="section-shell bg-slate-950 text-white">
      <div className="section-wrap">
        <span className="section-kicker">Contact</span>
        <h2 className="section-heading max-w-3xl">Let&apos;s build something clear, usable, and ready to ship.</h2>
        <p className="section-copy">
          Looking for a developer who can shape the interface, build the system behind it, and support delivery from setup to launch? Let&apos;s talk.
        </p>
        <motion.form
          onSubmit={handleSubmit}
          className="surface-panel mx-auto mt-12 max-w-3xl p-6 sm:p-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <motion.div variants={inputVariants}>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required className="w-full rounded-md border border-white/10 bg-slate-950 px-4 py-4 text-white placeholder:text-slate-500 focus:outline-none transition-colors" style={{ boxShadow: 'none' }} onFocus={(e) => (e.target.style.borderColor = '#f15a24')} onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
            </motion.div>
            <motion.div variants={inputVariants}>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required className="w-full rounded-md border border-white/10 bg-slate-950 px-4 py-4 text-white placeholder:text-slate-500 focus:outline-none transition-colors" style={{ boxShadow: 'none' }} onFocus={(e) => (e.target.style.borderColor = '#f15a24')} onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
            </motion.div>
          </div>
          <motion.div variants={inputVariants} className="mb-6">
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell me about the product, team, or problem you want solved" rows="6" required className="w-full rounded-md border border-white/10 bg-slate-950 px-4 py-4 text-white placeholder:text-slate-500 focus:outline-none transition-colors" style={{ boxShadow: 'none' }} onFocus={(e) => (e.target.style.borderColor = '#f15a24')} onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}></textarea>
          </motion.div>
          <motion.div variants={inputVariants} className="text-center">
            <button
              type="submit"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="group inline-flex items-center rounded-md px-8 py-4 font-semibold text-white transition-all duration-300 hover:opacity-95"
              style={{ backgroundColor: '#f15a24' }}
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
