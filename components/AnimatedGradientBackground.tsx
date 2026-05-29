'use client';
import { useEffect, useState } from 'react';

export function AnimatedGradientBackground() {
  const [gradient, setGradient] = useState('from-cyan-500/20 via-purple-500/20 to-pink-500/20');

  useEffect(() => {
    const gradients = [
      'from-cyan-500/20 via-purple-500/20 to-pink-500/20',
      'from-gold-400/20 via-cyan-500/20 to-purple-500/20',
      'from-purple-500/20 via-pink-500/20 to-cyan-500/20',
      'from-pink-500/20 via-gold-400/20 to-cyan-500/20',
    ];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % gradients.length;
      setGradient(gradients[index]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Base dark overlay */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-0" />
      {/* Animated gradient blobs */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-all duration-1000`} />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>
    </>
  );
}
