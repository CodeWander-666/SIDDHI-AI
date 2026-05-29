'use client';
import { AnimatedGradientBackground } from '@/components/AnimatedGradientBackground';
import { ScrollReveal } from '@/components/ScrollReveal';
import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function linkedinPage() {
  return (
    <>
      <AnimatedGradientBackground />
      <div className="relative z-10 pt-28 pb-20 px-4 md:px-8 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <Link href="/services" className="inline-flex items-center gap-1 text-gold-400 text-sm mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to all services
          </Link>
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="text-7xl mb-4">🔗</div>
              <h1 className="text-5xl md:text-6xl font-serif mb-3">LinkedIn Growth Engine</h1>
              <p className="text-cyan-400 text-sm uppercase tracking-wider">B2B Leads on Autopilot</p>
              <div className="inline-block mt-4 px-4 py-1 rounded-full bg-gold-400/10 text-gold-400 text-sm font-semibold">₹9,999/month</div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="glass-card rounded-3xl p-8 md:p-12 mb-8">
              <div dangerouslySetInnerHTML={{ __html: `<p class='text-gray-300 leading-relaxed'>Turn your LinkedIn profile into a lead generation machine – includes free Premium account.</p>` }} />
              <ul className="space-y-3 mt-6">
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" /><span className="text-gray-300">Free LinkedIn Premium included</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" /><span className="text-gray-300">Profile optimisation for #1 search ranking</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" /><span className="text-gray-300">Daily content + engagement automation</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" /><span className="text-gray-300">Lead generation forms + CRM integration</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" /><span className="text-gray-300">Personal branding – turn employees into influencers</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" /><span className="text-gray-300">Automated connection & follow‑up campaigns</span></li>
              </ul>
              <div className="bg-cyan-400/10 p-5 rounded-xl mt-8 border-l-4 border-cyan-400">
                <p className="text-sm italic text-gray-300">
                  <span className="font-bold text-cyan-400">Why we’re different:</span> Our AI runs entirely in your browser – no data centre, total privacy. We're the only agency that guarantees ROI or works for free.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/contact" className="px-8 py-3 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold hover:scale-105 transition">
                  Get Started →
                </Link>
                <Link href="/support" className="px-8 py-3 rounded-full border border-white/20 text-white hover:border-gold-400 transition">
                  Get Support
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="text-center text-gray-400 text-sm">
              <p>Have questions? <Link href="/contact" className="text-gold-400 hover:underline">Talk to our team</Link> or <Link href="/ki-cloud" className="text-cyan-400 hover:underline">explore KI Cloud</Link>.</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
