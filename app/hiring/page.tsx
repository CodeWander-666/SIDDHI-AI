'use client';
import { AnimatedGradientBackground } from '../../components/AnimatedGradientBackground';
import { ScrollReveal } from '../../components/ScrollReveal';
import { useState } from 'react';

const internships = [
  { title: 'AI Development Intern (Unpaid)', duration: '3 months', location: 'Remote', category: 'AI/ML' },
  { title: 'Digital Marketing Intern (Unpaid)', duration: '3 months', location: 'Remote', category: 'Marketing' },
  { title: 'Sales & Outreach Intern (Unpaid)', duration: '3 months', location: 'Remote', category: 'Sales' },
  { title: 'HR & Recruitment Intern (Unpaid)', duration: '3 months', location: 'Remote', category: 'HR' },
  { title: 'Content Writing Intern (Unpaid)', duration: '3 months', location: 'Remote', category: 'Content' },
  { title: 'Graphic Design Intern (Unpaid)', duration: '3 months', location: 'Remote', category: 'Design' },
  { title: 'Web Development Intern (Unpaid)', duration: '3 months', location: 'Remote', category: 'Development' },
  { title: 'SEO Intern (Unpaid)', duration: '3 months', location: 'Remote', category: 'Marketing' },
];

const paidJobs = [
  { title: 'AI Developer (Remote)', salary: '₹25,000 – ₹45,000/month', location: 'Remote', category: 'AI/ML' },
  { title: 'Senior Digital Marketing Specialist', salary: '₹35,000 – ₹60,000/month', location: 'Remote', category: 'Marketing' },
  { title: 'Sales Executive', salary: '₹20,000 – ₹35,000/month + Commission', location: 'Remote', category: 'Sales' },
  { title: 'HR Manager', salary: '₹30,000 – ₹50,000/month', location: 'Remote', category: 'HR' },
  { title: 'Content Strategist', salary: '₹25,000 – ₹40,000/month', location: 'Remote', category: 'Content' },
  { title: 'UI/UX Designer', salary: '₹30,000 – ₹55,000/month', location: 'Remote', category: 'Design' },
  { title: 'Full Stack Developer (Next.js)', salary: '₹40,000 – ₹70,000/month', location: 'Remote', category: 'Development' },
  { title: 'Machine Learning Engineer', salary: '₹45,000 – ₹80,000/month', location: 'Remote', category: 'AI/ML' },
];

export default function HiringPage() {
  const [selectedRole, setSelectedRole] = useState('');

  const applyViaWhatsApp = (role: string) => {
    const message = `*New Job Application*\n\n*Role:* ${role}\n*Name:* [Your Name]\n*Email:* [Your Email]\n*Phone:* [Your Phone]\n*Message:* I am interested in this position.`;
    const url = `https://wa.me/916261031710?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <AnimatedGradientBackground />
      <div className="relative z-10 pt-28 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-400/30 bg-gold-400/5 text-gold-400 text-sm tracking-wider mb-6 backdrop-blur-sm">
                ✦ JOIN THE REVOLUTION ✦
              </div>
              <h1 className="text-6xl md:text-8xl font-serif mb-6">Work with <span className="text-gold-400">KI</span></h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Become part of the open‑source intelligence network – remote, flexible, futuristic.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mb-20">
              <h2 className="text-3xl font-serif mb-2 text-center">Certified <span className="text-cyan-400">Internships</span></h2>
              <p className="text-center text-gray-400 mb-10">Unpaid – 3 months – Remote – Certificate provided</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {internships.map((job, idx) => (
                  <div key={idx} className="glass-card p-6 rounded-2xl border border-white/10 hover:border-gold-400/40 transition-all">
                    <h3 className="text-xl font-semibold text-white mb-2">{job.title}</h3>
                    <p className="text-gold-400 text-sm mb-2">{job.duration} • {job.location}</p>
                    <p className="text-gray-500 text-sm mb-4">{job.category}</p>
                    <button
                      onClick={() => applyViaWhatsApp(job.title)}
                      className="w-full py-2 rounded-full border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-black transition"
                    >
                      Apply via WhatsApp →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mb-20">
              <h2 className="text-3xl font-serif mb-2 text-center">Work From Home <span className="text-gold-400">Opportunities</span></h2>
              <p className="text-center text-gray-400 mb-10">Paid – Full‑time / Contract – Remote</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paidJobs.map((job, idx) => (
                  <div key={idx} className="glass-card p-6 rounded-2xl border border-white/10 hover:border-cyan-400/40 transition-all">
                    <h3 className="text-xl font-semibold text-white mb-2">{job.title}</h3>
                    <p className="text-cyan-400 text-sm mb-2">{job.salary}</p>
                    <p className="text-gray-500 text-sm mb-4">{job.category} • {job.location}</p>
                    <button
                      onClick={() => applyViaWhatsApp(job.title)}
                      className="w-full py-2 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold hover:scale-105 transition"
                    >
                      Apply via WhatsApp →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="glass-card rounded-3xl p-8 md:p-12 border border-gold-400/20">
              <h2 className="text-3xl font-serif text-center mb-2">Can't find the right role?</h2>
              <p className="text-center text-gray-400 mb-8">Send us your CV directly – we’ll reach out when something matches.</p>
              <div className="text-center">
                <button
                  onClick={() => {
                    const msg = `*Open Application*\n\n*Name:* [Your Name]\n*Skills:* [Your Skills]\n*Experience:* [Years]\n*Resume Link:* [Google Drive/PDF]`;
                    window.open(`https://wa.me/916261031710?text=${encodeURIComponent(msg)}`, '_blank');
                  }}
                  className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-cyan-600 to-gold-600 text-white font-semibold hover:scale-105 transition"
                >
                  Submit Open Application →
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
