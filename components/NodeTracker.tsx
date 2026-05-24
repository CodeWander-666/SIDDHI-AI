'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function NodeTracker() {
  const [nodes, setNodes] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const nodeId = crypto.randomUUID();
    const register = async () => {
      await fetch('/api/node/heartbeat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodeId })
      });
    };
    register();
    const interval = setInterval(register, 30000);
    const poll = setInterval(async () => {
      const res = await fetch('/api/node/count');
      const data = await res.json();
      setNodes(data.count);
    }, 5000);
    return () => {
      clearInterval(interval);
      clearInterval(poll);
      fetch('/api/node/unregister', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nodeId }) });
    };
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
        <span className="text-xs text-gray-400">active KI nodes</span>
      </motion.div>
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-4 glass-card rounded-xl text-xs text-gray-300 z-50 border border-gold-400/30">
          <p className="mb-2">🌐 <strong>Distributed Intelligence Network</strong></p>
          <p>Each browser becomes a node. Data stays local – node presence coordinates distributed thinking.</p>
        </div>
      )}
    </div>
  );
}
