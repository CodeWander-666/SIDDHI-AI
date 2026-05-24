import { ScrollReveal } from '../../components/ScrollReveal';
import { WebLLMChat } from '../../components/WebLLMChat';
import Link from 'next/link';

export default function SupportPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full border border-gold-400/30 bg-gold-400/5 text-gold-400 text-sm tracking-wider mb-6">
              ✦ 24/7 INTELLIGENT ASSISTANCE ✦
            </span>
            <h1 className="text-5xl md:text-7xl font-serif mb-4">
              How can <span className="text-gold-400">KI help you</span> today?
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Your personal AI concierge is ready to answer any question – instantly, securely, and without any data leaving your device.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <WebLLMChat />
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-16 text-center">
            <div className="glass-card p-8 rounded-3xl inline-block max-w-2xl mx-auto">
              <h3 className="text-2xl font-serif mb-2">Still have questions?</h3>
              <p className="text-gray-400 mb-6">
                You can also reach our human support team directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="https://wa.me/916261031710"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold hover:scale-105 transition"
                >
                  Contact Human Support
                </Link>
                <Link
                  href="/docs"
                  className="px-6 py-3 rounded-full border border-white/20 text-white hover:border-gold-400 hover:text-gold-400 transition"
                >
                  View Documentation
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-20 text-center text-sm text-gray-500 border-t border-white/10 pt-8">
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400" />
              </span>
              Live KI-powered assistance – no data logged, total privacy.
            </span>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
