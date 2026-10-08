import React from 'react';
import { motion } from 'framer-motion';

const Section = ({
  id,
  children,
  className = '',
  variant = 'default',
  containerClassName = '',
  hasMesh = false,
}) => {
  return (
    <section
      id={id}
      className={`section-shell ${variant === 'alt' ? 'alt' : ''} ${className}`}
      aria-labelledby={`${id}-heading`}
    >
      {hasMesh && <div className="gradient-mesh" aria-hidden="true" />}
      <div className={`container ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};

export default Section;