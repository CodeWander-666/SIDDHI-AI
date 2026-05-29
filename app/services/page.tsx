'use client';
import { useState } from 'react';
import { AnimatedGradientBackground } from '@/components/AnimatedGradientBackground';
import { ScrollReveal } from '@/components/ScrollReveal';
import Link from 'next/link';

const serviceCategories = [
  { id: 'for-startups', name: 'For Startups', icon: '🚀', description: 'MVP development, pitch decks, growth hacking – AI‑powered.' },
  { id: 'for-developers', name: 'For Developers', icon: '💻', description: 'Open source tools, SDKs, marketplace, revenue sharing.' },
  { id: 'for-small-businesses', name: 'For Small Business', icon: '🏢', description: 'Local SEO, websites, social automation – all in one.' },
  { id: 'for-social-creators', name: 'For Social Creators', icon: '🎨', description: 'Viral content, blue tick, LinkedIn Premium – guaranteed.' },
  { id: 'web-development', name: 'Web Development', icon: '🌐', description: 'Static (₹7,999) or Next.js (₹12,999) – fast, secure, SEO‑ready.' },
  { id: 'seo', name: 'SEO Dominant', icon: '📈', description: 'Programmatic SEO, technical audits, backlinks – #1 ranking.' },
  { id: 'social-media', name: 'Social Media Automation', icon: '📱', description: '2 viral posts/month + free verification – ₹9,999/mo.' },
  { id: 'linkedin', name: 'LinkedIn Growth Engine', icon: '🔗', description: 'Free Premium, lead gen, daily content – ₹9,999/mo.' },
  { id: 'ai-automation', name: 'AI Automation Suite', icon: '⚙️', description: 'Chatbots, AI calling, email drip – custom workflows.' },
];

export default function ServicesHub() {
  const [activeId, setActiveId] = useState('for-startups');
  const activeService = serviceCategories.find(s => s.id === activeId);

  return (
    <>
      <AnimatedGradientBackground />
      <div className="relative z-10 pt-24 pb-16 px-4 md:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-400/30 bg-gold-400/5 text-gold-400 text-sm tracking-wider mb-6 backdrop-blur-sm">
                ✦ FULL‑SUITE SERVICES ✦
              </div>
              <h1 className="text-5xl md:text-7xl font-serif mb-4">
                Solutions for <span className="text-gold-400">Every Stage</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                From startup to enterprise – AI‑powered services that deliver real ROI.
              </p>
            </div>
          </ScrollReveal>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Right sidebar menu */}
            <div className="md:w-72 order-1 md:order-2">
              <div className="glass-card rounded-2xl p-4 sticky top-28">
                <h3 className="text-lg font-semibold mb-4 text-gold-400">Our Services</h3>
                <nav className="space-y-1 max-h-[70vh] overflow-y-auto">
                  {serviceCategories.map(cat => (
                    <Link
                      key={cat.id}
                      href={`/services/${cat.id}`}
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition hover:bg-white/5 ${
                        activeId === cat.id ? 'bg-cyan-500/20 text-cyan-400 border-l-2 border-cyan-400' : 'text-gray-300'
                      }`}
                    >
                      <span className="text-xl">{cat.icon}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{cat.name}</div>
                        <div className="text-xs text-gray-500 line-clamp-1">{cat.description}</div>
                      </div>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main content – intro */}
            <div className="flex-1 order-2 md:order-1">
              <div className="glass-card rounded-3xl p-8 text-center">
                <div className="text-6xl mb-4">{activeService?.icon}</div>
                <h2 className="text-2xl font-serif mb-2">{activeService?.name}</h2>
                <p className="text-gray-400 mb-6">{activeService?.description}</p>
                <Link
                  href={`/services/${activeId}`}
                  className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold hover:scale-105 transition"
                >
                  View Full Service →
                </Link>
                <p className="text-xs text-gray-500 mt-4">Click any service on the right to explore its dedicated page.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
