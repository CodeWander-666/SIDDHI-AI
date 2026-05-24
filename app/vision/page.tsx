'use client';
import { LuxuryThreeScene } from '../../components/LuxuryThreeScene';
import { ScrollReveal } from '../../components/ScrollReveal';
import Link from 'next/link';

export default function VisionPage() {
  return (
    <>
      <LuxuryThreeScene />
      <div className="relative z-10 pt-28 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal><div className="text-center mb-20"><div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-400/30 bg-gold-400/5 text-gold-400 text-sm tracking-wider mb-6">✦ OUR VISION ✦</div><h1 className="text-6xl md:text-8xl font-serif mb-6">Intelligence <span className="text-gold-400">Without Limits</span></h1><p className="text-gray-400 text-lg max-w-2xl mx-auto">A future where AI is open, private, and owned by the people – not by corporations.</p></div></ScrollReveal>
          <ScrollReveal><div className="glass-card rounded-3xl p-14 mb-24 text-center border border-gold-400/20"><div className="max-w-3xl mx-auto"><div className="text-8xl mb-6">⚛️</div><h2 className="text-4xl font-serif mb-6">Our Vision</h2><p className="text-gray-300 text-xl leading-relaxed mb-8">To build the world's first truly distributed intelligence network – where every device contributes, every user owns their data, and AI serves humanity, not the other way around.</p><div className="border-t border-white/10 pt-8"><p className="text-gold-400 text-sm tracking-wider">✦ Quantum‑Inspired ✦ Open Source ✦ Privacy‑First ✦</p></div></div></div></ScrollReveal>
          <div className="grid md:grid-cols-2 gap-12 mb-24">
            <ScrollReveal><div className="glass-card p-10 rounded-2xl"><h3 className="text-2xl font-serif text-cyan-400 mb-4">Mission</h3><p className="text-gray-300 leading-relaxed">Democratise artificial intelligence by making it accessible, affordable, and completely private. We believe that the most powerful technology of our time should not be locked behind corporate walls or paywalls.</p></div></ScrollReveal>
            <ScrollReveal><div className="glass-card p-10 rounded-2xl"><h3 className="text-2xl font-serif text-gold-400 mb-4">Core Purpose</h3><p className="text-gray-300 leading-relaxed">To empower every business, creator, and professional with intelligent tools that respect their privacy and amplify their potential.</p></div></ScrollReveal>
          </div>
          <ScrollReveal><div className="glass-card rounded-3xl p-12 mb-24 border border-cyan-400/20"><h2 className="text-4xl font-serif text-center mb-10">The <span className="text-cyan-400">Quantum Node</span> Network</h2><div className="grid md:grid-cols-3 gap-10 text-center"><div><div className="text-5xl mb-4">🔗</div><h3 className="text-xl font-semibold mb-2">Distributed by Design</h3><p className="text-gray-400">Every device running KI becomes a node. No central servers, no single point of failure.</p></div><div><div className="text-5xl mb-4">⚛️</div><h3 className="text-xl font-semibold mb-2">Quantum‑Inspired</h3><p className="text-gray-400">Using Web Workers and parallel processing to simulate quantum‑level thinking.</p></div><div><div className="text-5xl mb-4">🔒</div><h3 className="text-xl font-semibold mb-2">Privacy at the Core</h3><p className="text-gray-400">Your conversations, your data – never leave your device.</p></div></div></div></ScrollReveal>
          <ScrollReveal><div className="mb-24"><h2 className="text-4xl font-serif text-center mb-12">2026–2030 <span className="text-gold-400">Roadmap</span></h2><div className="grid md:grid-cols-5 gap-4">{[{year:'2026',milestone:'KI Cloud Launch • WebLLM Integration'},{year:'2027',milestone:'Quantum‑Inspired Parallel Processing'},{year:'2028',milestone:'Distributed Node Network'},{year:'2029',milestone:'Autonomous AI Agents Marketplace'},{year:'2030',milestone:'Full Quantum Simulation'}].map((item,idx)=><div key={idx} className="glass-card p-6 text-center rounded-2xl"><div className="text-2xl font-serif text-gold-400 mb-2">{item.year}</div><p className="text-gray-400 text-sm">{item.milestone}</p></div>)}</div></div></ScrollReveal>
          <ScrollReveal><div className="text-center"><Link href="/ki-cloud" className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold hover:scale-105 transition">Join the Intelligence Revolution →</Link></div></ScrollReveal>
        </div>
      </div>
    </>
  );
}
