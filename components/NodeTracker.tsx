'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

export function NodeTracker({ compact = false }: { compact?: boolean }) {
  const [nodes, setNodes] = useState<number | null>(null);
  const [error, setError] = useState(false);

  const fetchNodes = useCallback(async () => {
    try {
      const res = await fetch('/api/node/count');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setNodes(typeof data.count === 'number' ? data.count : 0);
      setError(false);
    } catch (err) {
      console.error('Node count fetch failed:', err);
      setError(true);
    }
  }, []);

  useEffect(() => {
    fetchNodes();
    const interval = setInterval(fetchNodes, 2000);
    return () => clearInterval(interval);
  }, [fetchNodes]);

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 text-xs">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
        </span>
        <span className="text-gold-400 font-mono font-bold">
          {nodes !== null ? nodes.toLocaleString() : '?'}
        </span>
        <span className="text-gray-400">nodes</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-gold-400/30">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
      </span>
      <span className="text-gold-400 font-mono text-sm font-bold">
        {nodes !== null ? nodes.toLocaleString() : '?'}
      </span>
      <span className="text-[10px] text-gray-400">active nodes</span>
    </div>
  );
}
