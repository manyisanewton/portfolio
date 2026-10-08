import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MagneticButton = ({
  children,
  className = '',
  variant = 'primary',
  onClick,
  magneticStrength = 0.3,
  ...props
}) => {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * magneticStrength, y: y * magneticStrength });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    ghost: 'btn-ghost',
  };

  return (
    <motion.button
      ref={ref}
      className={`${variants[variant]} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        x: hovered ? position.x : 0,
        y: hovered ? position.y : 0,
        scale: hovered ? 1.02 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      style={{ transformOrigin: 'center center' }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;