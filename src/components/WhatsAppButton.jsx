import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useCursor } from '../context/CursorContext';

const WhatsAppButton = () => {
  const { setCursorVariant } = useCursor();

  const handleMouseEnter = () => setCursorVariant('link');
  const handleMouseLeave = () => setCursorVariant('default');

  // Format your number for the WhatsApp API (country code without '+')
  const phoneNumber = '254799425417';
  const message = encodeURIComponent("Hello Newton! I saw your portfolio and wanted to connect.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transform hover:scale-110 transition-transform duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Contact via WhatsApp"
    >
      <FaWhatsapp size={36} />
    </a>
  );
};

export default WhatsAppButton;