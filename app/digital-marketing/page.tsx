'use client';
import { AnimatedGradient } from '../../components/AnimatedGradient';
import { ScrollReveal } from '../../components/ScrollReveal';
import { CategoryCard } from '../../components/CategoryCard';
import Link from 'next/link';

const categories = [
  {
    title: 'For Businesses',
    description: 'Scale your enterprise with AI‑driven marketing automation.',
    features: ['AI Sales Automation Engine', 'Predictive Lead Scoring', 'Custom Dashboard & Analytics'],
    ctaText: 'Explore Business Suite',
    ctaLink: '/services/business',
    gradient: 'from-cyan-500 to-blue-600',
    delay: 0
  },
  {
    title: 'For Professionals',
    description: 'Doctors, lawyers, consultants – build your digital presence.',
    features: ['Google Business Profile Optimisation', 'Reputation Management', 'Local SEO Dominance'],
    ctaText: 'Professional Plan',
    ctaLink: '/services/professionals',
    gradient: 'from-gold-500 to-amber-600',
    delay: 0.1
  }
];

export default function DigitalMarketingPage() {
  return (
    <>
      <AnimatedGradient />
      <div className="relative z-10 pt-28 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-400/30 bg-gold-400/5 text-gold-400 text-sm tracking-wider mb-6 backdrop-blur-sm">✦ AI-POWERED MARKETING ✦</div>
              <h1 className="text-6xl md:text-8xl font-serif mb-6">Marketing That <span className="text-gold-400">Thinks</span></h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">Intelligent, autonomous marketing solutions for businesses and professionals.</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8 mb-24">
            {categories.map((cat) => (
              <CategoryCard key={cat.title} {...cat} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
