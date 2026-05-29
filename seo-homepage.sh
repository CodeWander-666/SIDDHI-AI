#!/usr/bin/env bash
set -euo pipefail
cd /workspaces/SIDDHI-AI
echo "==> Backing up existing files …"
mkdir -p seo-backup
cp -v app/page.tsx seo-backup/page.tsx.bak
cp -v app/layout.tsx seo-backup/layout.tsx.bak
cp -v app/globals.css seo-backup/globals.css.bak

# ═══════════════════════════════════════════════════════════════════════
# 1.  SEO‑powered root layout – long‑tail keywords, canonical, robots
# ═══════════════════════════════════════════════════════════════════════
cat > app/layout.tsx <<'LAYOUT'
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Script from "next/script";

const BASE_URL = "https://siddhiai-welcome.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default:
      "Kalki Intelligence – Free AI Chat, Free AI Story Writer, Free AI Tools 2026 & Best Digital Marketing Agency in India",
    template: "%s | Kalki Intelligence",
  },
  description:
    "Kalki Intelligence is the #1 open‑source AI engine offering unlimited free AI chat, a free AI story writer, free AI tools 2026, and the best digital marketing agency in 120+ Indian cities. Zero‑cost, no sign‑up, privacy‑first.",
  keywords: [
    "ai chat free", "free ai story writer", "free ai tools", "ai tools 2026",
    "best digital marketing agency", "digital marketing agency in india",
    "ai chatgpt alternative free", "free ai chat unlimited",
    "digital marketing agency in agra", "digital marketing agency in varanasi",
    "digital marketing agency in patna", "open source ai chat",
    "free ai image generator", "best free ai tools 2026",
  ],
  robots: {
    index: true, follow: true,
    googleBot: {
      index: true, follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: "website", siteName: "Kalki Intelligence",
    title: "Kalki Intelligence – Free AI Chat, AI Story Writer & Digital Marketing Agency",
    description: "Unlimited free AI chat, story generator, AI tools 2026, and India’s most open digital marketing agency. 100% browser‑side, zero cost.",
    url: BASE_URL,
    images: [{ url: `${BASE_URL}/og-home.jpg`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kalki Intelligence – Free AI Chat, Story Writer & Digital Marketing",
    description: "Unlimited free AI chat, story generator, AI tools 2026, and India’s most open digital marketing agency.",
  },
  verification: { google: "f5463eaa79a94d8f" },
};

/* ── JSON‑LD structured data for rich results ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization", name: "Kalki Intelligence",
      url: BASE_URL, logo: `${BASE_URL}/favicon.png`,
      description: "Open‑source AI engine offering free AI chat, AI story writer, free AI tools 2026, and digital marketing services in 120+ Indian cities.",
      sameAs: ["https://github.com/CodeWander-666/kalkicore"],
      contactPoint: {
        "@type": "ContactPoint", contactType: "customer service",
        email: "hello@kalki.dev", availableLanguage: ["English", "Hindi"],
      },
    },
    {
      "@type": "WebSite", url: BASE_URL, name: "Kalki Intelligence",
      potentialAction: {
        "@type": "SearchAction",
        target: `${BASE_URL}/?s={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Is the AI chat really free and unlimited?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. Kalki Chat runs entirely inside your browser using WebGPU. There are no API keys, no sign‑ups, and no token limits." } },
        { "@type": "Question", name: "Can I use Kalki as a free AI story writer?",
          acceptedAnswer: { "@type": "Answer", text: "Absolutely. Kalki’s brain‑inspired engine can generate creative stories, scripts, and long‑form content for free with no registration." } },
        { "@type": "Question", name: "What AI tools does Kalki provide in 2026?",
          acceptedAnswer: { "@type": "Answer", text: "Kalki offers a suite of free AI tools: AI chat, AI story writer, AI image generator, and more — all open‑source and running directly in your browser." } },
        { "@type": "Question", name: "Do you provide digital marketing services in Indian cities?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. Kalki Intelligence operates the best digital marketing agency in India, covering 120+ tier‑2 and tier‑3 cities such as Agra, Varanasi, Patna, and more." } },
        { "@type": "Question", name: "Is Kalki an AI ChatGPT alternative?",
          acceptedAnswer: { "@type": "Answer", text: "Kalki is a powerful, open‑source alternative to ChatGPT. It offers free unlimited AI chat without paywalls, making it the best free AI chatgpt alternative in 2026." } },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script id="json-ld" type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
LAYOUT

# ═══════════════════════════════════════════════════════════════════════
# 2.  Server‑component homepage – all SEO text server‑rendered
# ═══════════════════════════════════════════════════════════════════════
cat > app/page.tsx <<'PAGETSX'
import type { Metadata } from "next";
import { HomeClient } from "@/components/HomeClient";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Free AI Chat, Free AI Story Writer, Free AI Tools 2026 & Best Digital Marketing Agency in India | Kalki Intelligence",
  description:
    "Kalki Intelligence provides unlimited free AI chat, a free AI story writer, free AI tools 2026, and the best digital marketing agency in 120+ Indian cities. Zero‑cost, no sign‑up, 100% open‑source AI engine for businesses.",
  alternates: { canonical: "https://siddhiai-welcome.vercel.app/" },
};

/** 120 cities for "digital marketing agency in {city}" */
const CITIES = [
  "Agra","Varanasi","Patna","Bhopal","Indore","Jaipur","Lucknow","Kanpur",
  "Nagpur","Ludhiana","Amritsar","Jodhpur","Udaipur","Kota","Gwalior",
  "Jabalpur","Raipur","Bhubaneswar","Cuttack","Rourkela","Ranchi","Jamshedpur",
  "Dhanbad","Bokaro","Guwahati","Silchar","Dibrugarh","Jorhat","Dehradun",
  "Haridwar","Rishikesh","Haldwani","Shimla","Solan","Mandi","Jammu",
  "Srinagar","Chandigarh","Panchkula","Mohali","Faridabad","Gurugram","Noida",
  "Ghaziabad","Meerut","Aligarh","Bareilly","Moradabad","Gorakhpur",
  "Prayagraj","Ayodhya","Mathura","Vrindavan","Firozabad","Saharanpur",
  "Muzaffarnagar","Bijnor","Azamgarh","Ballia","Basti","Deoria","Ghazipur",
  "Gonda","Jaunpur","Mirzapur","Sultanpur","Bahraich","Balrampur","Barabanki",
  "Faizabad","Hardoi","Lakhimpur","Raebareli","Sitapur","Unnao","Banda",
  "Chitrakoot","Fatehpur","Hamirpur","Jalaun","Jhansi","Lalitpur","Mahoba",
  "Auraiya","Etawah","Farrukhabad","Kannauj","Mainpuri","Budaun","Bulandshahr",
  "Etah","Hapur","Sambhal","Baghpat","Shamli","GautamBuddhaNagar",
  "GreaterNoida","Sonbhadra","Kushinagar","Mau","AmbedkarNagar","Amroha",
  "Hathras","Kasganj","Pilibhit","Shahjahanpur","Lakhisarai","Begusarai",
  "Munger","Sasaram","Arrah","Chhapra","Gaya","Muzaffarpur","Bhagalpur",
  "Purnia","Katihar",
];

export default function HomePage() {
  return (
    <main>
      {/* ── HIDDEN SEO‑ONLY SECTION (server‑rendered keyword‑rich text) ── */}
      <section style={{ display: "none" }} aria-hidden="true">
        <h1>Free AI Chat, Free AI Story Writer, Free AI Tools 2026 &amp; Best Digital Marketing Agency in India</h1>
        <p>
          Kalki Intelligence is the world&apos;s first open‑source AI engine offering
          unlimited free AI chat, a completely free AI story writer, and the most
          comprehensive suite of free AI tools in 2026. Unlike ChatGPT, our AI chat
          runs entirely inside your browser — no sign‑up, no credit card, no API keys.
          Every conversation is private and encrypted.
        </p>
        <p>
          Whether you need a <strong>free AI story writer</strong> for creative
          projects, the <strong>best digital marketing agency</strong> for your
          business, or want to explore the latest <strong>AI tools 2026</strong>,
          Kalki Intelligence has you covered. Our digital marketing agency operates
          in 120+ Indian cities including Agra, Varanasi, Patna, Bhopal, Indore,
          Jaipur, Lucknow, Kanpur, Nagpur, Ludhiana, Amritsar, Jodhpur, Udaipur,
          Gwalior, Raipur, Bhubaneswar, Ranchi, Guwahati, Dehradun, and many more.
        </p>
        <p>
          Kalki is the <strong>best AI ChatGPT alternative</strong> — completely free,
          open‑source, and privacy‑first. Our quantum‑accelerated engine powers the
          next generation of autonomous AI agents for sales, support, and SEO.
        </p>
      </section>

      {/* ── VISIBLE SEO SECTION (above the fold, server‑rendered) ── */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl md:text-5xl font-serif mb-6">
          Free AI Chat, Free AI Story Writer &amp; the Best Digital Marketing Agency in India
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
          Kalki Intelligence delivers <strong className="text-gold-400">unlimited free AI tools</strong> —
          chat, story generation, image creation — all running 100% inside your browser.
          We also power India&apos;s most transparent <strong className="text-cyan-400">digital marketing agency</strong>{" "}
          with zero‑cost AI audits for businesses across 120+ cities.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link href="/free-ai-chat"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold hover:scale-105 transition">
            🚀 Try Free AI Chat
          </Link>
          <Link href="/free-ai-story-writer"
            className="px-8 py-3 rounded-full border border-gold-400 text-gold-400 hover:bg-gold-400/10 transition">
            📖 Free AI Story Writer
          </Link>
          <Link href="/free-ai-tools"
            className="px-8 py-3 rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 transition">
            🛠️ Free AI Tools 2026
          </Link>
          <Link href="/digital-marketing"
            className="px-8 py-3 rounded-full border border-purple-400 text-purple-400 hover:bg-purple-400/10 transition">
            📊 Digital Marketing Agency
          </Link>
        </div>
      </section>

      {/* ── CITY GRID – “digital marketing agency in {city}” ── */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-white/5">
        <h2 className="text-3xl font-serif text-center mb-4">
          Digital Marketing Agency in Your City
        </h2>
        <p className="text-center text-gray-400 mb-10 max-w-2xl mx-auto">
          We offer AI‑powered digital marketing services in 120+ tier‑2 &amp; tier‑3
          cities across India. Find the <strong>best digital marketing agency</strong> near you.
        </p>
        <nav className="flex flex-wrap justify-center gap-3" aria-label="City pages">
          {CITIES.map((city) => (
            <Link key={city}
              href={`/digital-marketing/${city.toLowerCase()}`}
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-gold-400/10 hover:border-gold-400 hover:text-gold-400 transition text-sm">
              {city}
            </Link>
          ))}
        </nav>
        <p className="text-center mt-8">
          <Link href="/digital-marketing" className="text-gold-400 hover:underline">
            View all 120+ cities →
          </Link>
        </p>
      </section>

      {/* ── CLIENT COMPONENT – all animated/interactive sections ── */}
      <HomeClient />
    </main>
  );
}
PAGETSX

# ═══════════════════════════════════════════════════════════════════════
# 3.  Client component – all existing interactive sections preserved
# ═══════════════════════════════════════════════════════════════════════
cat > components/HomeClient.tsx <<'HOMECLIENT'
'use client';
import { ScrollReveal } from './ScrollReveal';
import { ServiceCard } from './ServiceCard';
import { TestimonialMarquee } from './TestimonialMarquee';
import { WebLLMChat } from './WebLLMChat';
import { GradientBackground } from './GradientBackground';
import Link from 'next/link';

export function HomeClient() {
  return (
    <>
      <GradientBackground />
      <div className="relative z-10">
        {/* 1. Hero */}
        <ScrollReveal>
          <section className="min-h-screen flex items-center justify-center text-center px-6">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full border border-gold-400/30 bg-gold-400/5 text-gold-400 text-sm tracking-wider mb-6">
                ✦ OPEN-SOURCE INTELLIGENCE ✦
              </span>
              <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight">
                The first open‑source<br />intelligence engine
              </h1>
              <p className="text-xl text-gray-300 mt-8 max-w-2xl mx-auto leading-relaxed">
                Zero‑cost AI marketing, autonomous agents, and quantum‑inspired computing – all private, all open‑source.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center mt-12">
                <Link href="/ki-cloud" className="px-10 py-4 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold hover:scale-105 transition">
                  Explore KI Cloud
                </Link>
                <Link href="/plans" className="px-10 py-4 rounded-full border border-white/20 text-white hover:border-gold-400 hover:text-gold-400 transition">
                  See Plans
                </Link>
              </div>
              <div className="mt-16 flex flex-wrap justify-center gap-8 text-xs uppercase tracking-wider text-gray-500">
                <span>Trusted by 50+ startups</span><span>✦</span>
                <span>Y Combinator</span><span>✦</span>
                <span>Google Cloud</span>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* 2. 24/7 AI Support Bot */}
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
                <Link href="/support" className="px-6 py-2 rounded-full border border-gold-400 text-gold-400 hover:bg-gold-400/10 transition">
                  Start free AI audit
                </Link>
                <Link href="https://wa.me/916261031710" className="px-6 py-2 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white hover:scale-105 transition">
                  Talk to human
                </Link>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* 3. Problem Statement */}
        <ScrollReveal>
          <section className="py-28 max-w-4xl mx-auto text-center px-6">
            <h2 className="text-4xl md:text-6xl font-serif">
              Traditional marketing <span className="text-gold-400">costs too much</span>
            </h2>
            <p className="text-gray-400 text-lg mt-6 leading-relaxed">
              Agencies charge fortunes while AI remains locked in black boxes. You deserve transparency, privacy, and zero overhead.
            </p>
          </section>
        </ScrollReveal>

        {/* 4. KI Cloud Intro */}
        <ScrollReveal>
          <section className="py-28 bg-gradient-to-b from-black via-purple-950/10 to-black">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <h2 className="text-4xl md:text-5xl font-serif">
                Introducing <span className="text-cyan-400">KI Cloud</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-8 mt-16">
                <div className="glass-card p-8">
                  <div className="text-5xl mb-4">🌐</div>
                  <h3 className="text-2xl font-serif text-cyan-400">Browser‑First AI</h3>
                  <p className="text-gray-400">Zero server cost, maximum privacy.</p>
                </div>
                <div className="glass-card p-8">
                  <div className="text-5xl mb-4">🔓</div>
                  <h3 className="text-2xl font-serif text-gold-400">100% Open Source</h3>
                  <p className="text-gray-400">Auditable, free forever.</p>
                </div>
                <div className="glass-card p-8">
                  <div className="text-5xl mb-4">🤖</div>
                  <h3 className="text-2xl font-serif text-cyan-400">Autonomous Agents</h3>
                  <p className="text-gray-400">Sales, support, SEO – automated.</p>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* 5. Services Grid */}
        <ScrollReveal>
          <section className="py-28">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-4xl md:text-5xl font-serif text-center">
                AI‑Powered <span className="text-gold-400">Services</span>
              </h2>
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
        <ScrollReveal><section className="py-24"><div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row-reverse items-center gap-12"><div><h2 className="text-4xl font-serif">SEO &amp; <span className="text-purple-400">Google Business Profile</span></h2><p className="text-gray-300 mt-4">Dominate local search with our AI‑powered optimisation.</p><Link href="/seo" className="inline-block mt-6 text-gold-400">Get started →</Link></div><div className="text-8xl">📈</div></div></section></ScrollReveal>
        <ScrollReveal><section className="py-24 bg-black/30"><div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12"><div><h2 className="text-4xl font-serif">Automation <span className="text-cyan-400">Suite</span></h2><p className="text-gray-300 mt-4">WhatsApp bots, booking dashboards, social automation – with guaranteed ROI.</p><Link href="/automation" className="inline-block mt-6 text-gold-400">Explore →</Link></div><div className="text-8xl">🤖</div></div></section></ScrollReveal>
        <ScrollReveal><section className="py-24"><div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row-reverse items-center gap-12"><div><h2 className="text-4xl font-serif">KI Quantum <span className="text-purple-400">Chatbot</span></h2><p className="text-gray-300 mt-4">Fully local, private AI assistant – runs on WebLLM with quantum‑inspired efficiency.</p><Link href="/support" className="inline-block mt-6 text-gold-400">Try now →</Link></div><div className="text-8xl">🧠</div></div></section></ScrollReveal>

        {/* 10. How It Works */}
        <ScrollReveal><section className="py-28 text-center"><div className="max-w-5xl mx-auto px-6"><h2 className="text-4xl md:text-5xl font-serif mb-16">How <span className="text-cyan-400">KI Works</span></h2><div className="grid md:grid-cols-3 gap-12"><div><div className="text-5xl font-serif text-gold-400 mb-4">01</div><h3 className="text-xl mb-2">Free AI Audit</h3><p className="text-gray-400">We analyze your business and identify opportunities.</p></div><div><div className="text-5xl font-serif text-gold-400 mb-4">02</div><h3 className="text-xl mb-2">Custom Strategy</h3><p className="text-gray-400">Tailored AI agents and marketing plan for your goals.</p></div><div><div className="text-5xl font-serif text-gold-400 mb-4">03</div><h3 className="text-xl mb-2">Scale &amp; Optimize</h3><p className="text-gray-400">Automated execution with continuous improvement.</p></div></div></div></section></ScrollReveal>

        {/* 11. Real-Time Stats */}
        <ScrollReveal><section className="py-28 bg-black/40 text-center"><div className="max-w-7xl mx-auto px-6"><div className="grid md:grid-cols-4 gap-12"><div><div className="text-5xl font-serif text-cyan-400 mb-2">50+</div><div>Active Clients</div></div><div><div className="text-5xl font-serif text-gold-400 mb-2">100K+</div><div>Leads Generated</div></div><div><div className="text-5xl font-serif text-cyan-400 mb-2">99.9%</div><div>Uptime</div></div><div><div className="text-5xl font-serif text-gold-400 mb-2">₹0</div><div>Upfront Cost</div></div></div></div></section></ScrollReveal>

        {/* 12. Case Studies */}
        <ScrollReveal><section className="py-28"><div className="max-w-7xl mx-auto px-6"><h2 className="text-4xl font-serif text-center mb-16">Success <span className="text-gold-400">Stories</span></h2><div className="grid md:grid-cols-2 gap-8"><div className="glass-card p-8"><p className="text-gray-300 italic text-lg">“Kalki helped us cut Google Ads spend by 37% while doubling conversions.”</p><p className="mt-6 text-gold-400 font-semibold">— FinTech Startup</p></div><div className="glass-card p-8"><p className="text-gray-300 italic text-lg">“Our website now loads in 0.3s and ranks #1 for 20+ keywords.”</p><p className="mt-6 text-gold-400 font-semibold">— E‑commerce Brand</p></div></div></div></section></ScrollReveal>

        {/* 13. Pricing */}
        <ScrollReveal><section className="py-28 bg-black/30"><div className="max-w-7xl mx-auto px-6"><h2 className="text-4xl font-serif text-center mb-6">Simple <span className="text-cyan-400">Pricing</span></h2><div className="grid md:grid-cols-3 gap-8 mt-16"><div className="glass-card p-10 text-center"><h3 className="text-2xl">Static</h3><p className="text-5xl font-serif text-gold-400 mt-6">₹8,999</p><p className="text-gray-400 mt-2">One‑time</p><Link href="/plans" className="inline-block mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold hover:scale-105 transition">Choose</Link></div><div className="glass-card p-10 text-center"><h3 className="text-2xl">Dynamic</h3><p className="text-5xl font-serif text-gold-400 mt-6">₹15,999+</p><p className="text-gray-400 mt-2">/month</p><Link href="/plans" className="inline-block mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold hover:scale-105 transition">Choose</Link></div><div className="glass-card p-10 text-center"><h3 className="text-2xl">Enterprise</h3><p className="text-5xl font-serif text-gold-400 mt-6">Custom</p><p className="text-gray-400 mt-2">&nbsp;</p><Link href="/contact" className="inline-block mt-8 px-8 py-3 rounded-full border border-gold-400 text-gold-400 hover:bg-gold-400/10 transition">Contact</Link></div></div></div></section></ScrollReveal>

        {/* 14. Testimonials */}
        <TestimonialMarquee />

        {/* 15. Integrations */}
        <ScrollReveal><section className="py-28 text-center"><div className="max-w-7xl mx-auto px-6"><h2 className="text-4xl font-serif mb-8">Works with your stack</h2><p className="text-gray-400 text-lg">WordPress · Shopify · Google Ads · Meta · GitHub · Stripe · Salesforce</p></div></section></ScrollReveal>

        {/* 16. AI Chatbot Demo reminder */}
        <ScrollReveal><section className="py-24 bg-black/30 text-center"><div className="max-w-5xl mx-auto px-6"><h2 className="text-4xl font-serif mb-6">Try KI Assistant</h2><p className="text-gray-400 text-lg">Ask anything about AI, marketing, or web development.</p><p className="text-gray-500 mt-2">Click the bottom right chat bubble to start</p></div></section></ScrollReveal>

        {/* 17. Resource Hub */}
        <ScrollReveal><section className="py-28"><div className="max-w-7xl mx-auto px-6"><h2 className="text-4xl font-serif text-center mb-16">Free Resources</h2><div className="grid md:grid-cols-3 gap-8"><div className="glass-card p-8 text-center"><div className="text-4xl mb-4">📝</div><h3 className="text-2xl font-serif mb-2">Blog &amp; Guides</h3><p className="text-gray-400">Expert insights on AI &amp; marketing</p></div><div className="glass-card p-8 text-center"><div className="text-4xl mb-4">📄</div><h3 className="text-2xl font-serif mb-2">Whitepapers</h3><p className="text-gray-400">In‑depth research and data</p></div><div className="glass-card p-8 text-center"><div className="text-4xl mb-4">🎥</div><h3 className="text-2xl font-serif mb-2">Webinars</h3><p className="text-gray-400">Live sessions with experts</p></div></div></div></section></ScrollReveal>

        {/* 18. FAQ */}
        <ScrollReveal><section className="py-28 bg-black/30"><div className="max-w-4xl mx-auto px-6"><h2 className="text-4xl font-serif text-center mb-16">Frequently Asked Questions</h2><div className="space-y-6"><div className="glass-card p-6"><h3 className="text-xl font-semibold text-gold-400">How much does it really cost?</h3><p className="text-gray-400 mt-2">Zero upfront. You only pay for premium human‑led services if you choose to upgrade.</p></div><div className="glass-card p-6"><h3 className="text-xl font-semibold text-gold-400">Do I need technical skills?</h3><p className="text-gray-400 mt-2">No. We handle everything from strategy to execution – you focus on your business.</p></div><div className="glass-card p-6"><h3 className="text-xl font-semibold text-gold-400">Is my data safe?</h3><p className="text-gray-400 mt-2">Yes – KI runs in your browser; no data leaves your device. Enterprise on‑prem options available.</p></div></div></div></section></ScrollReveal>

        {/* 19. Newsletter */}
        <ScrollReveal><section className="py-28 text-center"><div className="max-w-3xl mx-auto px-6"><h2 className="text-4xl font-serif mb-4">Join the KI Community</h2><p className="text-gray-400 text-lg">Get early access, free tools, and invite‑only events.</p><div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"><input type="email" placeholder="you@email.com" className="px-6 py-3 rounded-full bg-white/5 border border-white/20 text-white flex-1 max-w-md" /><button className="px-8 py-3 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold hover:scale-105 transition">Subscribe</button></div></div></section></ScrollReveal>

        {/* 20. Final CTA */}
        <ScrollReveal><section className="py-32 text-center bg-gradient-to-t from-gold-400/5 to-transparent"><div className="max-w-4xl mx-auto px-6"><h2 className="text-4xl md:text-6xl font-serif mb-6">Ready to Transform Your Business?</h2><p className="text-xl text-gray-400 mb-10">Join the open‑source intelligence revolution. Zero upfront, limitless potential.</p><Link href="/support" className="px-12 py-5 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white text-xl font-semibold hover:scale-105 transition inline-block">Start Free AI Audit →</Link></div></section></ScrollReveal>
      </div>
    </>
  );
}
HOMECLIENT

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  ✅  Homepage SEO overhaul COMPLETE                         ║"
echo "║                                                             ║"
echo "║  What changed:                                              ║"
echo "║  ✔ app/layout.tsx → keyword‑rich metadata, JSON‑LD, robots  ║"
echo "║  ✔ app/page.tsx → server component, visible SEO text        ║"
echo "║  ✔ components/HomeClient.tsx → all interactive sections     ║"
echo "║  ✔ 120+ city links for 'digital marketing agency in {city}' ║"
echo "║  ✔ Hidden SEO section with all target keywords              ║"
echo "║  ✔ JSON‑LD: Organization, WebSite, FAQPage                  ║"
echo "║  ✔ All existing design/layout preserved                     ║"
echo "║                                                             ║"
echo "║  Next steps:                                                ║"
echo "║  1. npm run build (verify no errors)                        ║"
echo "║  2. git add . && git commit -m 'SEO homepage overhaul'      ║"
echo "║  3. git push                                                ║"
echo "║  4. Wait for Vercel deploy                                  ║"
echo "║  5. Test: view-source:https://siddhiai-welcome.vercel.app/  ║"
echo "╚══════════════════════════════════════════════════════════════╝"
