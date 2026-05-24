'use client';
import { ScrollReveal } from '../../components/ScrollReveal';
import { NodeTracker } from '../../components/NodeTracker';
import { AIServiceCard } from '../../components/AIServiceCard';
import Link from 'next/link';

const aiServices = [
  {
    title: 'Storyteller AI',
    description: 'Generate immersive narratives, scripts, and creative stories.',
    icon: '📖',
    systemPrompt: 'You are a creative storyteller AI. Generate engaging, imaginative stories based on user prompts. Keep responses vivid and concise.',
    gradient: 'from-purple-500 to-cyan-500',
    stats: '✨ 1.2k stories generated'
  },
  {
    title: 'Social Caption Gen',
    description: 'Create viral social media captions for any platform.',
    icon: '📱',
    systemPrompt: 'You are a social media expert. Generate catchy, engaging captions for Instagram, Twitter, LinkedIn, and TikTok. Use emojis and hashtags naturally.',
    gradient: 'from-pink-500 to-cyan-500',
    stats: '🔥 5.4k captions written'
  },
  {
    title: 'Code Assistant',
    description: 'Write, debug, and explain code in any language.',
    icon: '💻',
    systemPrompt: 'You are a senior software engineer. Help users write clean, efficient code. Explain concepts clearly. Provide examples.',
    gradient: 'from-blue-500 to-cyan-500',
    stats: '⚡ 3.2k code snippets'
  },
  {
    title: 'Smart Summariser',
    description: 'Summarise articles, videos, or documents in seconds.',
    icon: '📄',
    systemPrompt: 'You are a summarisation expert. Extract key points from any text and present them concisely. Use bullet points when helpful.',
    gradient: 'from-green-500 to-cyan-500',
    stats: '📊 10k+ summaries'
  },
  {
    title: 'Conversational Agent',
    description: 'General purpose chat – answer questions, give advice, be friendly.',
    icon: '💬',
    systemPrompt: 'You are a helpful, friendly conversational AI. Answer questions clearly and concisely. Be warm and engaging.',
    gradient: 'from-amber-500 to-cyan-500',
    stats: '💬 24/7 active'
  }
];

export default function KICloudPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full border border-gold-400/30 bg-gold-400/5 text-gold-400 text-sm tracking-wider mb-6">✦ KI CLOUD DASHBOARD ✦</span>
            <h1 className="text-5xl md:text-7xl font-serif mb-4">Intelligence <span className="text-gold-400">Without Limits</span></h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Welcome to the future of distributed AI. Your personal node in the quantum‑inspired network.
            </p>
            <div className="flex justify-center mt-8">
              <NodeTracker />
            </div>
          </div>
        </ScrollReveal>

        {/* AI Service Cards Grid */}
        <ScrollReveal>
          <div className="mb-20">
            <h2 className="text-3xl font-serif text-center mb-2">Your AI <span className="text-gold-400">Toolbox</span></h2>
            <p className="text-center text-gray-400 mb-12">Click any card to launch a specialised AI assistant</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {aiServices.map((service) => (
                <AIServiceCard key={service.title} {...service} />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Technology Explanation Section */}
        <ScrollReveal>
          <div className="glass-card rounded-3xl p-8 mb-20 border border-gold-400/20">
            <h2 className="text-3xl font-serif text-center mb-8">How <span className="text-gold-400">KI Cloud</span> Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4">🧠</div>
                <h3 className="text-xl font-semibold mb-2">Distributed Intelligence</h3>
                <p className="text-gray-400 text-sm">Every visitor becomes a node. Your browser runs the AI – no servers, no data leaks.</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">⚛️</div>
                <h3 className="text-xl font-semibold mb-2">Quantum‑Inspired</h3>
                <p className="text-gray-400 text-sm">Web Workers enable parallel reasoning. More nodes = faster thinking for everyone.</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">🔓</div>
                <h3 className="text-xl font-semibold mb-2">100% Open Source</h3>
                <p className="text-gray-400 text-sm">Your data never leaves your device. Auditable, transparent, private.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Developer Dashboard Section */}
        <ScrollReveal>
          <div className="glass-card rounded-3xl p-8 mb-20 border border-cyan-400/20 bg-gradient-to-br from-black to-cyan-950/20">
            <h2 className="text-3xl font-serif text-center mb-2">Developer <span className="text-cyan-400">Hub</span></h2>
            <p className="text-center text-gray-400 mb-8">Build, deploy, and monetise your own KI agents</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-400/20 flex items-center justify-center">📦</div>
                  <div>
                    <h3 className="font-semibold">SDK & API</h3>
                    <p className="text-gray-400 text-sm">Integrate KI into your apps with our open‑source SDK.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-400/20 flex items-center justify-center">🤖</div>
                  <div>
                    <h3 className="font-semibold">Bot Marketplace</h3>
                    <p className="text-gray-400 text-sm">Submit your own bots, earn revenue per use.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-400/20 flex items-center justify-center">📊</div>
                  <div>
                    <h3 className="font-semibold">Real‑Time Analytics</h3>
                    <p className="text-gray-400 text-sm">Track node usage, model performance, and earnings.</p>
                  </div>
                </div>
              </div>
              <div className="bg-black/40 rounded-xl p-6 border border-white/10">
                <p className="text-cyan-400 text-sm mb-2">🚀 Join the network</p>
                <p className="text-gray-300 text-sm mb-4">Become a node contributor and earn KI credits. Every active browser strengthens the network.</p>
                <Link href="/support" className="inline-block px-4 py-2 rounded-full bg-cyan-600 text-white text-sm font-semibold hover:scale-105 transition">
                  Activate Developer Access →
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Node Network Visualisation (simplified) */}
        <ScrollReveal>
          <div className="text-center">
            <h2 className="text-3xl font-serif mb-4">The <span className="text-gold-400">Quantum Node</span> Network</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Each active browser contributes processing power. The more nodes online, the faster every node thinks – true distributed intelligence.
            </p>
            <div className="glass-card p-6 rounded-2xl inline-block">
              <div className="flex gap-2 text-xs text-gray-400">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> Real‑time network
              </div>
            </div>
            <div className="mt-12">
              <Link href="/plans" className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold hover:scale-105 transition">
                Join the KI Revolution
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
