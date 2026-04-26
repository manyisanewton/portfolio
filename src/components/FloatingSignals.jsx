import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const labels = [
  'Frontend',
  'APIs',
  'ERP',
  'Deployments',
  'Automation',
  'Support',
  'Systems',
  'UI Logic',
  'Integration',
  'Scale',
  'Workflows',
  'Delivery',
];

const randomPosition = () => ({
  left: `${8 + Math.random() * 78}%`,
  top: `${6 + Math.random() * 84}%`,
});

const FloatingSignals = () => {
  const initialSignals = useMemo(
    () =>
      labels.map((label) => ({
        label,
        position: randomPosition(),
      })),
    []
  );

  const [signals, setSignals] = useState(initialSignals);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSignals((current) =>
        current.map((signal) => ({
          ...signal,
          position: randomPosition(),
        }))
      );
    }, 9200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {signals.map((signal, index) => (
        <motion.div
          key={signal.label}
          className="absolute hidden rounded-full border border-white/8 bg-slate-900/14 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-slate-200/18 backdrop-blur-[2px] md:block"
          animate={{
            left: signal.position.left,
            top: signal.position.top,
            opacity: [0.1, 0.26, 0.1],
            y: [0, -10, 0],
          }}
          transition={{
            left: { duration: 9.2, ease: 'easeInOut' },
            top: { duration: 9.2, ease: 'easeInOut' },
            opacity: { duration: 7.2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.18 },
            y: { duration: 7.2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.18 },
          }}
        >
          {signal.label}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingSignals;
