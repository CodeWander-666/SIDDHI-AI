'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { WebLLMChat } from './WebLLMChat';

export function AICard({ title, description, icon, modelId, gradient }: any) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <motion.div
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="glass-card p-6 rounded-2xl cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className={`text-6xl mb-4`}>{icon}</div>
        <h3 className="text-2xl font-serif text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-4">{description}</p>
        <button className="px-4 py-2 rounded-full bg-gold-600 text-white text-sm font-semibold hover:scale-105 transition">
          Try Now →
        </button>
      </motion.div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-3xl p-4 relative">
            <button onClick={() => setIsOpen(false)} className="absolute -top-10 right-0 text-white text-2xl">✕</button>
            <WebLLMChat modelId={modelId} showHeader />
          </div>
        </div>
      )}
    </>
  );
}
