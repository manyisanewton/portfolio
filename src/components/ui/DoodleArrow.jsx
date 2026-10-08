import React from 'react';
import { motion } from 'framer-motion';
import arrowImage from '../../assets/images/arrow.png';

const DoodleArrow = ({ className = '' }) => {
  return (
    <motion.img
      src={arrowImage}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none absolute object-contain ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    />
  );
};

export default DoodleArrow;
