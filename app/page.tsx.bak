'use client';
import { ScrollReveal } from '../components/ScrollReveal';
import { ServiceCard } from '../components/ServiceCard';
import { TestimonialMarquee } from '../components/TestimonialMarquee';
import { WebLLMChat } from '../components/WebLLMChat';
import { GradientBackground } from '../components/GradientBackground';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <GradientBackground />
      <div className="relative z-10 pt-20">
        {/* 1. Hero */}
        <ScrollReveal>
          <section className="min-h-screen flex items-center justify-center text-center px-6">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full border border-gold-400/30 bg-gold-400/5 text-gold-400 text-sm tracking-wider mb-6">✦ OPEN-SOURCE INTELLIGENCE ✦</span>
              <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight">The first open‑source<br />intelligence engine</h1>
              <p className="text-xl text-gray-300 mt-8 max-w-2xl mx-auto leading-relaxed">Zero‑cost AI marketing, autonomous agents, and quantum‑inspired computing – all private, all open‑source.</p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center mt-12">
                <Link href="/ki-cloud" className="px-10 py-4 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold hover:scale-105 transition">Explore KI Cloud</Link>
                <Link href="/plans" className="px-10 py-4 rounded-full border border-white/20 text-white hover:border-gold-400 hover:text-gold-400 transition">See Plans</Link>
              </div>
              <div className="mt-16 flex flex-wrap justify-center gap-8 text-xs uppercase tracking-wider text-gray-500">
                <span>Trusted by 50+ startups</span>
                <span>✦</span>
                <span>Y Combinator</span>
                <span>✦</span>
                <span>Google Cloud</span>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* 2. 24/7 AI Support Bot Section – Just Below Hero */}
        <ScrollReveal>
          <section className="py-16 max-w-6xl mx-auto px-6">
            <div className="glass-card rounded-3xl p-8 border border-gold-400/20">
              <div className="text-center mb-8">
                <span className="text-cyan-400 text-sm tracking-wider">⚡ 24/7 INTELLIGENT ASSISTANCE</span>
                <h2 className="text-3xl md:text-4xl font-serif mt-2">Got questions? KI is here.</h2>
                <p className="text-gray-400 mt-2">Ask about our services, pricing, tech stack – even quantum machine learning.</p>
              </div>
              <WebLLMChat />
              <div className="text-center mt-6 text-xs text-gray-500">
                Private by design – your conversations never leave this browser.
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Link href="/support" className="px-6 py-2 rounded-full border border-gold-400 text-gold-400 hover:bg-gold-400/10 transition">Start free AI audit</Link>
                <Link href="https://wa.me/916261031710" className="px-6 py-2 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white hover:scale-105 transition">Talk to human</Link>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* 3. Problem Statement */}
        <ScrollReveal>
          <section className="py-28 max-w-4xl mx-auto text-center px-6">
            <h2 className="text-4xl md:text-6xl font-serif">Traditional marketing <span className="text-gold-400">costs too much</span></h2>
            <p className="text-gray-400 text-lg mt-6 leading-relaxed">Agencies charge fortunes while AI remains locked in black boxes. You deserve transparency, privacy, and zero overhead.</p>
          </section>
        </ScrollReveal>

        {/* 4. KI Cloud Intro */}
        <ScrollReveal>
          <section className="py-28 bg-gradient-to-b from-black via-purple-950/10 to-black">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <h2 className="text-4xl md:text-5xl font-serif">Introducing <span className="text-cyan-400">KI Cloud</span></h2>
              <div className="grid md:grid-cols-3 gap-8 mt-16">
                <div className="glass-card p-8"><div className="text-5xl mb-4">🌐</div><h3 className="text-2xl font-serif text-cyan-400">Browser‑First AI</h3><p className="text-gray-400">Zero server cost, maximum privacy.</p></div>
                <div className="glass-card p-8"><div className="text-5xl mb-4">🔓</div><h3 className="text-2xl font-serif text-gold-400">100% Open Source</h3><p className="text-gray-400">Auditable, free forever.</p></div>
                <div className="glass-card p-8"><div className="text-5xl mb-4">🤖</div><h3 className="text-2xl font-serif text-cyan-400">Autonomous Agents</h3><p className="text-gray-400">Sales, support, SEO – automated.</p></div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* 5. Services Grid */}
        <ScrollReveal>
          <section className="py-28">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-4xl md:text-5xl font-serif text-center">AI‑Powered <span className="text-gold-400">Services</span></h2>
              <p className="text-center text-gray-400 mt-4 mb-16">Tailored for every stage of your journey</p>
              <div className="grid md:grid-cols-4 gap-8">
                <ServiceCard title="For Startups" description="MVP, growth hacking, pitch decks, investor outreach" href="/services/for-startups" icon="🚀" gradient="from-cyan-500 to-purple-600" />
                <ServiceCard title="For Developers" description="Code reviews, OSS consulting, API integration" href="/services/for-developers" icon="💻" gradient="from-purple-500 to-cyan-600" />
                <ServiceCard title="Small Business" description="Local SEO, Google My Business, e‑commerce setup" href="/services/for-small-businesses" icon="🏢" gradient="from-gold-500 to-cyan-600" />
                <ServiceCard title="Social Creators" description="Personal branding, content automation, influencer campaigns" href="/services/for-social-creators" icon="🎨" gradient="from-cyan-500 to-gold-600" />
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* 6-9. Deep Dives */}
        <ScrollReveal><section className="py-24 bg-black/30"><div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12"><div><h2 className="text-4xl font-serif">Web Development <span className="text-cyan-400">Next.js</span></h2><p className="text-gray-300 mt-4">High‑end, ultra‑fast websites starting at ₹8,999.</p><Link href="/web-development" className="inline-block mt-6 text-gold-400">Learn more →</Link></div><div className="text-8xl">⚡</div></div></section></ScrollReveal>
        <ScrollReveal><section className="py-24"><div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row-reverse items-center gap-12"><div><h2 className="text-4xl font-serif">SEO & <span className="text-purple-400">Google Business Profile</span></h2><p className="text-gray-300 mt-4">Dominate local search with our AI‑powered optimisation.</p><Link href="/seo" className="inline-block mt-6 text-gold-400">Get started →</Link></div><div className="text-8xl">📈</div></div></section></ScrollReveal>
        <ScrollReveal><section className="py-24 bg-black/30"><div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12"><div><h2 className="text-4xl font-serif">Automation <span className="text-cyan-400">Suite</span></h2><p className="text-gray-300 mt-4">WhatsApp bots, booking dashboards, social automation – with guaranteed ROI.</p><Link href="/automation" className="inline-block mt-6 text-gold-400">Explore →</Link></div><div className="text-8xl">🤖</div></div></section></ScrollReveal>
        <ScrollReveal><section className="py-24"><div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row-reverse items-center gap-12"><div><h2 className="text-4xl font-serif">KI Quantum <span className="text-purple-400">Chatbot</span></h2><p className="text-gray-300 mt-4">Fully local, private AI assistant – runs on WebLLM with quantum‑inspired efficiency.</p><Link href="/support" className="inline-block mt-6 text-gold-400">Try now →</Link></div><div className="text-8xl">🧠</div></div></section></ScrollReveal>

        {/* 10. How It Works */}
        <ScrollReveal><section className="py-28 text-center"><div className="max-w-5xl mx-auto px-6"><h2 className="text-4xl md:text-5xl font-serif mb-16">How <span className="text-cyan-400">KI Works</span></h2><div className="grid md:grid-cols-3 gap-12"><div><div className="text-5xl font-serif text-gold-400 mb-4">01</div><h3 className="text-xl mb-2">Free AI Audit</h3><p className="text-gray-400">We analyze your business and identify opportunities.</p></div><div><div className="text-5xl font-serif text-gold-400 mb-4">02</div><h3 className="text-xl mb-2">Custom Strategy</h3><p className="text-gray-400">Tailored AI agents and marketing plan for your goals.</p></div><div><div className="text-5xl font-serif text-gold-400 mb-4">03</div><h3 className="text-xl mb-2">Scale & Optimize</h3><p className="text-gray-400">Automated execution with continuous improvement.</p></div></div></div></section></ScrollReveal>

        {/* 11. Real-Time Stats */}
        <ScrollReveal><section className="py-28 bg-black/40 text-center"><div className="max-w-7xl mx-auto px-6"><div className="grid md:grid-cols-4 gap-12"><div><div className="text-5xl font-serif text-cyan-400 mb-2">50+</div><div>Active Clients</div></div><div><div className="text-5xl font-serif text-gold-400 mb-2">100K+</div><div>Leads Generated</div></div><div><div className="text-5xl font-serif text-cyan-400 mb-2">99.9%</div><div>Uptime</div></div><div><div className="text-5xl font-serif text-gold-400 mb-2">₹0</div><div>Upfront Cost</div></div></div></div></section></ScrollReveal>

        {/* 12. Case Studies */}
        <ScrollReveal><section className="py-28"><div className="max-w-7xl mx-auto px-6"><h2 className="text-4xl font-serif text-center mb-16">Success <span className="text-gold-400">Stories</span></h2><div className="grid md:grid-cols-2 gap-8"><div className="glass-card p-8"><p className="text-gray-300 italic text-lg">“Kalki helped us cut Google Ads spend by 37% while doubling conversions.”</p><p className="mt-6 text-gold-400 font-semibold">— FinTech Startup</p></div><div className="glass-card p-8"><p className="text-gray-300 italic text-lg">“Our website now loads in 0.3s and ranks #1 for 20+ keywords.”</p><p className="mt-6 text-gold-400 font-semibold">— E‑commerce Brand</p></div></div></div></section></ScrollReveal>

        {/* 13. Pricing Plans */}
        <ScrollReveal><section className="py-28 bg-black/30"><div className="max-w-7xl mx-auto px-6"><h2 className="text-4xl font-serif text-center mb-6">Simple <span className="text-cyan-400">Pricing</span></h2><div className="grid md:grid-cols-3 gap-8 mt-16"><div className="glass-card p-10 text-center"><h3 className="text-2xl">Static</h3><p className="text-5xl font-serif text-gold-400 mt-6">₹8,999</p><p className="text-gray-400">One‑time</p><Link href="/plans#static" className="inline-block mt-8 border border-white/20 px-8 py-3 rounded-full">Choose</Link></div><div className="glass-card p-10 text-center border-2 border-gold-400/50"><h3 className="text-2xl">Dynamic</h3><p className="text-5xl font-serif text-gold-400 mt-6">₹15,999+</p><p className="text-gray-400">/month</p><Link href="/plans#dynamic" className="inline-block mt-8 bg-gradient-to-r from-gold-600 to-cyan-600 px-8 py-3 rounded-full text-white">Choose</Link></div><div className="glass-card p-10 text-center"><h3 className="text-2xl">Enterprise</h3><p className="text-5xl font-serif text-gold-400 mt-6">Custom</p><Link href="https://wa.me/916261031710" className="inline-block mt-8 border border-white/20 px-8 py-3 rounded-full">Contact</Link></div></div></div></section></ScrollReveal>

        {/* 14. Testimonials Marquee */}
        <ScrollReveal><section className="py-28"><TestimonialMarquee /></section></ScrollReveal>

        {/* 15. Integrations */}
        <ScrollReveal><section className="py-28 text-center"><div className="max-w-7xl mx-auto px-6"><h2 className="text-3xl font-serif mb-12">Works with your <span className="text-gold-400">stack</span></h2><div className="flex flex-wrap justify-center gap-8 text-gray-400 text-sm uppercase tracking-wider">WordPress · Shopify · Google Ads · Meta · GitHub · Stripe · Salesforce</div></div></section></ScrollReveal>

        {/* 16. AI Chatbot Demo (reminder) */}
        <ScrollReveal><section className="py-28 bg-black/40 text-center"><div className="max-w-4xl mx-auto px-6"><h2 className="text-3xl font-serif mb-4">Try <span className="text-cyan-400">KI Assistant</span></h2><p className="text-gray-400 mb-8">Ask anything about AI, marketing, or web development.</p><div className="glass-card p-6 rounded-2xl h-48 flex items-center justify-center"><span className="text-gray-400 animate-pulse">💬 Click the bottom right chat bubble to start</span></div></div></section></ScrollReveal>

        {/* 17. Resource Hub */}
        <ScrollReveal><section className="py-28"><div className="max-w-7xl mx-auto px-6 text-center"><h2 className="text-3xl font-serif mb-12">Free <span className="text-gold-400">Resources</span></h2><div className="grid md:grid-cols-3 gap-6"><div className="glass-card p-8"><div className="text-4xl mb-3">📄</div><h3 className="text-xl font-semibold">Blog & Guides</h3><p className="text-gray-400">Expert insights on AI & marketing</p></div><div className="glass-card p-8"><div className="text-4xl mb-3">📊</div><h3 className="text-xl font-semibold">Whitepapers</h3><p className="text-gray-400">In-depth research and data</p></div><div className="glass-card p-8"><div className="text-4xl mb-3">🎓</div><h3 className="text-xl font-semibold">Webinars</h3><p className="text-gray-400">Live sessions with experts</p></div></div></div></section></ScrollReveal>

        {/* 18. FAQ */}
        <ScrollReveal><section className="py-28 bg-black/30"><div className="max-w-4xl mx-auto px-6"><h2 className="text-4xl font-serif text-center mb-12">Frequently Asked <span className="text-gold-400">Questions</span></h2><div className="space-y-4"><details className="glass-card p-6"><summary className="font-semibold cursor-pointer text-lg">How much does it really cost?</summary><p className="mt-3 text-gray-400">Zero upfront. You only pay for premium human‑led services if you choose to upgrade.</p></details><details className="glass-card p-6"><summary className="font-semibold cursor-pointer text-lg">Do I need technical skills?</summary><p className="mt-3 text-gray-400">No. We handle everything from strategy to execution – you focus on your business.</p></details><details className="glass-card p-6"><summary className="font-semibold cursor-pointer text-lg">Is my data safe?</summary><p className="mt-3 text-gray-400">Yes – KI runs in your browser; no data leaves your device. Enterprise on‑prem options available.</p></details></div></div></section></ScrollReveal>

        {/* 19. Newsletter */}
        <ScrollReveal><section className="py-28 bg-gradient-to-r from-cyan-500/10 via-gold-500/10 to-purple-500/10"><div className="max-w-2xl mx-auto px-6 text-center"><h2 className="text-4xl font-serif mb-4">Join the <span className="text-gold-400">KI Community</span></h2><p className="text-gray-400 mb-8">Get early access, free tools, and invite‑only events.</p><form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"><input type="email" placeholder="Your email address" className="flex-1 bg-black/50 rounded-full px-6 py-3 border border-white/10 focus:border-gold-400 focus:outline-none transition-colors" /><button className="px-8 py-3 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold hover:scale-105 transition">Subscribe</button></form></div></section></ScrollReveal>

        {/* 20. Final CTA */}
        <ScrollReveal><section className="py-32 text-center"><div className="max-w-4xl mx-auto px-6"><h2 className="text-5xl md:text-7xl font-serif mb-6">Ready to <span className="text-gold-400">Transform</span> Your Business?</h2><p className="text-gray-400 text-lg mb-10">Join the open-source intelligence revolution. Zero upfront, limitless potential.</p><Link href="/support" className="inline-block px-12 py-5 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-xl font-semibold hover:scale-105 transition-all duration-300 shadow-2xl">Start Free AI Audit →</Link></div></section></ScrollReveal>
      </div>
    </>
  );
}
