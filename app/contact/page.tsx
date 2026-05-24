'use client';
import { LuxuryThreeScene } from '../../components/LuxuryThreeScene';
import { ScrollReveal } from '../../components/ScrollReveal';
import { useState } from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMsg = `*New Contact Request*\n\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`;
    window.open(`https://wa.me/916261031710?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
  };

  return (
    <>
      <LuxuryThreeScene />
      <div className="relative z-10 pt-28 pb-20 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-400/30 bg-gold-400/5 text-gold-400 text-sm tracking-wider mb-6">✦ GET IN TOUCH ✦</div>
              <h1 className="text-5xl md:text-7xl font-serif mb-6">Let's <span className="text-gold-400">Connect</span></h1>
              <p className="text-gray-400">Fill the form – we will respond on WhatsApp within minutes.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="text" placeholder="Your Name" required className="w-full bg-black/50 rounded-full px-6 py-3 border border-white/10 focus:border-gold-400 outline-none" value={name} onChange={e => setName(e.target.value)} />
                <input type="email" placeholder="Email Address" required className="w-full bg-black/50 rounded-full px-6 py-3 border border-white/10 focus:border-gold-400 outline-none" value={email} onChange={e => setEmail(e.target.value)} />
                <textarea placeholder="Your Message" rows={4} required className="w-full bg-black/50 rounded-2xl px-6 py-3 border border-white/10 focus:border-gold-400 outline-none" value={message} onChange={e => setMessage(e.target.value)} />
                <button type="submit" className="w-full py-4 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold text-lg hover:scale-105 transition">Send via WhatsApp →</button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
