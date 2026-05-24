'use client';
import { LuxuryThreeScene } from '../../components/LuxuryThreeScene';
import { ScrollReveal } from '../../components/ScrollReveal';
import Link from 'next/link';
import { useState } from 'react';

const internships = [
  { title: 'AI Development Intern (Unpaid)', type: 'Internship', duration: '3 months', location: 'Remote', stipend: 'Unpaid', category: 'AI/ML' },
  { title: 'Digital Marketing Intern (Unpaid)', type: 'Internship', duration: '3 months', location: 'Remote', stipend: 'Unpaid', category: 'Marketing' },
  { title: 'Sales & Outreach Intern (Unpaid)', type: 'Internship', duration: '3 months', location: 'Remote', stipend: 'Unpaid', category: 'Sales' },
  { title: 'HR & Recruitment Intern (Unpaid)', type: 'Internship', duration: '3 months', location: 'Remote', stipend: 'Unpaid', category: 'HR' },
  { title: 'Content Writing Intern (Unpaid)', type: 'Internship', duration: '3 months', location: 'Remote', stipend: 'Unpaid', category: 'Content' },
  { title: 'Graphic Design Intern (Unpaid)', type: 'Internship', duration: '3 months', location: 'Remote', stipend: 'Unpaid', category: 'Design' },
  { title: 'Web Development Intern (Unpaid)', type: 'Internship', duration: '3 months', location: 'Remote', stipend: 'Unpaid', category: 'Development' },
  { title: 'SEO Intern (Unpaid)', type: 'Internship', duration: '3 months', location: 'Remote', stipend: 'Unpaid', category: 'Marketing' },
  { title: 'Social Media Intern (Unpaid)', type: 'Internship', duration: '3 months', location: 'Remote', stipend: 'Unpaid', category: 'Marketing' },
  { title: 'Data Science Intern (Unpaid)', type: 'Internship', duration: '3 months', location: 'Remote', stipend: 'Unpaid', category: 'AI/ML' }
];

const paidJobs = [
  { title: 'AI Developer (Remote)', type: 'Full‑time', salary: '₹25,000 – ₹45,000/month', location: 'Remote', category: 'AI/ML' },
  { title: 'Senior Digital Marketing Specialist', type: 'Full‑time', salary: '₹35,000 – ₹60,000/month', location: 'Remote', category: 'Marketing' },
  { title: 'Sales Executive', type: 'Full‑time', salary: '₹20,000 – ₹35,000/month + Commission', location: 'Remote', category: 'Sales' },
  { title: 'HR Manager', type: 'Full‑time', salary: '₹30,000 – ₹50,000/month', location: 'Remote', category: 'HR' },
  { title: 'Content Strategist', type: 'Full‑time', salary: '₹25,000 – ₹40,000/month', location: 'Remote', category: 'Content' },
  { title: 'UI/UX Designer', type: 'Full‑time', salary: '₹30,000 – ₹55,000/month', location: 'Remote', category: 'Design' },
  { title: 'Full Stack Developer (Next.js)', type: 'Full‑time', salary: '₹40,000 – ₹70,000/month', location: 'Remote', category: 'Development' },
  { title: 'SEO Specialist', type: 'Full‑time', salary: '₹25,000 – ₹45,000/month', location: 'Remote', category: 'Marketing' },
  { title: 'Social Media Manager', type: 'Full‑time', salary: '₹25,000 – ₹40,000/month', location: 'Remote', category: 'Marketing' },
  { title: 'Machine Learning Engineer', type: 'Full‑time', salary: '₹45,000 – ₹80,000/month', location: 'Remote', category: 'AI/ML' }
];

export default function HiringPage() {
  const [selectedRole, setSelectedRole] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `*New Job Application*\n\n*Role:* ${selectedRole}\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n*Message:* ${message}`;
    const url = `https://wa.me/916261031710?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <LuxuryThreeScene />
      <div className="relative z-10 pt-28 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-400/30 bg-gold-400/5 text-gold-400 text-sm tracking-wider mb-6">✦ JOIN THE REVOLUTION ✦</div>
              <h1 className="text-6xl md:text-8xl font-serif mb-6">Work with <span className="text-gold-400">KI</span></h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">Become part of the open‑source intelligence network – remote, flexible, futuristic.</p>
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
                    <button onClick={() => setSelectedRole(job.title)} className="w-full py-2 rounded-full border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-black transition">Apply Now</button>
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
                    <button onClick={() => setSelectedRole(job.title)} className="w-full py-2 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold hover:scale-105 transition">Apply Now</button>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-8 md:p-12 border border-gold-400/20">
              <h2 className="text-3xl font-serif text-center mb-2">Submit Your <span className="text-gold-400">Application</span></h2>
              <p className="text-center text-gray-400 mb-8">Fill the form – we will reach out on WhatsApp within 24 hours.</p>
              <form onSubmit={handleApply} className="max-w-2xl mx-auto space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input type="text" placeholder="Full Name" required className="w-full bg-black/50 rounded-full px-6 py-3 border border-white/10 focus:border-gold-400 focus:outline-none transition" value={name} onChange={e => setName(e.target.value)} />
                  <input type="email" placeholder="Email Address" required className="w-full bg-black/50 rounded-full px-6 py-3 border border-white/10 focus:border-gold-400 focus:outline-none transition" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <input type="tel" placeholder="Phone Number (WhatsApp)" required className="w-full bg-black/50 rounded-full px-6 py-3 border border-white/10 focus:border-gold-400 focus:outline-none transition" value={phone} onChange={e => setPhone(e.target.value)} />
                <select required className="w-full bg-black/50 rounded-full px-6 py-3 border border-white/10 focus:border-gold-400 focus:outline-none transition" value={selectedRole} onChange={e => setSelectedRole(e.target.value)}>
                  <option value="">Select a role</option>
                  <optgroup label="Internships (Unpaid)">
                    {internships.map(job => <option key={job.title} value={job.title}>{job.title}</option>)}
                  </optgroup>
                  <optgroup label="Paid Jobs (Remote)">
                    {paidJobs.map(job => <option key={job.title} value={job.title}>{job.title}</option>)}
                  </optgroup>
                </select>
                <textarea placeholder="Why do you want to join Kalki? (Optional)" rows={3} className="w-full bg-black/50 rounded-2xl px-6 py-3 border border-white/10 focus:border-gold-400 focus:outline-none transition" value={message} onChange={e => setMessage(e.target.value)} />
                <button type="submit" className="w-full py-4 rounded-full bg-gradient-to-r from-gold-600 to-cyan-600 text-white font-semibold text-lg hover:scale-105 transition">Apply via WhatsApp →</button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
