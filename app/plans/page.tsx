'use client';
import { LuxuryThreeScene } from '../../components/LuxuryThreeScene';
import { ScrollReveal } from '../../components/ScrollReveal';
import Link from 'next/link';

const plans = [
  { name: 'Creator', tier: 'CREATOR', price: '₹45,000', period: 'month', desc: 'For content creators & influencers.', features: ['Portfolio Website (8 pages)', 'SEO (15 keywords)', 'Social Media (4 platforms)', 'AI Content Generation', 'Audience Analytics'], gradient: 'from-green-500 to-teal-600', popular: false },
  { name: 'Business', tier: 'BUSINESS', price: '₹55,000', period: 'month', desc: 'Complete digital presence for growing businesses.', features: ['Custom Website (10 pages)', 'SEO (20 keywords)', 'Social Media (3 platforms)', 'Google Business Profile', 'Monthly Reports'], gradient: 'from-cyan-500 to-blue-600', popular: false },
  { name: 'Startup', tier: 'STARTUP', price: '₹65,000', period: 'month', desc: 'Scale with intelligent automation.', features: ['Scalable Website (12 pages)', 'SEO (30 keywords)', 'Social Media (4 platforms)', 'Lead Generation', 'Marketing Dashboard'], gradient: 'from-amber-500 to-orange-600', popular: false },
  { name: 'Professional', tier: 'PROFESSIONAL', price: '₹95,000', period: 'month', desc: 'For doctors, lawyers, consultants.', features: ['Premium Website (15 pages)', 'Advanced SEO (50 keywords)', 'Social Media (5 platforms)', 'Appointment Automation', 'WhatsApp API', 'Reputation Management'], gradient: 'from-purple-500 to-pink-600', popular: true },
  { name: 'Enterprise', tier: 'ENTERPRISE', price: '₹2,50,000+', period: 'month', desc: 'Custom AI‑powered marketing suite.', features: ['Unlimited Pages', 'Enterprise SEO', 'Full Social Management', 'AI Sales Engine', 'Dedicated Account Manager', 'Custom AI Agents', '24/7 Priority'], gradient: 'from-gold-500 to-amber-600', popular: false }
];
const addOns = [
  { name: 'AI Chatbot Integration', price: '₹25,000', desc: 'Custom AI assistant for your website' },
  { name: 'PPC Management', price: '₹35,000', desc: 'Google Ads & social media advertising' },
  { name: 'Content Marketing', price: '₹20,000', desc: 'Blog posts, articles, & whitepapers' },
  { name: 'Email Marketing Suite', price: '₹15,000', desc: 'Automated campaigns & newsletters' }
];

export default function PlansPage() {
  return (
    <>
      <LuxuryThreeScene />
      <div className="relative z-10 pt-28 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal><div className="text-center mb-20"><div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-400/30 bg-gold-400/5 text-gold-400 text-sm tracking-wider mb-6">✦ PRICING PLANS ✦</div><h1 className="text-6xl md:text-8xl font-serif mb-6">Choose Your <span className="text-gold-400">Success Path</span></h1><p className="text-gray-400 text-lg max-w-2xl mx-auto">Transparent pricing, no hidden fees – guaranteed ROI within 90 days.</p></div></ScrollReveal>
          <div className="grid lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-24">
            {plans.map((plan, idx) => (
              <ScrollReveal key={plan.name} delay={idx * 0.1}>
                <div className={`glass-card rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 group ${plan.popular ? 'border-2 border-gold-400/60 shadow-2xl' : 'border border-white/10'}`}>
                  {plan.popular && <div className="absolute top-0 right-0 bg-gold-600 text-black text-xs font-bold px-5 py-1 rounded-bl-2xl">MOST POPULAR</div>}
                  <div className={`p-7 bg-gradient-to-br ${plan.gradient} opacity-5 group-hover:opacity-20 transition-opacity duration-700`} />
                  <div className="relative z-10 p-7">
                    <h3 className="text-xs uppercase tracking-[0.2em] text-gold-400 mb-2">{plan.tier}</h3>
                    <h2 className="text-2xl font-serif text-white mb-2">{plan.name}</h2>
                    <p className="text-gray-400 text-sm mb-5">{plan.desc}</p>
                    <div className="mb-6"><span className="text-4xl font-bold text-gold-400">{plan.price}</span><span className="text-gray-500 text-sm"> / {plan.period}</span></div>
                    <ul className="space-y-2 mb-7">
                      {plan.features.map((f, i) => <li key={i} className="flex items-start gap-2 text-gray-300 text-sm"><span className="text-gold-400 mt-0.5">✦</span>{f}</li>)}
                    </ul>
                    <Link href="/contact" className={`block text-center py-3 rounded-full font-semibold transition-all duration-300 ${plan.popular ? 'bg-gradient-to-r from-gold-600 to-cyan-600 text-white hover:scale-105' : 'border border-white/20 text-white hover:border-gold-400 hover:text-gold-400'}`}>{plan.name === 'Enterprise' ? 'Contact Sales →' : 'Select Plan →'}</Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-12 mb-24 border border-gold-400/20 text-center">
              <h2 className="text-3xl font-serif mb-2">Add‑<span className="text-gold-400">On Services</span></h2>
              <p className="text-gray-400 mb-12">Enhance your plan with additional capabilities</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {addOns.map((addon, idx) => (
                  <div key={idx} className="text-center p-5 rounded-xl bg-white/5 border border-white/10 hover:border-gold-400/40 transition-all"><h3 className="text-lg font-semibold text-white mb-2">{addon.name}</h3><p className="text-gold-400 text-2xl font-bold mb-2">{addon.price}</p><p className="text-gray-500 text-xs">{addon.desc}</p></div>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal><div className="text-center"><div className="inline-block glass-card rounded-full px-10 py-4 mb-8"><span className="text-gold-400 text-sm tracking-wider">✦ 90‑DAY ROI GUARANTEE ✦</span></div><h2 className="text-3xl font-serif mb-4">Not satisfied? <span className="text-gold-400">We work for free</span></h2><p className="text-gray-400 max-w-2xl mx-auto mb-10">If you don't see measurable ROI within 90 days, we continue working until you do – no additional cost.</p><Link href="/contact" className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold hover:scale-105 transition">Start Your Free Consultation →</Link></div></ScrollReveal>
        </div>
      </div>
    </>
  );
}
