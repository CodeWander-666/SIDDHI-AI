'use client';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-black/90 backdrop-blur-md py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-1">
            <div className="text-xl font-serif bg-gradient-to-r from-cyan-400 via-gold-400 to-cyan-400 bg-clip-text text-transparent mb-3">KALKI</div>
            <p className="text-gray-500 text-xs">Open‑Source Intelligence Engine</p>
            <p className="text-gray-500 text-xs mt-1">Registered MSME (Udyam)</p>
          </div>
          <div>
            <h3 className="text-gold-400 text-xs font-semibold mb-3 tracking-wider">EXPLORE</h3>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li><Link href="/" className="hover:text-gold-400 transition">Home</Link></li>
              <li><Link href="/ki-cloud" className="hover:text-gold-400 transition">KI Cloud</Link></li>
              <li><Link href="/digital-marketing" className="hover:text-gold-400 transition">Digital Marketing</Link></li>
              <li><Link href="/plans" className="hover:text-gold-400 transition">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-gold-400 text-xs font-semibold mb-3 tracking-wider">COMPANY</h3>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li><Link href="/about" className="hover:text-gold-400 transition">About Us</Link></li>
              <li><Link href="/vision" className="hover:text-gold-400 transition">Vision</Link></li>
              <li><Link href="/blog" className="hover:text-gold-400 transition">Blog</Link></li>
              <li><Link href="/hiring" className="hover:text-gold-400 transition">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-gold-400 text-xs font-semibold mb-3 tracking-wider">SUPPORT</h3>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li><Link href="/support" className="hover:text-gold-400 transition">Support</Link></li>
              <li><Link href="/contact" className="hover:text-gold-400 transition">Contact</Link></li>
              <li><a href="https://wa.me/916261031710" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition">WhatsApp</a></li>
              <li><a href="mailto:hello@kalki.tech" className="hover:text-gold-400 transition">Email</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-gold-400 text-xs font-semibold mb-3 tracking-wider">LEGAL</h3>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li><Link href="/privacy" className="hover:text-gold-400 transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-gold-400 transition">Terms of Service</Link></li>
              <li><Link href="/cookie" className="hover:text-gold-400 transition">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-gray-500 text-[10px]">
          <p>© {currentYear} Kalki Technologies. All rights reserved. | Registered MSME (Udyam)</p>
          <p className="mt-1">Open‑Source Intelligence Engine – Privacy first, always.</p>
        </div>
      </div>
    </footer>
  );
}
