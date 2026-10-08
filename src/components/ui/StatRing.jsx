import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const StatRing = ({
  value,
  max = 100,
  size = 80,
  strokeWidth = 4,
  color = 'cyan',
  children,
  className = '',
  label,
}) => {
  const circleRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / max, 1);
  const offset = circumference * (1 - progress);

  const colors = {
    cyan: 'var(--color-cyan)',
    amber: 'var(--color-amber)',
    emerald: 'var(--color-emerald)',
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (circleRef.current) {
      observer.observe(circleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <div className="stat-ring" style={{ width: size, height: size }}>
        <svg ref={circleRef} width={size} height={size} className="transform">
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
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            style={{ filter: `drop-shadow(0 0 6px ${colors[color]})` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'translateZ(10px)' }}>
          {children || (
            <span className="font-display text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: 'var(--fg-primary)' }}>
              {value}+
            </span>
          )}
        </div>
      </div>
      {label && (
        <span className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          {label}
        </span>
      )}
    </div>
  );
};

export default StatRing;
