import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

const WhatsAppButton = ({ isChatOpen = false }) => {
  const { setCursorVariant } = useCursor();

  const handleMouseEnter = () => setCursorVariant('link');
  const handleMouseLeave = () => setCursorVariant('default');

  const phoneNumber = '254799425417';
  const message = encodeURIComponent("Hello Newton! I saw your portfolio and wanted to connect.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const attentionAnimation = {
    opacity: 1,
    x: 0,
    boxShadow: '0 0 30px var(--color-emerald-glow)',
    rotate: [0, 0, -3, 3, 0],
    y: [0, 0, -3, 0, 0],
  };

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transform transition-transform duration-300 ${isChatOpen ? 'pointer-events-none opacity-0 scale-0' : ''}`}
      style={{ background: 'var(--color-emerald)' }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isChatOpen ? { opacity: 0, scale: 0 } : attentionAnimation}
      transition={isChatOpen ? { duration: 0.3, ease: 'easeIn' } : { type: 'tween', ease: 'easeInOut', delay: 1, duration: 0.8, repeat: 6, repeatDelay: 4 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Contact via WhatsApp"
      whileHover={{ scale: 1.15, boxShadow: '0 0 40px var(--color-emerald-glow)' }}
      whileTap={{ scale: 0.95 }}
    >
      <FaWhatsapp size={28} />
    </motion.a>
  );
};

export default WhatsAppButton;