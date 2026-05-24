'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function NodeCounter() {
  const [nodes, setNodes] = useState(1247);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-block">
      <motion.div
        whileHover={{ scale: 1.05 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="glass-card px-6 py-3 rounded-full cursor-help border border-gold-400/30 flex items-center gap-2"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400" />
        </span>
        <span className="text-gold-400 font-mono text-lg font-bold">{nodes.toLocaleString()}</span>
        <span className="text-xs text-gray-400">active nodes</span>
      </motion.div>
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 glass-card rounded-xl text-xs text-gray-300 z-50 border border-gold-400/30">
          Each new user becomes a node, contributing to the Kalki Intelligence network.
        </div>
      )}
    </div>
  );
}
