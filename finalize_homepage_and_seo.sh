#!/bin/bash
set -euo pipefail

echo "🎯 Updating homepage with six service cards linking to dedicated pages..."
echo "🔐 Ensuring Google verification meta tag is in layout..."

# 1. Update the homepage
cat > app/page.tsx << 'HOMEPAGE'
'use client';
import { ScrollReveal } from '../components/ScrollReveal';
import { ServiceCard } from '../components/ServiceCard';
import { TestimonialMarquee } from '../components/TestimonialMarquee';
import { NodeTracker } from '../components/NodeTracker';
import { WebLLMChat } from '../components/WebLLMChat';
import { ThinkingVisualizer } from '../components/ThinkingVisualizer';
import { GradientBackground } from '../components/GradientBackground';
import Link from 'next/link';

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
                ✦ KALKI INTELLIGENCY ✦
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight">
                Your AI.<br />
                <span className="text-gold-400">Your Browser.</span>
              </h1>
              <p className="text-xl text-gray-300 mt-8 max-w-2xl mx-auto leading-relaxed">
                <strong>Kalki Intelligency (KI)</strong> is the first open‑source intelligence engine that runs <strong>entirely inside your browser</strong> – no data centre, no leaks, total privacy.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center mt-12">
                <Link
                  href="/chat"
                  className="px-10 py-4 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold hover:scale-105 transition"
                >
                  ✨ Talk to KI now
                </Link>
                <Link
                  href="/ki-cloud"
                  className="px-10 py-4 rounded-full border border-white/20 text-white hover:border-gold-400 hover:text-gold-400 transition"
                >
                  Explore KI Cloud
                </Link>
              </div>
              <div className="mt-16 flex justify-center">
                <NodeTracker />
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Thinking Pool Section */}
        <ScrollReveal>
          <div className="glass-card p-8 rounded-3xl max-w-4xl mx-auto my-12">
            <h3 className="text-2xl font-serif text-center mb-4">
              Distributed <span className="text-cyan-400">Thinking Pool</span>
            </h3>
            <div className="h-32 flex items-center justify-center">
              <ThinkingVisualizer />
            </div>
            <p className="text-center text-gray-400 text-sm mt-4">
              Every new node joins a quantum‑inspired parallel network – more users mean faster thinking for everyone.
            </p>
          </div>
        </ScrollReveal>

        {/* KI Explanation */}
        <ScrollReveal>
          <section className="py-24 max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">
              What makes <span className="text-cyan-400">KI</span> different?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="glass-card p-8 rounded-2xl">
                <div className="text-5xl mb-4">🔒</div>
                <h3 className="text-2xl font-semibold mb-2">Zero data centre</h3>
                <p className="text-gray-400">Your conversations never leave your device. No servers, no logs, no tracking.</p>
              </div>
              <div className="glass-card p-8 rounded-2xl">
                <div className="text-5xl mb-4">📦</div>
                <h3 className="text-2xl font-semibold mb-2">Tiny but powerful</h3>
                <p className="text-gray-400">Uses a super‑small language model (135M params) that runs on any modern laptop or phone.</p>
              </div>
              <div className="glass-card p-8 rounded-2xl">
                <div className="text-5xl mb-4">🌐</div>
                <h3 className="text-2xl font-semibold mb-2">Permanent node</h3>
                <p className="text-gray-400">Our network includes an always‑active node – free, open‑source, and unlimited.</p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Six Service Cards – each linking to dedicated sub‑page */}
        <ScrollReveal>
          <section className="py-28">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-4xl md:text-5xl font-serif text-center">
                AI‑Powered <span className="text-gold-400">Services</span>
              </h2>
              <p className="text-center text-gray-400 mt-4 mb-16">Tailored for every stage of your journey</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ServiceCard
                  title="AI‑Driven SEO"
                  description="Programmatic SEO, on‑page & off‑page optimisation, local dominance."
                  href="/services/seo"
                  icon="📈"
                  gradient="from-cyan-500 to-blue-600"
                />
                <ServiceCard
                  title="Social Media Automation"
                  description="Facebook + Instagram – guaranteed 2 viral posts/month + free blue tick verification."
                  href="/services/social-media"
                  icon="📱"
                  gradient="from-pink-500 to-purple-600"
                />
                <ServiceCard
                  title="Google Business Profile SEO"
                  description="Rank #1 on Google Maps and local pack – complete GMB optimisation."
                  href="/services/gmb-seo"
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
                  href="/services/web-development"
                  icon="💻"
                  gradient="from-orange-500 to-red-600"
                />
                <ServiceCard
                  title="AI Automation Suite"
                  description="WhatsApp bots, booking dashboards, AI sales agents – guaranteed ROI."
                  href="/services/ai-automation"
                  icon="⚙️"
                  gradient="from-indigo-500 to-purple-600"
                />
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Testimonials */}
        <ScrollReveal>
          <section className="py-16">
            <TestimonialMarquee />
          </section>
        </ScrollReveal>

        {/* Final CTA */}
        <ScrollReveal>
          <section className="py-32 text-center">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-5xl md:text-7xl font-serif mb-6">
                Ready to experience <span className="text-gold-400">true AI privacy</span>?
              </h2>
              <p className="text-gray-400 text-lg mb-10">
                No account. No data collection. Just pure, open‑source intelligence.
              </p>
              <Link
                href="/chat"
                className="inline-block px-12 py-5 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-xl font-semibold hover:scale-105 transition"
              >
                Start chatting with KI →
              </Link>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </>
  );
}
HOMEPAGE

echo "✅ Homepage updated with six service cards linking to dedicated pages."

# 2. Ensure Google verification meta tag is present (idempotent)
LAYOUT="app/layout.tsx"
META='<meta name="google-site-verification" content="mXzGHeQy9yGNuw8JTuzgXdDUn-gUcj4C65Jt83rcK9A" />'

# Remove any existing duplicate lines
sed -i '/google-site-verification/d' "$LAYOUT"

# Insert right after <head> tag
sed -i "/<head>/a \\  ${META}" "$LAYOUT"

echo "✅ Google verification meta tag added/updated in $LAYOUT."

# 3. Clean and rebuild
echo "🧹 Cleaning .next cache..."
rm -rf .next

echo "🏗️ Rebuilding project..."
npm run build

echo ""
echo "🎉 All done!"
echo "   • Homepage cards now link to /services/seo, /services/social-media, /services/gmb-seo, /services/linkedin, /services/web-development, /services/ai-automation"
echo "   • Google verification meta tag is in place."
echo "   • Build succeeded. Run 'npm run dev' to test locally, or deploy to production."
