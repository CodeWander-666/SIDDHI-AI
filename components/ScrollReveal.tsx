'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function ScrollReveal({ children, delay = 0, direction = 'up' }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const variants = {
    hidden: { opacity: 0, y: direction === 'up' ? 50 : -50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, delay, ease: 'easeOut' } }
  };
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={variants}>
      {children}
    </motion.div>
  );
}
