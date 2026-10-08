import React, { useState } from 'react';
import { motion } from 'framer-motion';

const InteractiveCard = ({ children, className = '', intensity = 10 }) => {
  const [hovered, setHovered] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50, rotateX: 0, rotateY: 0 });

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const rotateY = ((x - 50) / 50) * intensity;
    const rotateX = (((y - 50) / 50) * intensity) * -1;

    setPosition({ x, y, rotateX, rotateY });
  };

  const reset = () => {
    setHovered(false);
    setPosition({ x: 50, y: 50, rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      onMouseMove={handleMove}
      animate={{
        rotateX: hovered ? position.rotateX : 0,
        rotateY: hovered ? position.rotateY : 0,
        y: hovered ? -4 : 0,
        scale: hovered ? 1.01 : 1,
      }}
      transition={{ type: 'spring', stiffness: 160, damping: 18, mass: 0.8 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          background: `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(0, 136, 255, 0.18), transparent 26%), radial-gradient(circle at ${position.x}% ${position.y}%, rgba(34, 211, 238, 0.12), transparent 48%)`,
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          background: `linear-gradient(135deg, rgba(0,0,0,0.04), transparent 35%, transparent 65%, rgba(0,0,0,0.02))`,
          boxShadow: hovered
            ? 'inset 0 1px 0 rgba(255,255,255,0.6), 0 18px 40px rgba(2,6,23,0.12), 0 0 30px rgba(0,136,255,0.12)'
            : 'inset 0 1px 0 rgba(255,255,255,0.4), 0 18px 40px rgba(2,6,23,0.06)',
        }}
      />
      <div className="relative z-10" style={{ transform: 'translateZ(18px)' }}>
        {children}
      </div>
    </motion.div>
  );
};

export default InteractiveCard;