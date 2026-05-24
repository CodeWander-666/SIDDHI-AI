'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { WebLLMChatModal } from './WebLLMChatModal';

interface AIServiceCardProps {
  title: string;
  description: string;
  icon: string;
  systemPrompt: string;
  gradient: string;
  stats?: string;
}

export function AIServiceCard({ title, description, icon, systemPrompt, gradient, stats }: AIServiceCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ y: -12, scale: 1.02 }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
        className="glass-card p-6 rounded-2xl cursor-pointer group relative overflow-hidden border border-white/10 hover:border-gold-400/50 transition-all duration-300"
        onClick={() => setIsOpen(true)}
      >
        {/* Animated gradient background on hover */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${gradient}`} />
        <div className="relative z-10">
          <div className="text-6xl mb-4">{icon}</div>
          <h3 className="text-2xl font-serif text-white mb-2">{title}</h3>
          <p className="text-gray-400 text-sm mb-4 leading-relaxed">{description}</p>
          {stats && <p className="text-xs text-cyan-400 mb-3">{stats}</p>}
          <button className="px-4 py-2 rounded-full bg-gold-600/20 text-gold-400 text-sm font-semibold hover:bg-gold-600 hover:text-black transition-all">
            Launch →
          </button>
        </div>
      </motion.div>

      {isOpen && (
        <WebLLMChatModal
          title={title}
          icon={icon}
          systemPrompt={systemPrompt}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
