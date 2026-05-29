'use client';
import { ScrollReveal } from '../components/ScrollReveal';
import { NodeTracker } from '../components/NodeTracker';
import { GradientBackground } from '../components/GradientBackground';
import Link from 'next/link';
import { ServiceCard } from '../components/ServiceCard';

export default function Home() {
  return (
    <>
      <GradientBackground />
      <div className="relative z-10 pt-20">
        {/* Hero */}
        <ScrollReveal>
          <section className="min-h-[90vh] flex items-center justify-center text-center px-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-400/30 bg-gold-400/5 text-gold-400 text-sm tracking-wider mb-6">
                ✦ KALKI INTELLIGENCY – PRIVATE AI IN YOUR BROWSER ✦
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight">
                AI Marketing.<br />
                <span className="text-gold-400">Zero Tracking.</span>
              </h1>
              <p className="text-xl text-gray-300 mt-8 max-w-2xl mx-auto leading-relaxed">
                <strong>Kalki Technologies</strong> delivers AI‑powered digital marketing, cloud solutions, and a 
                <strong> browser‑based private AI assistant</strong> – no data centres, total privacy.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center mt-12">
                <Link
                  href="/chat"
                  className="px-10 py-4 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold hover:scale-105 transition"
                >
                  ✨ Try KI Assistant (Private Chat)
                </Link>
                <Link
                  href="#pricing"
                  className="px-10 py-4 rounded-full border border-white/20 text-white hover:border-gold-400 hover:text-gold-400 transition"
                >
                  See Pricing
                </Link>
              </div>
              <div className="mt-16 flex justify-center">
                <NodeTracker />
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Mission & Vision */}
        <ScrollReveal>
          <section className="py-24 max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">Our <span className="text-cyan-400">Mission & Vision</span></h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Democratising AI while respecting your privacy.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold mb-3 text-gold-400">Mission</h3>
                <p className="text-gray-300 leading-relaxed">
                  Empower startups and businesses with open‑source, private AI tools that run entirely inside the browser – no data leaves your device. We combine cutting‑edge AI with full‑suite digital marketing to make growth accessible and transparent.
                </p>
              </div>
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold mb-3 text-cyan-400">Vision</h3>
                <p className="text-gray-300 leading-relaxed">
                  Build the world's first distributed intelligence network where every user becomes a node. More users = smarter answers. AI for the people, owned by the people.
                </p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* KI Cloud & Chatbot Explanation */}
        <ScrollReveal>
          <section className="py-24 bg-black/40">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-serif mb-4">
                  <span className="text-cyan-400">KI Cloud</span> – Private, Local AI
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  The first open‑source intelligence engine that runs entirely in your browser.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="glass-card p-6 rounded-2xl text-center">
                  <div className="text-4xl mb-3">🔒</div>
                  <h3 className="text-xl font-semibold mb-2">Zero Data Centre</h3>
                  <p className="text-gray-400 text-sm">Your conversations never leave your device – no servers, no logs.</p>
                </div>
                <div className="glass-card p-6 rounded-2xl text-center">
                  <div className="text-4xl mb-3">📦</div>
                  <h3 className="text-xl font-semibold mb-2">Tiny but Powerful</h3>
                  <p className="text-gray-400 text-sm">135M parameter model runs on any modern device.</p>
                </div>
                <div className="glass-card p-6 rounded-2xl text-center">
                  <div className="text-4xl mb-3">🌐</div>
                  <h3 className="text-xl font-semibold mb-2">Distributed Network</h3>
                  <p className="text-gray-400 text-sm">Every visitor becomes a node – more users = smarter AI.</p>
                </div>
              </div>
              <div className="text-center mt-12">
                <Link
                  href="/chat"
                  className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-cyan-600 to-gold-600 text-white font-semibold hover:scale-105 transition"
                >
                  Launch Private AI Chat →
                </Link>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Full‑suite Digital Marketing Services */}
        <ScrollReveal>
          <section className="py-24">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-serif mb-4">Full‑Suite <span className="text-gold-400">Digital Marketing</span></h2>
                <p className="text-gray-400 max-w-2xl mx-auto">Everything you need to dominate your market – powered by AI insights.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <ServiceCard
                  title="AI‑Driven SEO"
                  description="Programmatic SEO, on‑page & off‑page optimisation, local dominance."
                  href="/services/seo"
                  icon="📈"
                  gradient="from-cyan-500 to-blue-600"
                />
                <ServiceCard
                  title="Social Media Automation"
                  description="Facebook + Instagram management – guaranteed 2 viral posts/month + free blue tick verification."
                  href="/services/social"
                  icon="📱"
                  gradient="from-pink-500 to-purple-600"
                />
                <ServiceCard
                  title="Google Business Profile SEO"
                  description="Rank #1 on Google Maps and local pack – complete GMB optimisation."
                  href="/services/gmb"
                  icon="📍"
                  gradient="from-green-500 to-teal-600"
                />
                <ServiceCard
                  title="LinkedIn Optimisation"
                  description="Personal branding, lead generation, and free LinkedIn Premium included."
                  href="/services/linkedin"
                  icon="🔗"
                  gradient="from-blue-500 to-cyan-600"
                />
                <ServiceCard
                  title="Website Development"
                  description="Static (₹7,999) or Dynamic Next.js (₹12,999) – ultra‑fast, secure, SEO‑ready."
                  href="/web-development"
                  icon="💻"
                  gradient="from-orange-500 to-red-600"
                />
                <ServiceCard
                  title="AI Automation Suite"
                  description="WhatsApp bots, booking dashboards, AI sales agents – guaranteed ROI."
                  href="/automation"
                  icon="⚙️"
                  gradient="from-indigo-500 to-purple-600"
                />
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Pricing Plans – Detailed */}
        <ScrollReveal>
          <section id="pricing" className="py-24 bg-black/40">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-serif mb-4">Simple, <span className="text-cyan-400">Transparent Pricing</span></h2>
                <p className="text-gray-400">No hidden fees – guaranteed ROI within 90 days.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Static Website */}
                <div className="glass-card p-8 rounded-2xl border border-gold-400/20 hover:scale-105 transition">
                  <h3 className="text-2xl font-serif mb-2">Static Website</h3>
                  <p className="text-gold-400 text-sm mb-4">up to 5 pages</p>
                  <div className="text-4xl font-bold text-white mb-6">₹7,999</div>
                  <ul className="space-y-2 text-gray-300 text-sm mb-8">
                    <li>✓ Fully responsive design</li>
                    <li>✓ SEO‑optimised structure</li>
                    <li>✓ Contact form integration</li>
                    <li>✓ 1 month free support</li>
                  </ul>
                  <Link href="/contact" className="block text-center py-2 rounded-full border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-black transition">Select Plan</Link>
                </div>

                {/* Dynamic Next.js Website */}
                <div className="glass-card p-8 rounded-2xl border border-cyan-400/20 hover:scale-105 transition">
                  <h3 className="text-2xl font-serif mb-2">Dynamic Website</h3>
                  <p className="text-cyan-400 text-sm mb-4">Next.js – up to 15 pages</p>
                  <div className="text-4xl font-bold text-white mb-6">₹12,999</div>
                  <ul className="space-y-2 text-gray-300 text-sm mb-8">
                    <li>✓ All static features +</li>
                    <li>✓ Custom admin dashboard</li>
                    <li>✓ Database integration</li>
                    <li>✓ Free 3 months hosting</li>
                  </ul>
                  <Link href="/contact" className="block text-center py-2 rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition">Select Plan</Link>
                </div>

                {/* GMB SEO */}
                <div className="glass-card p-8 rounded-2xl border border-gold-400/20 hover:scale-105 transition">
                  <h3 className="text-2xl font-serif mb-2">GMB SEO</h3>
                  <p className="text-gold-400 text-sm mb-4">Google Business Profile</p>
                  <div className="text-4xl font-bold text-white mb-2">₹8,999</div>
                  <p className="text-gray-400 text-xs mb-4">per month</p>
                  <ul className="space-y-2 text-gray-300 text-sm mb-8">
                    <li>✓ Google Maps #1 ranking</li>
                    <li>✓ Review management</li>
                    <li>✓ Local citation building</li>
                    <li>✓ Monthly performance report</li>
                  </ul>
                  <Link href="/contact" className="block text-center py-2 rounded-full border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-black transition">Start Now</Link>
                </div>

                {/* Social Media Automation */}
                <div className="glass-card p-8 rounded-2xl border border-pink-500/20 hover:scale-105 transition">
                  <h3 className="text-2xl font-serif mb-2">Social Media Automation</h3>
                  <p className="text-pink-400 text-sm mb-4">Facebook + Instagram</p>
                  <div className="text-4xl font-bold text-white mb-2">₹9,999</div>
                  <p className="text-gray-400 text-xs mb-4">per month</p>
                  <ul className="space-y-2 text-gray-300 text-sm mb-8">
                    <li>✓ <strong>Guaranteed 2 viral posts/month</strong></li>
                    <li>✓ Free blue tick verification</li>
                    <li>✓ Daily content automation</li>
                    <li>✓ Engagement boosting</li>
                  </ul>
                  <Link href="/contact" className="block text-center py-2 rounded-full border border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-black transition">Get Verified</Link>
                </div>

                {/* SEO Dominant */}
                <div className="glass-card p-8 rounded-2xl border border-cyan-400/20 hover:scale-105 transition">
                  <h3 className="text-2xl font-serif mb-2">SEO Dominant</h3>
                  <p className="text-cyan-400 text-sm mb-4">Programmatic + On/Off Page</p>
                  <div className="text-4xl font-bold text-white mb-2">₹9,999</div>
                  <p className="text-gray-400 text-xs mb-4">per month</p>
                  <ul className="space-y-2 text-gray-300 text-sm mb-8">
                    <li>✓ 50+ keywords ranking</li>
                    <li>✓ Programmatic SEO at scale</li>
                    <li>✓ Technical SEO audit</li>
                    <li>✓ Monthly backlink building</li>
                  </ul>
                  <Link href="/contact" className="block text-center py-2 rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition">Dominate Rankings</Link>
                </div>

                {/* LinkedIn Optimisation */}
                <div className="glass-card p-8 rounded-2xl border border-blue-400/20 hover:scale-105 transition">
                  <h3 className="text-2xl font-serif mb-2">LinkedIn Optimisation</h3>
                  <p className="text-blue-400 text-sm mb-4">Personal Branding</p>
                  <div className="text-4xl font-bold text-white mb-2">₹9,999</div>
                  <p className="text-gray-400 text-xs mb-4">per month</p>
                  <ul className="space-y-2 text-gray-300 text-sm mb-8">
                    <li>✓ Free LinkedIn Premium</li>
                    <li>✓ Profile optimisation</li>
                    <li>✓ Lead generation campaigns</li>
                    <li>✓ Content strategy</li>
                  </ul>
                  <Link href="/contact" className="block text-center py-2 rounded-full border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black transition">Get Premium</Link>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Why Choose Kalki – Differentiators */}
        <ScrollReveal>
          <section className="py-24">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-serif mb-4">Why <span className="text-gold-400">Kalki Technologies</span>?</h2>
                <p className="text-gray-400">We blend AI innovation with hands‑on marketing expertise.</p>
              </div>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🔒</div>
                  <h3 className="font-semibold">Privacy First</h3>
                  <p className="text-gray-400 text-xs">Your data never leaves your browser.</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <h3 className="font-semibold">Guaranteed ROI</h3>
                  <p className="text-gray-400 text-xs">90‑day performance guarantee.</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🌐</div>
                  <h3 className="font-semibold">Distributed AI</h3>
                  <p className="text-gray-400 text-xs">Every user makes the network smarter.</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">📈</div>
                  <h3 className="font-semibold">Open Source</h3>
                  <p className="text-gray-400 text-xs">100% transparent, auditable code.</p>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Final CTA */}
        <ScrollReveal>
          <section className="py-32 text-center">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-5xl md:text-7xl font-serif mb-6">
                Ready to grow with <span className="text-gold-400">private AI</span>?
              </h2>
              <p className="text-gray-400 text-lg mb-10">
                Start with our free AI assistant or book a consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/chat"
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold hover:scale-105 transition"
                >
                  ✨ Chat with KI Assistant
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-full border border-white/20 text-white hover:border-gold-400 hover:text-gold-400 transition"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </>
  );
}
