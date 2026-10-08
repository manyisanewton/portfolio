import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SkillRing = ({
  name,
  level,
  color = 'cyan',
  size = 72,
  strokeWidth = 5,
  showLabel = true,
  className = '',
}) => {
  const circleRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(level / 100, 1);
  const offset = circumference * (1 - progress);

  const colors = {
    cyan: 'var(--color-cyan)',
    amber: 'var(--color-amber)',
    emerald: 'var(--color-emerald)',
  };

  const softColors = {
    cyan: 'var(--color-cyan-soft)',
    amber: 'var(--color-amber-soft)',
    emerald: 'var(--color-emerald-soft)',
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (circleRef.current) {
      observer.observe(circleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg ref={circleRef} width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--border-light)"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={colors[color]}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={animated ? offset : circumference}
            transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
            style={{ filter: `drop-shadow(0 0 6px ${colors[color]})` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display font-bold text-xl" style={{ color: 'var(--fg-primary)' }}>
            {Math.round(level)}%
          </span>
        </div>
      </div>
      {showLabel && (
        <span className="mt-3 text-sm font-medium text-center max-w-[100px]" style={{ color: 'var(--fg-secondary)' }}>
          {name}
        </span>
      )}
      {!showLabel && (
        <motion.div
          className="mt-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            background: softColors[color],
            color: colors[color],
            border: `1px solid ${colors[color] + '40'}`,
          }}
        >
          {name}
        </motion.div>
      )}
    </div>
  );
};

export default SkillRing;