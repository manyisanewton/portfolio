import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TiltCard = ({
  children,
  className = '',
  intensity = 8,
  scale = 1.02,
  glow = true,
  onClick,
  style,
  ...props
}) => {
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
      className={`card-tilt relative overflow-hidden ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      onMouseMove={handleMove}
      onClick={onClick}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      animate={{
        rotateX: hovered ? position.rotateX : 0,
        rotateY: hovered ? position.rotateY : 0,
        scale: hovered ? scale : 1,
        z: hovered ? 20 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
        mass: 0.8,
      }}
      {...props}
    >
      {/* Glow layer */}
      {glow && hovered && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(ellipse at ${position.x}% ${position.y}%, rgba(0, 212, 255, 0.15), transparent 40%), radial-gradient(ellipse at ${position.x}% ${position.y}%, rgba(255, 107, 53, 0.1), transparent 50%)`,
            borderRadius: 'inherit',
          }}
        />
      )}

      {/* Specular highlight */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.1) 100%)`,
          borderRadius: 'inherit',
        }}
      />

      {/* Border glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        animate={{
          boxShadow: hovered
            ? 'inset 0 1px 0 rgba(255,255,255,0.6), 0 30px 60px rgba(2,6,23,0.12), 0 0 40px rgba(0,212,255,0.2)'
            : 'inset 0 1px 0 rgba(255,255,255,0.4), 0 4px 24px rgba(2,6,23,0.06)',
        }}
        transition={{ duration: 0.3 }}
        style={{ borderColor: 'var(--border-light)' }}
      />

      <div className="relative z-10 h-full w-full" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </motion.div>
  );
};

export default TiltCard;
