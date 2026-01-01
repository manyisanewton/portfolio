import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

const WhatsAppButton = ({ isChatOpen = false }) => {
  const { setCursorVariant } = useCursor();

  const handleMouseEnter = () => setCursorVariant('link');
  const handleMouseLeave = () => setCursorVariant('default');

  // Format your number for the WhatsApp API (country code without '+')
  const phoneNumber = '254799425417';
  const message = encodeURIComponent("Hello Newton! I saw your portfolio and wanted to connect.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const attentionAnimation = {
    opacity: 1,
    x: 0,
    boxShadow: '0 0 24px rgba(34,197,94,0.6)',
    rotate: [0, 0, -2, 2, 0],
    y: [0, 0, -2, 0, 0],
  };

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 bg-green-500 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transform hover:scale-110 transition-transform duration-300 ${isChatOpen ? 'pointer-events-none' : ''}`}
      initial={{ opacity: 0, x: 24, boxShadow: '0 0 0 rgba(34,197,94,0)' }}
      animate={isChatOpen ? { opacity: 0, x: 0, boxShadow: '0 0 0 rgba(34,197,94,0)', rotate: 0, y: 0 } : attentionAnimation}
      transition={isChatOpen ? { duration: 0.2, ease: 'easeOut' } : { type: 'tween', ease: 'easeInOut', delay: 0.15, duration: 0.6, repeat: 6, repeatDelay: 4 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Contact via WhatsApp"
    >
      <FaWhatsapp size={30} />
    </motion.a>
  );
};

export default WhatsAppButton;
