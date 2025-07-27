import React from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';
import { useCursor } from '../context/CursorContext';

const CustomCursor = () => {
  const { x, y } = useMousePosition();
  const { cursorVariant } = useCursor();

  const variants = {
    default: {
      height: 10,
      width: 10,
      x: x - 5,
      y: y - 5,
      backgroundColor: '#06b6d4',
      mixBlendMode: 'difference',
    },
    link: {
      height: 60,
      width: 60,
      x: x - 30,
      y: y - 30,
      backgroundColor: '#ffffff',
      mixBlendMode: 'difference',
    },
    // This is the new variant you need to add
    text: {
      height: 40,
      width: 40,
      x: x - 20,
      y: y - 20,
      backgroundColor: '#ffffff',
      mixBlendMode: 'difference',
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full z-50 pointer-events-none"
      variants={variants}
      animate={cursorVariant}
      transition={{ type: 'spring', stiffness: 500, damping: 30, bounce: 0 }}
    />
  );
};

export default CustomCursor;